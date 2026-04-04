import { Logger as SharedLogger } from '@h3ravel/shared'

export class Logger {
    /**
     * Render a log message with colors based on the type of each value
     * 
     * @param message 
     */
    static run (...message: any[]) {
        console.log(message.map(m => typeof m === 'object'
            ? new Logger().build(m, message.length === 1 ? 0 : 2)
            : m
        ).join('\n'))
    }

    /**
     * Recursively build a log string with colors based on the type of each value
     * 
     * @param obj 
     * @param indent 
     * @returns 
     */
    private build = (obj: any, indent = 0) => {
        const indentation = ' '.repeat(indent)
        let str = ''
        for (const key in obj) {
            const value = obj[key]
            if (typeof value === 'object' && value !== null) {
                str += `${indentation}${this.stringFormatter(key)}:`
                str += `\n${this.build(value, indent + 2)}\n`
            } else {
                let coloredValue
                switch (typeof value) {
                    case 'string':
                        coloredValue = SharedLogger.log(value, 'green', false)
                        break
                    case 'number':
                        coloredValue = SharedLogger.log(String(value), 'yellow', false)
                        break
                    case 'boolean':
                        coloredValue = SharedLogger.log(String(value), 'blue', false)
                        break
                    case 'object':
                        if (value === null) {
                            coloredValue = SharedLogger.log('null', 'gray', false)
                        } else {
                            coloredValue = SharedLogger.log(JSON.stringify(value), 'cyan', false)
                        }
                        break
                    default:
                        coloredValue = value
                }

                str += `${indentation}${this.stringFormatter(key)}: ${coloredValue}\n`
            }
        }

        return str
    }

    /**
     * Format a string to be more human-readable.
     * 
     * @param str 
     * @returns 
     */
    stringFormatter = (str: string) => {
        return str
            .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase to spaced words
            .replace(/[_-]+/g, ' ')               // underscores and hyphens to spaces
            .replace(/\s+/g, ' ')                 // multiple spaces to single space
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize first letter
            .join(' ')
            .trim()
            .replace(/^(\w{2})$/, (_, p1) => p1.toUpperCase()) // uppercase if two letters
    }
}