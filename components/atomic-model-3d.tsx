"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Trail } from "@react-three/drei"
import { Vector3, type Group, Color } from "three"
import type { ElementType } from "@/types/element"

interface AtomicModelProps {
  element: ElementType
}

function Nucleus({ protons, neutrons }: { protons: number; neutrons: number }) {
  const nucleusRef = useRef<Group>(null)
  const nucleusRadius = Math.max(0.5, Math.log(protons + neutrons) / 10)

  useFrame(() => {
    if (nucleusRef.current) {
      nucleusRef.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={nucleusRef}>
      <Sphere args={[nucleusRadius, 32, 32]}>
        <meshStandardMaterial color="#ff6b6b" roughness={0.5} metalness={0.8} />
      </Sphere>
    </group>
  )
}

function Electron({
  orbitRadius,
  orbitSpeed,
  phaseOffset,
  orbitTilt = 0,
  electronColor = "#4dabf7",
}: {
  orbitRadius: number
  orbitSpeed: number
  phaseOffset: number
  orbitTilt?: number
  electronColor?: string
}) {
  // Create a ref for the group that will contain our electron
  const groupRef = useRef<Group>(null)
  // Create a ref for the electron itself
  const electronRef = useRef<Group>(null)

  // Initial position is just for the starting point
  const [initialPos] = useState(new Vector3(orbitRadius, 0, 0))

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime() * orbitSpeed + phaseOffset

      // Calculate position with tilt
      const x = Math.cos(t) * orbitRadius
      const z = Math.sin(t) * orbitRadius
      const y = Math.sin(t) * Math.sin(orbitTilt) * orbitRadius

      // Update the group's position instead of directly updating the electron
      groupRef.current.position.x = x
      groupRef.current.position.y = y
      groupRef.current.position.z = z
    }
  })

  return (
    // Use a parent group to control the position
    <group ref={groupRef} position={initialPos}>
      <Trail width={0.5} length={10} color={new Color(electronColor)} attenuation={(t) => t * t}>
        <Sphere args={[0.1, 16, 16]} ref={electronRef}>
          <meshStandardMaterial color={electronColor} emissive={electronColor} emissiveIntensity={0.5} />
        </Sphere>
      </Trail>
    </group>
  )
}

function ElectronShell({
  shellNumber,
  electronCount,
  baseRadius = 1.5,
  baseSpeed = 1.0,
  electronColor = "#4dabf7",
}: {
  shellNumber: number
  electronCount: number
  baseRadius?: number
  baseSpeed?: number
  electronColor?: string
}) {
  const shellRadius = baseRadius * shellNumber
  const electrons = []

  // Calculate electron distribution
  for (let i = 0; i < electronCount; i++) {
    const phaseOffset = (i / electronCount) * Math.PI * 2
    const orbitTilt = ((i % 3) * Math.PI) / 4 // Vary the tilt for visual interest
    const speed = baseSpeed / (shellNumber * 0.8) // Outer shells move slower

    electrons.push(
      <Electron
        key={i}
        orbitRadius={shellRadius}
        orbitSpeed={speed}
        phaseOffset={phaseOffset}
        orbitTilt={orbitTilt}
        electronColor={electronColor}
      />,
    )
  }

  return <>{electrons}</>
}

function AtomicStructure({ element }: { element: ElementType }) {
  // Parse electron configuration to determine shell structure
  const electronConfig = element.electronConfiguration
  const shells: number[] = []

  // Very simplified parsing of electron configuration
  // In a real app, this would be more sophisticated
  const shellRegex =
    /(\d+)s²|\d+s¹|(\d+)p⁶|\d+p⁵|\d+p⁴|\d+p³|\d+p²|\d+p¹|(\d+)d¹⁰|\d+d⁹|\d+d⁸|\d+d⁷|\d+d⁶|\d+d⁵|\d+d⁴|\d+d³|\d+d²|\d+d¹|(\d+)f¹⁴|\d+f¹³|\d+f¹²|\d+f¹¹|\d+f¹⁰|\d+f⁹|\d+f⁸|\d+f⁷|\d+f⁶|\d+f⁵|\d+f⁴|\d+f³|\d+f²|\d+f¹/g

  // Initialize shells array with zeros
  for (let i = 0; i < 7; i++) {
    shells[i] = 0
  }

  // Count electrons in each shell based on configuration
  const matches = electronConfig.match(shellRegex) || []
  matches.forEach((match) => {
    const shellNumber = Number.parseInt(match.match(/\d+/)?.[0] || "1") - 1

    if (match.includes("s²")) shells[shellNumber] += 2
    else if (match.includes("s¹")) shells[shellNumber] += 1
    else if (match.includes("p⁶")) shells[shellNumber] += 6
    else if (match.includes("p⁵")) shells[shellNumber] += 5
    else if (match.includes("p⁴")) shells[shellNumber] += 4
    else if (match.includes("p³")) shells[shellNumber] += 3
    else if (match.includes("p²")) shells[shellNumber] += 2
    else if (match.includes("p¹")) shells[shellNumber] += 1
    else if (match.includes("d¹⁰")) shells[shellNumber] += 10
    else if (match.includes("d⁹")) shells[shellNumber] += 9
    else if (match.includes("d⁸")) shells[shellNumber] += 8
    else if (match.includes("d⁷")) shells[shellNumber] += 7
    else if (match.includes("d⁶")) shells[shellNumber] += 6
    else if (match.includes("d⁵")) shells[shellNumber] += 5
    else if (match.includes("d⁴")) shells[shellNumber] += 4
    else if (match.includes("d³")) shells[shellNumber] += 3
    else if (match.includes("d²")) shells[shellNumber] += 2
    else if (match.includes("d¹")) shells[shellNumber] += 1
    else if (match.includes("f¹⁴")) shells[shellNumber] += 14
    else if (match.includes("f¹³")) shells[shellNumber] += 13
    else if (match.includes("f¹²")) shells[shellNumber] += 12
    else if (match.includes("f¹¹")) shells[shellNumber] += 11
    else if (match.includes("f¹⁰")) shells[shellNumber] += 10
    else if (match.includes("f⁹")) shells[shellNumber] += 9
    else if (match.includes("f⁸")) shells[shellNumber] += 8
    else if (match.includes("f⁷")) shells[shellNumber] += 7
    else if (match.includes("f⁶")) shells[shellNumber] += 6
    else if (match.includes("f⁵")) shells[shellNumber] += 5
    else if (match.includes("f⁴")) shells[shellNumber] += 4
    else if (match.includes("f³")) shells[shellNumber] += 3
    else if (match.includes("f²")) shells[shellNumber] += 2
    else if (match.includes("f¹")) shells[shellNumber] += 1
  })

  // Fallback for elements with complex configurations
  if (shells.every((count) => count === 0)) {
    // Simplified shell distribution based on atomic number
    const atomicNumber = element.atomicNumber
    let remaining = atomicNumber

    // Fill shells according to 2n² rule (simplified)
    for (let n = 1; n <= 7 && remaining > 0; n++) {
      const capacity = 2 * (n * n)
      shells[n - 1] = Math.min(remaining, capacity)
      remaining -= shells[n - 1]
    }
  }

  // Get element category for color theming
  const getElectronColor = () => {
    switch (element.category) {
      case "Alkali Metal":
        return "#ff6b6b"
      case "Alkaline Earth Metal":
        return "#ffa94d"
      case "Transition Metal":
        return "#ffd43b"
      case "Post-Transition Metal":
        return "#a9e34b"
      case "Metalloid":
        return "#69db7c"
      case "Nonmetal":
        return "#38d9a9"
      case "Halogen":
        return "#3bc9db"
      case "Noble Gas":
        return "#4dabf7"
      case "Lanthanide":
        return "#748ffc"
      case "Actinide":
        return "#da77f2"
      default:
        return "#4dabf7"
    }
  }

  const electronColor = getElectronColor()

  return (
    <>
      <Nucleus
        protons={element.atomicNumber}
        neutrons={Math.round(Number.parseFloat(element.atomicMass)) - element.atomicNumber}
      />

      {shells.map(
        (electronCount, index) =>
          electronCount > 0 && (
            <ElectronShell
              key={index}
              shellNumber={index + 1}
              electronCount={Math.min(electronCount, 8)} // Limit displayed electrons for visual clarity
              electronColor={electronColor}
            />
          ),
      )}
    </>
  )
}

export default function AtomicModel3D({ element }: AtomicModelProps) {
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="h-64 w-full rounded-lg border border-amber-200 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-900/10">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AtomicStructure element={element} />
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  )
}
