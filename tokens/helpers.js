
export function mapColors(colors) {
    return Object
        .entries(colors)
        .reduce((acc, [key, value]) => {
            acc[key] = value.$value;
            return acc;
        }, {});
}

export function flattenTokens(tokens, prefix = '') {
    return Object.entries(tokens).reduce((acc, [key, value]) => {
        const newKey = prefix ? `${prefix}-${key}` : key;
        if (typeof value === 'object') {
            Object.assign(acc, flattenTokens(value, newKey));
        } else {
            acc[newKey] = value;
        }
        return acc;
    }, {});
}

export function resolveReferences(tokens, allTokens) {
    const result = {};

    for (const [key, value] of Object.entries(tokens)) {
        if (value.$value) {
            const refMatch = value.$value.match(/{(.+)}/);
            if (refMatch) {
                const refPath = refMatch[1].split('.');
                let resolved = allTokens;
                for (const part of refPath) {
                    resolved = resolved?.[part];
                }
                result[key] = resolved?.$value ?? value.$value;
            } else {
                result[key] = value.$value;
            }
        } else if (typeof value === 'object') {
            result[key] = resolveReferences(value, allTokens);
        }
    }

    return result;
}
