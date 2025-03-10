import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateYearRange(startYear: number, endYear: number) {
  const years = []
  for (let year = startYear; year >= endYear; year--) {
    years.push(year)
  }
  return years
}

export const YEAR_RANGE = generateYearRange(2025, 1800)
