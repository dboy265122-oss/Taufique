"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, ArrowUpRight, Cpu, Globe, Layers } from 'lucide-react'
import { SceneWrapper } from '@/components/three/scene-wrapper'
import { NeuralMeshScene } from '@/components/three/neural-mesh-scene'
import { usePerfTier } from '@/hooks/use-perf-tier'

export function FutureVision() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const perfTier = usePerfTier()

  const visionPoints = [
    { icon: Cpu, text: 'Building intelligent AI systems that transform industries' },
    { icon: Globe, text: 'Creating digital brands that resonate globally' },
    { icon: Layers, text: 'Developing automation tools for the future of work' },
  ]

  return (
    <section className="py-32 relative overflow-hidden section-void">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        {/* Floating orbs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-medium text-accent uppercase tracking-wider mb-6">
              <Sparkles size={16} />
              Future Vision
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Shaping The <br />
              <span className="text-gradient">Digital Future</span>
            </h2>
            
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
              My vision extends beyond creating websites and apps. I am dedicated to building 
              futuristic AI systems, intelligent digital brands, automation tools, and modern 
              technology experiences that will define how we interact with the digital world tomorrow.
            </p>

            <div className="mt-10 space-y-6">
              {visionPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <point.icon className="w-6 h-6 text-accent" />
                  </div>
                  <span className="text-foreground font-medium">{point.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium group"
            >
              Join The Journey
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Right Visual — 3D Neural Mesh */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* 3D Neural Mesh Canvas */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                {perfTier !== 'low' && (
                  <SceneWrapper cameraPosition={[0, 0, 6]} fov={45} maxDpr={1.5}>
                    <NeuralMeshScene nodeCount={perfTier === 'high' ? 45 : 25} />
                  </SceneWrapper>
                )}
              </div>

              {/* Center label overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-center"
                >
                  <div className="text-5xl font-bold text-gradient">2030</div>
                  <div className="text-sm text-muted-foreground mt-2">Vision</div>
                </motion.div>
              </div>

              {/* Floating labels */}
              {['AI', 'Web3', 'Automation', 'Innovation'].map((label, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="absolute px-4 py-2 rounded-full neon-card text-sm font-medium text-foreground"
                  style={{
                    top: `${20 + index * 20}%`,
                    [index % 2 === 0 ? 'left' : 'right']: '-10%',
                  }}
                >
                  {label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
