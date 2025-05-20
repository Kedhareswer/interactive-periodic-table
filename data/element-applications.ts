import type { ElementType } from "@/types/element"
import { elements } from "./elements"

// Add applications to elements
export const elementsWithApplications: ElementType[] = elements.map((element) => {
  const applications = getApplicationsForElement(element.atomicNumber)
  return {
    ...element,
    applications,
  }
})

function getApplicationsForElement(atomicNumber: number): string[] | undefined {
  const applicationsMap: Record<number, string[]> = {
    1: [
      "Hydrogen fuel cells for clean energy",
      "Rocket fuel in aerospace",
      "Production of ammonia for fertilizers",
      "Hydrogenation of oils in food industry",
    ],
    2: [
      "Cooling medium for MRI machines",
      "Lifting gas for balloons and airships",
      "Pressurizing and purging fuel systems",
      "Protective atmosphere for arc welding",
    ],
    3: [
      "Lithium-ion batteries for electronics",
      "Medication for bipolar disorder",
      "Aerospace alloys for lightweight construction",
      "Nuclear fusion research",
    ],
    6: [
      "Steel manufacturing and alloys",
      "Carbon fiber for lightweight materials",
      "Graphite in pencils and lubricants",
      "Activated carbon for water filtration",
      "Diamond tools for cutting and grinding",
    ],
    7: ["Fertilizer production", "Refrigeration systems", "Food preservation", "Explosives manufacturing"],
    8: [
      "Medical oxygen for healthcare",
      "Steel and metal production",
      "Water treatment and purification",
      "Rocket propellant",
    ],
    11: [
      "Table salt (sodium chloride)",
      "Street lighting (sodium vapor lamps)",
      "Heat transfer in nuclear reactors",
      "Manufacturing of paper, glass, and detergents",
    ],
    13: [
      "Aircraft and automotive manufacturing",
      "Building construction and windows",
      "Food packaging",
      "Electrical transmission lines",
    ],
    14: [
      "Semiconductor devices and electronics",
      "Solar cells",
      "Glass manufacturing",
      "Silicone products and sealants",
    ],
    15: ["Fertilizers", "Detergents and water treatment", "Match heads", "Steel production"],
    16: ["Vulcanization of rubber", "Sulfuric acid production", "Fungicides and pesticides", "Paper manufacturing"],
    19: ["Fertilizers for agriculture", "Food additives", "Soap manufacturing", "Glass production"],
    20: ["Building materials (cement, concrete)", "Dietary supplements", "Cheese making", "Antacids"],
    22: ["Aerospace components", "Medical implants", "White pigment in paints", "Jewelry and watches"],
    24: ["Stainless steel production", "Chrome plating", "Dyes and pigments", "Leather tanning"],
    26: ["Steel and alloy production", "Construction materials", "Automotive manufacturing", "Magnetic applications"],
    29: ["Electrical wiring and electronics", "Plumbing and construction", "Coinage", "Antimicrobial applications"],
    30: ["Galvanizing steel", "Batteries", "Brass and bronze alloys", "Sunscreen and cosmetics"],
    47: [
      "Photography (traditional)",
      "Jewelry and silverware",
      "Electronics and conductors",
      "Antimicrobial applications and water purification",
    ],
    50: [
      "Tin plating for food containers",
      "Solder for electronics",
      "Bronze and pewter alloys",
      "Window glass manufacturing",
    ],
    53: [
      "Medical imaging contrast agents",
      "Water purification",
      "Photography chemicals",
      "Antiseptics and disinfectants",
    ],
    74: [
      "Filaments in light bulbs",
      "High-temperature applications",
      "Armor-piercing ammunition",
      "Electrical contacts",
    ],
    78: ["Catalytic converters", "Jewelry", "Laboratory equipment", "Cancer treatment drugs"],
    79: [
      "Jewelry and decorative items",
      "Electronics and connectors",
      "Dental work",
      "Investment and currency backing",
    ],
    82: ["Car batteries", "Radiation shielding", "Ammunition", "Solder (historical use)"],
    92: ["Nuclear power generation", "Naval propulsion", "Medical isotopes", "Military applications"],
  }

  return applicationsMap[atomicNumber]
}
