import PeriodicTable from "@/components/periodic-table"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "तत्त्व चक्र | The Periodic Table with Indian Historical Theme",
  description:
    "An interactive periodic table with all 118 elements, featuring detailed isotope and radioactivity information",
}

export const viewport: Viewport = {
  themeColor: "#78350f",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <header className="mb-6 md:mb-8 text-center">
          <h1 className="font-serif text-3xl font-bold text-amber-900 dark:text-amber-500 md:text-4xl lg:text-5xl xl:text-6xl">
            तत्त्व चक्र
          </h1>
          <p className="mt-2 text-lg md:text-xl text-amber-800 dark:text-amber-400">The Periodic Table of Elements</p>
          <div className="mx-auto mt-4 md:mt-6 max-w-3xl rounded-lg border border-amber-200 bg-amber-50/50 p-3 md:p-4 text-left dark:border-amber-900/30 dark:bg-amber-900/10">
            <p className="text-sm md:text-base text-amber-900 dark:text-amber-200">
              In ancient India, the concept of elements or "Panchamahabhuta" (five great elements) - Earth, Water, Fire,
              Air, and Space - formed the foundation of natural philosophy. Today's modern periodic table, while
              different in composition, shares the same spirit of organizing and understanding the fundamental building
              blocks of our universe.
            </p>
            <p className="mt-2 text-sm md:text-base text-amber-900 dark:text-amber-200">
              Explore all 118 elements in this interactive periodic table, featuring detailed information about
              isotopes, nuclear decay, radioactivity, and practical applications of each element.
            </p>
          </div>
        </header>
        <PeriodicTable />
      </div>
    </main>
  )
}
