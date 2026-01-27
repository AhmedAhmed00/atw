/**
 * Reusable gradient utilities for consistent styling across the app
 * Uses CSS variables for theming
 */

export interface GradientConfig {
  gradient: string
  bgGradient: string
}

/**
 * Primary brand gradient (Cyan/Teal)
 */
export const PRIMARY_GRADIENT: GradientConfig = {
  gradient: 'from-(--brand-gradient-from) to-(--brand-gradient-to)',
  bgGradient: '',
}

/**
 * Secondary brand gradient (Blue/Teal - reversed)
 */
export const SECONDARY_GRADIENT: GradientConfig = {
  gradient: 'from-(--brand-gradient-to) to-(--brand-gradient-from)',
  bgGradient: 'from-[#86E2DD] to-[#AADCF7] dark:from-[#05647A]/30 dark:to-[#103454]/30',
}

/**
 * Success gradient (Green tones)
 */
export const SUCCESS_GRADIENT: GradientConfig = {
  gradient: 'from-green-400 to-emerald-500',
  bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30',
}

/**
 * Warning gradient (Yellow tones - using brand colors)
 */
export const WARNING_GRADIENT: GradientConfig = {
  gradient: 'from-[#63A7D8] to-[#266BAC]',
  bgGradient: 'from-[#AADCF7]/50 to-[#63A7D8]/50 dark:from-[#266BAC]/30 dark:to-[#103454]/30',
}

/**
 * Danger gradient (Red tones)
 */
export const DANGER_GRADIENT: GradientConfig = {
  gradient: 'from-red-400 to-rose-500',
  bgGradient: 'from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30',
}

/**
 * Info gradient (Blue tones)
 */
export const INFO_GRADIENT: GradientConfig = {
  gradient: 'from-blue-400 to-indigo-500',
  bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
}


/**
 * All available gradients mapped by name
 */
export const GRADIENTS = {
  primary: PRIMARY_GRADIENT,
  secondary: SECONDARY_GRADIENT,
  success: SUCCESS_GRADIENT,
  warning: WARNING_GRADIENT,
  danger: DANGER_GRADIENT,
  info: INFO_GRADIENT,
} as const

export type GradientName = keyof typeof GRADIENTS

/**
 * Get a gradient configuration by name
 */
export function getGradient(name: GradientName): GradientConfig {
  return GRADIENTS[name]
}

/**
 * Alternating gradient pattern for cards
 * Useful for stats grids where you want variation
 */
export function getAlternatingGradient(index: number): GradientConfig {
  const pattern = [PRIMARY_GRADIENT, SECONDARY_GRADIENT]
  return pattern[index % pattern.length]
}

