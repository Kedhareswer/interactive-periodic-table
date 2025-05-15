import type { ElementType } from "@/types/element"

export function categorizeElements(elements: ElementType[]) {
  return elements.reduce(
    (acc, element) => {
      if (!acc[element.category]) {
        acc[element.category] = []
      }
      acc[element.category].push(element)
      return acc
    },
    {} as Record<string, ElementType[]>,
  )
}

export function getCategoryColor(category: string) {
  switch (category) {
    case "Alkali Metal":
      return "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 border-red-200 dark:border-red-900/50"
    case "Alkaline Earth Metal":
      return "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 border-orange-200 dark:border-orange-900/50"
    case "Transition Metal":
      return "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/30 border-amber-200 dark:border-amber-900/50"
    case "Post-Transition Metal":
      return "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/30 border-yellow-200 dark:border-yellow-900/50"
    case "Metalloid":
      return "bg-gradient-to-br from-lime-50 to-lime-100 dark:from-lime-950/30 dark:to-lime-900/30 border-lime-200 dark:border-lime-900/50"
    case "Nonmetal":
      return "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border-green-200 dark:border-green-900/50"
    case "Halogen":
      return "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 border-emerald-200 dark:border-emerald-900/50"
    case "Noble Gas":
      return "bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/30 dark:to-teal-900/30 border-teal-200 dark:border-teal-900/50"
    case "Lanthanide":
      return "bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950/30 dark:to-cyan-900/30 border-cyan-200 dark:border-cyan-900/50"
    case "Actinide":
      return "bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-950/30 dark:to-sky-900/30 border-sky-200 dark:border-sky-900/50"
    default:
      return "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/30 dark:to-gray-900/30 border-gray-200 dark:border-gray-900/50"
  }
}
