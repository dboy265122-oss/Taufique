"use client"

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Play, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AnimatedCounter } from './animated-counter'

// Ultra-light CSS-only background (no Three.js)
function HeroGlowBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        animate={{ x: [0, 100, -50, 0], y: [0, -80, 40, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-96 h-96 rounded-full blur-3xl bg-gradient-to-br from-cyan-500 to-transparent opacity-20"
        style={{ top: '10%', left: '5%' }}
      />
      <motion.div
        animate={{ x: [0, -120, 60, 0], y: [0, 100, -50, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-80 h-80 rounded-full blur-3xl bg-gradient-to-tl from-violet-500 to-transparent opacity-15"
        style={{ bottom: '10%', right: '10%' }}
      />
    </div>
  )
}

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const perfTier = usePerfTier()

  const springConfig = { damping: 30, stiffness: 100 }
  const moveX = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), springConfig)
  const moveY = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      mouseX.set(x)
      mouseY.set(y)
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const words = ["Websites", "AI Agents", "Apps", "Automation", "Brands"]
  const [currentWord, setCurrentWord] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden section-void">
      {/* CSS-only animated glow background (no Three.js) */}
      <HeroGlowBackground />

      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Moving Gradient Mesh */}
        <motion.div
          style={{ x: moveX, y: moveY }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-gradient-to-r from-accent/20 to-accent/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-gradient-to-l from-accent/15 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"
          />
        </motion.div>
        
        {/* Grid Pattern with Gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      {/* Mouse Glow Effect */}
      <motion.div
        className="absolute pointer-events-none w-[400px] h-[400px] rounded-full blur-3xl bg-accent/5 hidden lg:block"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
        }}
        transition={{ type: "spring", damping: 30 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-dark mb-8 border border-accent/10"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={16} className="text-accent" />
          </motion.div>
          <span className="text-sm font-medium text-muted-foreground">
            Available for Premium Projects
          </span>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </motion.div>

        {/* Main Heading with Animated Words */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
            <span className="block text-foreground mb-2">Building Future</span>
            <span className="relative inline-block h-[1.2em] overflow-hidden">
              {words.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{
                    y: currentWord === index ? 0 : -100,
                    opacity: currentWord === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute left-0 right-0 text-gradient"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>
          
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-1 w-24 mx-auto mt-8 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          {"I'm"} <span className="text-foreground font-semibold">Sk Taufique Hossain</span> — Tech Entrepreneur, 
          AI Innovator & Creative Developer crafting futuristic digital experiences and intelligent automation systems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium overflow-hidden"
          >
            <span className="relative z-10">Explore My Work</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <motion.div
              className="absolute inset-0 bg-accent"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 glass-dark rounded-full font-medium text-foreground hover:border-accent/30 transition-all border border-transparent"
          >
            <Play size={16} className="text-accent" />
            Start a Project
          </motion.a>
        </motion.div>

        {/* Stats with Animated Counters */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: 50, suffix: '+', label: 'Projects Delivered' },
            { number: 30, suffix: '+', label: 'Happy Clients' },
            { number: 5, suffix: '+', label: 'Years Experience' },
            { number: 15, suffix: '+', label: 'Technologies' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group text-center p-6 rounded-2xl hover:bg-secondary/50 transition-all"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                <AnimatedCounter value={stat.number} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </motion.div>

      {/* Side decorative elements */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4"
      >
        {['01', '02', '03'].map((num, i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.4 + i * 0.1 }}
            className="text-xs font-mono text-muted-foreground"
          >
            {num}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
