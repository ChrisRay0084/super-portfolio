"use client"

import { motion } from "framer-motion"

type StarProps = {
  x: number
  y: number
  size?: number
  delay?: number
  streak?: boolean
}

export default function Star({ x, y, size = 2, delay = 0, streak = false }: StarProps) {

  if (streak) {
    return (
      <motion.div
        initial={{ x, y, opacity: 0 }}
        animate={{
          x: x + 300,
          y: y + 120,
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 1.2,
          delay,
          repeat: Infinity,
          repeatDelay: 6
        }}
        className="absolute"
      >
        <div
          className="bg-white rounded-full"
          style={{
            width: size,
            height: size
          }}
        />

        {/* Star trail */}
        {/*
        <div
          className="absolute top-1/2 left-0 bg-white opacity-40"
          style={{
            width: 40,
            height: 1,
            transform: "translate(-100%, -50%)"
          }}
        />
        */}
      </motion.div>
    )
  }

  const randomDelay = Math.random() * 5
  const randomDuration = 2 + Math.random() * 2

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: "white"
      }}
      animate={{
        opacity: [0.4, 1, 0.6, 0.9, 0.4],
        scale: [1, 1.2, 1]
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}