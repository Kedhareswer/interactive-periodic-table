import PeriodicTable from "@/components/periodic-table"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "तत्त्व चक्र | Interactive Periodic Table",
  description:
    "An interactive periodic table with all 118 elements, featuring detailed isotope and radioactivity information, fun facts, and element comparisons.",
}

export const viewport: Viewport = {
  themeColor: "#78350f",
}

const STATS = [
  { value: "118", label: "Elements" },
  { value: "94", label: "Naturally Occurring" },
  { value: "10", label: "Categories" },
  { value: "~3000", label: "Known Isotopes" },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-50/80 to-amber-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-6 md:py-10">
        <header className="mb-8 text-center">
          {/* Sanskrit title */}
          <div className="inline-block">
            <h1 className="font-serif text-4xl font-bold text-amber-900 dark:text-amber-400 md:text-5xl lg:text-6xl">
              तत्त्व चक्र
            </h1>
            <p className="mt-1 text-sm font-medium tracking-[0.25em] text-amber-600 dark:text-amber-500 uppercase">
              The Interactive Periodic Table
            </p>
          </div>

          {/* Stats row */}
          <div className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-xl border border-amber-200 bg-white/70 px-5 py-2.5 shadow-sm dark:border-amber-800/40 dark:bg-slate-800/60"
              >
                <span className="font-serif text-2xl font-bold text-amber-800 dark:text-amber-300">{stat.value}</span>
                <span className="text-xs font-medium text-amber-600 dark:text-amber-500">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Intro blurb */}
          <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-amber-200 bg-white/60 px-5 py-4 text-left shadow-sm dark:border-amber-900/30 dark:bg-slate-800/40">
            <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-200">
              In ancient India, the <em>Panchamahabhuta</em> (five great elements) — Earth, Water, Fire, Air, and Space
              — formed the foundation of natural philosophy. Today's periodic table organizes 118 known elements,
              revealing patterns in their atomic structure, reactivity, and properties.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-amber-700 dark:text-amber-400">
              Click any element to explore its isotopes, radioactivity, fun facts, and real-world applications.
              Use <strong>Search</strong> to find elements instantly, <strong>Surprise Me!</strong> to discover a random
              element, or <strong>Compare</strong> two elements side by side.
            </p>
          </div>
        </header>

        <PeriodicTable />
      </div>
    </main>
  )
}
