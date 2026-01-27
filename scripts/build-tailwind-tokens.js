import fs from 'fs';

// ----------------------
// 🔧 Config
// ----------------------
const files = {
    primitives: './tokens/primitives.value.tokens.json',
    semantics: './tokens/semantic-colors.light.tokens.json',
    semanticsDark: './tokens/semantic-colors.dark.tokens.json',
    spacing: './tokens/semantic-layout.mobile.tokens.json',
    effects: './tokens/effect.styles.tokens.json',
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

// Function to map font weight strings to numeric values
function mapFontWeight(value) {
    const fontWeightMap = {
        'Bold': 700,
        'SemiBold': 600,
        'Regular': 400,
        'Light': 300
    };

    return fontWeightMap[value] || value;
}

// Legacy reference mapping to handle old token references
const legacyReferenceMap = {
// Font size mappings
    'font-size.heading.xl': '28px',
    'font-size.heading.l': '25px',
    'font-size.heading.m': '20px',  // Should be 20px for heading.m
    'font-size.heading.s': '18px',  // Should be 18px for heading.s
    'font-size.heading.xs': '14px',  // Should be 14px for heading.xs
    'font-size.body.xxl': '28px',  // Should be 28px
    'font-size.body.xl': '22px',  // Should be 22px for body.xl
    'font-size.body.l': '20px',  // Should be 20px for body.l
    'font-size.body.m': '18px',  // Should be 18px for body.m
    'font-size.body.s': '16px',  // Should be 16px for body.s
    'font-size.body.xs': '12px',
    'font-size.body.drop-cap': '96px',  // Should be 96px based on your tokens
    'font-size.meta': '14px',

    // Font family mappings - CORRECTED!
    'typography.font-family.gulliver semibold': "Gulliver Web, Georgia, serif",  // ✅ Fixed - no quotes wrapping
    'typography.font-family.gulliver_semibold': "Gulliver Web, Georgia, serif",  // ✅ Added alternate key
    'typography.font-family.gulliver': "Gulliver Web, Georgia, serif",  // ✅ FIXED - This was the main issue!
    'typography.font-family.fira-sans': "Fira Sans",  // ✅ Fixed - removed quotes
    'typography.font-family.montserrat': "Montserrat",  // ✅ Fixed - removed quotes
    'typography.font-family.abril-fatface': "Abril Fatface",  // ✅ Fixed - removed quotes

    // Font weight mappings
    'typography.font-weight.light': '300',
    'typography.font-weight.regular': '400',
    'typography.font-weight.semibold': '600',  // Added semibold
    'typography.font-weight.bold': '700',

    // Letter spacing mappings - CORRECTED!
    'typography.letter-spacing.0': '0px',  // Changed from 0% to 0px
    'typography.letter-spacing.s': '1.6px',  // Should be 1.6px based on your primitives
    'typography.letter-spacing.m': '2.4px',  // Should be 2.4px based on your primitives
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

    // Prevent circular references
    if (visited.has(path)) {
        console.warn(`Circular reference detected: ${path}`);
        return undefined;
    }

    visited.add(path);

    // FIRST: Try to find the token in the actual flattened tokens
    let token = flatTokens[path];

    // If not found, try some common variations
    if (!token) {
        // Try with different prefixes/formats
        const variations = [
            path,
            path.replace(/^font-size\./, 'fontSize.'),
            path.replace(/^typography\.font-family\./, 'fontFamily.'),
            path.replace(/\s+/g, '_'),  // Replace spaces with underscores
            path.replace(/\s+/g, '-'),  // Replace spaces with hyphens
            path.replace(/\./g, '-').toLowerCase(),
            // Handle the specific case of gulliver_semibold
            path.replace('gulliver semibold', 'gulliver_semibold'),
            path.replace('gulliver-semibold', 'gulliver_semibold')
        ];

        for (const variant of variations) {
            if (flatTokens[variant]) {
                token = flatTokens[variant];
                console.log(`Found token via variation: ${path} -> ${variant}`);
                break;
            }
        }
    }

    // If we found the token, use its actual value
    if (token && token.$value) {
        const value = token.$value;

        // If the value is another reference, resolve it recursively
        if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
            return resolveReference(value, flatTokens, visited);
        }

        // For font weights, convert string to number if needed
        if (path.includes('font-weight')) {
            return mapFontWeight(value);
        }

        console.log(`✅ Resolved ${ref} -> ${value}`);
        return value;
    }

    // ONLY use legacy map as a last resort fallback
    if (legacyReferenceMap[path]) {
        console.warn(`⚠️  Using legacy fallback for ${path} (token not found in source)`);
        console.warn(`   This should be fixed - token should exist in your JSON files`);
        return legacyReferenceMap[path];
    }

    console.error(`❌ Reference not found and no fallback: ${path}`);
    console.error(`   Available font-family tokens:`,
        Object.keys(flatTokens).filter(k => k.includes('font-family')));

    return undefined;
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
    ...load(files.effects),
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

// Font family fallbacks mapping
const fontFamilyFallbacks = {
    'gulliver': '"Gulliver Web", Georgia, serif',
    'fira-sans': '"Fira Sans", Arial, sans-serif',
    'montserrat': '"Montserrat", "Helvetica Neue", Arial, sans-serif',
    'abril-fatface': '"Abril Fatface", "Playfair Display", Georgia, serif'
};

for (const [tokenPath, token] of Object.entries(flattenedBase)) {
    // Process font families
    if (tokenPath.includes('font-family') || tokenPath.includes('fontFamily')) {
        const fontName = tokenPath.split('.').pop();

        // Skip gulliver-semibold since it should just use gulliver
        if (fontName.toLowerCase().includes('gulliver') && fontName.toLowerCase().includes('semibold')) {
            continue;
        }

        const kebabName = kebab(fontName);
        const fontKey = `font-family-${kebabName}`;

        // Use fallback if available, otherwise use the token value
        const fontValue = fontFamilyFallbacks[kebabName] || token.$value;

        primitiveFontFamilies[kebabName] = toVar(fontKey);
        cssVarMap[fontKey] = fontValue;
    }
    // Process font weights
    else if (tokenPath.includes('font-weight') || tokenPath.includes('fontWeight')) {
        const weightName = tokenPath.split('.').pop();
        const weightKey = `font-weight-${kebab(weightName)}`;
        primitiveFontWeights[kebab(weightName)] = toVar(weightKey);
        cssVarMap[weightKey] = mapFontWeight(token.$value);
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
// 🌑 Process Dark Mode Colors
// ----------------------
console.log('🔄 Processing dark mode colors...');

const darkModeColors = {};

try {
    const darkSemantics = load(files.semanticsDark);
    const flattenedDark = flatten(darkSemantics);

    for (const [tokenPath, token] of Object.entries(flattenedDark)) {
        if (token?.$type === 'color') {
            const raw = token.$value;
            const resolved = raw.startsWith('{')
                ? resolveReference(raw, {...flattenedBase, ...flattenedDark}) ?? raw
                : raw;
            const kebabKey = kebab(tokenPath);

            // Use the same key structure as light mode
            const prefixedKey = tokenPath.startsWith('color.') ? kebabKey : `color-${kebabKey}`;

            darkModeColors[prefixedKey] = resolved;
        }
    }

    console.log(`✅ Processed ${Object.keys(darkModeColors).length} dark mode color tokens`);
} catch (error) {
    console.error(`Error processing dark mode colors: ${error.message}`);
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
                    utilityClasses[`.bg-${tailwindKey}`] = {backgroundColor: `var(--${prefixedVarName})`};
                } else if (path.includes('text')) {
                    utilityClasses[`.text-${tailwindKey}`] = {color: `var(--${prefixedVarName})`};
                } else if (path.includes('border')) {
                    utilityClasses[`.border-${tailwindKey}`] = {borderColor: `var(--${prefixedVarName})`};
                }
            } else if (typeof val === 'object' && val !== null) {
                process(val, path);
            }
        }
    })(component);
}
// -------------------------
// 🌑 Process Shadow Tokens
// -------------------------
console.log('🔄 Processing shadow tokens...');

const primitiveBoxShadows = {};
const shadowUtilities = {};

// Helper function to convert shadow object to CSS string
function shadowObjectToCSS(shadowObj) {
    if (typeof shadowObj === 'string') return shadowObj;

    const x = shadowObj.x || shadowObj.offsetX || '0px';
    const y = shadowObj.y || shadowObj.offsetY || '0px';
    const blur = shadowObj.blur || shadowObj.blurRadius || '0px';
    const spread = shadowObj.spread || shadowObj.spreadRadius || '0px';
    const color = shadowObj.color || 'rgba(0, 0, 0, 0.1)';
    const inset = shadowObj.inset ? 'inset ' : '';

    return `${inset}${x} ${y} ${blur} ${spread} ${color}`.trim();
}

// Process shadow tokens from all files
for (const [tokenPath, token] of Object.entries(flattenedBase)) {
    // Check for shadows at root level (like shadow-s, shadow-m, shadow-l)
    if ((tokenPath.includes('shadow') || tokenPath.includes('Shadow')) && token?.$type === 'shadow' && token?.$value !== undefined) {
        console.log(`  Processing shadow token: ${tokenPath}`);

        let resolved;
        const raw = token.$value;

        // Handle different value formats
        if (Array.isArray(raw)) {
            // Handle array of shadows (multiple shadows)
            resolved = raw.map(shadow => {
                const shadowStr = shadowObjectToCSS(shadow);
                return shadowStr.replace(/\{([^}]+)\}/g, (match, ref) => {
                    const colorValue = resolveReference(match, flattenedBase);
                    return colorValue || match;
                });
            }).join(', ');
        } else if (typeof raw === 'object' && !raw.$value) {
            // Handle single object shadow
            resolved = shadowObjectToCSS(raw);
            resolved = resolved.replace(/\{([^}]+)\}/g, (match, ref) => {
                const colorValue = resolveReference(match, flattenedBase);
                return colorValue || match;
            });
        } else if (typeof raw === 'string') {
            // Handle string format shadow
            resolved = raw;
            if (raw.includes('{')) {
                resolved = raw.replace(/\{([^}]+)\}/g, (match, ref) => {
                    const colorValue = resolveReference(match, flattenedBase);
                    return colorValue || match;
                });
            }
        }

        // Extract shadow name from the path
        let shadowName = tokenPath;

        // Handle different naming patterns
        if (tokenPath.startsWith('shadow.')) {
            shadowName = tokenPath.replace('shadow.', '');
        } else if (tokenPath.startsWith('shadow-')) {
            shadowName = tokenPath.replace('shadow-', '');
        }

        const originalKey = kebab(shadowName);
        const kebabKey = `box-shadow-${originalKey}`;

        // Store as CSS variable reference
        primitiveBoxShadows[originalKey] = `var(--${kebabKey})`;
        // Add to cssVarMap for CSS variable generation
        cssVarMap[kebabKey] = resolved;

        // Generate shadow utility classes
        shadowUtilities[`.shadow-${originalKey}`] = {boxShadow: `var(--${kebabKey})`};

        console.log(`  ✅ Processed shadow: ${originalKey} = ${resolved}`);
    }
}
//console.log(`  Total shadows processed: ${Object.keys(primitiveBoxShadows).length}`);
//console.log(`  Shadows found: ${Object.keys(primitiveBoxShadows).join(', ')}`);

// ----------------------
// 📏 Process Spacing Tokens
// ----------------------
console.log('🔄 Processing spacing tokens...');

const spacing = {};
const spacingUtilities = {};
const primitiveBorderWidths = {};
const primitiveBorderRadius = {};
const borderUtilities = {};

// Process spacing tokens from semantic-spacing file
try {
    const rawSpacing = load(files.spacing);
    const flattenedSpacing = flatten({spacing: rawSpacing}, []);

    for (const [tokenPath, token] of Object.entries(flattenedSpacing)) {
        if (token?.$type === 'dimension') {
            const raw = token.$value;
            const resolved = raw.startsWith('{')
                ? resolveReference(raw, {...flattenedBase, ...flattenedSpacing})
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
            spacingUtilities[`.p-${kebabKey}`] = {padding: `var(${varName})`};
            spacingUtilities[`.px-${kebabKey}`] = {paddingLeft: `var(${varName})`, paddingRight: `var(${varName})`};
            spacingUtilities[`.py-${kebabKey}`] = {paddingTop: `var(${varName})`, paddingBottom: `var(${varName})`};
            spacingUtilities[`.pt-${kebabKey}`] = {paddingTop: `var(${varName})`};
            spacingUtilities[`.pr-${kebabKey}`] = {paddingRight: `var(${varName})`};
            spacingUtilities[`.pb-${kebabKey}`] = {paddingBottom: `var(${varName})`};
            spacingUtilities[`.pl-${kebabKey}`] = {paddingLeft: `var(${varName})`};

            spacingUtilities[`.m-${kebabKey}`] = {margin: `var(${varName})`};
            spacingUtilities[`.mx-${kebabKey}`] = {marginLeft: `var(${varName})`, marginRight: `var(${varName})`};
            spacingUtilities[`.my-${kebabKey}`] = {marginTop: `var(${varName})`, marginBottom: `var(${varName})`};
            spacingUtilities[`.mt-${kebabKey}`] = {marginTop: `var(${varName})`};
            spacingUtilities[`.mr-${kebabKey}`] = {marginRight: `var(${varName})`};
            spacingUtilities[`.mb-${kebabKey}`] = {marginBottom: `var(${varName})`};
            spacingUtilities[`.ml-${kebabKey}`] = {marginLeft: `var(${varName})`};

            spacingUtilities[`.gap-${kebabKey}`] = {gap: `var(${varName})`};
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
        spacingUtilities[`.p-${originalKey}`] = {padding: `var(${varName})`};
        spacingUtilities[`.px-${originalKey}`] = {paddingLeft: `var(${varName})`, paddingRight: `var(${varName})`};
        spacingUtilities[`.py-${originalKey}`] = {paddingTop: `var(${varName})`, paddingBottom: `var(${varName})`};
        spacingUtilities[`.pt-${originalKey}`] = {paddingTop: `var(${varName})`};
        spacingUtilities[`.pr-${originalKey}`] = {paddingRight: `var(${varName})`};
        spacingUtilities[`.pb-${originalKey}`] = {paddingBottom: `var(${varName})`};
        spacingUtilities[`.pl-${originalKey}`] = {paddingLeft: `var(${varName})`};

        spacingUtilities[`.m-${originalKey}`] = {margin: `var(${varName})`};
        spacingUtilities[`.mx-${originalKey}`] = {marginLeft: `var(${varName})`, marginRight: `var(${varName})`};
        spacingUtilities[`.my-${originalKey}`] = {marginTop: `var(${varName})`, marginBottom: `var(${varName})`};
        spacingUtilities[`.mt-${originalKey}`] = {marginTop: `var(${varName})`};
        spacingUtilities[`.mr-${originalKey}`] = {marginRight: `var(${varName})`};
        spacingUtilities[`.mb-${originalKey}`] = {marginBottom: `var(${varName})`};
        spacingUtilities[`.ml-${originalKey}`] = {marginLeft: `var(${varName})`};

        spacingUtilities[`.gap-${originalKey}`] = {gap: `var(${varName})`};
    }
}

// ----------------------
// 🔲 Process Border Tokens
// ----------------------
console.log('🔄 Processing border tokens...');

// Process border tokens from primitives file
for (const [tokenPath, token] of Object.entries(flattenedBase)) {
    // Process border width tokens
    if (tokenPath.startsWith('border.border-width.') && token?.$type === 'dimension') {
        const raw = token.$value;
        const resolved = raw.startsWith('{')
            ? resolveReference(raw, flattenedBase)
            : raw;

        // Skip if reference couldn't be resolved
        if (!resolved) {
            console.warn(`Could not resolve reference: ${raw} for ${tokenPath}`);
            continue;
        }

        const widthName = tokenPath.split('.').pop();
        const originalKey = kebab(widthName);
        const kebabKey = `border-width-${originalKey}`;

        // Store as CSS variable reference instead of raw value
        primitiveBorderWidths[originalKey] = `var(--${kebabKey})`;
        // Make sure to add to cssVarMap for CSS variable generation
        cssVarMap[kebabKey] = resolved;

        // Generate border width utility classes
        borderUtilities[`.border-${originalKey}`] = {borderWidth: `var(--${kebabKey})`};
        borderUtilities[`.border-t-${originalKey}`] = {borderTopWidth: `var(--${kebabKey})`};
        borderUtilities[`.border-r-${originalKey}`] = {borderRightWidth: `var(--${kebabKey})`};
        borderUtilities[`.border-b-${originalKey}`] = {borderBottomWidth: `var(--${kebabKey})`};
        borderUtilities[`.border-l-${originalKey}`] = {borderLeftWidth: `var(--${kebabKey})`};
    }

    // Process border radius tokens
    if (tokenPath.startsWith('border.border-radius.') && token?.$type === 'dimension') {
        const raw = token.$value;
        const resolved = raw.startsWith('{')
            ? resolveReference(raw, flattenedBase)
            : raw;

        // Skip if reference couldn't be resolved
        if (!resolved) {
            console.warn(`Could not resolve reference: ${raw} for ${tokenPath}`);
            continue;
        }

        const radiusName = tokenPath.split('.').pop();
        const originalKey = kebab(radiusName);
        const kebabKey = `border-radius-${originalKey}`;

        // Store as CSS variable reference instead of raw value
        primitiveBorderRadius[originalKey] = `var(--${kebabKey})`;
        // Make sure to add to cssVarMap for CSS variable generation
        cssVarMap[kebabKey] = resolved;

        // Generate border radius utility classes
        borderUtilities[`.rounded-${originalKey}`] = {borderRadius: `var(--${kebabKey})`};
        borderUtilities[`.rounded-t-${originalKey}`] = {
            borderTopLeftRadius: `var(--${kebabKey})`,
            borderTopRightRadius: `var(--${kebabKey})`
        };
        borderUtilities[`.rounded-r-${originalKey}`] = {
            borderTopRightRadius: `var(--${kebabKey})`,
            borderBottomRightRadius: `var(--${kebabKey})`
        };
        borderUtilities[`.rounded-b-${originalKey}`] = {
            borderBottomLeftRadius: `var(--${kebabKey})`,
            borderBottomRightRadius: `var(--${kebabKey})`
        };
        borderUtilities[`.rounded-l-${originalKey}`] = {
            borderTopLeftRadius: `var(--${kebabKey})`,
            borderBottomLeftRadius: `var(--${kebabKey})`
        };
        borderUtilities[`.rounded-tl-${originalKey}`] = {borderTopLeftRadius: `var(--${kebabKey})`};
        borderUtilities[`.rounded-tr-${originalKey}`] = {borderTopRightRadius: `var(--${kebabKey})`};
        borderUtilities[`.rounded-bl-${originalKey}`] = {borderBottomLeftRadius: `var(--${kebabKey})`};
        borderUtilities[`.rounded-br-${originalKey}`] = {borderBottomRightRadius: `var(--${kebabKey})`};
    }
}

// Add semantic border radius if needed
const semanticBorderRadius = {
    "pill": primitiveBorderRadius["xl"] || "80px"
};

// If no border radius tokens were found in the tokens, ensure we have the basic ones
if (Object.keys(primitiveBorderRadius).length === 0) {
    // Only add the known tokens that exist in the design system
    cssVarMap["border-radius-0"] = "0px";
    cssVarMap["border-radius-xl"] = "80px";

    // Store as CSS variable references
    primitiveBorderRadius["0"] = "var(--border-radius-0)";
    primitiveBorderRadius["xl"] = "var(--border-radius-xl)";
}

// Add the pill semantic border radius
cssVarMap["border-radius-pill"] = cssVarMap["border-radius-xl"] || "80px";
semanticBorderRadius["pill"] = "var(--border-radius-pill)";

// If no border width tokens were found in the tokens, ensure we have the basic ones
if (Object.keys(primitiveBorderWidths).length === 0) {
    // Only add the known tokens that exist in the design system
    cssVarMap["border-width-0"] = "0px";
    cssVarMap["border-width-s"] = "1px";

    // Store as CSS variable references
    primitiveBorderWidths["0"] = "var(--border-width-0)";
    primitiveBorderWidths["s"] = "var(--border-width-s)";
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

        if (value?.$type === 'typography' && value?.$value) {
            const typographyValue = value.$value;
            const kebabKey = kebab(path);

            // Create CSS variables for each typography property
            // These are only added to cssVarMap for filtering later
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

                // Apply font weight mapping if this is a font weight property
                if (propKey === 'fontWeight') {
                    resolvedValue = mapFontWeight(resolvedValue);
                }

                cssVarMap[propName] = resolvedValue;

                // NOTE: We do NOT collect these into fontFamilies, fontWeights, etc.
                // since we don't want them exported in tailwind.tokens.js
            }

            // Helper function to convert a value or reference to a CSS variable reference
            function toCssVarReference(propValue, propKey) {
                // If it's a reference like {typography.font-family.gulliver}
                if (typeof propValue === 'string' && propValue.startsWith('{') && propValue.endsWith('}')) {
                    const refPath = propValue.replace(/[{}]/g, '');

                    // Find the corresponding primitive variable
                    // For font-family references
                    if (refPath.includes('font-family')) {
                        let fontName = refPath.split('.').pop();

                        // Special handling: "gulliver semibold" should map to "gulliver"
                        // since "Gulliver Semibold" is just the Gulliver font family
                        if (fontName.includes('gulliver') && fontName.includes('semibold')) {
                            fontName = 'gulliver';
                        }

                        const kebabName = kebab(fontName);
                        return `var(--font-family-${kebabName})`;
                    }
                    // For font-weight references
                    else if (refPath.includes('font-weight')) {
                        const weightName = refPath.split('.').pop();
                        const kebabName = kebab(weightName);
                        return `var(--font-weight-${kebabName})`;
                    }
                    // For letter-spacing references
                    else if (refPath.includes('letter-spacing')) {
                        const spacingName = refPath.split('.').pop();
                        const kebabName = kebab(spacingName);
                        return `var(--letter-spacing-${kebabName})`;
                    }
                    // For font-size references
                    else if (refPath.includes('font-size')) {
                        // Handle different font-size reference patterns
                        if (refPath.includes('font-size.heading.') || refPath.includes('font-size.body.') || refPath.includes('font-size.meta')) {
                            return `var(--${kebab(refPath)})`;
                        }
                        // Handle numeric font sizes like {typography.font-size.22}
                        const sizeName = refPath.split('.').pop();
                        return `var(--font-size-${sizeName})`;
                    }
                }

                // If it's not a reference, return the value as-is
                return propValue;
            }

            // Create a utility class with CSS variable references to primitives
            const utilityStyle = {
                fontFamily: toCssVarReference(typographyValue.fontFamily, 'fontFamily'),
                fontSize: toCssVarReference(typographyValue.fontSize, 'fontSize'),
                fontWeight: toCssVarReference(typographyValue.fontWeight, 'fontWeight'),
                lineHeight: typographyValue.lineHeight,
                letterSpacing: toCssVarReference(typographyValue.letterSpacing, 'letterSpacing'),
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
        responsiveTokens[breakpoint][varName] = resolveReference(fontSizes.meta.$value, flattenedBase) || fontSizes.meta.$value;

        // For desktop, also add to the main CSS var map (without breakpoint suffix)
        if (breakpoint === 'desktop') {
            cssVarMap[varName] = responsiveTokens[breakpoint][varName];
        }
    }
}

function processResponsiveTypographySection(obj, prefix, breakpoint, combinedTokens) {
    for (const [key, value] of Object.entries(obj)) {
        const path = prefix ? `${prefix}.${key}` : key;

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

                // Apply font weight mapping if this is a font weight property
                if (propKey === 'fontWeight') {
                    resolvedValue = mapFontWeight(resolvedValue);
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
// 📐 Text Alignment Utilities
// ----------------------
console.log('🔄 Adding text alignment utilities...');

const textAlignmentUtilities = {
    '.text-left': {textAlign: 'left'},
    '.text-center': {textAlign: 'center'},
    '.text-right': {textAlign: 'right'},
    '.text-justify': {textAlign: 'justify'}
};

// ----------------------
// ✏️ Write tailwind.tokens.js
// ----------------------
console.log('📝 Writing tailwind.tokens.js...');

const jsOutput = `
// Generated from design tokens - DO NOT EDIT DIRECTLY
// Last generated: ${new Date().toISOString()}

export const primitiveColors = ${JSON.stringify(primitiveColors, null, 2)};
export const semanticColors = ${JSON.stringify(semanticColors, null, 2)};
export const componentColors = ${JSON.stringify(componentColors, null, 2)};
export const spacing = ${JSON.stringify(spacing, null, 2)};
export const typographyStyles = ${JSON.stringify(typographyStyles, null, 2)};
export const primitiveFontFamilies = ${JSON.stringify(primitiveFontFamilies, null, 2)};
export const primitiveFontSizes = ${JSON.stringify(primitiveFontSizes, null, 2)};
export const primitiveFontWeights = ${JSON.stringify(primitiveFontWeights, null, 2)};
export const primitiveLetterSpacings = ${JSON.stringify(primitiveLetterSpacings, null, 2)};
export const primitiveBorderWidths = ${JSON.stringify(primitiveBorderWidths, null, 2)};
export const primitiveBorderRadius = ${JSON.stringify(primitiveBorderRadius, null, 2)};
export const semanticBorderRadius = ${JSON.stringify(semanticBorderRadius, null, 2)};
export const primitiveBoxShadows = ${JSON.stringify(primitiveBoxShadows, null, 2)};

`.trim();

fs.writeFileSync('./tailwind.tokens.js', jsOutput);
console.log('✅ tailwind.tokens.js written.');

// ----------------------
// 🎨 Write tokens.css
// ----------------------
console.log('📝 Writing tokens.css...');

// Filter out individual typography tokens (we only want font-size-* tokens in the CSS)
const filteredCssVarMap = Object.fromEntries(
    Object.entries(cssVarMap).filter(([key]) => {
        // Exclude individual typography property tokens (article-*, body-*, heading-*, meta-*, menu-*)
        // but keep font-size-* tokens
        if (key.startsWith('font-size-')) return true;

        const isTypographyToken = key.match(/^(article|body|heading|meta|menu)-.*-(fontFamily|fontSize|fontWeight|letterSpacing|lineHeight|textTransform|textDecoration)$/);
        if (isTypographyToken) return false;

        return true;
    })
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

/* Dark Mode Colors */
@media (prefers-color-scheme: dark) {
  :root {
${Object.entries(darkModeColors)
    .map(([key, val]) => `    --${key}: ${val};`)
    .join('\n')}
  }
}

/* Mobile Typography (Default) */
@media (max-width: 767px) {
  :root {
${Object.entries(responsiveTokens.mobile)
    .map(([key, val]) => `    --${key}: ${val};`)
    .join('\n')}
  }
}

/* Tablet Typography (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  :root {
${Object.entries(responsiveTokens.tablet)
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
    ...${JSON.stringify(borderUtilities, null, 2)},
    ...${JSON.stringify(typographyUtilities, null, 2)},
    ...${JSON.stringify(shadowUtilities, null, 2)},
    ...${JSON.stringify(textAlignmentUtilities, null, 2)}
  });
}
`.trim();

fs.writeFileSync('./tokens.utilities.js', utilOutput);
console.log('✅ Tailwind plugin written: tokens.utilities.js');
console.log('🎉 Token processing complete!');