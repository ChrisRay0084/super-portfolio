"use client"

import { useEffect, useState } from "react"
import Star from "./Star"

type StarType = {
  x: number
  y: number
  size?: number
  delay?: number
  streak?: boolean
}

type StarsProps = {
  count?: number
  enabled?: boolean
}

export default function Stars({ count = 50, enabled = true }: StarsProps) {
  const [stars, setStars] = useState<StarType[]>([])
  const [shootingStars, setShootingStars] = useState<StarType[]>([])

  useEffect(() => {
    if (!enabled) return  // skip generating stars

    const generatedStars = Array.from({ length: count }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1
    }))

    const generatedShooting = Array.from({ length: 5 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      delay: Math.random() * 5,
      streak: true
    }))

    setStars(generatedStars)
    setShootingStars(generatedShooting)

  }, [count, enabled])

  if (!enabled) return null  // don’t render anything if disabled

  return (
    <div className="absolute z-10 inset-0 pointer-events-none">
      {stars.map((star, i) => (
        <Star key={i} x={star.x} y={star.y} size={star.size} />
      ))}

      {shootingStars.map((star, i) => (
        <Star key={`shoot-${i}`} x={star.x} y={star.y} delay={star.delay} streak />
      ))}
    </div>
  )
}