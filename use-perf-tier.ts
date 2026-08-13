"use client"

import { useEffect, useState } from 'react'

export type PerfTier = 'high' | 'medium' | 'low'

/**
 * Rough heuristic device-capability tier.
 * - 'low': prefers-reduced-motion, or very few cores, or small mobile screen
 * - 'medium': mobile/tablet without reduced motion
 * - 'high': everything else (desktop / capable devices)
 *
 * This is intentionally generous — per the brief we favor visual richness,
 * this just prevents the lowest-end devices from locking up.
 */
export function usePerfTier(): PerfTier {
  const [tier, setTier] = useState<PerfTier>('high')

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cores = navigator.hardwareConcurrency || 8
    const isSmallScreen = window.innerWidth < 768

    if (reduceMotion || cores <= 2) {
      setTier('low')
    } else if (isSmallScreen || cores <= 4) {
      setTier('medium')
    } else {
      setTier('high')
    }
  }, [])

  return tier
}

export const PARTICLE_COUNTS: Record<PerfTier, number> = {
  high: 350,
  medium: 180,
  low: 80,
}

export const NODE_COUNTS: Record<PerfTier, number> = {
  high: 20,
  medium: 12,
  low: 6,
}
