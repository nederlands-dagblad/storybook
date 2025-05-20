import fs from 'fs';

// ----------------------
// 🔧 Config
// ----------------------
const files = {
    primitives: './tokens/primitives.value.tokens.json',
    semantics: './tokens/semantic-colors.light.tokens.json',
    spacing: './tokens/semantic-layout.mobile.tokens.json',
    typography: './tokens/text.styles.tokens.json',
    responsiveTypography: {
        mobile: './tokens/semantic-typography.mobile.tokens.json',
        tablet: './tokens/semantic-typography.tablet.tokens.json',
        desktop: './tokens/semantic-typography.desktop.tokens.json'
    },
    componentStates: {
        default: './tokens/component-colors.default.tokens.json',
        hover: './tokens/component-colors.hover.tokens.json',
        active: './tokens/component-colors.active.tokens.json',
        disabled: './tokens/component-colors.disabled.tokens.json'
    }
};

// ----------------------
// 🧠 Utilities
// ----------------------
function load(file) {
    try {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (error) {
        console.error(`Error loading file ${file}:`, error.message);
        return {};
    }
}

// Legacy reference mapping to handle old token references
const legacyReferenceMap = {
    // Font size mappings
    'font-size.heading.xl': '28px',
    'font-size.heading.l': '25px',
    'font-size.heading.m': '18px',
    'font-size.heading.s': '16px',
    'font-size.heading.xs': '12px',
    'font-size.body.xxl': '24px',
    'font-size.body.xl': '18px',
    'font-size.body.l': '18px',
    'font-size.body.m': '16px',
    'font-size.body.s': '14px',
    'font-size.body.xs': '12px',
    'font-size.body.drop-cap': '90px',
    'font-size.meta': '14px',
    
    // Font family mappings
    'typography.font-family.gulliver semibold': "'Gulliver Semibold', serif",
    'typography.font-family.gulliver': "'Gulliver', serif",
    'typography.font-family.fira-sans': "'Fira Sans', sans-serif",
    'typography.font-family.montserrat': "'Montserrat', sans-serif",
    'typography.font-family.abril-fatface': "'Abril Fatface', cursive",
    
    // Font weight mappings
    'typography.font-weight.light': '300',
    'typography.font-weight.regular': '400',
    'typography.font-weight.bold': '700',
    
    // Letter spacing mappings
    'typography.letter-spacing.0': '0%',
    'typography.letter-spacing.s': '1px',
    'typography.letter-spacing.m': '2px',
    'typography.letter-spacing.l': '4px'
};

function flatten(obj, path = [], result = {}) {
    for (const [key, val] of Object.entries(obj)) {
        const current = [...path, key];
        if (val && typeof val === 'object' && '$value' in val) {
            result[current.join('.')] = val;
        } else if (typeof val === 'object' && val !== null) {
            flatten(val, current, result);
        }
    }
    return result;
}

function resolveReference(ref, flatTokens, visited = new Set()) {
    if (!ref || typeof ref !== 'string') return ref;
    
    // If it's not a reference, return as is
    if (!ref.startsWith('{') || !ref.endsWith('}')) return ref;
    
    const path = ref.replace(/[{}]/g, '');
    
    // Check if this is a legacy reference that needs to be mapped
    if (legacyReferenceMap[path]) {
        return legacyReferenceMap[path];
    }
    
    // Prevent circular references
    if (visited.has(path)) {
        console.warn(`Circular reference detected: ${path}`);
        return undefined;
    }
    
    visited.add(path);
    
    // Try to find the token using the path
    let token = flatTokens[path];
    
    // If not found, try some common variations
    if (!token) {
        // Try with different prefixes/formats
        const variations = [
            path.replace(/^font-size\./, 'fontSize.'),
            path.replace(/^typography\.font-family\./, 'fontFamily.'),
            path.replace(/\s+/g, '-').toLowerCase(),
            path.replace(/\./g, '-').toLowerCase()
        ];
        
        for (const variant of variations) {
            if (flatTokens[variant]) {
                token = flatTokens[variant];
                break;
            }
        }
    }
    
    if (!token) {
        console.warn(`Reference not found: ${path}`);
        
        // For font sizes, provide fallback values based on the legacy map
        if (path.includes('font-size') || path.includes('fontSize')) {
            // Default to medium size if no specific match
            return legacyReferenceMap['font-size.body.m'] || '16px';
        }
        
        // For font families, provide fallback values
        if (path.includes('font-family') || path.includes('fontFamily')) {
            // Default to sans-serif if no specific match
            return "'Fira Sans', sans-serif";
        }
        
        // For font weights
        if (path.includes('font-weight') || path.includes('fontWeight')) {
            return '400';
        }
        
        // For letter spacing
        if (path.includes('letter-spacing') || path.includes('letterSpacing')) {
            return '0%';
        }
        
        return undefined;
    }
    
    const value = token.$value;
    
    if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
        return resolveReference(value, flatTokens, visited);
    }
    
    return value;
}

function toVar(name) {
    return `var(--${name})`;
}

function kebab(str) {
    return str
        .replace(/\./g, '-')                // Replace dots with hyphens
        .replace(/\s+/g, '-')               // Replace spaces with hyphens
        .replace(/\+/g, '-plus-')           // Replace + with -plus-
        .replace(/[^a-zA-Z0-9-]/g, '-')     // Replace other special chars with hyphens
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // Add hyphen between camelCase
        .replace(/-+/g, '-')                // Replace multiple hyphens with single hyphen
        .toLowerCase();                      // Convert to lowercase
}

// ----------------------
// 🚀 Build All Token Sets
// ----------------------
console.log('🔄 Loading and processing token files...');

// Load all base tokens
const baseTokens = {
    ...load(files.primitives),
    ...load(files.semantics),
    ...load(files.typography)  // Add typography tokens to base tokens for reference resolution
};

const flattenedBase = flatten(baseTokens);

const primitiveColors = {};
const semanticColors = {};
const cssVarMap = {};
const primitiveFontFamilies = {};
const primitiveFontSizes = {};
const primitiveFontWeights = {};
const primitiveLetterSpacings = {};

for (const [tokenPath, token] of Object.entries(flattenedBase)) {
    // Process font families
    if (tokenPath.includes('font-family') || tokenPath.includes('fontFamily')) {
        const fontName = tokenPath.split('.').pop();
        const fontKey = `font-family-${kebab(fontName)}`;
        primitiveFontFamilies[kebab(fontName)] = toVar(fontKey);
        cssVarMap[fontKey] = token.$value;
    }
    // Process font weights
    else if (tokenPath.includes('font-weight') || tokenPath.includes('fontWeight')) {
        const weightName = tokenPath.split('.').pop();
        const weightKey = `font-weight-${kebab(weightName)}`;
        primitiveFontWeights[kebab(weightName)] = toVar(weightKey);
        cssVarMap[weightKey] = token.$value;
    }
    // Process letter spacings
    else if (tokenPath.includes('letter-spacing') || tokenPath.includes('letterSpacing')) {
        const spacingName = tokenPath.split('.').pop();
        const spacingKey = `letter-spacing-${kebab(spacingName)}`;
        primitiveLetterSpacings[kebab(spacingName)] = toVar(spacingKey);
        cssVarMap[spacingKey] = token.$value;
    }
    // Process font sizes
    else if (tokenPath.includes('font-size') || tokenPath.includes('fontSize')) {
        const sizeName = tokenPath.split('.').pop();
        const sizeKey = `font-size-${kebab(sizeName)}`;
        primitiveFontSizes[kebab(sizeName)] = toVar(sizeKey);
        cssVarMap[sizeKey] = token.$value;
        
        // Add additional mappings for common references
        if (sizeName.includes('heading') || sizeName.includes('body')) {
            // Create mappings for the old reference format
            const category = sizeName.includes('heading') ? 'heading' : 'body';
            const size = sizeName.split('-').pop();
            cssVarMap[`font-size-${category}-${size}`] = token.$value;
        }
    }

    // Create meta font size tokens for backward compatibility
    if (tokenPath.includes('meta') && (tokenPath.includes('font-size') || tokenPath.includes('fontSize'))) {
        cssVarMap['font-size-meta'] = token.$value;
        cssVarMap['font-size-meta-font-size-meta'] = token.$value;
    }
}

for (const [tokenPath, token] of Object.entries(flattenedBase)) {
    if (token?.$type === 'color') {
        const raw = token.$value;
        const resolved = raw.startsWith('{')
            ? resolveReference(raw, flattenedBase) ?? raw
            : raw;
        const kebabKey = kebab(tokenPath);
        
        // Always prefix with "color-" regardless of whether it's primitive or semantic
        const prefixedKey = tokenPath.startsWith('color.') ? kebabKey : `color-${kebabKey}`;
        
        if (tokenPath.startsWith('color.')) {
            const tailwindKey = kebabKey.replace(/^color-/, '');
            primitiveColors[tailwindKey] = toVar(prefixedKey);
        } else {
            semanticColors[kebabKey] = toVar(prefixedKey);
        }
        
        cssVarMap[prefixedKey] = resolved;
    }
}

// ----------------------
// 🎯 Process Component Tokens
// ----------------------
console.log('🔄 Processing component tokens...');

const componentColors = {};
const utilityClasses = {};

for (const [state, file] of Object.entries(files.componentStates)) {
    const component = load(file);
    
    (function process(obj, prefix = '') {
        for (const [key, val] of Object.entries(obj)) {
            const path = prefix ? `${prefix}-${key}` : key;
            
            if (val?.$value) {
                const raw = val.$value;
                const resolved = raw.startsWith('{')
                    ? resolveReference(raw, flattenedBase) ?? raw
                    : raw;
                    
                const fullVarName = `${path}-${state}`;
                const tailwindKey = state === 'default' ? path : `${path}-${state}`;
                
                // Prefix component colors with "color-" instead of "component-"
                const prefixedVarName = `color-${fullVarName}`;
                componentColors[tailwindKey] = toVar(prefixedVarName);
                cssVarMap[prefixedVarName] = resolved;
                
                // Generate utility classes based on token name patterns
                if (path.includes('bg')) {
                    utilityClasses[`.bg-${tailwindKey}`] = { backgroundColor: `var(--${prefixedVarName})` };
                } else if (path.includes('text')) {
                    utilityClasses[`.text-${tailwindKey}`] = { color: `var(--${prefixedVarName})` };
                } else if (path.includes('border')) {
                    utilityClasses[`.border-${tailwindKey}`] = { borderColor: `var(--${prefixedVarName})` };
                }
            } else if (typeof val === 'object' && val !== null) {
                process(val, path);
            }
        }
    })(component);
}

// ----------------------
// 📏 Process Spacing Tokens
// ----------------------
console.log('🔄 Processing spacing tokens...');

const spacing = {};
const spacingUtilities = {};

// Process spacing tokens from semantic-spacing file
try {
    const rawSpacing = load(files.spacing);
    const flattenedSpacing = flatten({ spacing: rawSpacing }, []);
    
    for (const [tokenPath, token] of Object.entries(flattenedSpacing)) {
        if (token?.$type === 'dimension') {
            const raw = token.$value;
            const resolved = raw.startsWith('{')
                ? resolveReference(raw, { ...flattenedBase, ...flattenedSpacing })
                : raw;

            // Skip if reference couldn't be resolved
            if (!resolved) {
                console.warn(`Could not resolve reference: ${raw} for ${tokenPath}`);
                continue;
            }

            const kebabKey = kebab(tokenPath);
            const varName = `--${kebabKey}`;
            
            spacing[kebabKey] = `var(${varName})`;
            cssVarMap[kebabKey] = resolved;
            
            // Generate spacing utility classes
            spacingUtilities[`.p-${kebabKey}`] = { padding: `var(${varName})` };
            spacingUtilities[`.px-${kebabKey}`] = { paddingLeft: `var(${varName})`, paddingRight: `var(${varName})` };
            spacingUtilities[`.py-${kebabKey}`] = { paddingTop: `var(${varName})`, paddingBottom: `var(${varName})` };
            spacingUtilities[`.pt-${kebabKey}`] = { paddingTop: `var(${varName})` };
            spacingUtilities[`.pr-${kebabKey}`] = { paddingRight: `var(${varName})` };
            spacingUtilities[`.pb-${kebabKey}`] = { paddingBottom: `var(${varName})` };
            spacingUtilities[`.pl-${kebabKey}`] = { paddingLeft: `var(${varName})` };
            
            spacingUtilities[`.m-${kebabKey}`] = { margin: `var(${varName})` };
            spacingUtilities[`.mx-${kebabKey}`] = { marginLeft: `var(${varName})`, marginRight: `var(${varName})` };
            spacingUtilities[`.my-${kebabKey}`] = { marginTop: `var(${varName})`, marginBottom: `var(${varName})` };
            spacingUtilities[`.mt-${kebabKey}`] = { marginTop: `var(${varName})` };
            spacingUtilities[`.mr-${kebabKey}`] = { marginRight: `var(${varName})` };
            spacingUtilities[`.mb-${kebabKey}`] = { marginBottom: `var(${varName})` };
            spacingUtilities[`.ml-${kebabKey}`] = { marginLeft: `var(${varName})` };
            
            spacingUtilities[`.gap-${kebabKey}`] = { gap: `var(${varName})` };
        }
    }
} catch (error) {
    console.warn(`Error processing semantic spacing: ${error.message}`);
}

// Also process spacing tokens from primitives file
for (const [tokenPath, token] of Object.entries(flattenedBase)) {
    if (tokenPath.startsWith('spacing.') && token?.$type === 'dimension') {
        const raw = token.$value;
        const resolved = raw.startsWith('{')
            ? resolveReference(raw, flattenedBase)
            : raw;

        // Skip if reference couldn't be resolved
        if (!resolved) {
            console.warn(`Could not resolve reference: ${raw} for ${tokenPath}`);
            continue;
        }

        const spacingName = tokenPath.split('.').pop();
        // Use the original name as the key (without spacing- prefix)
        const originalKey = kebab(spacingName);
        // But keep the CSS variable name prefixed
        const kebabKey = `spacing-${originalKey}`;
        const varName = `--${kebabKey}`;
        
        // Use the original name as the key in the spacing object
        spacing[originalKey] = `var(${varName})`;
        cssVarMap[kebabKey] = resolved;
        
        // Generate spacing utility classes with the original name
        spacingUtilities[`.p-${originalKey}`] = { padding: `var(${varName})` };
        spacingUtilities[`.px-${originalKey}`] = { paddingLeft: `var(${varName})`, paddingRight: `var(${varName})` };
        spacingUtilities[`.py-${originalKey}`] = { paddingTop: `var(${varName})`, paddingBottom: `var(${varName})` };
        spacingUtilities[`.pt-${originalKey}`] = { paddingTop: `var(${varName})` };
        spacingUtilities[`.pr-${originalKey}`] = { paddingRight: `var(${varName})` };
        spacingUtilities[`.pb-${originalKey}`] = { paddingBottom: `var(${varName})` };
        spacingUtilities[`.pl-${originalKey}`] = { paddingLeft: `var(${varName})` };
        
        spacingUtilities[`.m-${originalKey}`] = { margin: `var(${varName})` };
        spacingUtilities[`.mx-${originalKey}`] = { marginLeft: `var(${varName})`, marginRight: `var(${varName})` };
        spacingUtilities[`.my-${originalKey}`] = { marginTop: `var(${varName})`, marginBottom: `var(${varName})` };
        spacingUtilities[`.mt-${originalKey}`] = { marginTop: `var(${varName})` };
        spacingUtilities[`.mr-${originalKey}`] = { marginRight: `var(${varName})` };
        spacingUtilities[`.mb-${originalKey}`] = { marginBottom: `var(${varName})` };
        spacingUtilities[`.ml-${originalKey}`] = { marginLeft: `var(${varName})` };
        
        spacingUtilities[`.gap-${originalKey}`] = { gap: `var(${varName})` };
    }
}

// ----------------------
// 📝 Process Typography Tokens
// ----------------------
console.log('🔄 Processing typography tokens...');

const rawTypography = load(files.typography);
const typographyStyles = {};
const typographyUtilities = {};
const fontFamilies = {};
const fontWeights = {};
const fontSizes = {};
const lineHeights = {};
const letterSpacings = {};

function processTypographyTokens(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
        const path = prefix ? `${prefix}.${key}` : key;
        
        // Skip tokens that start with "old"
        if (path.startsWith('old') || key.startsWith('old')) {
            continue;
        }

        if (value?.$type === 'typography' && value?.$value) {
            const typographyValue = value.$value;
            const kebabKey = kebab(path);

            // Create CSS variables for each typography property
            for (const [propKey, propValue] of Object.entries(typographyValue)) {
                const propName = `${kebabKey}-${propKey}`;
                let resolvedValue = propValue;

                // Resolve references if needed
                if (typeof propValue === 'string' && propValue.startsWith('{')) {
                    resolvedValue = resolveReference(propValue, flattenedBase);
                    if (!resolvedValue) {
                        console.warn(`Could not resolve reference: ${propValue} for ${propName}`);
                        continue;
                    }
                }

                cssVarMap[propName] = resolvedValue;

                // Collect unique values for Tailwind config
                if (propKey === 'fontFamily') {
                    fontFamilies[kebabKey] = `var(--${propName})`;
                } else if (propKey === 'fontWeight') {
                    fontWeights[kebabKey] = `var(--${propName})`;
                } else if (propKey === 'fontSize') {
                    fontSizes[kebabKey] = `var(--${propName})`;
                } else if (propKey === 'lineHeight') {
                    lineHeights[kebabKey] = `var(--${propName})`;
                } else if (propKey === 'letterSpacing') {
                    letterSpacings[kebabKey] = `var(--${propName})`;
                }
            }

            // Create a utility class for the complete typography style
            const utilityStyle = {
                fontFamily: `var(--${kebabKey}-fontFamily)`,
                fontSize: `var(--${kebabKey}-fontSize)`,
                fontWeight: `var(--${kebabKey}-fontWeight)`,
                lineHeight: `var(--${kebabKey}-lineHeight)`,
                letterSpacing: `var(--${kebabKey}-letterSpacing)`,
                textDecoration: typographyValue.textDecoration || 'none'
            };

            // Use font-variant for small-caps instead of text-transform
            if (typographyValue.textTransform === 'small-caps') {
                utilityStyle.fontVariant = 'all-small-caps';
            } else if (typographyValue.textTransform && typographyValue.textTransform !== 'none') {
                utilityStyle.textTransform = typographyValue.textTransform;
            }

            typographyUtilities[`.text-${kebabKey}`] = utilityStyle;
            typographyStyles[kebabKey] = `var(--${kebabKey})`;
        } else if (typeof value === 'object' && !value.$type && value !== null) {
            processTypographyTokens(value, path);
        }
    }
}

processTypographyTokens(rawTypography);

// ----------------------
// 📱 Process Responsive Typography Tokens
// ----------------------
console.log('🔄 Processing responsive typography tokens...');

const responsiveTokens = {
    mobile: {},
    tablet: {},
    desktop: {}
};

function processResponsiveTypography() {
    // Process each breakpoint
    for (const [breakpoint, file] of Object.entries(files.responsiveTypography)) {
        try {
            const rawTokens = load(file);

            // Add these tokens to the base tokens for reference resolution
            const combinedTokens = {
                ...flattenedBase,
                ...flatten(rawTokens)
            };

            // Extract typography tokens
            for (const [key, value] of Object.entries(rawTokens)) {
                if (typeof value === 'object') {
                    processResponsiveTypographySection(value, key, breakpoint, combinedTokens);
                }
            }
            
            // Process font sizes specifically
            if (rawTokens['font-size']) {
                processFontSizes(rawTokens['font-size'], breakpoint);
            }
        } catch (error) {
            console.error(`Error processing ${breakpoint} typography: ${error.message}`);
        }
    }
}

// Process font sizes from semantic typography tokens
function processFontSizes(fontSizes, breakpoint) {
    // Process heading sizes
    if (fontSizes.heading) {
        Object.entries(fontSizes.heading).forEach(([size, value]) => {
            if (value.$value) {
                const varName = `font-size-heading-${size}`;
                responsiveTokens[breakpoint][varName] = resolveReference(value.$value, flattenedBase) || value.$value;
                
                // For desktop, also add to the main CSS var map (without breakpoint suffix)
                if (breakpoint === 'desktop') {
                    cssVarMap[varName] = responsiveTokens[breakpoint][varName];
                }
            }
        });
    }
    
    // Process body sizes
    if (fontSizes.body) {
        Object.entries(fontSizes.body).forEach(([size, value]) => {
            if (value.$value) {
                const varName = `font-size-body-${size}`;
                responsiveTokens[breakpoint][varName] = resolveReference(value.$value, flattenedBase) || value.$value;
                
                // For desktop, also add to the main CSS var map (without breakpoint suffix)
                if (breakpoint === 'desktop') {
                    cssVarMap[varName] = responsiveTokens[breakpoint][varName];
                }
            }
        });
    }
    
    // Process meta size
    if (fontSizes.meta && fontSizes.meta.$value) {
        const varName = `font-size-meta`;
        responsiveTokens[breakpoint][varName] = resolveReference(fontSizes.meta.$value, flattenedBase) || value.$value;
        
        // For desktop, also add to the main CSS var map (without breakpoint suffix)
        if (breakpoint === 'desktop') {
            cssVarMap[varName] = responsiveTokens[breakpoint][varName];
        }
    }
}

function processResponsiveTypographySection(obj, prefix, breakpoint, combinedTokens) {
    for (const [key, value] of Object.entries(obj)) {
        const path = prefix ? `${prefix}.${key}` : key;
        
        // Skip tokens that start with "old"
        if (path.startsWith('old') || key.startsWith('old')) {
            continue;
        }

        if (value?.$type === 'typography' && value?.$value) {
            const typographyValue = value.$value;
            const kebabKey = kebab(path);

            // Create CSS variables for each typography property
            for (const [propKey, propValue] of Object.entries(typographyValue)) {
                const propName = `${kebabKey}-${propKey}`;
                let resolvedValue = propValue;

                // Resolve references if needed
                if (typeof propValue === 'string' && propValue.startsWith('{')) {
                    resolvedValue = resolveReference(propValue, combinedTokens);
                    if (!resolvedValue) {
                        console.warn(`Could not resolve reference: ${propValue} for ${propName} in ${breakpoint}`);
                        continue;
                    }
                }

                // Store the responsive value
                responsiveTokens[breakpoint][propName] = resolvedValue;
            }
        } else if (typeof value === 'object' && !value.$type && value !== null) {
            processResponsiveTypographySection(value, path, breakpoint, combinedTokens);
        }
    }
}

processResponsiveTypography();

// ----------------------
// ✏️ Write tailwind.tokens.js
// ----------------------
console.log('📝 Writing tailwind.tokens.js...');

// Filter out any typography styles that start with "old-"
const filteredTypographyStyles = Object.fromEntries(
    Object.entries(typographyStyles).filter(([key]) => !key.startsWith('old-'))
);
const filteredFontFamilies = Object.fromEntries(
    Object.entries(fontFamilies).filter(([key]) => !key.startsWith('old-'))
);
const filteredFontWeights = Object.fromEntries(
    Object.entries(fontWeights).filter(([key]) => !key.startsWith('old-'))
);
const filteredFontSizes = Object.fromEntries(
    Object.entries(fontSizes).filter(([key]) => !key.startsWith('old-'))
);
const filteredLineHeights = Object.fromEntries(
    Object.entries(lineHeights).filter(([key]) => !key.startsWith('old-'))
);
const filteredLetterSpacings = Object.fromEntries(
    Object.entries(letterSpacings).filter(([key]) => !key.startsWith('old-'))
);

const jsOutput = `
// Generated from design tokens - DO NOT EDIT DIRECTLY
// Last generated: ${new Date().toISOString()}

export const primitiveColors = ${JSON.stringify(primitiveColors, null, 2)};
export const semanticColors = ${JSON.stringify(semanticColors, null, 2)};
export const componentColors = ${JSON.stringify(componentColors, null, 2)};
export const spacing = ${JSON.stringify(spacing, null, 2)};
export const typographyStyles = ${JSON.stringify(filteredTypographyStyles, null, 2)};
export const fontFamilies = ${JSON.stringify(filteredFontFamilies, null, 2)};
export const fontWeights = ${JSON.stringify(filteredFontWeights, null, 2)};
export const fontSizes = ${JSON.stringify(filteredFontSizes, null, 2)};
export const lineHeights = ${JSON.stringify(filteredLineHeights, null, 2)};
export const letterSpacings = ${JSON.stringify(filteredLetterSpacings, null, 2)};
export const primitiveFontFamilies = ${JSON.stringify(primitiveFontFamilies, null, 2)};
export const primitiveFontSizes = ${JSON.stringify(primitiveFontSizes, null, 2)};
export const primitiveFontWeights = ${JSON.stringify(primitiveFontWeights, null, 2)};
export const primitiveLetterSpacings = ${JSON.stringify(primitiveLetterSpacings, null, 2)};
`.trim();

fs.writeFileSync('./tailwind.tokens.js', jsOutput);
console.log('✅ tailwind.tokens.js written.');

// ----------------------
// 🎨 Write tokens.css
// ----------------------
console.log('📝 Writing tokens.css...');

// Filter out any CSS variables that start with "old-"
const filteredCssVarMap = Object.fromEntries(
    Object.entries(cssVarMap).filter(([key]) => !key.startsWith('old-'))
);

const cssOutput = `
/**
 * Design System Tokens
 * Generated from design tokens - DO NOT EDIT DIRECTLY
 * Last generated: ${new Date().toISOString()}
 */

:root {
${Object.entries(filteredCssVarMap)
    .map(([key, val]) => `  --${key}: ${val};`)
    .join('\n')}
}

/* Mobile Typography (Default) */
@media (max-width: 767px) {
  :root {
${Object.entries(responsiveTokens.mobile)
    .filter(([key]) => !key.startsWith('old-'))
    .map(([key, val]) => `    --${key}: ${val};`)
    .join('\n')}
  }
}

/* Tablet Typography (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  :root {
${Object.entries(responsiveTokens.tablet)
    .filter(([key]) => !key.startsWith('old-'))
    .map(([key, val]) => `    --${key}: ${val};`)
    .join('\n')}
  }
}

/* Desktop Typography (1024px+) is defined in the main :root block */
`.trim();

fs.writeFileSync('./src/assets/css/tokens.css', cssOutput);
console.log('✅ tokens.css written.');

// ----------------------
// ⚡ Write tokens.utilities.js plugin
// ----------------------
console.log('📝 Writing tokens.utilities.js...');

// Filter out any utility classes that contain "old-"
const filteredTypographyUtilities = Object.fromEntries(
    Object.entries(typographyUtilities).filter(([key]) => !key.includes('old-'))
);

const utilOutput = `
/**
 * Tailwind CSS Utilities Plugin
 * Generated from design tokens - DO NOT EDIT DIRECTLY
 * Last generated: ${new Date().toISOString()}
 */

export default function ({ addUtilities }) {
  addUtilities({
    ...${JSON.stringify(utilityClasses, null, 2)},
    ...${JSON.stringify(spacingUtilities, null, 2)},
    ...${JSON.stringify(filteredTypographyUtilities, null, 2)}
  });
}
`.trim();

fs.writeFileSync('./tokens.utilities.js', utilOutput);
console.log('✅ Tailwind plugin written: tokens.utilities.js');
console.log('🎉 Token processing complete!');
