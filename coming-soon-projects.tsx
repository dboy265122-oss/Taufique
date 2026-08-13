"use client"

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Bot, Video, Sparkles, Lock, ArrowUpRight, Zap } from 'lucide-react'
import { CSSAmbientGlow } from '@/components/three/css-ambient-glow'

const upcomingProjects = [
  {
    id: 'zoya-ai',
    name: 'Zoya AI',
    tagline: 'The Future of Intelligent Assistance',
    description: 'An advanced futuristic AI assistant project focused on smart conversations, intelligent automation, and modern AI experiences. Zoya AI will revolutionize how you interact with technology.',
    icon: Bot,
    status: 'In Development',
    gradient: 'from-violet-600 via-purple-600 to-indigo-600',
    glowColor: 'violet',
    features: ['Smart Conversations', 'Task Automation', 'Voice Interface', 'Multi-Modal AI'],
  },
  {
    id: 'ghost-reel-ai',
    name: 'Ghost Reel AI',
    tagline: 'AI-Powered Content Revolution',
    description: 'A next-generation AI-powered content and reel creation system designed for viral short-form content automation, cinematic editing, and social media growth at scale.',
    icon: Video,
    status: 'Coming Soon',
    gradient: 'from-cyan-600 via-blue-600 to-indigo-600',
    glowColor: 'cyan',
    features: ['Auto Editing', 'Viral Hooks', 'AI Captions', 'Multi-Platform'],
  },
]

export function ComingSoonProjects() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="py-32 relative overflow-hidden section-void">
      {/* Lightweight CSS Glow (replaces heavy 3D canvas) */}
      <CSSAmbientGlow />

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Glow orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-dark border border-accent/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Currently Building</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Future <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Exciting innovations currently in development. Get a sneak peek at what{"'"}s coming next.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {upcomingProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
            >
              {/* Card */}
              <div className="relative rounded-3xl overflow-hidden neon-card transition-all duration-700">
                {/* Animated border gradient */}
                <motion.div
                  animate={{
                    backgroundPosition: hoveredCard === project.id ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%',
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  style={{ padding: '1px', backgroundSize: '200% 200%' }}
                >
                  <div className="absolute inset-[1px] rounded-3xl bg-background" />
                </motion.div>

                {/* Inner content */}
                <div className="relative p-8 lg:p-10 bg-gradient-to-br from-background to-secondary/20">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">{project.status}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: hoveredCard === project.id ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-accent/10 transition-colors"
                    >
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </motion.div>
                  </div>

                  {/* Icon */}
                  <motion.div
                    animate={{ 
                      scale: hoveredCard === project.id ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-8 shadow-lg`}
                    style={{
                      boxShadow: hoveredCard === project.id 
                        ? `0 20px 40px -10px ${project.glowColor === 'violet' ? 'rgba(139, 92, 246, 0.4)' : 'rgba(6, 182, 212, 0.4)'}` 
                        : 'none',
                    }}
                  >
                    <project.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Title & Description */}
                  <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">{project.name}</h3>
                  <p className="text-accent font-medium mb-4">{project.tagline}</p>
                  <p className="text-muted-foreground leading-relaxed mb-8">{project.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground group-hover:bg-accent/10 group-hover:text-accent transition-colors"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Notify Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`mt-8 w-full py-4 rounded-2xl bg-gradient-to-r ${project.gradient} text-white font-medium flex items-center justify-center gap-2 opacity-90 hover:opacity-100 transition-opacity`}
                  >
                    <Zap className="w-5 h-5" />
                    Get Notified on Launch
                  </motion.button>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${project.gradient} opacity-5 rotate-45 translate-x-32 -translate-y-32`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground">
            Want to collaborate on the next big thing?{' '}
            <a href="#contact" className="text-accent hover:underline font-medium">
              Let{"'"}s talk
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
