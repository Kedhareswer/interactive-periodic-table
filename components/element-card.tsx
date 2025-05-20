import type { ElementType } from "@/types/element"
import { cn } from "@/lib/utils"
import { getCategoryColor } from "@/lib/categorize-elements"
import { Check } from "lucide-react"

interface ElementCardProps {
  element: ElementType
  isSelected?: boolean
  selectionMode?: boolean
  compact?: boolean
  trendColor?: string
}

export default function ElementCard({
  element,
  isSelected = false,
  selectionMode = false,
  compact = false,
  trendColor = "",
}: ElementCardProps) {
  const { atomicNumber, symbol, name, category } = element
  const categoryColor = getCategoryColor(category)

  return (
    <div
      className={cn(
        "group relative h-full w-full cursor-pointer overflow-hidden rounded-lg border bg-white shadow-md transition-all hover:shadow-lg dark:bg-slate-800/90",
        trendColor || categoryColor,
        isSelected ? "ring-2 ring-amber-500 dark:ring-amber-400" : "border-amber-200 dark:border-amber-900/50",
        compact ? "p-1" : "p-2",
      )}
    >
      {isSelected && (
        <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-white dark:bg-amber-400 dark:text-amber-950">
          <Check className="h-2 w-2" />
        </div>
      )}

      <div
        className={cn(
          "absolute right-1 top-1 flex items-center justify-center rounded-bl-md bg-amber-800/10 text-xs font-medium text-amber-900 dark:bg-amber-700/20 dark:text-amber-300",
          compact ? "h-4 min-w-4 px-1 text-[9px]" : "h-6 min-w-6 px-1",
        )}
      >
        {atomicNumber}
      </div>

      <div className="mt-2 flex flex-col items-center justify-center">
        <span
          className={cn(
            "font-serif font-bold text-amber-900 dark:text-amber-300",
            compact ? "text-base" : "text-2xl md:text-3xl",
          )}
        >
          {symbol}
        </span>
        <span
          className={cn(
            "mt-0.5 text-center font-medium text-amber-800 dark:text-amber-400",
            compact ? "text-[9px]" : "text-xs md:text-sm",
          )}
        >
          {compact ? (name.length > 8 ? name.substring(0, 7) + "..." : name) : name}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
    </div>
  )
}
