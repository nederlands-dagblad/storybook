import fs from 'fs';

// ----------------------
// 🔧 Config
// ----------------------
const files = {
    primitives: './tokens/primitives.mode-1.tokens.json',
    semantics: './tokens/semantic-colors.light.tokens.json',
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

function resolveReference(ref, flatTokens, visited = new Set()) {
    const path = ref.replace(/[{}]/g, '');
    if (visited.has(path)) return undefined;
    visited.add(path);

    const token = flatTokens[path];
    if (!token) return undefined;

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
    return str.replace(/\./g, '-');
}

// ----------------------
// 🚀 Build All Token Sets
// ----------------------
const baseTokens = {
    ...load(files.primitives),
    ...load(files.semantics)
};

const flattenedBase = flatten(baseTokens);

const primitiveColors = {};
const semanticColors = {};
const cssVarMap = {};

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

                // Add to component color map
                componentColors[tailwindKey] = toVar(fullVarName);

                // Add to CSS variable map
                cssVarMap[fullVarName] = resolved;

                // Define background & text utilities
                if (path.includes('bg')) {
                    utilityClasses[`.bg-${tailwindKey}`] = {
                        backgroundColor: `var(--${fullVarName})`
                    };
                } else if (path.includes('text')) {
                    utilityClasses[`.text-${tailwindKey}`] = {
                        color: `var(--${fullVarName})`
                    };
                } else if (path.includes('border')) {
                    utilityClasses[`.border-${tailwindKey}`] = {
                        borderColor: `var(--${fullVarName})`
                    };
                }
            } else if (typeof val === 'object') {
                process(val, path);
            }
        }
    })(component);
}

// ----------------------
// ✏️ Write tailwind.tokens.js
// ----------------------
const jsOutput = `
export const primitiveColors = ${JSON.stringify(primitiveColors, null, 2)};
export const semanticColors = ${JSON.stringify(semanticColors, null, 2)};
export const componentColors = ${JSON.stringify(componentColors, null, 2)};
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
}
`.trim();

fs.writeFileSync('./src/assets/css/tokens.css', cssOutput);
console.log('✅ tokens.css written.');

// ----------------------
// ⚡ Write tokens.utilities.js plugin
// ----------------------
const utilOutput = `
export default function ({ addUtilities }) {
  addUtilities(${JSON.stringify(utilityClasses, null, 2)});
}
`.trim();

fs.writeFileSync('./tokens.utilities.js', utilOutput);
console.log('✅ Tailwind plugin written: tokens.utilities.js');
