"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Globe, 
  Smartphone, 
  Bot, 
  Brain, 
  TrendingUp, 
  Palette, 
  Fingerprint, 
  Lightbulb,
  ArrowUpRight
} from 'lucide-react'
import { CSSAmbientGlow } from '@/components/three/css-ambient-glow'
import { TiltCard } from '@/components/portfolio/tilt-card'

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Custom websites built with cutting-edge technologies. From landing pages to complex web applications, designed for performance and user experience.',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Performance'],
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android devices.',
    features: ['Cross-Platform', 'Native Performance', 'Intuitive UX'],
  },
  {
    icon: Bot,
    title: 'AI Automation',
    description: 'Intelligent automation solutions that streamline workflows, reduce manual tasks, and boost productivity using advanced AI technologies.',
    features: ['Process Automation', 'Smart Workflows', 'Integration'],
  },
  {
    icon: Brain,
    title: 'AI Agents',
    description: 'Custom AI agents and chatbots powered by the latest language models, designed to enhance customer engagement and support.',
    features: ['Custom Training', 'Natural Language', '24/7 Support'],
  },
  {
    icon: TrendingUp,
    title: 'Trading Solutions',
    description: 'Sophisticated trading systems, algorithms, and analysis tools for financial markets, built with precision and reliability.',
    features: ['Algorithm Trading', 'Market Analysis', 'Risk Management'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interface designs that prioritize user experience while maintaining brand consistency and visual appeal.',
    features: ['User Research', 'Prototyping', 'Design Systems'],
  },
  {
    icon: Fingerprint,
    title: 'Brand Identity',
    description: 'Comprehensive branding solutions that capture your essence and communicate your values through visual storytelling.',
    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity'],
  },
  {
    icon: Lightbulb,
    title: 'Creative Technology',
    description: 'Innovative technology solutions that combine creativity with technical expertise to bring unique ideas to life.',
    features: ['Innovation', 'R&D', 'Custom Solutions'],
  },
]

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="relative py-32 section-void overflow-hidden">
      <CSSAmbientGlow />
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            What I Offer
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Services & Solutions
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital services tailored to transform your ideas into powerful, scalable solutions
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <TiltCard>
                  <div className="group relative h-full p-6 neon-card rounded-2xl">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                      {service.title}
                      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 text-xs rounded-md bg-secondary text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Hover Gradient */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
