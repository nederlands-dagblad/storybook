import fs from 'fs';

// ----------------------
// 🔧 Config
// ----------------------
const files = {
    primitives: './tokens/primitives.mode-1.tokens.json',
    semantics: './tokens/semantic-colors.light.tokens.json',
    spacing: './tokens/semantic-spacing.mode-1.tokens.json',
    typography: './tokens/text.styles.tokens.json',
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
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function flatten(obj, path = [], result = {}) {
    for (const [key, val] of Object.entries(obj)) {
        const current = [...path, key];
        if (val && typeof val === 'object' && '$value' in val) {
            result[current.join('.')] = val;
        } else if (typeof val === 'object') {
            flatten(val, current, result);
        }
    }
    return result;
}

// Define primitive typography tokens that are referenced in text.styles.tokens.json
const primitiveTypography = {
    "typography": {
        "font family": {
            "fira-sans": { "$value": "Fira Sans, sans-serif", "$type": "fontFamily" },
            "gulliver": { "$value": "Gulliver, serif", "$type": "fontFamily" },
            "gulliver semibold": { "$value": "Gulliver Semibold, serif", "$type": "fontFamily" },
            "abril-fatface": { "$value": "Abril Fatface, cursive", "$type": "fontFamily" },
            "montserrat": { "$value": "Montserrat, sans-serif", "$type": "fontFamily" }
        },
        "font weight": {
            "light": { "$value": 300, "$type": "fontWeight" },
            "regular": { "$value": 400, "$type": "fontWeight" },
            "bold": { "$value": 700, "$type": "fontWeight" }
        },
        "letter spacing": {
            "letter-spacing-0": { "$value": "0px", "$type": "letterSpacing" },
            "letter-spacing-1": { "$value": "1px", "$type": "letterSpacing" },
            "letter-spacing-2": { "$value": "2px", "$type": "letterSpacing" },
            "letter-spacing-4": { "$value": "4px", "$type": "letterSpacing" }
        }
    },
    "font size": {
        "body": {
            "font-size-body-m": { "$value": "16px", "$type": "dimension" },
            "font-size-body-l": { "$value": "18px", "$type": "dimension" },
            "font-size-body-xl": { "$value": "20px", "$type": "dimension" },
            "font-size-body-xxl": { "$value": "24px", "$type": "dimension" },
            "font-size-drop-cap": { "$value": "90px", "$type": "dimension" }
        },
        "heading": {
            "font-size-heading-xs": { "$value": "14px", "$type": "dimension" },
            "font-size-heading-s": { "$value": "16px", "$type": "dimension" },
            "font-size-heading-m": { "$value": "18px", "$type": "dimension" },
            "font-size-heading-l": { "$value": "26px", "$type": "dimension" },
            "font-size-heading-xl": { "$value": "28px", "$type": "dimension" }
        },
        "meta": {
            "font-size-meta": { "$value": "14px", "$type": "dimension" }
        }
    }
};

function resolveReference(ref, flatTokens, visited = new Set()) {
    const path = ref.replace(/[{}]/g, '');
    if (visited.has(path)) return undefined;
    visited.add(path);
    const token = flatTokens[path];
    if (!token) {
        console.warn(`Reference not found: ${path}`);
        return undefined;
    }
    const value = token.$value;
    if (typeof value === 'string' && value.startsWith('{')) {
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
const baseTokens = {
    ...load(files.primitives),
    ...load(files.semantics),
    ...primitiveTypography
};

const flattenedBase = flatten(baseTokens);

const primitiveColors = {};
const semanticColors = {};
const cssVarMap = {};
const primitiveFontFamilies = {};

// Extract primitive font families
for (const [fontName, fontValue] of Object.entries(primitiveTypography.typography["font family"])) {
    const fontKey = `font-family-${kebab(fontName)}`;
    primitiveFontFamilies[kebab(fontName)] = toVar(fontKey);
    cssVarMap[fontKey] = fontValue.$value;
}

// Extract primitive font weights
for (const [weightName, weightValue] of Object.entries(primitiveTypography.typography["font weight"])) {
    const weightKey = `font-weight-${kebab(weightName)}`;
    cssVarMap[weightKey] = weightValue.$value;
}

// Extract primitive letter spacings
for (const [spacingName, spacingValue] of Object.entries(primitiveTypography.typography["letter spacing"])) {
    const spacingKey = `letter-spacing-${kebab(spacingName)}`;
    cssVarMap[spacingKey] = spacingValue.$value;
}

// Extract primitive font sizes
for (const category in primitiveTypography["font size"]) {
    for (const [sizeName, sizeValue] of Object.entries(primitiveTypography["font size"][category])) {
        const sizeKey = kebab(sizeName);
        cssVarMap[sizeKey] = sizeValue.$value;
    }
}

for (const [tokenPath, token] of Object.entries(flattenedBase)) {
    if (token?.$type === 'color') {
        const raw = token.$value;
        const resolved = raw.startsWith('{')
            ? resolveReference(raw, flattenedBase) ?? raw
            : raw;
        const kebabKey = kebab(tokenPath);
        if (tokenPath.startsWith('color.')) {
            const tailwindKey = kebabKey.replace(/^color-/, '');
            primitiveColors[tailwindKey] = toVar(kebabKey);
        } else {
            semanticColors[kebabKey] = toVar(kebabKey);
        }
        cssVarMap[kebabKey] = resolved;
    }
}

// ----------------------
// 🎯 Process Component Tokens
// ----------------------
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
                componentColors[tailwindKey] = toVar(fullVarName);
                cssVarMap[fullVarName] = resolved;
                if (path.includes('bg')) {
                    utilityClasses[`.bg-${tailwindKey}`] = { backgroundColor: `var(--${fullVarName})` };
                } else if (path.includes('text')) {
                    utilityClasses[`.text-${tailwindKey}`] = { color: `var(--${fullVarName})` };
                } else if (path.includes('border')) {
                    utilityClasses[`.border-${tailwindKey}`] = { borderColor: `var(--${fullVarName})` };
                }
            } else if (typeof val === 'object') {
                process(val, path);
            }
        }
    })(component);
}

// ----------------------
// 📏 Process Spacing Tokens
// ----------------------
const rawSpacing = load(files.spacing);
const flattenedSpacing = flatten({ spacing: rawSpacing }, []);
const spacing = {};
const spacingUtilities = {};

for (const [tokenPath, token] of Object.entries(flattenedSpacing)) {
    if (token?.$type === 'dimension') {
        const resolved = token.$value.startsWith('{')
            ? resolveReference(token.$value, { ...flattenedBase, ...flattenedSpacing })
            : token.$value;
        
        // Skip if reference couldn't be resolved
        if (!resolved) {
            console.warn(`Could not resolve reference: ${token.$value} for ${tokenPath}`);
            continue;
        }
        
        const kebabKey = kebab(tokenPath);
        const varName = `--${kebabKey}`;
        spacing[kebabKey] = `var(${varName})`;
        cssVarMap[kebabKey] = resolved;
        spacingUtilities[`.p-${kebabKey}`] = { padding: `var(${varName})` };
        spacingUtilities[`.px-${kebabKey}`] = { paddingLeft: `var(${varName})`, paddingRight: `var(${varName})` };
        spacingUtilities[`.py-${kebabKey}`] = { paddingTop: `var(${varName})`, paddingBottom: `var(${varName})` };
        spacingUtilities[`.m-${kebabKey}`] = { margin: `var(${varName})` };
        spacingUtilities[`.mx-${kebabKey}`] = { marginLeft: `var(${varName})`, marginRight: `var(${varName})` };
        spacingUtilities[`.my-${kebabKey}`] = { marginTop: `var(${varName})`, marginBottom: `var(${varName})` };
        spacingUtilities[`.gap-${kebabKey}`] = { gap: `var(${varName})` };
    }
}

// ----------------------
// 📝 Process Typography Tokens
// ----------------------
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
            for (const [propKey, propValue] of Object.entries(typographyValue)) {
                const propName = `${kebabKey}-${propKey}`;
                let resolvedValue = propValue;
                
                // Resolve references if needed
                if (typeof propValue === 'string' && propValue.startsWith('{')) {
                    resolvedValue = resolveReference(propValue, flattenedBase);
                    if (!resolvedValue) {
                        console.warn(`Could not resolve reference: ${propValue} for ${propName}`);
                        // Skip creating this variable since reference couldn't be resolved
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
            typographyUtilities[`.text-${kebabKey}`] = {
                fontFamily: `var(--${kebabKey}-fontFamily)`,
                fontSize: `var(--${kebabKey}-fontSize)`,
                fontWeight: `var(--${kebabKey}-fontWeight)`,
                lineHeight: `var(--${kebabKey}-lineHeight)`,
                letterSpacing: `var(--${kebabKey}-letterSpacing)`,
                textTransform: typographyValue.textTransform || 'none',
                textDecoration: typographyValue.textDecoration || 'none'
            };
            
            typographyStyles[kebabKey] = `var(--${kebabKey})`;
        } else if (typeof value === 'object' && !value.$type) {
            processTypographyTokens(value, path);
        }
    }
}

processTypographyTokens(rawTypography);

// ----------------------
// ✏️ Write tailwind.tokens.js
// ----------------------
const jsOutput = `
export const primitiveColors = ${JSON.stringify(primitiveColors, null, 2)};
export const semanticColors = ${JSON.stringify(semanticColors, null, 2)};
export const componentColors = ${JSON.stringify(componentColors, null, 2)};
export const spacing = ${JSON.stringify(spacing, null, 2)};
export const typographyStyles = ${JSON.stringify(typographyStyles, null, 2)};
export const fontFamilies = ${JSON.stringify(fontFamilies, null, 2)};
export const fontWeights = ${JSON.stringify(fontWeights, null, 2)};
export const fontSizes = ${JSON.stringify(fontSizes, null, 2)};
export const lineHeights = ${JSON.stringify(lineHeights, null, 2)};
export const letterSpacings = ${JSON.stringify(letterSpacings, null, 2)};
export const primitiveFontFamilies = ${JSON.stringify(primitiveFontFamilies, null, 2)};
`.trim();

fs.writeFileSync('./tailwind.tokens.js', jsOutput);
console.log('✅ tailwind.tokens.js written.');

// ----------------------
// 🎨 Write tokens.css
// ----------------------
const cssOutput = `
:root {
${Object.entries(cssVarMap)
    .map(([key, val]) => `  --${key}: ${val};`)
    .join('\n')}
}`.trim();

fs.writeFileSync('./src/assets/css/tokens.css', cssOutput);
console.log('✅ tokens.css written.');

// ----------------------
// ⚡ Write tokens.utilities.js plugin
// ----------------------
const utilOutput = `
export default function ({ addUtilities }) {
  addUtilities({
    ...${JSON.stringify(utilityClasses, null, 2)},
    ...${JSON.stringify(spacingUtilities, null, 2)},
    ...${JSON.stringify(typographyUtilities, null, 2)}
  });
}
`.trim();

fs.writeFileSync('./tokens.utilities.js', utilOutput);
console.log('✅ Tailwind plugin written: tokens.utilities.js');
