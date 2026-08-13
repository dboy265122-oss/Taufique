"use client"

import { Navigation } from '@/components/portfolio/navigation'
import { Hero } from '@/components/portfolio/hero'
import { About } from '@/components/portfolio/about'
import { Skills } from '@/components/portfolio/skills'
import { Services } from '@/components/portfolio/services'
import { Portfolio } from '@/components/portfolio/portfolio'
import { ComingSoonProjects } from '@/components/portfolio/coming-soon-projects'
import { StatsSection } from '@/components/portfolio/stats-section'
import { WhyWorkWithMe } from '@/components/portfolio/why-work-with-me'
import { FutureVision } from '@/components/portfolio/future-vision'
import { Testimonials } from '@/components/portfolio/testimonials'
import { SocialLinks } from '@/components/portfolio/social-links'
import { Contact } from '@/components/portfolio/contact'
import { Footer } from '@/components/portfolio/footer'
import { LoadingScreen } from '@/components/portfolio/loading-screen'
import { CustomCursor } from '@/components/portfolio/custom-cursor'
import { FloatingParticles } from '@/components/portfolio/floating-particles'
import { DarkModeToggle } from '@/components/portfolio/dark-mode-toggle'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <FloatingParticles />
      <DarkModeToggle />
      <main className="relative overflow-hidden cursor-none lg:cursor-none">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <StatsSection />
        <Services />
        <Portfolio />
        <ComingSoonProjects />
        <WhyWorkWithMe />
        <FutureVision />
        <Testimonials />
        <SocialLinks />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
