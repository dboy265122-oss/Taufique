"use client"

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { CSSAmbientGlow } from '@/components/three/css-ambient-glow'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    content: 'Working with Sk Taufique was an absolute pleasure. His expertise in AI and web development transformed our business operations. The trading system he built exceeded all our expectations.',
    rating: 5,
    avatar: 'SJ',
  },
  {
    name: 'Michael Chen',
    role: 'Founder, InnovateLab',
    content: 'Exceptional talent and professionalism. The mobile app Taufique developed for us has become our flagship product. His attention to detail and innovative approach set him apart from others.',
    rating: 5,
    avatar: 'MC',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Director, BrandFlow',
    content: 'The website and brand identity work exceeded our wildest expectations. Sk Taufique has an incredible eye for design combined with technical excellence. Highly recommended!',
    rating: 5,
    avatar: 'ER',
  },
  {
    name: 'David Park',
    role: 'CTO, FinanceAI',
    content: 'The AI automation solutions implemented by Taufique saved us countless hours of manual work. His understanding of both AI and business processes is remarkable.',
    rating: 5,
    avatar: 'DP',
  },
  {
    name: 'Lisa Thompson',
    role: 'Product Manager, AppVision',
    content: 'From concept to deployment, the entire process was smooth and professional. The app we built together has received outstanding user feedback and exceeded our KPIs.',
    rating: 5,
    avatar: 'LT',
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="relative py-32 section-void">
      {/* Lightweight CSS Glow (replaces heavy 3D canvas) */}
      <CSSAmbientGlow />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            What Clients Say
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Feedback from amazing people {"I've"} had the pleasure to work with
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative p-8 md:p-12 neon-card rounded-3xl shadow-xl">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-xl bg-accent flex items-center justify-center glow-subtle">
              <Quote className="w-6 h-6 text-accent-foreground" />
            </div>

            {/* Content */}
            <div className="mt-4">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl text-foreground leading-relaxed font-medium"
              >
                {`"${testimonials[currentIndex].content}"`}
              </motion.p>

              {/* Author */}
              <motion.div
                key={`author-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-accent">
                    {testimonials[currentIndex].avatar}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-8 right-8 flex gap-2">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full neon-card flex items-center justify-center hover:text-accent transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full neon-card flex items-center justify-center hover:text-accent transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Dots */}
            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'w-8 bg-accent' 
                      : 'bg-border hover:bg-muted-foreground'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
