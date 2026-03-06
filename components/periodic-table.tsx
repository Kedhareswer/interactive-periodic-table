"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { elementsWithIsotopes, type ElementWithIsotopes } from "@/data/element-isotopes"
import ElementCard from "./element-card"
import ElementDetails from "./element-details"
import ElementComparison from "./element-comparison"
import type { ElementType } from "@/types/element"
import { categorizeElements } from "@/lib/categorize-elements"
import { cn } from "@/lib/utils"
import { X, Search, Shuffle, FlaskConical } from "lucide-react"
import PeriodicTrends from "./periodic-trends"

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<ElementWithIsotopes | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [comparisonElements, setComparisonElements] = useState<ElementWithIsotopes[]>([])
  const [showComparison, setShowComparison] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const { activeTrend, setActiveTrend, getTrendColorForElement, TrendSelector, TrendLegend } = PeriodicTrends()

  const categories = categorizeElements(elementsWithIsotopes)

  const searchFilteredElements = useMemo(() => {
    if (!searchQuery.trim()) return elementsWithIsotopes
    const q = searchQuery.toLowerCase().trim()
    return elementsWithIsotopes.filter(
      (el) =>
        el.name.toLowerCase().includes(q) ||
        el.symbol.toLowerCase().includes(q) ||
        String(el.atomicNumber).includes(q) ||
        el.category.toLowerCase().includes(q),
    )
  }, [searchQuery])

  const filteredElements = categoryFilter
    ? searchFilteredElements.filter((element) => element.category === categoryFilter)
    : searchFilteredElements

  const handleElementClick = (element: ElementWithIsotopes) => {
    if (comparisonElements.length < 2 && showComparison) {
      if (!comparisonElements.find((e) => e.atomicNumber === element.atomicNumber)) {
        setComparisonElements([...comparisonElements, element])
      }
    } else {
      setSelectedElement(element)
    }
  }

  const handleRandomElement = () => {
    const randomIndex = Math.floor(Math.random() * elementsWithIsotopes.length)
    setSelectedElement(elementsWithIsotopes[randomIndex])
  }

  const toggleComparisonMode = () => {
    if (showComparison) {
      setComparisonElements([])
      setShowComparison(false)
    } else {
      setShowComparison(true)
    }
  }

  const removeFromComparison = (atomicNumber: number) => {
    setComparisonElements(comparisonElements.filter((e) => e.atomicNumber !== atomicNumber))
  }

  const elementsByNumber = elementsWithIsotopes.reduce(
    (acc, element) => {
      acc[element.atomicNumber] = element
      return acc
    },
    {} as Record<number, ElementWithIsotopes>,
  )

  const isSearchActive = searchQuery.trim().length > 0

  return (
    <div className="relative">
      {/* Top Controls: Search + Actions */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500 dark:text-amber-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search element, symbol, number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-amber-300 bg-white/80 py-2 pl-9 pr-9 text-sm text-amber-900 placeholder-amber-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 dark:border-amber-700 dark:bg-slate-800/80 dark:text-amber-100 dark:placeholder-amber-600 dark:focus:ring-amber-900/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Random Element */}
        <button
          onClick={handleRandomElement}
          className="flex items-center gap-2 rounded-full border border-amber-300 bg-white/80 px-4 py-2 text-sm font-medium text-amber-800 shadow-sm transition-all hover:bg-amber-100 hover:shadow active:scale-95 dark:border-amber-700 dark:bg-slate-800/80 dark:text-amber-300 dark:hover:bg-amber-900/40"
          title="Discover a random element"
        >
          <Shuffle className="h-4 w-4" />
          <span className="hidden sm:inline">Surprise Me!</span>
        </button>

        {/* Compare Elements */}
        <button
          onClick={toggleComparisonMode}
          className={cn(
            "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition-all hover:shadow active:scale-95",
            showComparison
              ? "border-amber-400 bg-amber-200 text-amber-900 dark:border-amber-600 dark:bg-amber-800 dark:text-amber-100"
              : "border-amber-300 bg-white/80 text-amber-800 hover:bg-amber-100 dark:border-amber-700 dark:bg-slate-800/80 dark:text-amber-300 dark:hover:bg-amber-900/40",
          )}
        >
          {showComparison ? (
            <>
              <X className="h-4 w-4" />
              <span>Exit Compare</span>
            </>
          ) : (
            <>
              <FlaskConical className="h-4 w-4" />
              <span className="hidden sm:inline">Compare</span>
            </>
          )}
        </button>
      </div>

      {/* Category Filters */}
      <div className="mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => setCategoryFilter(null)}
          className={cn(
            "rounded-full border px-3 py-1 text-sm font-medium transition-all hover:shadow active:scale-95",
            !categoryFilter
              ? "border-amber-400 bg-amber-200 text-amber-900 dark:border-amber-600 dark:bg-amber-800 dark:text-amber-100"
              : "border-amber-300 bg-transparent text-amber-800 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/50",
          )}
        >
          All ({elementsWithIsotopes.length})
        </button>
        {Object.entries(categories).map(([category, els]) => (
          <button
            key={category}
            onClick={() => setCategoryFilter(category === categoryFilter ? null : category)}
            className={cn(
              "rounded-full border px-3 py-1 text-sm font-medium transition-all hover:shadow active:scale-95",
              categoryFilter === category
                ? "border-amber-400 bg-amber-200 text-amber-900 dark:border-amber-600 dark:bg-amber-800 dark:text-amber-100"
                : "border-amber-300 bg-transparent text-amber-800 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/50",
            )}
          >
            {category} ({els.length})
          </button>
        ))}
      </div>

      <TrendSelector />
      {activeTrend && <TrendLegend />}

      {showComparison && (
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50/80 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
          <h3 className="mb-2 font-serif text-lg font-semibold text-amber-800 dark:text-amber-400">
            Pick 2 elements to compare ({comparisonElements.length}/2)
          </h3>
          <div className="flex flex-wrap gap-2">
            {comparisonElements.map((element) => (
              <div
                key={element.atomicNumber}
                className="flex items-center gap-2 rounded-full bg-amber-200 px-3 py-1 text-sm font-medium text-amber-900 dark:bg-amber-800 dark:text-amber-100"
              >
                <span>{element.symbol} — {element.name}</span>
                <button
                  onClick={() => removeFromComparison(element.atomicNumber)}
                  className="rounded-full p-0.5 hover:bg-amber-300 dark:hover:bg-amber-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {comparisonElements.length === 0 && (
              <p className="text-sm text-amber-600 dark:text-amber-500">Click any element to add it to the comparison.</p>
            )}
          </div>
        </div>
      )}

      {/* Search results heading */}
      {isSearchActive && (
        <div className="mb-4 flex items-center gap-2">
          <Search className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
            {filteredElements.length === 0
              ? "No elements found"
              : `${filteredElements.length} element${filteredElements.length !== 1 ? "s" : ""} found`}
          </span>
        </div>
      )}

      {categoryFilter || isSearchActive ? (
        // Display filtered/searched elements in a grid
        <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-3 md:grid-cols-[repeat(auto-fill,minmax(110px,1fr))] md:gap-4 lg:grid-cols-[repeat(auto-fill,minmax(130px,1fr))]">
          {filteredElements.map((element) => (
            <motion.div
              key={element.atomicNumber}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => handleElementClick(element)}
            >
              <ElementCard
                element={element}
                isSelected={comparisonElements.some((e) => e.atomicNumber === element.atomicNumber)}
                selectionMode={showComparison}
                trendColor={activeTrend ? getTrendColorForElement(element) : ""}
              />
            </motion.div>
          ))}
          {filteredElements.length === 0 && (
            <div className="col-span-full py-12 text-center text-amber-600 dark:text-amber-500">
              <Search className="mx-auto mb-3 h-10 w-10 opacity-40" />
              <p className="text-lg font-medium">No elements found</p>
              <p className="text-sm opacity-70">Try a different name, symbol, or number</p>
            </div>
          )}
        </div>
      ) : (
        // Display standard periodic table layout
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[1000px]">
            <PeriodicTableGrid
              elementsByNumber={elementsByNumber}
              handleElementClick={handleElementClick}
              comparisonElements={comparisonElements}
              showComparison={showComparison}
              activeTrend={activeTrend}
              getTrendColorForElement={getTrendColorForElement}
            />
          </div>
        </div>
      )}

      <AnimatePresence>
        {selectedElement && !showComparison && (
          <ElementDetails element={selectedElement} onClose={() => setSelectedElement(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {comparisonElements.length === 2 && showComparison && (
          <ElementComparison
            elements={comparisonElements}
            onClose={() => {
              setComparisonElements([])
              setShowComparison(false)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

interface PeriodicTableGridProps {
  elementsByNumber: Record<number, ElementWithIsotopes>
  handleElementClick: (element: ElementWithIsotopes) => void
  comparisonElements: ElementWithIsotopes[]
  showComparison: boolean
  activeTrend: string | null
  getTrendColorForElement: (element: ElementType) => string
}

const GROUP_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

function PeriodicTableGrid({
  elementsByNumber,
  handleElementClick,
  comparisonElements,
  showComparison,
  activeTrend,
  getTrendColorForElement,
}: PeriodicTableGridProps) {
  const tableStructure = [
    // Period 1
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    // Period 2
    [3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 7, 8, 9, 10],
    // Period 3
    [11, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 14, 15, 16, 17, 18],
    // Period 4
    [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
    // Period 5
    [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
    // Period 6
    [55, 56, 57, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
    // Period 7
    [87, 88, 89, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118],
    // Empty row (spacer)
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // Lanthanides
    [0, 0, 0, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 0],
    // Actinides
    [0, 0, 0, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 0],
  ]

  const periodLabels = ["1", "2", "3", "4", "5", "6", "7", "", "La", "Ac"]

  return (
    <div>
      {/* Group numbers header */}
      <div className="mb-1 flex gap-1 pl-[calc(theme(space.14)+theme(space.1))] md:pl-[calc(theme(space.16)+theme(space.1))]">
        {GROUP_NUMBERS.map((g) => (
          <div
            key={g}
            className="flex h-5 w-14 items-center justify-center text-[10px] font-semibold text-amber-600/70 dark:text-amber-500/50 md:w-16"
          >
            {g}
          </div>
        ))}
      </div>

      <div className="grid gap-1">
        {tableStructure.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-1">
            {/* Period label */}
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center text-xs font-bold text-amber-600/70 dark:text-amber-500/50 md:h-16 md:w-16">
              {periodLabels[rowIndex]}
            </div>

            {row.map((atomicNumber, colIndex) => {
              if (atomicNumber === 0) {
                return (
                  <div
                    key={`empty-${rowIndex}-${colIndex}`}
                    className="h-14 w-14 flex-shrink-0 md:h-16 md:w-16"
                  />
                )
              }

              const element = elementsByNumber[atomicNumber]
              if (!element) {
                return (
                  <div
                    key={`missing-${atomicNumber}`}
                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border border-red-300 bg-red-50 text-xs text-red-800 md:h-16 md:w-16"
                  >
                    {atomicNumber}
                  </div>
                )
              }

              return (
                <motion.div
                  key={element.atomicNumber}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleElementClick(element)}
                  className="h-14 w-14 flex-shrink-0 md:h-16 md:w-16"
                >
                  <ElementCard
                    element={element}
                    isSelected={comparisonElements.some((e) => e.atomicNumber === element.atomicNumber)}
                    selectionMode={showComparison}
                    compact
                    trendColor={activeTrend ? getTrendColorForElement(element) : ""}
                  />
                </motion.div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Legend for lanthanides/actinides */}
      <div className="mt-2 flex items-center gap-4 pl-[calc(theme(space.14)+theme(space.1))] text-[11px] text-amber-600/80 dark:text-amber-500/60 md:pl-[calc(theme(space.16)+theme(space.1))]">
        <span>La = Lanthanides (57–71)</span>
        <span>Ac = Actinides (89–103)</span>
      </div>
    </div>
  )
}
