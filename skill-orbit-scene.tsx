"use client"

import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const CYAN = '#22d3ee'
const VIOLET = '#a78bfa'

interface OrbitNodeProps {
  label: string
  radius: number
  speed: number
  angleOffset: number
  inclination: number
  color: string
}

function OrbitNode({ label, radius, speed, angleOffset, inclination, color }: OrbitNodeProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + angleOffset
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(t) * radius
      groupRef.current.position.z = Math.sin(t) * radius
      groupRef.current.position.y = Math.sin(t * 0.7) * inclination
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
        <div
          style={{
            fontSize: '11px',
            fontFamily: 'monospace',
            color: color,
            whiteSpace: 'nowrap',
            textShadow: `0 0 8px ${color}`,
            transform: 'translateY(-18px)',
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  )
}

function OrbitRing({ radius, opacity = 0.12 }: { radius: number; opacity?: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
    }
    return pts
  }, [radius])

  return (
    <line>
      <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints(points)} />
      <lineBasicMaterial attach="material" color={CYAN} transparent opacity={opacity} />
    </line>
  )
}

function CentralCore() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.3
      ref.current.rotation.x = clock.getElapsedTime() * 0.15
    }
  })
  return (
    <>
      <mesh ref={ref}>
        <octahedronGeometry args={[0.45, 1]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.7} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.4} />
      </mesh>
    </>
  )
}

const TECHS = [
  'React', 'Next.js', 'TypeScript', 'Python', 'Node.js',
  'TailwindCSS', 'AWS', 'Docker', 'OpenAI', 'LangChain',
  'PostgreSQL', 'Figma',
]

export function SkillOrbitScene() {
  const group = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.02
    }
  })

  const ring1 = TECHS.slice(0, 4)
  const ring2 = TECHS.slice(4, 8)
  const ring3 = TECHS.slice(8, 12)

  return (
    <group ref={group} rotation={[0.35, 0, 0]}>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} intensity={1} color={CYAN} />
      <CentralCore />

      <OrbitRing radius={1.6} />
      {ring1.map((tech, i) => (
        <OrbitNode
          key={tech}
          label={tech}
          radius={1.6}
          speed={0.3}
          angleOffset={(i / ring1.length) * Math.PI * 2}
          inclination={0.15}
          color={CYAN}
        />
      ))}

      <OrbitRing radius={2.4} opacity={0.1} />
      {ring2.map((tech, i) => (
        <OrbitNode
          key={tech}
          label={tech}
          radius={2.4}
          speed={-0.22}
          angleOffset={(i / ring2.length) * Math.PI * 2}
          inclination={0.25}
          color={VIOLET}
        />
      ))}

      <OrbitRing radius={3.2} opacity={0.08} />
      {ring3.map((tech, i) => (
        <OrbitNode
          key={tech}
          label={tech}
          radius={3.2}
          speed={0.16}
          angleOffset={(i / ring3.length) * Math.PI * 2}
          inclination={0.35}
          color={CYAN}
        />
      ))}
    </group>
  )
}
