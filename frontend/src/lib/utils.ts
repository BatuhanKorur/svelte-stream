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

export const readableSeconds = (value: number): string => {
  const truncated = Math.floor(value * 100) / 100;
  return `${truncated} seconds`;
}