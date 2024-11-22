import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// SVG id attributes must conform to valid XML name rules (no spaces or special characters).
export const sanitizeKey = (key: string) => key.replace(/\s+/g, '_');

export function formatLargeNumber(value: number): string {
    if (value >= 1_000_000_000) {
        return (value / 1_000_000_000).toFixed(1) + 'B';
    }
    if (value >= 1_000_000) {
        return (value / 1_000_000).toFixed(1) + 'M';
    }
    if (value >= 1_000) {
        return (value / 1_000).toFixed(1) + 'K';
    }
    return value.toString();
}
