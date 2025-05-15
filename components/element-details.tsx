"use client"

import type { ElementType } from "@/types/element"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { getCategoryColor } from "@/lib/categorize-elements"
import { cn } from "@/lib/utils"
import PeriodicTrends from "./periodic-trends"
import TrendValueDisplay from "./trend-value-display"

interface ElementDetailsProps {
  element: ElementType
  onClose: () => void
}

export default function ElementDetails({ element, onClose }: ElementDetailsProps) {
  const {
    atomicNumber,
    symbol,
    name,
    atomicMass,
    category,
    group,
    period,
    block,
    electronConfiguration,
    description,
    discoveredBy,
    namedAfter,
  } = element

  const { getTrendData } = PeriodicTrends()

  const categoryColor = getCategoryColor(category)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-amber-200 bg-white p-6 shadow-2xl dark:border-amber-900/50 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-amber-700 transition-colors hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/50"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </button>

        <div className="flex flex-col gap-6 md:flex-row">
          <div
            className={cn(
              "flex h-40 w-40 flex-shrink-0 flex-col items-center justify-center rounded-lg border border-amber-200 bg-white shadow-md dark:border-amber-900/50 dark:bg-slate-800",
              categoryColor,
            )}
          >
            <span className="text-xs font-medium text-amber-800 dark:text-amber-400">{atomicNumber}</span>
            <span className="font-serif text-6xl font-bold text-amber-900 dark:text-amber-300">{symbol}</span>
            <span className="mt-1 text-center text-sm font-medium text-amber-800 dark:text-amber-400">{name}</span>
            <span className="text-xs text-amber-700/80 dark:text-amber-500/80">{atomicMass}</span>
          </div>

          <div className="flex-1">
            <h2 className="font-serif text-3xl font-bold text-amber-900 dark:text-amber-400 md:text-4xl">
              {name} <span className="text-amber-600 dark:text-amber-500">({symbol})</span>
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-3">
              <div>
                <p className="text-xs text-amber-700 dark:text-amber-500">Category</p>
                <p className="font-medium text-amber-900 dark:text-amber-300">{category}</p>
              </div>
              <div>
                <p className="text-xs text-amber-700 dark:text-amber-500">Group</p>
                <p className="font-medium text-amber-900 dark:text-amber-300">{group || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-amber-700 dark:text-amber-500">Period</p>
                <p className="font-medium text-amber-900 dark:text-amber-300">{period}</p>
              </div>
              <div>
                <p className="text-xs text-amber-700 dark:text-amber-500">Block</p>
                <p className="font-medium text-amber-900 dark:text-amber-300">{block}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-amber-700 dark:text-amber-500">Electron Configuration</p>
                <p className="font-medium text-amber-900 dark:text-amber-300">{electronConfiguration}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-serif text-lg font-semibold text-amber-800 dark:text-amber-400">Periodic Trends</h3>
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-4">
                <div>
                  <p className="text-xs text-amber-700 dark:text-amber-500">Atomic Radius</p>
                  <TrendValueDisplay value={getTrendData(atomicNumber, "atomicRadius")} trend="atomicRadius" />
                </div>
                <div>
                  <p className="text-xs text-amber-700 dark:text-amber-500">Electronegativity</p>
                  <TrendValueDisplay
                    value={getTrendData(atomicNumber, "electronegativity")}
                    trend="electronegativity"
                  />
                </div>
                <div>
                  <p className="text-xs text-amber-700 dark:text-amber-500">Ionization Energy</p>
                  <TrendValueDisplay value={getTrendData(atomicNumber, "ionizationEnergy")} trend="ionizationEnergy" />
                </div>
                <div>
                  <p className="text-xs text-amber-700 dark:text-amber-500">Density</p>
                  <TrendValueDisplay value={getTrendData(atomicNumber, "density")} trend="density" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-serif text-xl font-semibold text-amber-800 dark:text-amber-400">Description</h3>
              <p className="mt-2 text-amber-900 dark:text-amber-200">{description}</p>
            </div>

            {(discoveredBy || namedAfter) && (
              <div className="mt-4 grid grid-cols-1 gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10 md:grid-cols-2">
                {discoveredBy && (
                  <div>
                    <p className="text-xs font-medium text-amber-700 dark:text-amber-500">Discovered By</p>
                    <p className="text-amber-900 dark:text-amber-300">{discoveredBy}</p>
                  </div>
                )}
                {namedAfter && (
                  <div>
                    <p className="text-xs font-medium text-amber-700 dark:text-amber-500">Named After</p>
                    <p className="text-amber-900 dark:text-amber-300">{namedAfter}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
