export const parsePossiblyTruncatedJson = (value: string): unknown | null => {
    const trimmed = value.trim()

    if (!/^(?:\{|\[)/.test(trimmed)) {
        return null
    }

    try {
        return JSON.parse(trimmed)
    } catch {
        const repaired = `${trimmed}${buildMissingJsonClosers(trimmed)}`

        try {
            return JSON.parse(repaired)
        } catch {
            return null
        }
    }
}

const buildMissingJsonClosers = (value: string): string => {
    const stack: string[] = []
    let inString = false
    let isEscaped = false

    for (const character of value) {
        if (isEscaped) {
            isEscaped = false
            continue
        }

        if (character === '\\') {
            isEscaped = true
            continue
        }

        if (character === '"') {
            inString = !inString
            continue
        }

        if (inString) {
            continue
        }

        if (character === '{') {
            stack.push('}')
            continue
        }

        if (character === '[') {
            stack.push(']')
            continue
        }

        if ((character === '}' || character === ']') && stack[stack.length - 1] === character) {
            stack.pop()
        }
    }

    return stack.reverse().join('')
}