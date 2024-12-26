import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mapValue(
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
): number {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
}
