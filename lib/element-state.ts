// Room-temperature state of matter for each element
// Single source of truth used by element-card.tsx and element-details.tsx

// Elements that are gas at room temperature (~25 C)
export const GAS_ELEMENTS = new Set([1, 2, 7, 8, 9, 10, 17, 18, 36, 54, 86])

// Elements that are liquid at room temperature (~25 C)
export const LIQUID_ELEMENTS = new Set([35, 80]) // Bromine, Mercury

// Heavy synthetic elements with unknown/uncharacterized state
export const SYNTHETIC_ELEMENTS = new Set([113, 114, 115, 116, 117, 118])

export function getStateLabel(atomicNumber: number): { label: string; color: string } | null {
  if (GAS_ELEMENTS.has(atomicNumber)) return { label: "gas", color: "text-sky-500 dark:text-sky-400" }
  if (LIQUID_ELEMENTS.has(atomicNumber)) return { label: "liq", color: "text-blue-500 dark:text-blue-400" }
  if (SYNTHETIC_ELEMENTS.has(atomicNumber)) return { label: "syn", color: "text-purple-400 dark:text-purple-400" }
  return null
}

export function getStateOfMatter(atomicNumber: number): {
  label: string
  description: string
  bgClass: string
  textClass: string
} {
  if (GAS_ELEMENTS.has(atomicNumber))
    return {
      label: "Gas",
      description: "Gas at room temperature (25\u00B0C)",
      bgClass: "bg-sky-100 dark:bg-sky-900/40",
      textClass: "text-sky-700 dark:text-sky-300",
    }
  if (LIQUID_ELEMENTS.has(atomicNumber))
    return {
      label: "Liquid",
      description: "Liquid at room temperature (25\u00B0C)",
      bgClass: "bg-blue-100 dark:bg-blue-900/40",
      textClass: "text-blue-700 dark:text-blue-300",
    }
  if (SYNTHETIC_ELEMENTS.has(atomicNumber))
    return {
      label: "Synthetic",
      description: "Synthetic element \u2014 properties not fully characterized",
      bgClass: "bg-purple-100 dark:bg-purple-900/40",
      textClass: "text-purple-700 dark:text-purple-300",
    }
  return {
    label: "Solid",
    description: "Solid at room temperature (25\u00B0C)",
    bgClass: "bg-amber-100 dark:bg-amber-900/40",
    textClass: "text-amber-700 dark:text-amber-300",
  }
}
