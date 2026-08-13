"use client"

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { TrendingUp, Users, Clock, Award } from 'lucide-react'
import { CSSAmbientGlow } from '@/components/three/css-ambient-glow'

const stats = [
  { icon: TrendingUp, value: 50, suffix: '+', label: 'Projects Completed', description: 'Delivered with excellence' },
  { icon: Users, value: 30, suffix: '+', label: 'Happy Clients', description: 'Worldwide partnerships' },
  { icon: Clock, value: 10000, suffix: '+', label: 'Hours of Work', description: 'Dedicated craftsmanship' },
  { icon: Award, value: 99, suffix: '%', label: 'Client Satisfaction', description: 'Quality guaranteed' },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export function StatsSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  return (
    <section className="py-32 relative overflow-hidden section-void">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      <CSSAmbientGlow />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-border/20 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-border/10 rounded-full"
      />

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">Achievement Stats</span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Numbers That <span className="text-gradient">Speak</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-3xl neon-card overflow-hidden">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6"
                >
                  <stat.icon className="w-7 h-7 text-accent" />
                </motion.div>

                {/* Number */}
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-foreground mb-1">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>

                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-border/30 rounded-tr-xl group-hover:border-accent/50 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
