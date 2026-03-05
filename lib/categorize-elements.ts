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
      return "bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-950/50 dark:to-rose-900/40 border-rose-300 dark:border-rose-800/60"
    case "Alkaline Earth Metal":
      return "bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-950/50 dark:to-orange-900/40 border-orange-300 dark:border-orange-800/60"
    case "Transition Metal":
      return "bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-950/50 dark:to-amber-900/40 border-amber-300 dark:border-amber-800/60"
    case "Post-Transition Metal":
      return "bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-950/50 dark:to-yellow-900/40 border-yellow-300 dark:border-yellow-800/60"
    case "Metalloid":
      return "bg-gradient-to-br from-lime-100 to-lime-200 dark:from-lime-950/50 dark:to-lime-900/40 border-lime-300 dark:border-lime-800/60"
    case "Nonmetal":
      return "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-950/50 dark:to-green-900/40 border-green-300 dark:border-green-800/60"
    case "Halogen":
      return "bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-950/50 dark:to-teal-900/40 border-teal-300 dark:border-teal-800/60"
    case "Noble Gas":
      return "bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-950/50 dark:to-cyan-900/40 border-cyan-300 dark:border-cyan-800/60"
    case "Lanthanide":
      return "bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-950/50 dark:to-indigo-900/40 border-indigo-300 dark:border-indigo-800/60"
    case "Actinide":
      return "bg-gradient-to-br from-violet-100 to-violet-200 dark:from-violet-950/50 dark:to-violet-900/40 border-violet-300 dark:border-violet-800/60"
    default:
      return "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900/50 dark:to-slate-800/40 border-slate-300 dark:border-slate-700/60"
  }
}

export function getCategoryDotColor(category: string): string {
  switch (category) {
    case "Alkali Metal": return "bg-rose-400"
    case "Alkaline Earth Metal": return "bg-orange-400"
    case "Transition Metal": return "bg-amber-400"
    case "Post-Transition Metal": return "bg-yellow-400"
    case "Metalloid": return "bg-lime-400"
    case "Nonmetal": return "bg-green-500"
    case "Halogen": return "bg-teal-400"
    case "Noble Gas": return "bg-cyan-400"
    case "Lanthanide": return "bg-indigo-400"
    case "Actinide": return "bg-violet-400"
    default: return "bg-slate-400"
  }
}
