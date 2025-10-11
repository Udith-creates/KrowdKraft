"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import SimpleGlobe3D from "@/components/simple-globe"
import SocialSidebar from "@/components/social-sidebar"
import { Suspense, useState, useEffect, useRef } from "react"

// Static Particle Component
function StaticParticle({ 
  index, 
  size, 
  color, 
  opacity 
}: { 
  index: number
  size: string
  color: string
  opacity: string
}) {
  const position = useState({
    x: Math.random() * 100,
    y: Math.random() * 100
  })[0]

  return (
    <div
      className={`absolute ${size} ${color} rounded-full ${opacity}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 5}s`,
        boxShadow: '0 0 4px rgba(168, 85, 247, 0.5)'
      }}
    />
  )
}



export default function Hero() {

  return (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden section">
      {/* 3D Globe Background */}
      <Suspense fallback={null}>
        <SimpleGlobe3D />
      </Suspense>

      {/* Static Particle Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main particles */}
        {Array.from({ length: 180 }, (_, i) => (
          <StaticParticle
            key={i}
            index={i}
            size="w-1 h-1"
            color="bg-white"
            opacity="opacity-30"
          />
        ))}
        {/* Small particles */}
        {Array.from({ length: 80 }, (_, i) => (
          <StaticParticle
            key={`small-${i}`}
            index={i}
            size="w-0.5 h-0.5"
            color="bg-purple-400"
            opacity="opacity-20"
          />
        ))}
        {/* Large particles */}
        {Array.from({ length: 40 }, (_, i) => (
          <StaticParticle
            key={`large-${i}`}
            index={i}
            size="w-1.5 h-1.5"
            color="bg-pink-400"
            opacity="opacity-25"
          />
        ))}

      </div>

      {/* Social Media Icons */}
      <SocialSidebar />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto mt-24 sm:mt-32"
        >
          {/* Main Heading */}
          <motion.h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance text-center"
            style={{ 
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #e2e8f0 50%, #cbd5e1 75%, #94a3b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
            }}
          >
            Amplify Your Brand to{" "}
            <span className="neon-text">Gen Z & Millennials</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-5xl mx-auto text-balance text-center"
          >
            We create cultural moments that connect brands with the next generation.
          </motion.p>

          {/* CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center items-center mb-12 text-center"
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                z: 10
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 900, damping: 40, duration: 0.12 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Button 
                asChild 
                variant="white" 
                size="lg" 
                className="group relative transform-gpu"
              >
                <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/krowdkraft-official/30min"} target="_blank" rel="noopener noreferrer">
                  Book a Call
                  <ArrowRight className="ml-2 h-4 w-4 pointer-events-none" />
                </a>
              </Button>
            </motion.div>
          </motion.div>


        </motion.div>
      </div>
    </section>
  )
}

