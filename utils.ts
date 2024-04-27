// utils.ts
// Utility functions for SmartStream Studio

/**
 * Formats a date to a readable string.
 * @param date - The date to format.
 * @returns A formatted date string.
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}

/**
 * Logs messages with a timestamp.
 * @param message - The message to log.
 */
export function logWithTimestamp(message: string): void {
    const timestamp = new Date();
    console.log(`[${formatDate(timestamp)}]: ${message}`);
}

/**
 * Checks if an IP address is allowed based on the provided list.
 * @param ip - The IP address to check.
 * @param allowedIPs - The list of allowed IP addresses.
 * @returns True if the IP is allowed, false otherwise.
 */
export function isIPAllowed(ip: string, allowedIPs: string[]): boolean {
    return allowedIPs.includes(ip);
}

/**
 * Debounces a function to limit the rate at which it can fire.
 * @param func - The function to debounce.
 * @param wait - The number of milliseconds to delay.
 * @returns A debounced version of the function.
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    return function(...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            func(...args);
        };
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttles a function to limit the rate at which it can fire.
 * @param func - The function to throttle.
 * @param limit - The number of milliseconds to limit.
 * @returns A throttled version of the function.
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
    let lastFunc: NodeJS.Timeout;
    let lastRan: number;
    return function(...args: Parameters<T>) {
        if (!lastRan) {
            func(...args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func(...args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}
