import { defineConfig } from 'cva'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const { cva, cx, compose } = defineConfig({
    hooks: {
        onComplete: className => twMerge(className),
    },
})