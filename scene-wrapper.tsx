"use client"

import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'

interface SceneWrapperProps {
  children: ReactNode
  className?: string
  /** Camera field of view */
  fov?: number
  /** Camera position [x, y, z] */
  cameraPosition?: [number, number, number]
  /** Allow pointer events to pass through to the canvas (for interactive 3D) */
  interactive?: boolean
  /** Lower DPR cap for heavier scenes */
  maxDpr?: number
}

/**
 * SceneWrapper mounts a react-three-fiber <Canvas> only once the section
 * scrolls into the viewport, and unmounts the render loop when it scrolls
 * far out of view. This keeps "heavy 3D on every section" from tanking
 * frame rate, since only 1-2 scenes are ever actually animating at once.
 */
export function SceneWrapper({
  children,
  className = '',
  fov = 45,
  cameraPosition = [0, 0, 8],
  interactive = false,
  maxDpr = 1.5,
}: SceneWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '200px 0px 200px 0px', threshold: 0.01 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`canvas-bg ${interactive ? 'interactive' : ''} ${className}`}
    >
      {hasMounted && (
        <Canvas
          dpr={[1, maxDpr]}
          frameloop={isVisible ? 'always' : 'never'}
          camera={{ fov, position: cameraPosition }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ pointerEvents: interactive ? 'auto' : 'none' }}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      )}
    </div>
  )
}
