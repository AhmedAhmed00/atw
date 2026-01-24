/**
 * Color scheme configuration for day schedule cards
 * Each day gets a specific color theme for visual distinction
 */

export interface DayColorScheme {
  from: string
  to: string
  bg: string
  border: string
  gradient: string
}

/**
 * Color schemes for each day of the week
 * Uses the healthcare blue/cyan palette with variations
 */
export const DAY_COLOR_SCHEMES: DayColorScheme[] = [
  {
    from: 'from-(--brand-gradient-from)',
    to: 'to-(--brand-gradient-to)',
    bg: 'bg-[#09B0B6]/5 dark:bg-[#09B0B6]/10',
    border: 'border-[#09B0B6]/20 dark:border-[#09B0B6]/30',
    gradient: 'from-[#09B0B6] to-[#05647A]',
  },
  {
    from: 'from-(--brand-gradient-from)',
    to: 'to-(--brand-gradient-to)',
    bg: 'bg-[#3DCCD0]/5 dark:bg-[#3DCCD0]/10',
    border: 'border-[#3DCCD0]/20 dark:border-[#3DCCD0]/30',
    gradient: 'from-[#3DCCD0] to-[#09B0B6]',
  },
  {
    from: 'from-(--brand-gradient-from)',
    to: 'to-(--brand-gradient-to)',
    bg: 'bg-[#63A7D8]/5 dark:bg-[#63A7D8]/10',
    border: 'border-[#63A7D8]/20 dark:border-[#63A7D8]/30',
    gradient: 'from-[#63A7D8] to-[#266BAC]',
  },
  {
    from: 'from-(--brand-gradient-from)',
    to: 'to-(--brand-gradient-to)',
    bg: 'bg-[#86E2DD]/5 dark:bg-[#86E2DD]/10',
    border: 'border-[#86E2DD]/20 dark:border-[#86E2DD]/30',
    gradient: 'from-[#86E2DD] to-[#3DCCD0]',
  },
  {
    from: 'from-(--brand-gradient-from)',
    to: 'to-(--brand-gradient-to)',
    bg: 'bg-[#AADCF7]/5 dark:bg-[#AADCF7]/10',
    border: 'border-[#AADCF7]/20 dark:border-[#AADCF7]/30',
    gradient: 'from-[#AADCF7] to-[#63A7D8]',
  },
  {
    from: 'from-(--brand-gradient-from)',
    to: 'to-(--brand-gradient-to)',
    bg: 'bg-[#266BAC]/5 dark:bg-[#266BAC]/10',
    border: 'border-[#266BAC]/20 dark:border-[#266BAC]/30',
    gradient: 'from-[#266BAC] to-[#103454]',
  },
  {
    from: 'from-(--brand-gradient-from)',
    to: 'to-(--brand-gradient-to)',
    bg: 'bg-[#05647A]/5 dark:bg-[#05647A]/10',
    border: 'border-[#05647A]/20 dark:border-[#05647A]/30',
    gradient: 'from-[#05647A] to-[#103454]',
  },
]

/**
 * Gets the color scheme for a specific day index
 * @param index - Day index (0-6, wraps around for values > 6)
 * @returns Color scheme object
 */
export function getDayColorScheme(index: number): DayColorScheme {
  return DAY_COLOR_SCHEMES[index % DAY_COLOR_SCHEMES.length]
}

