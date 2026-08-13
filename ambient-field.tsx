"use client"

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const CYAN = new THREE.Color('#22d3ee')
const VIOLET = new THREE.Color('#a78bfa')

interface AmbientFieldProps {
  count?: number
  spread?: number
  speed?: number
}

/**
 * A drifting field of glowing dust/particles, color-mixed cyan/violet.
 * Cheap to render — single Points object, no per-frame geometry rewrite.
 * Used as a subtle "the AI is alive" backdrop behind ordinary content
 * sections, distinct from the heavier Hero/FutureVision centerpieces.
 */
export function AmbientField({ count = 600, spread = 9, speed = 0.05 }: AmbientFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const color = new THREE.Color()

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread * 2
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread

      color.copy(CYAN).lerp(VIOLET, Math.random())
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    return { positions, colors }
  }, [count, spread])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const t = clock.getElapsedTime()
      pointsRef.current.rotation.y = t * speed
      pointsRef.current.position.y = Math.sin(t * 0.15) * 0.3
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/**
 * A single slowly-tumbling wireframe shape (torus knot / icosahedron /
 * octahedron), used as a decorative side-element in content sections
 * like About or Why-Work-With-Me.
 */
export function FloatingWireframe({
  shape = 'icosahedron',
  color = '#22d3ee',
  size = 1.2,
}: {
  shape?: 'icosahedron' | 'torusKnot' | 'octahedron'
  color?: string
  size?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime()
      meshRef.current.rotation.x = t * 0.15
      meshRef.current.rotation.y = t * 0.22
      meshRef.current.position.y = Math.sin(t * 0.4) * 0.25
    }
  })

  return (
    <mesh ref={meshRef}>
      {shape === 'icosahedron' && <icosahedronGeometry args={[size, 1]} />}
      {shape === 'torusKnot' && <torusKnotGeometry args={[size * 0.7, size * 0.22, 128, 16]} />}
      {shape === 'octahedron' && <octahedronGeometry args={[size, 0]} />}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
    </mesh>
  )
}
