import type { ElementType } from "@/types/element"
import { cn } from "@/lib/utils"
import { getCategoryColor } from "@/lib/categorize-elements"
import { getStateLabel } from "@/lib/element-state"
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
  const { atomicNumber, symbol, name, atomicMass, category } = element
  const categoryColor = getCategoryColor(category)
  const state = getStateLabel(atomicNumber)

  return (
    <div
      className={cn(
        "group relative h-full w-full cursor-pointer overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md dark:bg-slate-800/90",
        trendColor || categoryColor,
        isSelected
          ? "ring-2 ring-amber-500 dark:ring-amber-400"
          : "border-current hover:border-amber-400 dark:hover:border-amber-500",
        compact ? "p-1" : "p-2",
      )}
    >
      {isSelected && (
        <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-white dark:bg-amber-400 dark:text-amber-950">
          <Check className="h-2 w-2" />
        </div>
      )}

      {/* Atomic number */}
      <div
        className={cn(
          "absolute left-1 top-1 font-medium text-amber-800/70 dark:text-amber-400/70",
          compact ? "text-[8px]" : "text-[10px]",
        )}
      >
        {atomicNumber}
      </div>

      {/* State of matter indicator */}
      {state && (
        <div
          className={cn(
            "absolute right-1 top-1 font-bold uppercase leading-none",
            compact ? "text-[7px]" : "text-[9px]",
            state.color,
          )}
        >
          {state.label}
        </div>
      )}

      {/* Symbol + Name */}
      <div className={cn("flex flex-col items-center justify-center", compact ? "mt-2" : "mt-3")}>
        <span
          className={cn(
            "font-serif font-bold text-amber-900 dark:text-amber-200 leading-none",
            compact ? "text-lg" : "text-3xl md:text-4xl",
          )}
        >
          {symbol}
        </span>
        <span
          className={cn(
            "mt-0.5 text-center font-medium text-amber-800 dark:text-amber-400 leading-tight",
            compact ? "text-[8px]" : "text-xs",
          )}
        >
          {compact ? (name.length > 8 ? name.substring(0, 7) + "…" : name) : name}
        </span>
        {/* Atomic mass */}
        <span
          className={cn(
            "mt-0.5",
            compact
              ? "text-[7px] leading-none text-amber-600/70 dark:text-amber-500/60"
              : "text-[10px] text-amber-600/80 dark:text-amber-500/80",
          )}
        >
          {atomicMass}
        </span>
      </div>

      {/* Hover shimmer line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-amber-400/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  )
}
