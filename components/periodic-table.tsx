"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { elementsWithIsotopes } from "@/data/element-isotopes"
import ElementCard from "./element-card"
import ElementDetails from "./element-details"
import ElementComparison from "./element-comparison"
import type { ElementType } from "@/types/element"
import { categorizeElements } from "@/lib/categorize-elements"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import PeriodicTrends from "./periodic-trends"

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<ElementType | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [comparisonElements, setComparisonElements] = useState<ElementType[]>([])
  const [showComparison, setShowComparison] = useState(false)

  const { activeTrend, setActiveTrend, getTrendColorForElement, TrendSelector, TrendLegend } = PeriodicTrends()

  const categories = categorizeElements(elementsWithIsotopes)

  const filteredElements = categoryFilter
    ? elementsWithIsotopes.filter((element) => element.category === categoryFilter)
    : elementsWithIsotopes

  const handleElementClick = (element: ElementType) => {
    if (comparisonElements.length < 2 && showComparison) {
      // If in comparison mode and less than 2 elements selected, add to comparison
      if (!comparisonElements.find((e) => e.atomicNumber === element.atomicNumber)) {
        setComparisonElements([...comparisonElements, element])
      }
    } else {
      // Otherwise show element details
      setSelectedElement(element)
    }
  }

  const toggleComparisonMode = () => {
    if (showComparison) {
      // Exit comparison mode
      setComparisonElements([])
      setShowComparison(false)
    } else {
      // Enter comparison mode
      setShowComparison(true)
    }
  }

  const removeFromComparison = (atomicNumber: number) => {
    setComparisonElements(comparisonElements.filter((e) => e.atomicNumber !== atomicNumber))
  }

  // Create a mapping of elements by atomic number for the periodic table grid
  const elementsByNumber = elementsWithIsotopes.reduce(
    (acc, element) => {
      acc[element.atomicNumber] = element
      return acc
    },
    {} as Record<number, ElementType>,
  )

  return (
    <div className="relative">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="font-serif text-2xl font-semibold text-amber-800 dark:text-amber-400">
            {categoryFilter ? `${categoryFilter} Elements` : "All Elements"}
          </h2>
          <button
            onClick={toggleComparisonMode}
            className={cn(
              "flex items-center gap-2 rounded-full border border-amber-300 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-amber-100 dark:border-amber-800 dark:hover:bg-amber-900/50",
              showComparison
                ? "bg-amber-200 text-amber-900 dark:bg-amber-800 dark:text-amber-100"
                : "bg-transparent text-amber-800 dark:text-amber-400",
            )}
          >
            {showComparison ? (
              <>
                <X className="h-4 w-4" />
                <span>Exit Comparison</span>
              </>
            ) : (
              <span>Compare Elements</span>
            )}
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setCategoryFilter(null)}
            className={cn(
              "rounded-full border border-amber-300 px-3 py-1 text-sm transition-colors hover:bg-amber-100 dark:border-amber-800 dark:hover:bg-amber-900/50",
              !categoryFilter
                ? "bg-amber-200 text-amber-900 dark:bg-amber-800 dark:text-amber-100"
                : "bg-transparent text-amber-800 dark:text-amber-400",
            )}
          >
            All
          </button>
          {Object.keys(categories).map((category) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={cn(
                "rounded-full border border-amber-300 px-3 py-1 text-sm transition-colors hover:bg-amber-100 dark:border-amber-800 dark:hover:bg-amber-900/50",
                categoryFilter === category
                  ? "bg-amber-200 text-amber-900 dark:bg-amber-800 dark:text-amber-100"
                  : "bg-transparent text-amber-800 dark:text-amber-400",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <TrendSelector />
      {activeTrend && <TrendLegend />}

      {showComparison && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
          <h3 className="mb-2 font-serif text-lg font-semibold text-amber-800 dark:text-amber-400">
            Select elements to compare ({comparisonElements.length}/2)
          </h3>
          <div className="flex flex-wrap gap-2">
            {comparisonElements.map((element) => (
              <div
                key={element.atomicNumber}
                className="flex items-center gap-2 rounded-full bg-amber-200 px-3 py-1 text-sm font-medium text-amber-900 dark:bg-amber-800 dark:text-amber-100"
              >
                <span>
                  {element.symbol} - {element.name}
                </span>
                <button
                  onClick={() => removeFromComparison(element.atomicNumber)}
                  className="rounded-full p-0.5 hover:bg-amber-300 dark:hover:bg-amber-700"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {categoryFilter ? (
        // Display filtered elements in a grid
        <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-3 md:grid-cols-[repeat(auto-fill,minmax(110px,1fr))] md:gap-4 lg:grid-cols-[repeat(auto-fill,minmax(130px,1fr))]">
          {filteredElements.map((element) => (
            <motion.div
              key={element.atomicNumber}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
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
  elementsByNumber: Record<number, ElementType>
  handleElementClick: (element: ElementType) => void
  comparisonElements: ElementType[]
  showComparison: boolean
  activeTrend: string | null
  getTrendColorForElement: (element: ElementType) => string
}

function PeriodicTableGrid({
  elementsByNumber,
  handleElementClick,
  comparisonElements,
  showComparison,
  activeTrend,
  getTrendColorForElement,
}: PeriodicTableGridProps) {
  // Define the structure of the periodic table
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
    // Empty row
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // Lanthanides
    [0, 0, 0, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 0],
    // Actinides
    [0, 0, 0, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 0],
  ]

  return (
    <div className="grid gap-1">
      {tableStructure.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((atomicNumber, colIndex) => {
            if (atomicNumber === 0) {
              return (
                <div key={`empty-${rowIndex}-${colIndex}`} className="h-14 w-14 md:h-16 md:w-16 lg:h-18 lg:w-18"></div>
              )
            }

            const element = elementsByNumber[atomicNumber]
            if (!element) {
              return (
                <div
                  key={`missing-${atomicNumber}`}
                  className="flex h-14 w-14 items-center justify-center rounded-lg border border-red-300 bg-red-50 text-xs text-red-800 md:h-16 md:w-16 lg:h-18 lg:w-18"
                >
                  Missing {atomicNumber}
                </div>
              )
            }

            return (
              <motion.div
                key={element.atomicNumber}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                onClick={() => handleElementClick(element)}
                className="h-14 w-14 md:h-16 md:w-16 lg:h-18 lg:w-18"
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
  )
}
