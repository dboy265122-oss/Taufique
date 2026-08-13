"use client"

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const CYAN = new THREE.Color('#22d3ee')
const VIOLET = new THREE.Color('#a78bfa')

interface NeuralMeshSceneProps {
  nodeCount?: number
}

/**
 * A dense sphere of "neuron" nodes with connecting edges between nearby
 * nodes, plus a sparse set of pulses that travel along random edges to
 * simulate signal firing. This is intentionally the heaviest scene in the
 * site, reserved for the Future Vision section as the hero-level visual.
 */
export function NeuralMeshScene({ nodeCount = 90 }: NeuralMeshSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const nodesRef = useRef<THREE.Points>(null)

  const nodePositions = useMemo(() => {
    const nodes: THREE.Vector3[] = []
    for (let i = 0; i < nodeCount; i++) {
      const radius = 1.8 + Math.random() * 0.4
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
    return nodes
  }, [nodeCount])

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(nodePositions.length * 3)
    const colors = new Float32Array(nodePositions.length * 3)
    const color = new THREE.Color()

    nodePositions.forEach((p, i) => {
      positions[i * 3] = p.x
      positions[i * 3 + 1] = p.y
      positions[i * 3 + 2] = p.z
      color.copy(CYAN).lerp(VIOLET, Math.random())
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    })

    return { positions, colors }
  }, [nodePositions])

  // Build edges: connect each node to its 2 nearest neighbors
  const edgePositions = useMemo(() => {
    const segments: number[] = []
    for (let i = 0; i < nodePositions.length; i++) {
      const distances = nodePositions
        .map((p, j) => ({ j, d: i === j ? Infinity : nodePositions[i].distanceTo(p) }))
        .sort((a, b) => a.d - b.d)

      for (let k = 0; k < 2; k++) {
        const neighbor = distances[k]
        if (neighbor && neighbor.d < 1.4) {
          segments.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z)
          segments.push(nodePositions[neighbor.j].x, nodePositions[neighbor.j].y, nodePositions[neighbor.j].z)
        }
      }
    }
    return new Float32Array(segments)
  }, [nodePositions])

  const edgeMaterialRef = useRef<THREE.LineBasicMaterial>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.15
    }
    if (nodesRef.current) {
      const mat = nodesRef.current.material as THREE.PointsMaterial
      mat.size = 0.06 + Math.sin(t * 2) * 0.015
    }
    if (edgeMaterialRef.current) {
      edgeMaterialRef.current.opacity = 0.25 + Math.sin(t * 1.2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 2, 3]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-3, -2, -3]} intensity={0.9} color="#a78bfa" />

      {/* Outer wireframe shell for depth */}
      <mesh>
        <icosahedronGeometry args={[2.3, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={edgeMaterialRef} color="#5eead4" transparent opacity={0.3} />
      </lineSegments>

      {/* Nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Central glowing core */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.25} />
      </mesh>
    </group>
  )
}
