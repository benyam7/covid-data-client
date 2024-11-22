import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// SVG id attributes must conform to valid XML name rules (no spaces or special characters).
export const sanitizeKey = (key: string) => key.replace(/\s+/g, '_');
