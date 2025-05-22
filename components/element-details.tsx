"use client"

import { useState } from "react"
import type { ElementType } from "@/types/element"
import type { IsotopeInfo } from "@/data/element-isotopes"
import { motion } from "framer-motion"
import { X, Beaker, AtomIcon, Radiation } from "lucide-react"
import { getCategoryColor } from "@/lib/categorize-elements"
import { cn } from "@/lib/utils"
import PeriodicTrends from "./periodic-trends"
import TrendValueDisplay from "./trend-value-display"
import { getDecayModeInfo, getDecayChain, type DecayChain } from "@/data/nuclear-decay"

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
    applications,
    isotopes,
    radioactivity,
  } = element

  const [activeTab, setActiveTab] = useState<"info" | "isotopes" | "radioactivity">("info")
  const [selectedIsotope, setSelectedIsotope] = useState<IsotopeInfo | null>(null)

  const { getTrendData } = PeriodicTrends()

  const categoryColor = getCategoryColor(category)

  // Function to get decay chain for selected isotope
  const getDecayChainForIsotope = (isotope: IsotopeInfo | null): DecayChain[] | null => {
    if (!isotope || !isotope.decayChainKey) return null
    return getDecayChain(isotope.decayChainKey)
  }

  const decayChain = getDecayChainForIsotope(selectedIsotope)

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

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex flex-col gap-4">
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

            <div className="flex flex-wrap gap-2">
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
              <button
                onClick={() => setActiveTab("radioactivity")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1 rounded-lg border border-amber-200 px-3 py-2 text-sm font-medium transition-colors dark:border-amber-900/50",
                  activeTab === "radioactivity"
                    ? "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300"
                    : "bg-white text-amber-700 hover:bg-amber-50 dark:bg-slate-800 dark:text-amber-400 dark:hover:bg-slate-800/80",
                )}
              >
                <Radiation className="h-4 w-4" />
                <span>Radioactivity</span>
              </button>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="font-serif text-3xl font-bold text-amber-900 dark:text-amber-400 md:text-4xl">
              {name} <span className="text-amber-600 dark:text-amber-500">({symbol})</span>
            </h2>

            {activeTab === "info" && (
              <>
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
                  <h3 className="font-serif text-lg font-semibold text-amber-800 dark:text-amber-400">
                    Periodic Trends
                  </h3>
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
                      <TrendValueDisplay
                        value={getTrendData(atomicNumber, "ionizationEnergy")}
                        trend="ionizationEnergy"
                      />
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

                {applications && applications.length > 0 && (
                  <div className="mt-6">
                    <h3 className="flex items-center gap-2 font-serif text-xl font-semibold text-amber-800 dark:text-amber-400">
                      <Beaker className="h-5 w-5" />
                      <span>Applications</span>
                    </h3>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-amber-900 dark:text-amber-200">
                      {applications.map((application, index) => (
                        <li key={index}>{application}</li>
                      ))}
                    </ul>
                  </div>
                )}

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
              </>
            )}

            {activeTab === "isotopes" && (
              <div className="mt-4">
                <h3 className="mb-3 flex items-center gap-2 font-serif text-xl font-semibold text-amber-800 dark:text-amber-400">
                  <AtomIcon className="h-5 w-5" />
                  <span>Isotopes of {name}</span>
                </h3>
                <p className="mb-4 text-amber-700 dark:text-amber-400">
                  Isotopes are atoms of the same element with different numbers of neutrons, resulting in different
                  atomic masses.
                </p>

                {isotopes && isotopes.length > 0 ? (
                  <div className="space-y-4">
                    {isotopes.map((isotope: IsotopeInfo) => (
                      <div
                        key={isotope.massNumber}
                        className={cn(
                          "rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10",
                          selectedIsotope?.massNumber === isotope.massNumber &&
                            "border-amber-400 dark:border-amber-600",
                        )}
                      >
                        <h4 className="flex items-center text-lg font-medium text-amber-900 dark:text-amber-300">
                          <span className="mr-2">
                            {symbol}-{isotope.massNumber}
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
                        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                          {isotope.abundance !== undefined && (
                            <div>
                              <p className="text-xs text-amber-700 dark:text-amber-500">Natural Abundance</p>
                              <p className="font-medium text-amber-900 dark:text-amber-300">
                                {isotope.abundance.toFixed(4)}%
                              </p>
                            </div>
                          )}
                          {isotope.halfLife && (
                            <div>
                              <p className="text-xs text-amber-700 dark:text-amber-500">Half-life</p>
                              <p className="font-medium text-amber-900 dark:text-amber-300">{isotope.halfLife}</p>
                            </div>
                          )}
                        </div>
                        {isotope.description && (
                          <p className="mt-2 text-sm text-amber-800 dark:text-amber-400">{isotope.description}</p>
                        )}

                        {/* Decay modes */}
                        {isotope.decayModes && isotope.decayModes.length > 0 && (
                          <div className="mt-3">
                            <p className="text-xs text-amber-700 dark:text-amber-500">Decay Modes</p>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {isotope.decayModes.map((mode) => {
                                const decayInfo = getDecayModeInfo(mode)
                                return (
                                  <div
                                    key={mode}
                                    className="rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-900 dark:bg-amber-900/30 dark:text-amber-300"
                                    title={decayInfo.description}
                                  >
                                    {decayInfo.type} ({decayInfo.symbol})
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {/* View decay chain button */}
                        {isotope.decayChainKey && (
                          <button
                            onClick={() => setSelectedIsotope(isotope)}
                            className="mt-3 rounded-md bg-amber-200 px-3 py-1 text-sm font-medium text-amber-900 transition-colors hover:bg-amber-300 dark:bg-amber-800 dark:text-amber-100 dark:hover:bg-amber-700"
                          >
                            View Decay Chain
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
                    <p className="text-amber-800 dark:text-amber-400">
                      No detailed isotope data available for this element.
                    </p>
                  </div>
                )}

                {/* Decay chain display */}
                {selectedIsotope && decayChain && (
                  <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-lg font-semibold text-amber-800 dark:text-amber-400">
                        Decay Chain for {symbol}-{selectedIsotope.massNumber}
                      </h4>
                      <button
                        onClick={() => setSelectedIsotope(null)}
                        className="rounded-full p-1 text-amber-700 transition-colors hover:bg-amber-200 dark:text-amber-400 dark:hover:bg-amber-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-amber-700 dark:text-amber-500">
                      This shows the sequence of radioactive decays from this isotope to a stable end product.
                    </p>
                    <div className="mt-4 overflow-x-auto">
                      <div className="min-w-[600px]">
                        {decayChain.map((step, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-1/3 p-2 text-amber-900 dark:text-amber-200">{step.parent}</div>
                            <div className="flex w-1/3 flex-col items-center p-2">
                              <div className="flex items-center gap-2">
                                <span className="text-amber-700 dark:text-amber-400">
                                  {getDecayModeInfo(step.decayMode).symbol}
                                </span>
                                <span className="text-xs text-amber-600 dark:text-amber-500">
                                  {step.halfLife && `(T½: ${step.halfLife})`}
                                </span>
                              </div>
                              {index < decayChain.length - 1 && (
                                <div className="h-6 w-0.5 bg-amber-300 dark:bg-amber-700"></div>
                              )}
                            </div>
                            <div className="w-1/3 p-2 text-amber-900 dark:text-amber-200">
                              {step.daughter}
                              {index === decayChain.length - 1 && (
                                <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/40 dark:text-green-300">
                                  Stable
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
                  <h4 className="font-medium text-amber-800 dark:text-amber-400">About Isotopes</h4>
                  <p className="mt-1 text-sm text-amber-700 dark:text-amber-500">
                    All atoms of an element have the same number of protons (the atomic number), but they can have
                    different numbers of neutrons. The sum of protons and neutrons gives the mass number. Isotopes can
                    be stable or radioactive, with the latter decaying over time into other elements.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "radioactivity" && (
              <div className="mt-4">
                <h3 className="mb-3 flex items-center gap-2 font-serif text-xl font-semibold text-amber-800 dark:text-amber-400">
                  <Radiation className="h-5 w-5" />
                  <span>Radioactivity of {name}</span>
                </h3>

                {radioactivity ? (
                  <div className="space-y-4">
                    <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-medium text-amber-900 dark:text-amber-300">
                          {radioactivity.isRadioactive ? "Radioactive Element" : "Non-Radioactive Element"}
                        </h4>
                        {radioactivity.isRadioactive && radioactivity.hazardLevel && (
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-xs font-medium",
                              radioactivity.hazardLevel === "Low"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                                : radioactivity.hazardLevel === "Medium"
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                                  : radioactivity.hazardLevel === "High"
                                    ? "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300"
                                    : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
                            )}
                          >
                            {radioactivity.hazardLevel} Hazard
                          </span>
                        )}
                      </div>

                      {radioactivity.description && (
                        <p className="mt-2 text-amber-800 dark:text-amber-400">{radioactivity.description}</p>
                      )}

                      {radioactivity.radiationTypes && radioactivity.radiationTypes.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-amber-700 dark:text-amber-500">Radiation Types:</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {radioactivity.radiationTypes.map((type) => (
                              <div
                                key={type}
                                className="rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-900 dark:bg-amber-900/30 dark:text-amber-300"
                              >
                                {type} Radiation
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
                      <h4 className="text-lg font-medium text-amber-900 dark:text-amber-300">
                        Radiation Types Explained
                      </h4>
                      <div className="mt-3 space-y-3">
                        <div>
                          <p className="font-medium text-amber-800 dark:text-amber-400">Alpha (α) Radiation</p>
                          <p className="text-sm text-amber-700 dark:text-amber-500">
                            Alpha particles consist of two protons and two neutrons (essentially a helium nucleus). They
                            have low penetrating power and can be stopped by a sheet of paper or skin, but are dangerous
                            if ingested or inhaled.
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-amber-800 dark:text-amber-400">Beta (β) Radiation</p>
                          <p className="text-sm text-amber-700 dark:text-amber-500">
                            Beta particles are high-energy electrons or positrons emitted during beta decay. They have
                            moderate penetrating power and can be stopped by a thin sheet of metal or plastic.
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-amber-800 dark:text-amber-400">Gamma (γ) Radiation</p>
                          <p className="text-sm text-amber-700 dark:text-amber-500">
                            Gamma rays are high-energy photons with no mass or charge. They have high penetrating power
                            and require dense materials like lead or concrete for shielding.
                          </p>
                        </div>
                      </div>
                    </div>

                    {isotopes && isotopes.some((i) => !i.isStable) && (
                      <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
                        <h4 className="text-lg font-medium text-amber-900 dark:text-amber-300">Radioactive Isotopes</h4>
                        <p className="mt-2 text-sm text-amber-700 dark:text-amber-500">
                          {name} has {isotopes.filter((i) => !i.isStable).length} radioactive{" "}
                          {isotopes.filter((i) => !i.isStable).length === 1 ? "isotope" : "isotopes"}.
                          {isotopes.some((i) => i.isStable)
                            ? ` It also has ${isotopes.filter((i) => i.isStable).length} stable ${isotopes.filter((i) => i.isStable).length === 1 ? "isotope" : "isotopes"}.`
                            : " It has no stable isotopes."}
                        </p>
                        <div className="mt-3">
                          <p className="text-sm font-medium text-amber-700 dark:text-amber-500">
                            Radioactive isotopes:
                          </p>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {isotopes
                              .filter((i) => !i.isStable)
                              .map((isotope) => (
                                <div
                                  key={isotope.massNumber}
                                  className="rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-900 dark:bg-amber-900/30 dark:text-amber-300"
                                >
                                  {symbol}-{isotope.massNumber}
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {applications &&
                      applications.length > 0 &&
                      applications.some(
                        (app) =>
                          app.toLowerCase().includes("nuclear") ||
                          app.toLowerCase().includes("radiation") ||
                          app.toLowerCase().includes("radioactive"),
                      ) && (
                        <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
                          <h4 className="text-lg font-medium text-amber-900 dark:text-amber-300">
                            Nuclear Applications
                          </h4>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-amber-800 dark:text-amber-400">
                            {applications
                              .filter(
                                (app) =>
                                  app.toLowerCase().includes("nuclear") ||
                                  app.toLowerCase().includes("radiation") ||
                                  app.toLowerCase().includes("radioactive"),
                              )
                              .map((app, index) => (
                                <li key={index}>{app}</li>
                              ))}
                          </ul>
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
                    <p className="text-amber-800 dark:text-amber-400">
                      No detailed radioactivity data available for this element.
                    </p>
                  </div>
                )}

                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
                  <h4 className="font-medium text-amber-800 dark:text-amber-400">About Radioactivity</h4>
                  <p className="mt-1 text-sm text-amber-700 dark:text-amber-500">
                    Radioactivity is the process by which an unstable atomic nucleus loses energy by emitting radiation.
                    Elements with atomic numbers greater than 83 (bismuth) are all radioactive, though some lighter
                    elements also have radioactive isotopes. Radioactive decay can occur through various modes including
                    alpha decay, beta decay, and gamma emission.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
