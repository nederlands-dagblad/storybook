import fs from 'fs';

// ----------------------
// 🔧 Config
// ----------------------
const files = {
    primitives: './tokens/primitives.mode-1.tokens.json',
    semantics: './tokens/semantic-colors.light.tokens.json',
    spacing: './tokens/semantic-spacing.mode-1.tokens.json',
    typography: './tokens/text.styles.tokens.json',
    responsiveTypography: {
        mobile: './tokens/layout-and-typography.mobile.tokens.json',
        tablet: './tokens/layout-and-typography.tablet-md-768px.tokens.json',
        desktop: './tokens/layout-and-typography.desktop-lg-1024px.tokens.json'
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
    
    // Prevent circular references
    if (visited.has(path)) {
        console.warn(`Circular reference detected: ${path}`);
        return undefined;
    }
    
    visited.add(path);
    const token = flatTokens[path];
    
    if (!token) {
        console.warn(`Reference not found: ${path}`);
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
    ...load(files.semantics)
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
    if (tokenPath.startsWith('typography.font-family.')) {
        const fontName = tokenPath.split('.').pop();
        const fontKey = `font-family-${kebab(fontName)}`;
        primitiveFontFamilies[kebab(fontName)] = toVar(fontKey);
        cssVarMap[fontKey] = token.$value;
    }
    // Process font weights
    else if (tokenPath.startsWith('typography.font-weight.')) {
        const weightName = tokenPath.split('.').pop();
        const weightKey = `font-weight-${kebab(weightName)}`;
        primitiveFontWeights[kebab(weightName)] = toVar(weightKey);
        cssVarMap[weightKey] = token.$value;
    }
    // Process letter spacings
    else if (tokenPath.startsWith('typography.letter-spacing.')) {
        const spacingName = tokenPath.split('.').pop();
        const spacingKey = `letter-spacing-${kebab(spacingName)}`;
        primitiveLetterSpacings[kebab(spacingName)] = toVar(spacingKey);
        cssVarMap[spacingKey] = token.$value;
    }
    // Process font sizes
    else if (tokenPath.startsWith('typography.font-size.')) {
        const sizeName = tokenPath.split('.').pop();
        const sizeKey = `font-size-${kebab(sizeName)}`;
        primitiveFontSizes[kebab(sizeName)] = toVar(sizeKey);
        cssVarMap[sizeKey] = token.$value;
    }

    // Also create meta font size tokens for backward compatibility
    if (tokenPath.startsWith('typography.font-size.font-size-14')) {
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
        } catch (error) {
            console.error(`Error processing ${breakpoint} typography: ${error.message}`);
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
:root {
${Object.entries(responsiveTokens.mobile)
    .filter(([key]) => !key.startsWith('old-'))
    .map(([key, val]) => `  --${key}-mobile: ${val};`)
    .join('\n')}
}

/* Tablet Typography (768px+) */
@media (min-width: 768px) {
  :root {
${Object.entries(responsiveTokens.tablet)
    .filter(([key]) => !key.startsWith('old-'))
    .map(([key, val]) => `    --${key}-tablet: ${val};`)
    .join('\n')}
  }
}

/* Desktop Typography (1024px+) */
@media (min-width: 1024px) {
  :root {
${Object.entries(responsiveTokens.desktop)
    .filter(([key]) => !key.startsWith('old-'))
    .map(([key, val]) => `    --${key}-desktop: ${val};`)
    .join('\n')}
  }
}`.trim();

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
