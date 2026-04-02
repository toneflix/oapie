export const parsePossiblyTruncatedJson = (value: string): unknown | null => {
    const trimmed = value.trim()

    if (!/^(?:\{|\[)/.test(trimmed)) {
        return null
    }

    try {
        return JSON.parse(trimmed)
    } catch {
        const repaired = repairCommonJsonIssues(trimmed)

        try {
            return JSON.parse(repaired)
        } catch {
            return null
        }
    }
}

const repairCommonJsonIssues = (value: string): string => {
    const withUnexpectedTokensRemoved = removeUnexpectedObjectTokens(value)
    const withMissingCommasInserted = insertMissingCommas(withUnexpectedTokensRemoved)

    return `${withMissingCommasInserted}${buildMissingJsonClosers(withMissingCommasInserted)}`
}

const removeUnexpectedObjectTokens = (value: string): string => {
    return value.replace(/([\[{,]\s*)([A-Za-z_$][\w$-]*)(?=\s*"(?:\\.|[^"\\])*"\s*:)/g, '$1')
}

const insertMissingCommas = (value: string): string => {
    let result = ''
    let inString = false
    let isEscaped = false
    let previousSignificantCharacter = ''

    for (let index = 0; index < value.length; index += 1) {
        const character = value[index]

        if (inString) {
            result += character

            if (isEscaped) {
                isEscaped = false
                continue
            }

            if (character === '\\') {
                isEscaped = true
                continue
            }

            if (character === '"') {
                inString = false
                previousSignificantCharacter = '"'
            }

            continue
        }

        if (character === '"') {
            const remainder = value.slice(index)
            const startsObjectKey = /^"(?:\\.|[^"\\])*"\s*:/.test(remainder)

            if (startsObjectKey && shouldInsertCommaBeforeKey(previousSignificantCharacter, result)) {
                result += ','
            }

            result += character
            inString = true
            continue
        }

        result += character

        if (!/\s/.test(character)) {
            previousSignificantCharacter = character
        }
    }

    return result
}

const shouldInsertCommaBeforeKey = (
    previousSignificantCharacter: string,
    currentOutput: string
): boolean => {
    if (!previousSignificantCharacter) {
        return false
    }

    if (!['"', '}', ']', 'e', 'l', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(previousSignificantCharacter)) {
        return false
    }

    const trimmedOutput = currentOutput.trimEnd()

    return !trimmedOutput.endsWith(',') && !trimmedOutput.endsWith('{')
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