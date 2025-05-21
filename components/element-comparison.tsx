"use client"

import { useState } from "react"
import type { ElementType } from "@/types/element"
import type { IsotopeInfo } from "@/data/element-isotopes"
import { motion } from "framer-motion"
import { X, Beaker, AtomIcon } from "lucide-react"
import { getCategoryColor } from "@/lib/categorize-elements"
import { cn } from "@/lib/utils"
import PeriodicTrends from "./periodic-trends"
import TrendValueDisplay from "./trend-value-display"

interface ElementComparisonProps {
  elements: ElementType[]
  onClose: () => void
}

export default function ElementComparison({ elements, onClose }: ElementComparisonProps) {
  const [activeTab, setActiveTab] = useState<"info" | "isotopes">("info")

  if (elements.length !== 2) return null

  const [element1, element2] = elements
  const { getTrendData } = PeriodicTrends()

  const comparisonProperties = [
    { label: "Atomic Number", value1: element1.atomicNumber, value2: element2.atomicNumber },
    { label: "Symbol", value1: element1.symbol, value2: element2.symbol },
    { label: "Name", value1: element1.name, value2: element2.name },
    { label: "Atomic Mass", value1: element1.atomicMass, value2: element2.atomicMass },
    { label: "Category", value1: element1.category, value2: element2.category },
    { label: "Group", value1: element1.group || "N/A", value2: element2.group || "N/A" },
    { label: "Period", value1: element1.period, value2: element2.period },
    { label: "Block", value1: element1.block, value2: element2.block },
    { label: "Electron Configuration", value1: element1.electronConfiguration, value2: element2.electronConfiguration },
  ]

  // Add trend properties
  const trendProperties = [
    {
      label: "Atomic Radius",
      value1: <TrendValueDisplay value={getTrendData(element1.atomicNumber, "atomicRadius")} trend="atomicRadius" />,
      value2: <TrendValueDisplay value={getTrendData(element2.atomicNumber, "atomicRadius")} trend="atomicRadius" />,
    },
    {
      label: "Electronegativity",
      value1: (
        <TrendValueDisplay value={getTrendData(element1.atomicNumber, "electronegativity")} trend="electronegativity" />
      ),
      value2: (
        <TrendValueDisplay value={getTrendData(element2.atomicNumber, "electronegativity")} trend="electronegativity" />
      ),
    },
    {
      label: "Ionization Energy",
      value1: (
        <TrendValueDisplay value={getTrendData(element1.atomicNumber, "ionizationEnergy")} trend="ionizationEnergy" />
      ),
      value2: (
        <TrendValueDisplay value={getTrendData(element2.atomicNumber, "ionizationEnergy")} trend="ionizationEnergy" />
      ),
    },
    {
      label: "Density",
      value1: <TrendValueDisplay value={getTrendData(element1.atomicNumber, "density")} trend="density" />,
      value2: <TrendValueDisplay value={getTrendData(element2.atomicNumber, "density")} trend="density" />,
    },
  ]

  // Function to count stable isotopes
  const countStableIsotopes = (isotopes?: IsotopeInfo[]): number => {
    if (!isotopes) return 0
    return isotopes.filter((isotope) => isotope.isStable).length
  }

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
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-amber-200 bg-white p-6 shadow-2xl dark:border-amber-900/50 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-amber-700 transition-colors hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/50"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </button>

        <h2 className="mb-4 font-serif text-3xl font-bold text-amber-900 dark:text-amber-400">Element Comparison</h2>

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setActiveTab("info")}
            className={cn(
              "flex flex-1 items-center justify-center gap-1 rounded-lg border border-amber-200 px-3 py-2 text-sm font-medium transition-colors dark:border-amber-900/50",
              activeTab === "info"
                ? "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300"
                : "bg-white text-amber-700 hover:bg-amber-50 dark:bg-slate-800 dark:text-amber-400 dark:hover:bg-slate-800/80",
            )}
          >
            Info
          </button>
          <button
            onClick={() => setActiveTab("isotopes")}
            className={cn(
              "flex flex-1 items-center justify-center gap-1 rounded-lg border border-amber-200 px-3 py-2 text-sm font-medium transition-colors dark:border-amber-900/50",
              activeTab === "isotopes"
                ? "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300"
                : "bg-white text-amber-700 hover:bg-amber-50 dark:bg-slate-800 dark:text-amber-400 dark:hover:bg-slate-800/80",
            )}
          >
            <AtomIcon className="h-4 w-4" />
            <span>Isotopes</span>
          </button>
        </div>

        {activeTab === "info" && (
          <>
            <div className="grid grid-cols-[1fr_2fr_2fr] gap-4">
              <div className="font-serif text-lg font-semibold text-amber-800 dark:text-amber-500">Property</div>

              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "mb-4 flex h-32 w-32 flex-shrink-0 flex-col items-center justify-center rounded-lg border border-amber-200 bg-white shadow-md dark:border-amber-900/50 dark:bg-slate-800",
                    getCategoryColor(element1.category),
                  )}
                >
                  <span className="text-xs font-medium text-amber-800 dark:text-amber-400">
                    {element1.atomicNumber}
                  </span>
                  <span className="font-serif text-5xl font-bold text-amber-900 dark:text-amber-300">
                    {element1.symbol}
                  </span>
                  <span className="mt-1 text-center text-sm font-medium text-amber-800 dark:text-amber-400">
                    {element1.name}
                  </span>
                  <span className="text-xs text-amber-700/80 dark:text-amber-500/80">{element1.atomicMass}</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "mb-4 flex h-32 w-32 flex-shrink-0 flex-col items-center justify-center rounded-lg border border-amber-200 bg-white shadow-md dark:border-amber-900/50 dark:bg-slate-800",
                    getCategoryColor(element2.category),
                  )}
                >
                  <span className="text-xs font-medium text-amber-800 dark:text-amber-400">
                    {element2.atomicNumber}
                  </span>
                  <span className="font-serif text-5xl font-bold text-amber-900 dark:text-amber-300">
                    {element2.symbol}
                  </span>
                  <span className="mt-1 text-center text-sm font-medium text-amber-800 dark:text-amber-400">
                    {element2.name}
                  </span>
                  <span className="text-xs text-amber-700/80 dark:text-amber-500/80">{element2.atomicMass}</span>
                </div>
              </div>

              {comparisonProperties.slice(3).map((property) => (
                <div key={property.label} className="contents">
                  <div className="border-t border-amber-200 py-3 font-medium text-amber-800 dark:border-amber-900/30 dark:text-amber-500">
                    {property.label}
                  </div>
                  <div className="border-t border-amber-200 py-3 text-center text-amber-900 dark:border-amber-900/30 dark:text-amber-200">
                    {property.value1}
                  </div>
                  <div className="border-t border-amber-200 py-3 text-center text-amber-900 dark:border-amber-900/30 dark:text-amber-200">
                    {property.value2}
                  </div>
                </div>
              ))}
              {trendProperties.map((property) => (
                <div key={property.label} className="contents">
                  <div className="border-t border-amber-200 py-3 font-medium text-amber-800 dark:border-amber-900/30 dark:text-amber-500">
                    {property.label}
                  </div>
                  <div className="border-t border-amber-200 py-3 text-center text-amber-900 dark:border-amber-900/30 dark:text-amber-200">
                    {property.value1}
                  </div>
                  <div className="border-t border-amber-200 py-3 text-center text-amber-900 dark:border-amber-900/30 dark:text-amber-200">
                    {property.value2}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-serif text-xl font-semibold text-amber-800 dark:text-amber-400">
                  {element1.name}
                </h3>
                <p className="text-amber-900 dark:text-amber-200">{element1.description}</p>

                {element1.applications && element1.applications.length > 0 && (
                  <div className="mt-4">
                    <h4 className="flex items-center gap-2 font-serif text-lg font-semibold text-amber-800 dark:text-amber-400">
                      <Beaker className="h-4 w-4" />
                      <span>Applications</span>
                    </h4>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-amber-900 dark:text-amber-200">
                      {element1.applications.map((application, index) => (
                        <li key={index}>{application}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <h3 className="mb-2 font-serif text-xl font-semibold text-amber-800 dark:text-amber-400">
                  {element2.name}
                </h3>
                <p className="text-amber-900 dark:text-amber-200">{element2.description}</p>

                {element2.applications && element2.applications.length > 0 && (
                  <div className="mt-4">
                    <h4 className="flex items-center gap-2 font-serif text-lg font-semibold text-amber-800 dark:text-amber-400">
                      <Beaker className="h-4 w-4" />
                      <span>Applications</span>
                    </h4>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-amber-900 dark:text-amber-200">
                      {element2.applications.map((application, index) => (
                        <li key={index}>{application}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === "isotopes" && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-amber-800 dark:text-amber-400">
                {element1.name} Isotopes
              </h3>

              {element1.isotopes && element1.isotopes.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-sm text-amber-700 dark:text-amber-500">
                    {element1.name} has {element1.isotopes.length} known isotopes,
                    {countStableIsotopes(element1.isotopes) > 0
                      ? ` ${countStableIsotopes(element1.isotopes)} of which ${countStableIsotopes(element1.isotopes) === 1 ? "is" : "are"} stable.`
                      : " all of which are radioactive."}
                  </p>

                  {element1.isotopes.map((isotope: IsotopeInfo) => (
                    <div
                      key={isotope.massNumber}
                      className="rounded-lg border border-amber-200 bg-amber-50/50 p-3 dark:border-amber-900/30 dark:bg-amber-900/10"
                    >
                      <h4 className="flex items-center text-base font-medium text-amber-900 dark:text-amber-300">
                        <span className="mr-2">
                          {element1.symbol}-{isotope.massNumber}
                        </span>
                        {isotope.isStable ? (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/40 dark:text-green-300">
                            Stable
                          </span>
                        ) : (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                            Radioactive
                          </span>
                        )}
                      </h4>
                      {isotope.abundance !== undefined && (
                        <p className="mt-1 text-sm text-amber-800 dark:text-amber-400">
                          Abundance: {isotope.abundance.toFixed(4)}%
                        </p>
                      )}
                      {isotope.halfLife && (
                        <p className="mt-1 text-sm text-amber-800 dark:text-amber-400">Half-life: {isotope.halfLife}</p>
                      )}
                      {isotope.description && (
                        <p className="mt-1 text-xs text-amber-700 dark:text-amber-500">{isotope.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
                  <p className="text-amber-800 dark:text-amber-400">No detailed isotope data available.</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-amber-800 dark:text-amber-400">
                {element2.name} Isotopes
              </h3>

              {element2.isotopes && element2.isotopes.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-sm text-amber-700 dark:text-amber-500">
                    {element2.name} has {element2.isotopes.length} known isotopes,
                    {countStableIsotopes(element2.isotopes) > 0
                      ? ` ${countStableIsotopes(element2.isotopes)} of which ${countStableIsotopes(element2.isotopes) === 1 ? "is" : "are"} stable.`
                      : " all of which are radioactive."}
                  </p>

                  {element2.isotopes.map((isotope: IsotopeInfo) => (
                    <div
                      key={isotope.massNumber}
                      className="rounded-lg border border-amber-200 bg-amber-50/50 p-3 dark:border-amber-900/30 dark:bg-amber-900/10"
                    >
                      <h4 className="flex items-center text-base font-medium text-amber-900 dark:text-amber-300">
                        <span className="mr-2">
                          {element2.symbol}-{isotope.massNumber}
                        </span>
                        {isotope.isStable ? (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/40 dark:text-green-300">
                            Stable
                          </span>
                        ) : (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                            Radioactive
                          </span>
                        )}
                      </h4>
                      {isotope.abundance !== undefined && (
                        <p className="mt-1 text-sm text-amber-800 dark:text-amber-400">
                          Abundance: {isotope.abundance.toFixed(4)}%
                        </p>
                      )}
                      {isotope.halfLife && (
                        <p className="mt-1 text-sm text-amber-800 dark:text-amber-400">Half-life: {isotope.halfLife}</p>
                      )}
                      {isotope.description && (
                        <p className="mt-1 text-xs text-amber-700 dark:text-amber-500">{isotope.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
                  <p className="text-amber-800 dark:text-amber-400">No detailed isotope data available.</p>
                </div>
              )}
            </div>

            <div className="col-span-1 md:col-span-2">
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
                <h4 className="font-medium text-amber-800 dark:text-amber-400">Isotope Comparison</h4>
                <p className="mt-1 text-sm text-amber-700 dark:text-amber-500">
                  Comparing the isotopes of {element1.name} and {element2.name} shows differences in their nuclear
                  stability and abundance.
                  {countStableIsotopes(element1.isotopes) !== countStableIsotopes(element2.isotopes)
                    ? ` ${element1.name} has ${countStableIsotopes(element1.isotopes)} stable ${countStableIsotopes(element1.isotopes) === 1 ? "isotope" : "isotopes"}, 
                    while ${element2.name} has ${countStableIsotopes(element2.isotopes)}.`
                    : ` Both elements have ${countStableIsotopes(element1.isotopes)} stable ${countStableIsotopes(element1.isotopes) === 1 ? "isotope" : "isotopes"}.`}
                  These differences reflect their positions in the periodic table and the nuclear forces at play in
                  their nuclei.
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
