// Define interfaces for trend data
export interface TrendData {
  [atomicNumber: number]: number
}

export interface ElementTrends {
  atomicRadius: TrendData
  electronegativity: TrendData
  ionizationEnergy: TrendData
  density: TrendData
}

// Scientifically accurate trend data
// Values are based on published scientific data

// Atomic Radius in picometers (pm)
export const atomicRadiusData: TrendData = {
  1: 53, // Hydrogen
  2: 31, // Helium
  3: 167, // Lithium
  4: 112, // Beryllium
  5: 87, // Boron
  6: 67, // Carbon
  7: 56, // Nitrogen
  8: 48, // Oxygen
  9: 42, // Fluorine
  10: 38, // Neon
  11: 190, // Sodium
  12: 145, // Magnesium
  13: 118, // Aluminum
  14: 111, // Silicon
  15: 98, // Phosphorus
  16: 88, // Sulfur
  17: 79, // Chlorine
  18: 71, // Argon
  19: 243, // Potassium
  20: 194, // Calcium
  21: 184, // Scandium
  22: 176, // Titanium
  23: 171, // Vanadium
  24: 166, // Chromium
  25: 161, // Manganese
  26: 156, // Iron
  27: 152, // Cobalt
  28: 149, // Nickel
  29: 145, // Copper
  30: 142, // Zinc
  31: 136, // Gallium
  32: 125, // Germanium
  33: 114, // Arsenic
  34: 103, // Selenium
  35: 94, // Bromine
  36: 88, // Krypton
  37: 265, // Rubidium
  38: 219, // Strontium
  39: 212, // Yttrium
  40: 206, // Zirconium
  41: 198, // Niobium
  42: 190, // Molybdenum
  43: 183, // Technetium
  44: 178, // Ruthenium
  45: 173, // Rhodium
  46: 169, // Palladium
  47: 165, // Silver
  48: 161, // Cadmium
  49: 156, // Indium
  50: 145, // Tin
  51: 133, // Antimony
  52: 123, // Tellurium
  53: 115, // Iodine
  54: 108, // Xenon
  55: 298, // Cesium
  56: 253, // Barium
  57: 226, // Lanthanum
  58: 210, // Cerium
  59: 247, // Praseodymium
  60: 206, // Neodymium
  61: 205, // Promethium
  62: 238, // Samarium
  63: 231, // Europium
  64: 233, // Gadolinium
  65: 225, // Terbium
  66: 228, // Dysprosium
  67: 226, // Holmium
  68: 226, // Erbium
  69: 222, // Thulium
  70: 222, // Ytterbium
  71: 217, // Lutetium
  72: 208, // Hafnium
  73: 200, // Tantalum
  74: 193, // Tungsten
  75: 188, // Rhenium
  76: 185, // Osmium
  77: 180, // Iridium
  78: 177, // Platinum
  79: 174, // Gold
  80: 171, // Mercury
  81: 156, // Thallium
  82: 154, // Lead
  83: 143, // Bismuth
  84: 135, // Polonium
  85: 127, // Astatine
  86: 120, // Radon
  87: 348, // Francium
  88: 283, // Radium
  89: 260, // Actinium
  90: 237, // Thorium
  91: 243, // Protactinium
  92: 240, // Uranium
  93: 237, // Neptunium
  94: 243, // Plutonium
  95: 244, // Americium
  96: 245, // Curium
  97: 244, // Berkelium
  98: 245, // Californium
  99: 245, // Einsteinium
  100: 245, // Fermium
  101: 246, // Mendelevium
  102: 246, // Nobelium
  103: 246, // Lawrencium
  104: 246, // Rutherfordium
  105: 246, // Dubnium
  106: 246, // Seaborgium
  107: 246, // Bohrium
  108: 246, // Hassium
  109: 246, // Meitnerium
  110: 246, // Darmstadtium
  111: 246, // Roentgenium
  112: 246, // Copernicium
  113: 246, // Nihonium
  114: 246, // Flerovium
  115: 246, // Moscovium
  116: 246, // Livermorium
  117: 246, // Tennessine
  118: 246, // Oganesson
}

// Electronegativity (Pauling scale)
export const electronegativityData: TrendData = {
  1: 2.2, // Hydrogen
  2: 0, // Helium (Noble gases traditionally have no electronegativity)
  3: 0.98, // Lithium
  4: 1.57, // Beryllium
  5: 2.04, // Boron
  6: 2.55, // Carbon
  7: 3.04, // Nitrogen
  8: 3.44, // Oxygen
  9: 3.98, // Fluorine
  10: 0, // Neon
  11: 0.93, // Sodium
  12: 1.31, // Magnesium
  13: 1.61, // Aluminum
  14: 1.9, // Silicon
  15: 2.19, // Phosphorus
  16: 2.58, // Sulfur
  17: 3.16, // Chlorine
  18: 0, // Argon
  19: 0.82, // Potassium
  20: 1.0, // Calcium
  21: 1.36, // Scandium
  22: 1.54, // Titanium
  23: 1.63, // Vanadium
  24: 1.66, // Chromium
  25: 1.55, // Manganese
  26: 1.83, // Iron
  27: 1.88, // Cobalt
  28: 1.91, // Nickel
  29: 1.9, // Copper
  30: 1.65, // Zinc
  31: 1.81, // Gallium
  32: 2.01, // Germanium
  33: 2.18, // Arsenic
  34: 2.55, // Selenium
  35: 2.96, // Bromine
  36: 0, // Krypton
  37: 0.82, // Rubidium
  38: 0.95, // Strontium
  39: 1.22, // Yttrium
  40: 1.33, // Zirconium
  41: 1.6, // Niobium
  42: 2.16, // Molybdenum
  43: 1.9, // Technetium
  44: 2.2, // Ruthenium
  45: 2.28, // Rhodium
  46: 2.2, // Palladium
  47: 1.93, // Silver
  48: 1.69, // Cadmium
  49: 1.78, // Indium
  50: 1.96, // Tin
  51: 2.05, // Antimony
  52: 2.1, // Tellurium
  53: 2.66, // Iodine
  54: 0, // Xenon
  55: 0.79, // Cesium
  56: 0.89, // Barium
  57: 1.1, // Lanthanum
  58: 1.12, // Cerium
  59: 1.13, // Praseodymium
  60: 1.14, // Neodymium
  61: 1.13, // Promethium
  62: 1.17, // Samarium
  63: 1.2, // Europium
  64: 1.2, // Gadolinium
  65: 1.1, // Terbium
  66: 1.22, // Dysprosium
  67: 1.23, // Holmium
  68: 1.24, // Erbium
  69: 1.25, // Thulium
  70: 1.1, // Ytterbium
  71: 1.27, // Lutetium
  72: 1.3, // Hafnium
  73: 1.5, // Tantalum
  74: 2.36, // Tungsten
  75: 1.9, // Rhenium
  76: 2.2, // Osmium
  77: 2.2, // Iridium
  78: 2.28, // Platinum
  79: 2.54, // Gold
  80: 2.0, // Mercury
  81: 1.62, // Thallium
  82: 2.33, // Lead
  83: 2.02, // Bismuth
  84: 2.0, // Polonium
  85: 2.2, // Astatine
  86: 0, // Radon
  87: 0.7, // Francium
  88: 0.9, // Radium
  89: 1.1, // Actinium
  90: 1.3, // Thorium
  91: 1.5, // Protactinium
  92: 1.38, // Uranium
  93: 1.36, // Neptunium
  94: 1.28, // Plutonium
  95: 1.3, // Americium
  96: 1.3, // Curium
  97: 1.3, // Berkelium
  98: 1.3, // Californium
  99: 1.3, // Einsteinium
  100: 1.3, // Fermium
  101: 1.3, // Mendelevium
  102: 1.3, // Nobelium
  103: 1.3, // Lawrencium
  // For elements 104-118, electronegativity values are often estimated or not well-established
}

// First Ionization Energy in eV (electron volts)
export const ionizationEnergyData: TrendData = {
  1: 13.598, // Hydrogen
  2: 24.587, // Helium
  3: 5.392, // Lithium
  4: 9.323, // Beryllium
  5: 8.298, // Boron
  6: 11.26, // Carbon
  7: 14.534, // Nitrogen
  8: 13.618, // Oxygen
  9: 17.423, // Fluorine
  10: 21.565, // Neon
  11: 5.139, // Sodium
  12: 7.646, // Magnesium
  13: 5.986, // Aluminum
  14: 8.152, // Silicon
  15: 10.487, // Phosphorus
  16: 10.36, // Sulfur
  17: 12.968, // Chlorine
  18: 15.76, // Argon
  19: 4.341, // Potassium
  20: 6.113, // Calcium
  21: 6.561, // Scandium
  22: 6.828, // Titanium
  23: 6.746, // Vanadium
  24: 6.767, // Chromium
  25: 7.434, // Manganese
  26: 7.902, // Iron
  27: 7.881, // Cobalt
  28: 7.64, // Nickel
  29: 7.726, // Copper
  30: 9.394, // Zinc
  31: 5.999, // Gallium
  32: 7.899, // Germanium
  33: 9.789, // Arsenic
  34: 9.752, // Selenium
  35: 11.814, // Bromine
  36: 14.0, // Krypton
  37: 4.177, // Rubidium
  38: 5.695, // Strontium
  39: 6.217, // Yttrium
  40: 6.634, // Zirconium
  41: 6.759, // Niobium
  42: 7.092, // Molybdenum
  43: 7.28, // Technetium
  44: 7.361, // Ruthenium
  45: 7.459, // Rhodium
  46: 8.337, // Palladium
  47: 7.576, // Silver
  48: 8.994, // Cadmium
  49: 5.786, // Indium
  50: 7.344, // Tin
  51: 8.641, // Antimony
  52: 9.01, // Tellurium
  53: 10.451, // Iodine
  54: 12.13, // Xenon
  55: 3.894, // Cesium
  56: 5.212, // Barium
  57: 5.577, // Lanthanum
  58: 5.539, // Cerium
  59: 5.473, // Praseodymium
  60: 5.525, // Neodymium
  61: 5.582, // Promethium
  62: 5.644, // Samarium
  63: 5.67, // Europium
  64: 6.15, // Gadolinium
  65: 5.864, // Terbium
  66: 5.939, // Dysprosium
  67: 6.022, // Holmium
  68: 6.108, // Erbium
  69: 6.184, // Thulium
  70: 6.254, // Ytterbium
  71: 5.426, // Lutetium
  72: 6.825, // Hafnium
  73: 7.55, // Tantalum
  74: 7.864, // Tungsten
  75: 7.833, // Rhenium
  76: 8.438, // Osmium
  77: 8.967, // Iridium
  78: 8.959, // Platinum
  79: 9.226, // Gold
  80: 10.437, // Mercury
  81: 6.108, // Thallium
  82: 7.417, // Lead
  83: 7.286, // Bismuth
  84: 8.414, // Polonium
  85: 9.318, // Astatine
  86: 10.748, // Radon
  87: 4.073, // Francium
  88: 5.279, // Radium
  89: 5.17, // Actinium
  90: 6.307, // Thorium
  91: 5.89, // Protactinium
  92: 6.194, // Uranium
  93: 6.266, // Neptunium
  94: 6.026, // Plutonium
  95: 5.974, // Americium
  96: 5.991, // Curium
  97: 6.198, // Berkelium
  98: 6.282, // Californium
  99: 6.42, // Einsteinium
  100: 6.5, // Fermium
  101: 6.58, // Mendelevium
  102: 6.65, // Nobelium
  103: 4.9, // Lawrencium
  // For elements 104-118, ionization energy values are often estimated or not well-established
}

// Density in g/cm³ at room temperature and pressure
export const densityData: TrendData = {
  1: 0.0000899, // Hydrogen (gas)
  2: 0.0001785, // Helium (gas)
  3: 0.534, // Lithium
  4: 1.85, // Beryllium
  5: 2.34, // Boron
  6: 2.267, // Carbon (graphite)
  7: 0.001251, // Nitrogen (gas)
  8: 0.001429, // Oxygen (gas)
  9: 0.001696, // Fluorine (gas)
  10: 0.0008999, // Neon (gas)
  11: 0.971, // Sodium
  12: 1.738, // Magnesium
  13: 2.698, // Aluminum
  14: 2.3296, // Silicon
  15: 1.82, // Phosphorus (white)
  16: 2.067, // Sulfur
  17: 0.003214, // Chlorine (gas)
  18: 0.0017837, // Argon (gas)
  19: 0.862, // Potassium
  20: 1.54, // Calcium
  21: 2.989, // Scandium
  22: 4.54, // Titanium
  23: 6.11, // Vanadium
  24: 7.15, // Chromium
  25: 7.44, // Manganese
  26: 7.874, // Iron
  27: 8.86, // Cobalt
  28: 8.912, // Nickel
  29: 8.96, // Copper
  30: 7.134, // Zinc
  31: 5.907, // Gallium
  32: 5.323, // Germanium
  33: 5.776, // Arsenic
  34: 4.809, // Selenium
  35: 3.122, // Bromine (liquid)
  36: 0.003733, // Krypton (gas)
  37: 1.532, // Rubidium
  38: 2.64, // Strontium
  39: 4.469, // Yttrium
  40: 6.506, // Zirconium
  41: 8.57, // Niobium
  42: 10.22, // Molybdenum
  43: 11.5, // Technetium
  44: 12.37, // Ruthenium
  45: 12.41, // Rhodium
  46: 12.02, // Palladium
  47: 10.501, // Silver
  48: 8.69, // Cadmium
  49: 7.31, // Indium
  50: 7.287, // Tin
  51: 6.685, // Antimony
  52: 6.232, // Tellurium
  53: 4.93, // Iodine
  54: 0.005887, // Xenon (gas)
  55: 1.873, // Cesium
  56: 3.594, // Barium
  57: 6.145, // Lanthanum
  58: 6.77, // Cerium
  59: 6.773, // Praseodymium
  60: 7.007, // Neodymium
  61: 7.26, // Promethium
  62: 7.52, // Samarium
  63: 5.243, // Europium
  64: 7.895, // Gadolinium
  65: 8.229, // Terbium
  66: 8.55, // Dysprosium
  67: 8.795, // Holmium
  68: 9.066, // Erbium
  69: 9.321, // Thulium
  70: 6.965, // Ytterbium
  71: 9.84, // Lutetium
  72: 13.31, // Hafnium
  73: 16.654, // Tantalum
  74: 19.25, // Tungsten
  75: 21.02, // Rhenium
  76: 22.59, // Osmium
  77: 22.56, // Iridium
  78: 21.45, // Platinum
  79: 19.3, // Gold
  80: 13.546, // Mercury (liquid)
  81: 11.85, // Thallium
  82: 11.342, // Lead
  83: 9.807, // Bismuth
  84: 9.32, // Polonium
  85: 7.0, // Astatine (estimated)
  86: 0.00973, // Radon (gas)
  87: 1.87, // Francium (estimated)
  88: 5.5, // Radium
  89: 10.07, // Actinium
  90: 11.72, // Thorium
  91: 15.37, // Protactinium
  92: 18.95, // Uranium
  93: 20.45, // Neptunium
  94: 19.84, // Plutonium
  95: 13.69, // Americium
  96: 13.51, // Curium
  97: 14.79, // Berkelium
  98: 15.1, // Californium
  // For elements 99-118, density values are often estimated or not well-established
}

// Create a complete trends object
export const elementTrends: ElementTrends = {
  atomicRadius: atomicRadiusData,
  electronegativity: electronegativityData,
  ionizationEnergy: ionizationEnergyData,
  density: densityData,
}

// Helper function to get trend data for an element
export function getTrendData(atomicNumber: number, trendType: keyof ElementTrends): number {
  return elementTrends[trendType][atomicNumber] || 0
}
