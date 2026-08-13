"use client"

/**
 * CSSAmbientGlow — a cheap visual stand-in for the old per-section
 * <SceneWrapper><AmbientField /></SceneWrapper> pattern.
 *
 * Renders a couple of soft blurred gradient blobs (cyan/violet) using only
 * CSS, no canvas/WebGL context. This keeps every section feeling "lit up"
 * without the cost of 11 separate Three.js renderers running at once,
 * which was the main cause of slow loads/timeouts.
 */
export function CSSAmbientGlow({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: '40%',
          height: '40%',
          top: '10%',
          left: '5%',
          background: 'radial-gradient(circle, oklch(0.75 0.18 200 / 0.18), transparent 70%)',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: '45%',
          height: '45%',
          bottom: '5%',
          right: '5%',
          background: 'radial-gradient(circle, oklch(0.65 0.22 305 / 0.15), transparent 70%)',
        }}
      />
    </div>
  )
}
