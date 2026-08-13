"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Brain, Rocket, LineChart } from 'lucide-react'
import { CSSAmbientGlow } from '@/components/three/css-ambient-glow'

const highlights = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'Building scalable web and mobile applications with modern technologies',
  },
  {
    icon: Brain,
    title: 'AI Innovation',
    description: 'Creating intelligent automation systems and AI-powered solutions',
  },
  {
    icon: LineChart,
    title: 'Trading Systems',
    description: 'Developing sophisticated algorithmic trading and analysis tools',
  },
  {
    icon: Rocket,
    title: 'Digital Solutions',
    description: 'Transforming ideas into powerful digital experiences',
  },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="relative py-32 overflow-hidden section-void">
      {/* Lightweight CSS Glow (replaces heavy 3D canvas) */}
      <CSSAmbientGlow />

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              About Me
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
              Passionate Developer & AI Innovator
            </h2>
            <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
              <p>
                {"I'm"} <span className="text-foreground font-medium">Sk Taufique Hossain</span>, a tech entrepreneur 
                dedicated to building modern digital experiences that push the boundaries of innovation. With expertise 
                spanning web development, app development, AI automation, and trading systems, I bring a unique blend 
                of technical excellence and creative vision to every project.
              </p>
              <p>
                My journey in technology is driven by a relentless passion for creating solutions that matter. 
                From crafting stunning user interfaces to developing intelligent AI agents, I specialize in 
                transforming complex ideas into elegant, functional realities.
              </p>
              <p>
                I believe in the power of technology to shape the future, and {"I'm"} committed to staying at the 
                forefront of innovation. Whether {"it's"} building cutting-edge websites, developing sophisticated 
                trading algorithms, or creating AI-powered automation systems, I bring dedication and expertise 
                to everything I do.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group p-6 rounded-2xl neon-card"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
