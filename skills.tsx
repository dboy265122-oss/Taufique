"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SceneWrapper } from '@/components/three/scene-wrapper'
import { SkillOrbitScene } from '@/components/three/skill-orbit-scene'

const skills = [
  { name: 'React / Next.js', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Languages' },
  { name: 'Node.js', level: 88, category: 'Backend' },
  { name: 'Python', level: 85, category: 'Languages' },
  { name: 'AI / Machine Learning', level: 80, category: 'AI' },
  { name: 'React Native', level: 82, category: 'Mobile' },
  { name: 'UI/UX Design', level: 88, category: 'Design' },
  { name: 'Trading Systems', level: 78, category: 'Finance' },
  { name: 'Cloud / DevOps', level: 75, category: 'Infrastructure' },
  { name: 'Database Design', level: 85, category: 'Backend' },
  { name: 'API Development', level: 90, category: 'Backend' },
  { name: 'Automation', level: 85, category: 'AI' },
]

const technologies = [
  'Next.js', 'React', 'TypeScript', 'Python', 'TailwindCSS', 'Node.js', 
  'PostgreSQL', 'MongoDB', 'Firebase', 'AWS', 'Docker', 'Git',
  'Figma', 'OpenAI', 'LangChain', 'TensorFlow'
]

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="relative py-32 bg-secondary/30 section-void overflow-hidden">
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* 3D Orbit Visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative h-[340px] md:h-[420px] mb-8 -mt-8"
        >
          <SceneWrapper cameraPosition={[0, 1.5, 7]} fov={50} maxDpr={1.5}>
            <SkillOrbitScene />
          </SceneWrapper>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Expertise
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Skills & Technologies
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks that power exceptional digital experiences
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group p-6 neon-card rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">{skill.name}</h3>
                  <span className="text-xs text-muted-foreground">{skill.category}</span>
                </div>
                <span className="text-2xl font-bold text-accent">{skill.level}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.05, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technologies Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-center text-lg font-semibold text-foreground mb-8">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.03 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 neon-card rounded-full text-sm font-medium text-muted-foreground hover:text-accent transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
