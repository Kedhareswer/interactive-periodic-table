import type { ElementType } from "@/types/element"
import { elementsWithApplications } from "./element-applications"

// Add image URLs to elements
export const elementsWithImages: ElementType[] = elementsWithApplications.map((element) => {
  const image = getImageForElement(element.atomicNumber)
  return {
    ...element,
    image,
  }
})

function getImageForElement(atomicNumber: number): string | undefined {
  // Base URL for placeholder images - in a real app, these would be actual element images
  const baseUrl = "/placeholder.svg?height=200&width=200&text="

  // Map of element atomic numbers to image URLs
  const imageMap: Record<number, string> = {
    1: `${baseUrl}Hydrogen`,
    2: `${baseUrl}Helium`,
    3: `${baseUrl}Lithium`,
    6: `${baseUrl}Carbon`,
    7: `${baseUrl}Nitrogen`,
    8: `${baseUrl}Oxygen`,
    11: `${baseUrl}Sodium`,
    12: `${baseUrl}Magnesium`,
    13: `${baseUrl}Aluminum`,
    14: `${baseUrl}Silicon`,
    16: `${baseUrl}Sulfur`,
    17: `${baseUrl}Chlorine`,
    19: `${baseUrl}Potassium`,
    20: `${baseUrl}Calcium`,
    22: `${baseUrl}Titanium`,
    24: `${baseUrl}Chromium`,
    26: `${baseUrl}Iron`,
    29: `${baseUrl}Copper`,
    30: `${baseUrl}Zinc`,
    47: `${baseUrl}Silver`,
    50: `${baseUrl}Tin`,
    53: `${baseUrl}Iodine`,
    74: `${baseUrl}Tungsten`,
    78: `${baseUrl}Platinum`,
    79: `${baseUrl}Gold`,
    80: `${baseUrl}Mercury`,
    82: `${baseUrl}Lead`,
    92: `${baseUrl}Uranium`,
  }

  return imageMap[atomicNumber]
}
