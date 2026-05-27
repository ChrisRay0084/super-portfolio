"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Particle {
  size: number
  left: number
  delay: number
  duration: number
  drift: number
}

export default function ContactParticles() {

  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generated = Array.from({ length: 18 }).map(() => ({
      size: Math.random() * 6 + 2,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 10,
      drift: Math.random() * 60 - 30 // -30px to +30px sideways drift
    }))

    setParticles(generated)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-green-400/100 blur-xs"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            bottom: "-10px"
          }}
          animate={{
            y: [-20, -600],
            x: [0, p.drift, -p.drift, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}

    </div>
  )
}