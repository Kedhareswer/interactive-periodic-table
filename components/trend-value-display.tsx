import { cn } from "@/lib/utils"

interface TrendValueDisplayProps {
  value: number
  trend: string
  className?: string
}

export default function TrendValueDisplay({ value, trend, className }: TrendValueDisplayProps) {
  if (!value) return <span className={cn("text-amber-700/60 dark:text-amber-500/60", className)}>N/A</span>

  // Format the value based on the trend type
  let formattedValue = value.toString()
  let unit = ""

  if (trend === "atomicRadius") {
    formattedValue = value.toFixed(0)
    unit = " pm"
  } else if (trend === "electronegativity") {
    formattedValue = value.toFixed(1)
    unit = ""
  } else if (trend === "ionizationEnergy") {
    formattedValue = value.toFixed(1)
    unit = " eV"
  } else if (trend === "density") {
    // Special handling for density due to wide range
    if (value < 0.1) {
      formattedValue = value.toExponential(2)
    } else {
      formattedValue = value.toFixed(2)
    }
    unit = " g/cm³"
  }

  return (
    <span className={cn("font-medium text-amber-900 dark:text-amber-300", className)}>
      {formattedValue}
      {unit}
    </span>
  )
}
