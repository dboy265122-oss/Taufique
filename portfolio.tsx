"use client"

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { CSSAmbientGlow } from '@/components/three/css-ambient-glow'
import { TiltCard } from '@/components/portfolio/tilt-card'

const projects = [
  {
    title: 'AI Trading Platform',
    description: 'A sophisticated algorithmic trading platform with real-time market analysis, automated trading strategies, and comprehensive portfolio management.',
    image: '/api/placeholder/800/600',
    tags: ['Python', 'Machine Learning', 'Trading', 'APIs'],
    category: 'AI & Finance',
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    title: 'E-Commerce Dashboard',
    description: 'A modern, responsive admin dashboard for e-commerce businesses with real-time analytics, inventory management, and customer insights.',
    image: '/api/placeholder/800/600',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL'],
    category: 'Web Development',
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    title: 'AI Chatbot System',
    description: 'An intelligent customer support chatbot powered by GPT-4, with natural language understanding and seamless human handoff capabilities.',
    image: '/api/placeholder/800/600',
    tags: ['OpenAI', 'Node.js', 'React', 'MongoDB'],
    category: 'AI Automation',
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    title: 'Fitness Mobile App',
    description: 'A cross-platform mobile application for fitness tracking, workout planning, and nutrition management with AI-powered recommendations.',
    image: '/api/placeholder/800/600',
    tags: ['React Native', 'Firebase', 'AI', 'Health'],
    category: 'Mobile App',
    color: 'from-pink-500/20 to-rose-500/20',
  },
  {
    title: 'SaaS Marketing Website',
    description: 'A stunning marketing website for a B2B SaaS product with animated interactions, conversion-optimized design, and CMS integration.',
    image: '/api/placeholder/800/600',
    tags: ['Next.js', 'Framer Motion', 'CMS', 'SEO'],
    category: 'Web Design',
    color: 'from-violet-500/20 to-indigo-500/20',
  },
  {
    title: 'Automation Workflow Tool',
    description: 'A no-code automation platform that connects multiple services and automates repetitive tasks with an intuitive visual workflow builder.',
    image: '/api/placeholder/800/600',
    tags: ['Node.js', 'React', 'APIs', 'Automation'],
    category: 'AI Automation',
    color: 'from-cyan-500/20 to-blue-500/20',
  },
]

const categories = ['All', 'Web Development', 'AI Automation', 'Mobile App', 'AI & Finance', 'Web Design']

export function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="portfolio" className="relative py-32 bg-secondary/30 section-void overflow-hidden">
      <CSSAmbientGlow />
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            My Work
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Featured Projects
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my expertise in development, design, and innovation
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg glow-subtle'
                  : 'neon-card text-muted-foreground hover:text-accent'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <TiltCard maxTilt={8}>
                <div className="group relative h-full neon-card rounded-2xl overflow-hidden">
                  {/* Image Container */}
                  <div className={`relative h-48 bg-gradient-to-br ${project.color} overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-4xl font-bold text-white/80">{project.title[0]}</span>
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
                      >
                        <ExternalLink className="w-5 h-5 text-foreground" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
                      >
                        <Github className="w-5 h-5 text-foreground" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-xs font-medium text-accent uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-foreground flex items-center gap-2">
                      {project.title}
                      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-md bg-secondary text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
