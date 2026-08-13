"use client"

import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const CYAN = new THREE.Color('#22d3ee')
const VIOLET = new THREE.Color('#a78bfa')

/**
 * The glowing wireframe core — an icosahedron whose vertices are displaced
 * by layered noise-like sine waves every frame, giving an organic
 * "thinking" pulse. Rendered as wireframe + a faint inner solid for depth.
 */
function NeuralCore({ pointer }: { pointer: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.6, 2), [])
  const basePositions = useMemo(
    () => geometry.attributes.position.array.slice(),
    [geometry]
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const posAttr = geometry.attributes.position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array

    for (let i = 0; i < arr.length; i += 3) {
      const x = basePositions[i] as number
      const y = basePositions[i + 1] as number
      const z = basePositions[i + 2] as number
      const len = Math.sqrt(x * x + y * y + z * z) || 1
      const nx = x / len
      const ny = y / len
      const nz = z / len

      const noise =
        Math.sin(x * 1.5 + t * 0.8) * 0.08 +
        Math.sin(y * 2.0 + t * 1.1) * 0.06 +
        Math.cos(z * 1.8 + t * 0.6) * 0.07

      const scale = 1 + noise
      arr[i] = nx * len * scale
      arr[i + 1] = ny * len * scale
      arr[i + 2] = nz * len * scale
    }
    posAttr.needsUpdate = true

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.12 + pointer.x * 0.4
      meshRef.current.rotation.x = pointer.y * 0.3
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.08
      innerRef.current.rotation.z = t * 0.05
    }
  })

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshBasicMaterial color={VIOLET} wireframe transparent opacity={0.2} />
      </mesh>
      {/* Soft glow core */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.12} />
      </mesh>
    </group>
  )
}

/**
 * Orbiting particle field — points distributed on a thick spherical shell,
 * slowly rotating, color-mixed between cyan and violet.
 */
function ParticleField({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const color = new THREE.Color()

    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 2.2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      color.copy(CYAN).lerp(VIOLET, Math.random())
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors }
  }, [count])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.04
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/**
 * Sparse neural "synapse" lines connecting random nearby particles —
 * gives the classic neural-network look. Recomputed once, animated via
 * opacity pulse rather than per-frame geometry rebuild (cheap).
 */
function SynapseLines({ count }: { count: number }) {
  const lineRef = useRef<THREE.LineSegments>(null)

  const positions = useMemo(() => {
    const nodes: THREE.Vector3[] = []
    for (let i = 0; i < count; i++) {
      const radius = 1.8 + Math.random() * 1.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      nodes.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        )
      )
    }

    const segments: number[] = []
    for (let i = 0; i < nodes.length; i++) {
      let closestDist = Infinity
      let closestIdx = -1
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue
        const d = nodes[i].distanceTo(nodes[j])
        if (d < closestDist) {
          closestDist = d
          closestIdx = j
        }
      }
      if (closestIdx >= 0 && closestDist < 2.2) {
        segments.push(nodes[i].x, nodes[i].y, nodes[i].z)
        segments.push(nodes[closestIdx].x, nodes[closestIdx].y, nodes[closestIdx].z)
      }
    }
    return new Float32Array(segments)
  }, [count])

  useFrame(({ clock }) => {
    const mat = lineRef.current?.material as THREE.LineBasicMaterial | undefined
    if (mat) {
      mat.opacity = 0.15 + Math.sin(clock.getElapsedTime() * 1.5) * 0.08
    }
    if (lineRef.current) {
      lineRef.current.rotation.y = clock.getElapsedTime() * 0.04
    }
  })

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={CYAN} transparent opacity={0.2} />
    </lineSegments>
  )
}

interface NeuralCoreSceneProps {
  particleCount?: number
  nodeCount?: number
}

/**
 * Full hero scene: core + particles + synapse web + lighting, all tracking
 * normalized pointer position passed down from the parent component.
 */
export function NeuralCoreScene({ particleCount = 1500, nodeCount = 40 }: NeuralCoreSceneProps) {
  const pointer = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  useFrame((state) => {
    pointer.current.x = state.pointer.x
    pointer.current.y = state.pointer.y
  })

  const scale = Math.min(1, viewport.width / 8)

  return (
    <group scale={scale}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#a78bfa" />
      <NeuralCore pointer={pointer.current} />
      <ParticleField count={particleCount} />
      <SynapseLines count={nodeCount} />
    </group>
  )
}
