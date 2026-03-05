"use client"

import { useState } from "react"
import type { ElementType } from "@/types/element"
import type { IsotopeInfo } from "@/data/element-isotopes"
import { motion } from "framer-motion"
import { X, Beaker, AtomIcon, Radiation, Lightbulb, Zap, Thermometer, FlaskConical } from "lucide-react"
import { getCategoryColor } from "@/lib/categorize-elements"
import { cn } from "@/lib/utils"
import PeriodicTrends from "./periodic-trends"
import TrendValueDisplay from "./trend-value-display"
import { getDecayModeInfo, getDecayChain, type DecayChain } from "@/data/nuclear-decay"
import { getElementFunFact, getElementEverydayLife } from "@/data/element-fun-facts"

// Room-temperature state helpers
const GAS_ELEMENTS = new Set([1, 2, 7, 8, 9, 10, 17, 18, 36, 54, 86])
const LIQUID_ELEMENTS = new Set([35, 80])
const SYNTHETIC_ELEMENTS = new Set([113, 114, 115, 116, 117, 118])

function getStateOfMatter(atomicNumber: number): {
  label: string
  description: string
  bgClass: string
  textClass: string
} {
  if (GAS_ELEMENTS.has(atomicNumber))
    return {
      label: "Gas",
      description: "Gas at room temperature (25°C)",
      bgClass: "bg-sky-100 dark:bg-sky-900/40",
      textClass: "text-sky-700 dark:text-sky-300",
    }
  if (LIQUID_ELEMENTS.has(atomicNumber))
    return {
      label: "Liquid",
      description: "Liquid at room temperature (25°C)",
      bgClass: "bg-blue-100 dark:bg-blue-900/40",
      textClass: "text-blue-700 dark:text-blue-300",
    }
  if (SYNTHETIC_ELEMENTS.has(atomicNumber))
    return {
      label: "Synthetic",
      description: "Synthetic element — properties not fully characterized",
      bgClass: "bg-purple-100 dark:bg-purple-900/40",
      textClass: "text-purple-700 dark:text-purple-300",
    }
  return {
    label: "Solid",
    description: "Solid at room temperature (25°C)",
    bgClass: "bg-amber-100 dark:bg-amber-900/40",
    textClass: "text-amber-700 dark:text-amber-300",
  }
}

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
  } = element as ElementType & { radioactivity?: { isRadioactive: boolean; description?: string; radiationTypes?: string[]; hazardLevel?: string } }

  const [activeTab, setActiveTab] = useState<"info" | "isotopes" | "radioactivity">("info")
  const [selectedIsotope, setSelectedIsotope] = useState<IsotopeInfo | null>(null)

  const { getTrendData } = PeriodicTrends()

  const categoryColor = getCategoryColor(category)
  const stateOfMatter = getStateOfMatter(atomicNumber)
  const funFact = getElementFunFact(atomicNumber)
  const everydayLife = getElementEverydayLife(atomicNumber)

  const getDecayChainForIsotope = (isotope: IsotopeInfo | null): DecayChain[] | null => {
    if (!isotope || !isotope.decayChainKey) return null
    return getDecayChain(isotope.decayChainKey)
  }

  const decayChain = getDecayChainForIsotope(selectedIsotope)

  const tabs = [
    { id: "info" as const, label: "Info", icon: <Lightbulb className="h-3.5 w-3.5" /> },
    { id: "isotopes" as const, label: "Isotopes", icon: <AtomIcon className="h-3.5 w-3.5" /> },
    { id: "radioactivity" as const, label: "Radioactivity", icon: <Radiation className="h-3.5 w-3.5" /> },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 24 }}
        transition={{ type: "spring", damping: 28, stiffness: 340 }}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-amber-200 bg-white shadow-2xl dark:border-amber-900/50 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-amber-700 transition-colors hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/50"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header band with category gradient */}
        <div className={cn("rounded-t-2xl px-6 py-4", categoryColor)}>
          <div className="flex items-center gap-4">
            {/* Big symbol box */}
            <div className="flex h-24 w-24 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-white/60 shadow-inner dark:bg-slate-900/50 backdrop-blur-sm">
              <span className="text-[10px] font-semibold text-amber-800/70 dark:text-amber-400/70">{atomicNumber}</span>
              <span className="font-serif text-5xl font-bold leading-none text-amber-900 dark:text-amber-200">
                {symbol}
              </span>
              <span className="mt-0.5 text-[9px] text-amber-700/80 dark:text-amber-500/70">{atomicMass}</span>
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-serif text-3xl font-bold text-amber-900 dark:text-amber-200 md:text-4xl">
                {name}
              </h2>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-amber-800/20 px-2.5 py-0.5 text-xs font-semibold text-amber-900 dark:bg-amber-700/30 dark:text-amber-200">
                  {category}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    stateOfMatter.bgClass,
                    stateOfMatter.textClass,
                  )}
                  title={stateOfMatter.description}
                >
                  {stateOfMatter.label} at 25°C
                </span>
                {group && (
                  <span className="rounded-full bg-amber-800/20 px-2.5 py-0.5 text-xs font-semibold text-amber-900 dark:bg-amber-700/30 dark:text-amber-200">
                    Group {group}
                  </span>
                )}
                <span className="rounded-full bg-amber-800/20 px-2.5 py-0.5 text-xs font-semibold text-amber-900 dark:bg-amber-700/30 dark:text-amber-200">
                  Period {period}
                </span>
                <span className="rounded-full bg-amber-800/20 px-2.5 py-0.5 text-xs font-semibold text-amber-900 dark:bg-amber-700/30 dark:text-amber-200">
                  {block}-block
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-amber-100 dark:border-amber-900/30">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "border-amber-500 text-amber-900 dark:border-amber-400 dark:text-amber-300"
                  : "border-transparent text-amber-600 hover:text-amber-800 dark:text-amber-500 dark:hover:text-amber-300",
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "info" && (
            <div className="space-y-5">
              {/* Fun fact callout */}
              {funFact && (
                <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800/50 dark:bg-amber-900/20">
                  <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-300">{funFact}</p>
                </div>
              )}

              {/* Quick stats grid */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  { label: "Atomic Mass", value: `${atomicMass} u` },
                  { label: "Electron Config", value: electronConfiguration },
                  { label: "Period", value: String(period) },
                  { label: "Group", value: group ? String(group) : "N/A" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-amber-100 bg-amber-50/60 p-3 dark:border-amber-900/30 dark:bg-amber-900/10"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-500">
                      {item.label}
                    </p>
                    <p className="mt-0.5 font-medium text-amber-900 dark:text-amber-200 break-all text-sm">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Periodic Trends */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-serif text-base font-semibold text-amber-800 dark:text-amber-400">
                  <Zap className="h-4 w-4" /> Periodic Trends
                </h3>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {[
                    { label: "Atomic Radius", trend: "atomicRadius" as const },
                    { label: "Electronegativity", trend: "electronegativity" as const },
                    { label: "Ionization Energy", trend: "ionizationEnergy" as const },
                    { label: "Density", trend: "density" as const },
                  ].map(({ label, trend }) => (
                    <div
                      key={trend}
                      className="rounded-lg border border-amber-100 bg-amber-50/60 p-3 dark:border-amber-900/30 dark:bg-amber-900/10"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-500">
                        {label}
                      </p>
                      <div className="mt-0.5">
                        <TrendValueDisplay value={getTrendData(atomicNumber, trend)} trend={trend} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="mb-2 font-serif text-lg font-semibold text-amber-800 dark:text-amber-400">
                  About {name}
                </h3>
                <p className="leading-relaxed text-amber-900 dark:text-amber-200">{description}</p>
              </div>

              {/* Everyday uses */}
              {everydayLife && everydayLife.length > 0 && (
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-serif text-lg font-semibold text-amber-800 dark:text-amber-400">
                    <Thermometer className="h-4 w-4" /> Found in Everyday Life
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {everydayLife.map((item, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm text-amber-800 dark:border-amber-800/50 dark:bg-amber-900/20 dark:text-amber-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications */}
              {applications && applications.length > 0 && (
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-serif text-lg font-semibold text-amber-800 dark:text-amber-400">
                    <Beaker className="h-4 w-4" /> Applications
                  </h3>
                  <ul className="space-y-1">
                    {applications.map((application, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-amber-900 dark:text-amber-200">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                        {application}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Discovery */}
              {(discoveredBy || namedAfter) && (
                <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
                  <h3 className="mb-2 font-serif text-base font-semibold text-amber-800 dark:text-amber-400">
                    Discovery & Name
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {discoveredBy && (
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-500">
                          Discovered By
                        </p>
                        <p className="mt-0.5 text-sm text-amber-900 dark:text-amber-300">{discoveredBy}</p>
                      </div>
                    )}
                    {namedAfter && (
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-500">
                          Named After
                        </p>
                        <p className="mt-0.5 text-sm text-amber-900 dark:text-amber-300">{namedAfter}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "isotopes" && (
            <div>
              <div className="mb-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-3 dark:border-amber-900/30 dark:bg-amber-900/10">
                <AtomIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  Isotopes are atoms of the same element with different numbers of neutrons, giving them different
                  atomic masses. Some are stable; others are radioactive and decay over time.
                </p>
              </div>

              {isotopes && isotopes.length > 0 ? (
                <div className="space-y-3">
                  {(isotopes as IsotopeInfo[]).map((isotope) => (
                    <div
                      key={isotope.massNumber}
                      className={cn(
                        "rounded-xl border p-4 transition-colors",
                        isotope.isStable
                          ? "border-green-200 bg-green-50/50 dark:border-green-900/30 dark:bg-green-900/10"
                          : "border-amber-200 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-900/10",
                        selectedIsotope?.massNumber === isotope.massNumber &&
                          "ring-2 ring-amber-400 dark:ring-amber-600",
                      )}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-serif text-lg font-semibold text-amber-900 dark:text-amber-200">
                          {symbol}-{isotope.massNumber}
                        </h4>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-semibold",
                            isotope.isStable
                              ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
                          )}
                        >
                          {isotope.isStable ? "Stable" : "Radioactive"}
                        </span>
                      </div>

                      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-3">
                        {isotope.abundance !== undefined && (
                          <div>
                            <p className="text-[10px] uppercase tracking-wide text-amber-600 dark:text-amber-500">
                              Natural Abundance
                            </p>
                            <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                              {isotope.abundance.toFixed(4)}%
                            </p>
                          </div>
                        )}
                        {isotope.halfLife && (
                          <div>
                            <p className="text-[10px] uppercase tracking-wide text-amber-600 dark:text-amber-500">
                              Half-life
                            </p>
                            <p className="text-sm font-medium text-amber-900 dark:text-amber-200">{isotope.halfLife}</p>
                          </div>
                        )}
                      </div>

                      {isotope.description && (
                        <p className="mt-2 text-sm text-amber-800 dark:text-amber-400">{isotope.description}</p>
                      )}

                      {isotope.decayModes && isotope.decayModes.length > 0 && (
                        <div className="mt-3">
                          <p className="mb-1 text-[10px] uppercase tracking-wide text-amber-600 dark:text-amber-500">
                            Decay Modes
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {isotope.decayModes.map((mode) => {
                              const decayInfo = getDecayModeInfo(mode)
                              return (
                                <span
                                  key={mode}
                                  className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900 dark:bg-amber-900/40 dark:text-amber-300"
                                  title={decayInfo.description}
                                >
                                  {decayInfo.type} ({decayInfo.symbol})
                                </span>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {isotope.decayChainKey && (
                        <button
                          onClick={() =>
                            setSelectedIsotope(selectedIsotope?.massNumber === isotope.massNumber ? null : isotope)
                          }
                          className="mt-3 rounded-lg bg-amber-200 px-3 py-1.5 text-xs font-semibold text-amber-900 transition-colors hover:bg-amber-300 dark:bg-amber-800/60 dark:text-amber-200 dark:hover:bg-amber-700"
                        >
                          {selectedIsotope?.massNumber === isotope.massNumber ? "Hide" : "View"} Decay Chain
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-900/30 dark:bg-amber-900/10 dark:text-amber-400">
                  No detailed isotope data available for this element.
                </div>
              )}

              {selectedIsotope && decayChain && (
                <div className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-900/20">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="font-serif text-lg font-semibold text-amber-800 dark:text-amber-300">
                      Decay Chain: {symbol}-{selectedIsotope.massNumber}
                    </h4>
                    <button
                      onClick={() => setSelectedIsotope(null)}
                      className="rounded-full p-1 text-amber-600 hover:bg-amber-200 dark:hover:bg-amber-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mb-4 text-sm text-amber-700 dark:text-amber-400">
                    Sequence of radioactive decays from this isotope to a stable end product.
                  </p>
                  <div className="overflow-x-auto">
                    <div className="flex min-w-[500px] flex-col gap-0">
                      {decayChain.map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex w-36 items-center justify-end rounded-lg bg-amber-100 px-3 py-2 text-sm font-medium text-amber-900 dark:bg-amber-900/30 dark:text-amber-200">
                            {step.parent}
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="flex items-center gap-1 rounded-full bg-amber-200/80 px-2 py-0.5 text-xs text-amber-800 dark:bg-amber-800/50 dark:text-amber-300">
                              <span className="font-mono font-bold">{getDecayModeInfo(step.decayMode).symbol}</span>
                              {step.halfLife && <span className="opacity-70">T½: {step.halfLife}</span>}
                            </div>
                            {index < decayChain.length - 1 && (
                              <div className="h-4 w-px bg-amber-300 dark:bg-amber-700" />
                            )}
                          </div>
                          <div className="flex w-36 items-center rounded-lg bg-amber-100 px-3 py-2 text-sm font-medium text-amber-900 dark:bg-amber-900/30 dark:text-amber-200">
                            {step.daughter}
                            {index === decayChain.length - 1 && (
                              <span className="ml-2 rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                                stable
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "radioactivity" && (
            <div className="space-y-4">
              {radioactivity ? (
                <>
                  <div
                    className={cn(
                      "flex items-start gap-4 rounded-xl border p-4",
                      radioactivity.isRadioactive
                        ? "border-orange-200 bg-orange-50/60 dark:border-orange-900/30 dark:bg-orange-900/10"
                        : "border-green-200 bg-green-50/60 dark:border-green-900/30 dark:bg-green-900/10",
                    )}
                  >
                    <Radiation
                      className={cn(
                        "mt-0.5 h-6 w-6 flex-shrink-0",
                        radioactivity.isRadioactive
                          ? "text-orange-500 dark:text-orange-400"
                          : "text-green-500 dark:text-green-400",
                      )}
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-semibold text-amber-900 dark:text-amber-200">
                          {radioactivity.isRadioactive ? "Radioactive Element" : "Stable Element"}
                        </h4>
                        {radioactivity.isRadioactive && radioactivity.hazardLevel && (
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-0.5 text-xs font-bold",
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
                        <p className="mt-1 text-sm text-amber-800 dark:text-amber-300">{radioactivity.description}</p>
                      )}
                    </div>
                  </div>

                  {radioactivity.radiationTypes && radioactivity.radiationTypes.length > 0 && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-500">
                        Radiation Types Emitted
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {radioactivity.radiationTypes.map((type) => (
                          <span
                            key={type}
                            className="rounded-lg bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-900 dark:bg-amber-900/40 dark:text-amber-200"
                          >
                            {type} Radiation
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {isotopes && (isotopes as IsotopeInfo[]).some((i) => !i.isStable) && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-500">
                        Radioactive Isotopes
                      </h4>
                      <p className="mb-3 text-sm text-amber-800 dark:text-amber-400">
                        {name} has{" "}
                        <strong>{(isotopes as IsotopeInfo[]).filter((i) => !i.isStable).length}</strong> known
                        radioactive isotope
                        {(isotopes as IsotopeInfo[]).filter((i) => !i.isStable).length !== 1 ? "s" : ""}.
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {(isotopes as IsotopeInfo[])
                          .filter((i) => !i.isStable)
                          .map((isotope) => (
                            <span
                              key={isotope.massNumber}
                              className="rounded-md bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                            >
                              {symbol}-{isotope.massNumber}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-900/30 dark:bg-amber-900/10 dark:text-amber-400">
                  No radioactivity data available for this element.
                </div>
              )}

              {/* Radiation explainer cards */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
                <h4 className="mb-3 font-serif text-base font-semibold text-amber-800 dark:text-amber-400">
                  Radiation Types Explained
                </h4>
                <div className="grid gap-3 md:grid-cols-3">
                  {[
                    {
                      symbol: "α",
                      name: "Alpha",
                      color: "text-red-600 dark:text-red-400",
                      bg: "bg-red-50 dark:bg-red-900/20",
                      border: "border-red-200 dark:border-red-900/30",
                      desc: "2 protons + 2 neutrons (helium nucleus). Stopped by paper or skin, but dangerous if inhaled.",
                    },
                    {
                      symbol: "β",
                      name: "Beta",
                      color: "text-orange-600 dark:text-orange-400",
                      bg: "bg-orange-50 dark:bg-orange-900/20",
                      border: "border-orange-200 dark:border-orange-900/30",
                      desc: "High-energy electron or positron. Stopped by plastic or metal sheet.",
                    },
                    {
                      symbol: "γ",
                      name: "Gamma",
                      color: "text-purple-600 dark:text-purple-400",
                      bg: "bg-purple-50 dark:bg-purple-900/20",
                      border: "border-purple-200 dark:border-purple-900/30",
                      desc: "High-energy photon. Highly penetrating — requires lead or concrete shielding.",
                    },
                  ].map((r) => (
                    <div key={r.name} className={cn("rounded-lg border p-3", r.bg, r.border)}>
                      <div className="flex items-center gap-2">
                        <span className={cn("font-serif text-2xl font-bold", r.color)}>{r.symbol}</span>
                        <span className={cn("font-semibold", r.color)}>{r.name}</span>
                      </div>
                      <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
