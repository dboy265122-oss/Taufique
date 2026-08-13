"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showName, setShowName] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Show name after a brief delay
    const nameTimer = setTimeout(() => setShowName(true), 300)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 800)
          return 100
        }
        return prev + Math.random() * 12
      })
    }, 80)

    return () => {
      clearInterval(interval)
      clearTimeout(nameTimer)
    }
  }, [])

  const nameLetters = "Sk Taufique Hossain".split("")

  // Generate particle positions deterministically to avoid hydration mismatch
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    xPercent: (i * 5) % 100,
    yOffset: (i * 7) % 50,
    duration: 4 + (i % 4),
    delay: i * 0.3,
  }))

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            {/* Radial gradient pulse */}
            <motion.div
              animate={{
                scale: [1, 2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl"
            />
            
            {/* Grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.04)_1px,transparent_1px)] bg-[size:50px_50px]" />
            
            {/* Floating particles - only render on client */}
            {isMounted && particles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{ opacity: 0, y: '100vh' }}
                animate={{ 
                  opacity: [0, 0.6, 0],
                  y: '-10vh',
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeOut",
                }}
                className="absolute w-1 h-1 bg-accent/60 rounded-full"
                style={{
                  left: `${particle.xPercent}%`,
                  bottom: `${particle.yOffset}%`,
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center px-6">
            {/* Logo Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="relative mx-auto mb-12"
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 30px rgba(34, 211, 238, 0.3)',
                    '0 0 60px rgba(34, 211, 238, 0.5)',
                    '0 0 30px rgba(34, 211, 238, 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent via-accent/80 to-accent/60 flex items-center justify-center"
              >
                <span className="text-4xl font-bold text-accent-foreground">T</span>
              </motion.div>
              
              {/* Orbiting dot */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent" />
              </motion.div>
            </motion.div>

            {/* Animated Name */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 overflow-hidden"
            >
              {showName && nameLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={letter === ' ' ? 'inline-block w-3' : 'inline-block text-foreground'}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="text-muted-foreground text-lg mb-12"
            >
              Tech Entrepreneur & AI Innovator
            </motion.p>

            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="w-full max-w-xs mx-auto"
            >
              {/* Progress Bar Container */}
              <div className="relative">
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    className="h-full bg-gradient-to-r from-accent via-accent/80 to-accent rounded-full relative"
                  >
                    {/* Shine effect */}
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Progress Text */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-muted-foreground">Loading Experience</span>
                <span className="text-sm font-mono text-foreground font-medium">
                  {Math.min(Math.round(progress), 100)}%
                </span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
              Initializing
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
