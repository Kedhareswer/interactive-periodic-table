import type { IsotopeInfo } from "@/data/element-isotopes"

export interface ElementType {
  atomicNumber: number
  symbol: string
  name: string
  atomicMass: string
  category: string
  group?: number
  period: number
  block: string
  electronConfiguration: string
  description: string
  discoveredBy?: string
  namedAfter?: string
  applications?: string[]
  isotopes?: IsotopeInfo[]
}
