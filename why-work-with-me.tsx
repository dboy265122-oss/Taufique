"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Zap, Palette, Brain, MessageSquare, Rocket, Shield } from 'lucide-react'
import { CSSAmbientGlow } from '@/components/three/css-ambient-glow'

const reasons = [
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Rapid turnaround without compromising quality. Your projects delivered on time, every time.',
    gradient: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    icon: Palette,
    title: 'Modern Design',
    description: 'Cutting-edge aesthetics with pixel-perfect execution. Designs that captivate and convert.',
    gradient: 'from-pink-500/20 to-purple-500/20',
  },
  {
    icon: Brain,
    title: 'AI-Powered Solutions',
    description: 'Leveraging artificial intelligence to create smarter, more efficient digital experiences.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: MessageSquare,
    title: 'Clear Communication',
    description: 'Transparent updates and responsive collaboration throughout the entire project lifecycle.',
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    icon: Rocket,
    title: 'Future-Focused',
    description: 'Building with tomorrow in mind. Scalable solutions that grow with your business.',
    gradient: 'from-violet-500/20 to-indigo-500/20',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'Rigorous testing and attention to detail ensure flawless results every time.',
    gradient: 'from-red-500/20 to-rose-500/20',
  },
]

export function WhyWorkWithMe() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <section className="py-32 relative overflow-hidden section-void">
      {/* Lightweight CSS Glow (replaces heavy 3D canvas) */}
      <CSSAmbientGlow />

      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.75_0.18_200/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,oklch(0.65_0.22_305/0.08),transparent_50%)]" />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">Why Choose Me</span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            The <span className="text-gradient">Difference</span> I Bring
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Combining technical expertise with creative vision to deliver exceptional results that exceed expectations.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-3xl neon-card h-full">
                {/* Hover gradient */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors"
                  >
                    <reason.icon className="w-8 h-8 text-foreground group-hover:text-accent transition-colors" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-foreground mb-3">{reason.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
                </div>

                {/* Number indicator */}
                <div className="absolute top-6 right-6 text-6xl font-bold text-border/30 group-hover:text-accent/20 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
