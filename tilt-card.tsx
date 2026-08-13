"use client"

import { motion } from 'framer-motion'
import { useRef, useState, type ReactNode } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Max tilt angle in degrees */
  maxTilt?: number
}

/**
 * Wraps children in a perspective container and tilts them in 3D based on
 * real-time mouse position relative to the card bounds. Resets smoothly
 * on mouse leave via a spring transition.
 */
export function TiltCard({ children, className = '', maxTilt = 12 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -maxTilt, y: px * maxTilt })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
      className={`h-full ${className}`}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
