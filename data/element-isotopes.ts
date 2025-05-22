import type { ElementType } from "@/types/element"
import { elementsWithApplications } from "./element-applications"

export interface IsotopeInfo {
  massNumber: number
  abundance?: number // natural abundance in percentage
  halfLife?: string // for radioactive isotopes
  isStable: boolean
  description?: string
  decayModes?: string[] // Types of decay this isotope undergoes
  decayChainKey?: string // Key to look up the decay chain
}

export interface ElementWithIsotopes extends ElementType {
  isotopes: IsotopeInfo[]
  radioactivity?: {
    isRadioactive: boolean
    description?: string
    radiationTypes?: string[]
    hazardLevel?: "Low" | "Medium" | "High" | "Extreme"
  }
}

// Function to add isotope data to elements
export function addIsotopeData(elements: ElementType[]): ElementWithIsotopes[] {
  return elements.map((element) => {
    return {
      ...element,
      isotopes: getIsotopesForElement(element.atomicNumber),
      radioactivity: getRadioactivityInfo(element.atomicNumber),
    }
  })
}

// Get radioactivity information for an element
function getRadioactivityInfo(atomicNumber: number): ElementWithIsotopes["radioactivity"] {
  // Elements with atomic numbers >= 83 (bismuth) are generally radioactive
  // Some lighter elements also have radioactive isotopes

  if (atomicNumber >= 83) {
    return {
      isRadioactive: true,
      description: "Naturally radioactive element with no stable isotopes.",
      radiationTypes: ["Alpha", "Beta", "Gamma"],
      hazardLevel: atomicNumber >= 90 ? "High" : "Medium",
    }
  }

  // Special cases for radioactive elements with atomic number < 83
  switch (atomicNumber) {
    case 43: // Technetium
      return {
        isRadioactive: true,
        description: "The lightest element with no stable isotopes.",
        radiationTypes: ["Beta", "Gamma"],
        hazardLevel: "Medium",
      }
    case 61: // Promethium
      return {
        isRadioactive: true,
        description: "Radioactive rare earth element with no stable isotopes.",
        radiationTypes: ["Beta", "Gamma"],
        hazardLevel: "Medium",
      }
    case 19: // Potassium (K-40 is radioactive)
      return {
        isRadioactive: true,
        description: "Contains the naturally occurring radioactive isotope K-40.",
        radiationTypes: ["Beta", "Gamma"],
        hazardLevel: "Low",
      }
    case 6: // Carbon (C-14 is radioactive)
      return {
        isRadioactive: true,
        description: "Contains trace amounts of radioactive C-14 used in radiocarbon dating.",
        radiationTypes: ["Beta"],
        hazardLevel: "Low",
      }
    case 1: // Hydrogen (Tritium is radioactive)
      return {
        isRadioactive: true,
        description: "Contains the radioactive isotope tritium (H-3).",
        radiationTypes: ["Beta"],
        hazardLevel: "Low",
      }
    default:
      if (atomicNumber < 83) {
        return {
          isRadioactive: false,
          description: "Not significantly radioactive in its natural state.",
        }
      }
      return {
        isRadioactive: true,
        description: "Naturally radioactive element.",
        radiationTypes: ["Alpha", "Beta", "Gamma"],
        hazardLevel: "Medium",
      }
  }
}

// Get isotope data for a specific element
function getIsotopesForElement(atomicNumber: number): IsotopeInfo[] {
  // Store isotope data for common elements
  // This is a simplified dataset with the most common/important isotopes
  switch (atomicNumber) {
    case 1: // Hydrogen
      return [
        {
          massNumber: 1,
          abundance: 99.9885,
          isStable: true,
          description: "Protium - the most common form of hydrogen with one proton and no neutrons",
        },
        {
          massNumber: 2,
          abundance: 0.0115,
          isStable: true,
          description: "Deuterium - heavy hydrogen with one proton and one neutron, used in nuclear reactions",
        },
        {
          massNumber: 3,
          halfLife: "12.32 years",
          isStable: false,
          description:
            "Tritium - radioactive isotope with one proton and two neutrons, used in nuclear weapons and fusion research",
          decayModes: ["beta-minus"],
        },
      ]
    case 2: // Helium
      return [
        {
          massNumber: 3,
          abundance: 0.0001,
          isStable: true,
          description: "Rare isotope used in certain nuclear applications",
        },
        {
          massNumber: 4,
          abundance: 99.9999,
          isStable: true,
          description: "The most common form of helium, product of alpha decay",
        },
      ]
    case 6: // Carbon
      return [
        {
          massNumber: 12,
          abundance: 98.93,
          isStable: true,
          description: "The most common carbon isotope and basis for the atomic mass unit",
        },
        {
          massNumber: 13,
          abundance: 1.07,
          isStable: true,
          description: "Stable isotope used in NMR spectroscopy and metabolic studies",
        },
        {
          massNumber: 14,
          halfLife: "5,730 years",
          isStable: false,
          description: "Radioactive isotope used in radiocarbon dating of archaeological artifacts",
          decayModes: ["beta-minus"],
          decayChainKey: "carbon-14",
        },
      ]
    case 7: // Nitrogen
      return [
        { massNumber: 14, abundance: 99.636, isStable: true, description: "The most common nitrogen isotope" },
        {
          massNumber: 15,
          abundance: 0.364,
          isStable: true,
          description: "Used in NMR spectroscopy and to study nitrogen cycling in ecosystems",
        },
      ]
    case 8: // Oxygen
      return [
        { massNumber: 16, abundance: 99.757, isStable: true, description: "The most common oxygen isotope" },
        { massNumber: 17, abundance: 0.038, isStable: true, description: "Rare stable isotope" },
        {
          massNumber: 18,
          abundance: 0.205,
          isStable: true,
          description: "Used in paleoclimatology to study ancient climates",
        },
      ]
    case 11: // Sodium
      return [{ massNumber: 23, abundance: 100, isStable: true, description: "The only stable isotope of sodium" }]
    case 13: // Aluminum
      return [{ massNumber: 27, abundance: 100, isStable: true, description: "The only stable isotope of aluminum" }]
    case 14: // Silicon
      return [
        { massNumber: 28, abundance: 92.23, isStable: true, description: "The most common silicon isotope" },
        { massNumber: 29, abundance: 4.67, isStable: true, description: "Used in NMR studies" },
        { massNumber: 30, abundance: 3.1, isStable: true, description: "Used in various scientific applications" },
      ]
    case 19: // Potassium
      return [
        { massNumber: 39, abundance: 93.2581, isStable: true, description: "The most abundant isotope of potassium" },
        {
          massNumber: 40,
          abundance: 0.0117,
          halfLife: "1.25 billion years",
          isStable: false,
          description: "Radioactive isotope used in potassium-argon dating",
          decayModes: ["beta-minus", "electron-capture"],
          decayChainKey: "potassium-40",
        },
        { massNumber: 41, abundance: 6.7302, isStable: true, description: "Stable isotope of potassium" },
      ]
    case 26: // Iron
      return [
        { massNumber: 54, abundance: 5.845, isStable: true, description: "Used in nutritional studies" },
        { massNumber: 56, abundance: 91.754, isStable: true, description: "The most common isotope of iron" },
        { massNumber: 57, abundance: 2.119, isStable: true, description: "Used in Mössbauer spectroscopy" },
        { massNumber: 58, abundance: 0.282, isStable: true, description: "Least abundant stable isotope of iron" },
      ]
    case 29: // Copper
      return [
        { massNumber: 63, abundance: 69.15, isStable: true, description: "The most common copper isotope" },
        { massNumber: 65, abundance: 30.85, isStable: true, description: "Second stable isotope of copper" },
      ]
    case 43: // Technetium
      return [
        {
          massNumber: 97,
          halfLife: "4.21 million years",
          isStable: false,
          description: "Longest-lived isotope of technetium",
          decayModes: ["beta-minus"],
        },
        {
          massNumber: 99,
          halfLife: "211,000 years",
          isStable: false,
          description: "Used in medical diagnostics and nuclear medicine",
          decayModes: ["beta-minus"],
        },
      ]
    case 47: // Silver
      return [
        { massNumber: 107, abundance: 51.839, isStable: true, description: "One of two stable silver isotopes" },
        { massNumber: 109, abundance: 48.161, isStable: true, description: "The other stable silver isotope" },
      ]
    case 53: // Iodine
      return [
        { massNumber: 127, abundance: 100, isStable: true, description: "The only stable isotope of iodine" },
        {
          massNumber: 131,
          halfLife: "8.02 days",
          isStable: false,
          description: "Used in nuclear medicine for thyroid treatments",
          decayModes: ["beta-minus", "gamma"],
        },
      ]
    case 79: // Gold
      return [
        { massNumber: 197, abundance: 100, isStable: true, description: "The only stable isotope of gold" },
        {
          massNumber: 198,
          halfLife: "2.7 days",
          isStable: false,
          description: "Used in some medical applications",
          decayModes: ["beta-minus", "gamma"],
        },
      ]
    case 82: // Lead
      return [
        { massNumber: 204, abundance: 1.4, isStable: true, description: "Least abundant stable lead isotope" },
        { massNumber: 206, abundance: 24.1, isStable: true, description: "Product of uranium-238 decay" },
        { massNumber: 207, abundance: 22.1, isStable: true, description: "Product of uranium-235 decay" },
        {
          massNumber: 208,
          abundance: 52.4,
          isStable: true,
          description: "Most abundant stable lead isotope, product of thorium-232 decay",
        },
      ]
    case 83: // Bismuth
      return [
        {
          massNumber: 209,
          abundance: 100,
          halfLife: "1.9×10^19 years",
          isStable: false,
          description: "Extremely long half-life, considered practically stable for most purposes",
          decayModes: ["alpha"],
        },
        {
          massNumber: 210,
          halfLife: "5.01 days",
          isStable: false,
          description: "Part of the uranium decay series",
          decayModes: ["beta-minus"],
        },
      ]
    case 86: // Radon
      return [
        {
          massNumber: 222,
          halfLife: "3.8 days",
          isStable: false,
          description: "Most stable isotope of radon, health hazard in basements",
          decayModes: ["alpha"],
        },
        {
          massNumber: 220,
          halfLife: "55.6 seconds",
          isStable: false,
          description: "Also known as thoron, part of the thorium decay series",
          decayModes: ["alpha"],
        },
      ]
    case 88: // Radium
      return [
        {
          massNumber: 226,
          halfLife: "1,600 years",
          isStable: false,
          description: "Most common isotope of radium, used historically in luminous paint",
          decayModes: ["alpha", "gamma"],
        },
        {
          massNumber: 228,
          halfLife: "5.75 years",
          isStable: false,
          description: "Part of the thorium decay series",
          decayModes: ["beta-minus"],
        },
      ]
    case 90: // Thorium
      return [
        {
          massNumber: 232,
          abundance: 99.98,
          halfLife: "14.05 billion years",
          isStable: false,
          description: "Fertile material that can be converted into nuclear fuel",
          decayModes: ["alpha"],
          decayChainKey: "thorium-232",
        },
        {
          massNumber: 230,
          halfLife: "75,380 years",
          isStable: false,
          description: "Part of the uranium-238 decay series",
          decayModes: ["alpha"],
        },
      ]
    case 92: // Uranium
      return [
        {
          massNumber: 234,
          abundance: 0.0055,
          halfLife: "245,500 years",
          isStable: false,
          description: "Intermediate decay product in uranium series",
          decayModes: ["alpha"],
        },
        {
          massNumber: 235,
          abundance: 0.72,
          halfLife: "703.8 million years",
          isStable: false,
          description: "Used in nuclear reactors and weapons",
          decayModes: ["alpha", "gamma"],
          decayChainKey: "uranium-235",
        },
        {
          massNumber: 238,
          abundance: 99.2745,
          halfLife: "4.468 billion years",
          isStable: false,
          description: "Most abundant uranium isotope, used in depleted uranium applications",
          decayModes: ["alpha"],
          decayChainKey: "uranium-238",
        },
      ]
    case 94: // Plutonium
      return [
        {
          massNumber: 238,
          halfLife: "87.7 years",
          isStable: false,
          description: "Used in radioisotope thermoelectric generators for space missions",
          decayModes: ["alpha"],
        },
        {
          massNumber: 239,
          halfLife: "24,110 years",
          isStable: false,
          description: "Primary fissile isotope used in nuclear weapons",
          decayModes: ["alpha"],
          decayChainKey: "plutonium-239",
        },
        {
          massNumber: 240,
          halfLife: "6,563 years",
          isStable: false,
          description: "Present in spent nuclear fuel",
          decayModes: ["alpha"],
        },
      ]
    default:
      // For elements without specific isotope data, provide a generic entry
      if (atomicNumber < 83) {
        return [
          {
            massNumber: Math.round(atomicNumber * 2.5),
            abundance: 100,
            isStable: true,
            description: "Primary isotope",
          },
        ]
      } else {
        return [
          {
            massNumber: Math.round(atomicNumber * 2.5),
            isStable: false,
            halfLife: "Varies",
            description: "Radioactive isotope",
            decayModes: ["alpha", "beta-minus"],
          },
        ]
      }
  }
}

// Export elements with isotope data
export const elementsWithIsotopes = addIsotopeData(elementsWithApplications)
