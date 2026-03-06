// Fun facts for elements by atomic number
export const elementFunFacts: Record<number, string> = {
  1: "Hydrogen powers our Sun — every second it fuses 620 million tonnes of hydrogen into helium!",
  2: "Helium was discovered in the Sun before it was found on Earth. Its name comes from Helios, the Greek sun god.",
  3: "Lithium is so light it can float on water — and it powers the battery in your phone right now.",
  4: "Beryllium is incredibly stiff — stiffer than steel — yet six times lighter. NASA uses it in space telescopes.",
  5: "Boron is found in borax, which has been used as a cleaning agent and in the famous 20-mule team borax wagons.",
  6: "Carbon is the basis of all known life. A single layer of carbon atoms (graphene) is the strongest material ever tested.",
  7: "Nitrogen makes up 78% of the air you breathe, yet plants can't use it directly without special bacteria to 'fix' it.",
  8: "Oxygen was discovered independently by two scientists — Carl Wilhelm Scheele and Joseph Priestley — in the same decade.",
  9: "Fluorine is so reactive it can make substances like PTFE (Teflon) that are virtually inert — a chemical paradox!",
  10: "Neon signs don't actually use neon for all colors — red is neon, but blue, green, and other colors use different noble gases.",
  11: "A chunk of sodium metal dropped in water ignites immediately — it's so reactive it's stored under oil.",
  12: "Magnesium burns with such a brilliant white flame that it was used in early photography as a flash powder.",
  13: "Aluminium was once more precious than gold! A cap of it sits atop the Washington Monument as a sign of luxury.",
  14: "Silicon gives us both sand and computer chips. Modern processors contain billions of silicon transistors.",
  15: "Phosphorus was discovered by an alchemist boiling his own urine — he was looking for gold and found glowing white phosphorus instead.",
  16: "Sulfur was the 'brimstone' of biblical 'fire and brimstone.' Volcanoes produce enormous amounts of sulfur dioxide.",
  17: "Chlorine was used as a chemical weapon in WWI, but today it's used to make drinking water safe to drink.",
  18: "Argon makes up about 1% of Earth's atmosphere — more than carbon dioxide. It's used to fill the space in double-pane windows.",
  19: "Potassium is so similar to sodium chemically that your body can confuse the two. Your heart beats using potassium and sodium ions.",
  20: "Calcium makes up about 2% of your body weight. Your skeleton is essentially a calcium reservoir.",
  22: "Titanium is as strong as steel but 45% lighter, biocompatible with the human body, and used in hip and dental implants.",
  24: "Chromium gives rubies their red color and emeralds their green color — the same element, different crystal structures!",
  26: "Iron meteorites have fallen from space for billions of years. Ancient Egyptians made iron tools from meteorite iron thousands of years before the Iron Age.",
  29: "Copper was the first metal humans worked with, over 10,000 years ago. It's also naturally antimicrobial — copper surfaces kill bacteria.",
  30: "Zinc is essential for your immune system. A zinc deficiency can cause you to lose your sense of taste and smell.",
  33: "Arsenic was the preferred poison of the Renaissance — 'inheritance powder' — because it was tasteless and odorless.",
  35: "Bromine is one of only two elements that are liquid at room temperature (along with mercury). Its name comes from Greek for 'stench.'",
  36: "Krypton (the element) is real, but it's just a boring noble gas — though it was used to define the meter from 1960–1983.",
  47: "Silver has the highest electrical and thermal conductivity of all elements — better than copper or gold.",
  50: "Tin 'screams' — when you bend a tin bar, it makes a crackling sound called 'tin cry' due to crystal structure shifting.",
  51: "Ancient Egyptians used antimony compounds as eye makeup. The kohl used by Cleopatra likely contained antimony sulfide.",
  53: "Iodine vapor is violet — the element's name comes from the Greek word for violet. It's added to table salt to prevent thyroid disease.",
  54: "Xenon was used to make the world's first practical laser, and today it powers ion engines on spacecraft.",
  55: "Caesium defines our time. Atomic clocks based on caesium oscillations keep the world's most accurate time — losing 1 second per 300 million years.",
  56: "Barium sulfate is swallowed as a 'barium meal' to make your digestive tract visible on X-rays.",
  74: "Tungsten has the highest melting point of all elements (3,422°C) and is used in light bulb filaments and cutting tools.",
  78: "Platinum is so rare that all the platinum ever mined in history would fit in an average-sized living room.",
  79: "Gold is so malleable that 1 gram can be hammered into a sheet covering 1 square meter. Your smartphone contains about 0.03 g of gold — globally, e-waste holds more gold per tonne than gold ore.",
  80: "Mercury is the only metal that is liquid at room temperature (along with bromine, which is a nonmetal).",
  82: "Lead pipes installed by ancient Romans are still in place in some parts of Europe — the Latin word 'plumbum' gives us 'plumbing.'",
  86: "Radon seeps up through the ground and can accumulate in basements. It's the second leading cause of lung cancer.",
  88: "Radium was discovered by Marie Curie, who won two Nobel Prizes. Her notebooks are still so radioactive they're kept in lead-lined boxes.",
  92: "Uranium's radioactive decay is what generates most of Earth's internal heat, driving tectonic plates and volcanic activity.",
  94: "Plutonium doesn't exist in nature — it's entirely man-made. An amount the size of a softball contains enough energy to power a city.",
}

export function getElementFunFact(atomicNumber: number): string | null {
  return elementFunFacts[atomicNumber] ?? null
}

// Everyday items that contain specific elements
export const elementInEverydayLife: Record<number, string[]> = {
  1: ["Rocket fuel (liquid hydrogen)", "Fuel cells", "Margarine production"],
  2: ["Balloons & airships", "MRI machines (liquid helium)", "Welding gases"],
  3: ["Smartphone batteries", "Mood-stabilizing medication", "Ceramics & glass"],
  6: ["Pencil lead (graphite)", "Diamonds", "All plastics & organic compounds"],
  7: ["Fertilizers (78% of air)", "Liquid nitrogen ice cream", "Airbags"],
  8: ["The air you breathe", "Water (H₂O)", "Steel production"],
  11: ["Table salt (NaCl)", "Baking soda", "Street lights"],
  13: ["Aluminium foil", "Soda cans", "Aircraft frames"],
  14: ["Computer chips", "Glass", "Solar panels"],
  15: ["Matches", "Fertilizers", "DNA and bones"],
  17: ["Bleach", "PVC plastic", "Swimming pools"],
  19: ["Bananas (potassium-rich)", "Fertilizers", "Soap making"],
  20: ["Milk & dairy", "Your bones and teeth", "Cement"],
  26: ["Car bodies", "Kitchen knives", "Building structures"],
  29: ["Electrical wiring", "Pennies (plated)", "Plumbing pipes"],
  47: ["Photography (historical)", "Mirrors", "Antibacterial bandages"],
  79: ["Jewelry", "Smartphone contacts", "Dental fillings"],
  50: ["Tin cans (steel coated)", "Solder", "Pewter alloys"],
  78: ["Catalytic converters", "Jewelry", "Cancer treatment"],
}

export function getElementEverydayLife(atomicNumber: number): string[] | null {
  return elementInEverydayLife[atomicNumber] ?? null
}
