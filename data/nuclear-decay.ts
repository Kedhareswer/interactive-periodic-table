// Types for nuclear decay information
export interface DecayMode {
  type: string
  symbol: string
  description: string
}

export interface DecayChain {
  parent: string
  daughter: string
  decayMode: string
  halfLife?: string
}

// Common decay modes
export const decayModes: Record<string, DecayMode> = {
  alpha: {
    type: "Alpha Decay",
    symbol: "α",
    description: "Emission of an alpha particle (helium nucleus) consisting of 2 protons and 2 neutrons",
  },
  "beta-minus": {
    type: "Beta Minus Decay",
    symbol: "β-",
    description: "Conversion of a neutron to a proton with emission of an electron and an antineutrino",
  },
  "beta-plus": {
    type: "Beta Plus Decay (Positron Emission)",
    symbol: "β+",
    description: "Conversion of a proton to a neutron with emission of a positron and a neutrino",
  },
  "electron-capture": {
    type: "Electron Capture",
    symbol: "EC",
    description: "Capture of an orbital electron by a proton in the nucleus, forming a neutron and a neutrino",
  },
  gamma: {
    type: "Gamma Emission",
    symbol: "γ",
    description: "Emission of high-energy photons from an excited nucleus",
  },
  "neutron-emission": {
    type: "Neutron Emission",
    symbol: "n",
    description: "Emission of a neutron from the nucleus",
  },
  "proton-emission": {
    type: "Proton Emission",
    symbol: "p",
    description: "Emission of a proton from the nucleus",
  },
  "spontaneous-fission": {
    type: "Spontaneous Fission",
    symbol: "SF",
    description: "Spontaneous splitting of a heavy nucleus into two or more lighter nuclei",
  },
  "cluster-decay": {
    type: "Cluster Decay",
    symbol: "CD",
    description: "Emission of a small cluster of nucleons (larger than an alpha particle)",
  },
  "isomeric-transition": {
    type: "Isomeric Transition",
    symbol: "IT",
    description: "Transition from a metastable nuclear state to a more stable state",
  },
}

// Function to get decay mode information
export function getDecayModeInfo(mode: string): DecayMode {
  return (
    decayModes[mode] || {
      type: mode,
      symbol: "?",
      description: "Specialized decay mode",
    }
  )
}

// Notable decay chains
export const decayChains: Record<string, DecayChain[]> = {
  "uranium-238": [
    { parent: "U-238", daughter: "Th-234", decayMode: "alpha", halfLife: "4.5 billion years" },
    { parent: "Th-234", daughter: "Pa-234", decayMode: "beta-minus", halfLife: "24.1 days" },
    { parent: "Pa-234", daughter: "U-234", decayMode: "beta-minus", halfLife: "6.7 hours" },
    { parent: "U-234", daughter: "Th-230", decayMode: "alpha", halfLife: "245,500 years" },
    { parent: "Th-230", daughter: "Ra-226", decayMode: "alpha", halfLife: "75,380 years" },
    { parent: "Ra-226", daughter: "Rn-222", decayMode: "alpha", halfLife: "1,600 years" },
    { parent: "Rn-222", daughter: "Po-218", decayMode: "alpha", halfLife: "3.8 days" },
    { parent: "Po-218", daughter: "Pb-214", decayMode: "alpha", halfLife: "3.1 minutes" },
    { parent: "Pb-214", daughter: "Bi-214", decayMode: "beta-minus", halfLife: "26.8 minutes" },
    { parent: "Bi-214", daughter: "Po-214", decayMode: "beta-minus", halfLife: "19.9 minutes" },
    { parent: "Po-214", daughter: "Pb-210", decayMode: "alpha", halfLife: "164 microseconds" },
    { parent: "Pb-210", daughter: "Bi-210", decayMode: "beta-minus", halfLife: "22.3 years" },
    { parent: "Bi-210", daughter: "Po-210", decayMode: "beta-minus", halfLife: "5.0 days" },
    { parent: "Po-210", daughter: "Pb-206", decayMode: "alpha", halfLife: "138.4 days" },
  ],
  "uranium-235": [
    { parent: "U-235", daughter: "Th-231", decayMode: "alpha", halfLife: "704 million years" },
    { parent: "Th-231", daughter: "Pa-231", decayMode: "beta-minus", halfLife: "25.5 hours" },
    { parent: "Pa-231", daughter: "Ac-227", decayMode: "alpha", halfLife: "32,760 years" },
    { parent: "Ac-227", daughter: "Th-227", decayMode: "beta-minus", halfLife: "21.8 years" },
    { parent: "Th-227", daughter: "Ra-223", decayMode: "alpha", halfLife: "18.7 days" },
    { parent: "Ra-223", daughter: "Rn-219", decayMode: "alpha", halfLife: "11.4 days" },
    { parent: "Rn-219", daughter: "Po-215", decayMode: "alpha", halfLife: "3.96 seconds" },
    { parent: "Po-215", daughter: "Pb-211", decayMode: "alpha", halfLife: "1.78 milliseconds" },
    { parent: "Pb-211", daughter: "Bi-211", decayMode: "beta-minus", halfLife: "36.1 minutes" },
    { parent: "Bi-211", daughter: "Tl-207", decayMode: "alpha", halfLife: "2.14 minutes" },
    { parent: "Tl-207", daughter: "Pb-207", decayMode: "beta-minus", halfLife: "4.77 minutes" },
  ],
  "thorium-232": [
    { parent: "Th-232", daughter: "Ra-228", decayMode: "alpha", halfLife: "14.05 billion years" },
    { parent: "Ra-228", daughter: "Ac-228", decayMode: "beta-minus", halfLife: "5.75 years" },
    { parent: "Ac-228", daughter: "Th-228", decayMode: "beta-minus", halfLife: "6.15 hours" },
    { parent: "Th-228", daughter: "Ra-224", decayMode: "alpha", halfLife: "1.9 years" },
    { parent: "Ra-224", daughter: "Rn-220", decayMode: "alpha", halfLife: "3.66 days" },
    { parent: "Rn-220", daughter: "Po-216", decayMode: "alpha", halfLife: "55.6 seconds" },
    { parent: "Po-216", daughter: "Pb-212", decayMode: "alpha", halfLife: "0.15 seconds" },
    { parent: "Pb-212", daughter: "Bi-212", decayMode: "beta-minus", halfLife: "10.64 hours" },
    { parent: "Bi-212", daughter: "Po-212", decayMode: "alpha", halfLife: "60.6 minutes" },
    { parent: "Po-212", daughter: "Pb-208", decayMode: "alpha", halfLife: "0.3 microseconds" },
  ],
  "plutonium-239": [
    { parent: "Pu-239", daughter: "U-235", decayMode: "alpha", halfLife: "24,110 years" },
    // Then follows the uranium-235 decay chain
  ],
  "carbon-14": [{ parent: "C-14", daughter: "N-14", decayMode: "beta-minus", halfLife: "5,730 years" }],
  "potassium-40": [
    { parent: "K-40", daughter: "Ca-40", decayMode: "beta-minus", halfLife: "1.25 billion years" },
    { parent: "K-40", daughter: "Ar-40", decayMode: "electron-capture", halfLife: "1.25 billion years" },
  ],
}

// Function to get decay chain for an isotope
export function getDecayChain(isotope: string): DecayChain[] | null {
  return decayChains[isotope] || null
}
