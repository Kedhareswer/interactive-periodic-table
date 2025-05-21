"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { BarChart3, Droplets, Flame, Zap } from "lucide-react"
import type { ElementType } from "@/types/element"
import { getTrendData, elementTrends } from "@/data/element-trends"

type TrendType = "atomicRadius" | "electronegativity" | "ionizationEnergy" | "density"

const getTrendColor = (value: number, trend: TrendType): string => {
  // Define color ranges for each trend
  const getColorClass = (intensity: number) => {
    if (trend === "atomicRadius") {
      return intensity === 0
        ? "bg-blue-50 dark:bg-blue-950"
        : intensity === 1
          ? "bg-blue-100 dark:bg-blue-900"
          : intensity === 2
            ? "bg-blue-200 dark:bg-blue-800"
            : intensity === 3
              ? "bg-blue-300 dark:bg-blue-700"
              : intensity === 4
                ? "bg-blue-400 dark:bg-blue-600"
                : "bg-blue-500 dark:bg-blue-500"
    } else if (trend === "electronegativity") {
      return intensity === 0
        ? "bg-green-50 dark:bg-green-950"
        : intensity === 1
          ? "bg-green-100 dark:bg-green-900"
          : intensity === 2
            ? "bg-green-200 dark:bg-green-800"
            : intensity === 3
              ? "bg-green-300 dark:bg-green-700"
              : intensity === 4
                ? "bg-green-400 dark:bg-green-600"
                : "bg-green-500 dark:bg-green-500"
    } else if (trend === "ionizationEnergy") {
      return intensity === 0
        ? "bg-purple-50 dark:bg-purple-950"
        : intensity === 1
          ? "bg-purple-100 dark:bg-purple-900"
          : intensity === 2
            ? "bg-purple-200 dark:bg-purple-800"
            : intensity === 3
              ? "bg-purple-300 dark:bg-purple-700"
              : intensity === 4
                ? "bg-purple-400 dark:bg-purple-600"
                : "bg-purple-500 dark:bg-purple-500"
    } else {
      // density
      return intensity === 0
        ? "bg-red-50 dark:bg-red-950"
        : intensity === 1
          ? "bg-red-100 dark:bg-red-900"
          : intensity === 2
            ? "bg-red-200 dark:bg-red-800"
            : intensity === 3
              ? "bg-red-300 dark:bg-red-700"
              : intensity === 4
                ? "bg-red-400 dark:bg-red-600"
                : "bg-red-500 dark:bg-red-500"
    }
  }

  // Get min and max values for the trend
  let min = Number.POSITIVE_INFINITY
  let max = Number.NEGATIVE_INFINITY

  const data = elementTrends[trend]

  Object.values(data).forEach((v) => {
    if (v > 0) {
      // Ignore zero values
      min = Math.min(min, v)
      max = Math.max(max, v)
    }
  })

  if (value === 0) return getColorClass(0) // No data

  // Normalize to 0-5 range
  const range = max - min
  const normalized = Math.floor(((value - min) / range) * 5)
  return getColorClass(normalized)
}

export default function PeriodicTrends() {
  const [activeTrend, setActiveTrend] = useState<TrendType | null>(null)

  const getTrendDataForElement = (atomicNumber: number, trendType?: TrendType): number => {
    if (!trendType) {
      if (!activeTrend) return 0
      trendType = activeTrend
    }

    return getTrendData(atomicNumber, trendType)
  }

  const getTrendColorForElement = (element: ElementType): string => {
    if (!activeTrend) return ""
    const value = getTrendDataForElement(element.atomicNumber)
    return getTrendColor(value, activeTrend)
  }

  // Get trend range for legend
  const getTrendRange = (trend: TrendType): { min: number; max: number; unit: string } => {
    let min = Number.POSITIVE_INFINITY
    let max = Number.NEGATIVE_INFINITY
    const data = elementTrends[trend]

    Object.values(data).forEach((v) => {
      if (v > 0) {
        // Ignore zero values
        min = Math.min(min, v)
        max = Math.max(max, v)
      }
    })

    // Define units for each trend
    const unit =
      trend === "atomicRadius"
        ? "pm"
        : trend === "electronegativity"
          ? ""
          : trend === "ionizationEnergy"
            ? "eV"
            : "g/cm³"

    return { min, max, unit }
  }

  return {
    activeTrend,
    setActiveTrend,
    getTrendData: getTrendDataForElement,
    getTrendColorForElement,
    TrendSelector: () => (
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <h3 className="font-serif text-lg font-semibold text-amber-800 dark:text-amber-400">Periodic Trends:</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTrend(activeTrend === "atomicRadius" ? null : "atomicRadius")}
            className={cn(
              "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              activeTrend === "atomicRadius"
                ? "border-blue-300 bg-blue-100 text-blue-900 dark:border-blue-700 dark:bg-blue-900/50 dark:text-blue-100"
                : "border-amber-300 bg-transparent text-amber-800 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/50",
            )}
          >
            <Droplets className="h-4 w-4" />
            <span>Atomic Radius</span>
          </button>
          <button
            onClick={() => setActiveTrend(activeTrend === "electronegativity" ? null : "electronegativity")}
            className={cn(
              "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              activeTrend === "electronegativity"
                ? "border-green-300 bg-green-100 text-green-900 dark:border-green-700 dark:bg-green-900/50 dark:text-green-100"
                : "border-amber-300 bg-transparent text-amber-800 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/50",
            )}
          >
            <Zap className="h-4 w-4" />
            <span>Electronegativity</span>
          </button>
          <button
            onClick={() => setActiveTrend(activeTrend === "ionizationEnergy" ? null : "ionizationEnergy")}
            className={cn(
              "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              activeTrend === "ionizationEnergy"
                ? "border-purple-300 bg-purple-100 text-purple-900 dark:border-purple-700 dark:bg-purple-900/50 dark:text-purple-100"
                : "border-amber-300 bg-transparent text-amber-800 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/50",
            )}
          >
            <Flame className="h-4 w-4" />
            <span>Ionization Energy</span>
          </button>
          <button
            onClick={() => setActiveTrend(activeTrend === "density" ? null : "density")}
            className={cn(
              "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              activeTrend === "density"
                ? "border-red-300 bg-red-100 text-red-900 dark:border-red-700 dark:bg-red-900/50 dark:text-red-100"
                : "border-amber-300 bg-transparent text-amber-800 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/50",
            )}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Density</span>
          </button>
        </div>
      </div>
    ),
    TrendLegend: () => {
      if (!activeTrend) return null

      const trendTitle =
        activeTrend === "atomicRadius"
          ? "Atomic Radius"
          : activeTrend === "electronegativity"
            ? "Electronegativity"
            : activeTrend === "ionizationEnergy"
              ? "Ionization Energy"
              : "Density"

      const baseColor =
        activeTrend === "atomicRadius"
          ? "blue"
          : activeTrend === "electronegativity"
            ? "green"
            : activeTrend === "ionizationEnergy"
              ? "purple"
              : "red"

      const { min, max, unit } = getTrendRange(activeTrend)

      // Format values based on trend type
      const formatValue = (value: number): string => {
        if (activeTrend === "atomicRadius") {
          return `${Math.round(value)} ${unit}`
        } else if (activeTrend === "electronegativity") {
          return value.toFixed(1)
        } else if (activeTrend === "ionizationEnergy") {
          return `${value.toFixed(1)} ${unit}`
        } else if (activeTrend === "density") {
          // Special handling for density due to wide range
          return value < 0.1 ? `${value.toExponential(2)} ${unit}` : `${value.toFixed(1)} ${unit}`
        }
        return `${value} ${unit}`
      }

      return (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
          <h4 className="mb-2 font-serif text-lg font-semibold text-amber-800 dark:text-amber-400">
            {trendTitle} Trend
          </h4>
          <p className="mb-3 text-amber-900 dark:text-amber-200">
            {activeTrend === "atomicRadius"
              ? "Atomic radius is the distance from the center of the nucleus to the outermost electron shell. It generally decreases from left to right across a period and increases down a group."
              : activeTrend === "electronegativity"
                ? "Electronegativity is a measure of an atom's ability to attract electrons in a chemical bond. It generally increases from left to right across a period and decreases down a group."
                : activeTrend === "ionizationEnergy"
                  ? "Ionization energy is the energy required to remove an electron from a gaseous atom. It generally increases from left to right across a period and decreases down a group."
                  : "Density is the mass per unit volume of a substance. It generally increases down a group and peaks in the middle of periods, with the highest values found among transition metals."}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-amber-800 dark:text-amber-400">{formatValue(min)}</span>
            <div className={`h-4 w-6 rounded bg-${baseColor}-100 dark:bg-${baseColor}-900`}></div>
            <div className={`h-4 w-6 rounded bg-${baseColor}-200 dark:bg-${baseColor}-800`}></div>
            <div className={`h-4 w-6 rounded bg-${baseColor}-300 dark:bg-${baseColor}-700`}></div>
            <div className={`h-4 w-6 rounded bg-${baseColor}-400 dark:bg-${baseColor}-600`}></div>
            <div className={`h-4 w-6 rounded bg-${baseColor}-500 dark:bg-${baseColor}-500`}></div>
            <span className="text-sm text-amber-800 dark:text-amber-400">{formatValue(max)}</span>
          </div>
        </div>
      )
    },
  }
}
