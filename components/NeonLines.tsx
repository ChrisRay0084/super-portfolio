"use client"

import { motion } from "framer-motion"

export default function NeonLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">

      <motion.div
        className="absolute w-[600px] h-[2px] bg-cyan-400 blur-sm opacity-40 rotate-12"
        initial={{ x: -400 }}
        animate={{ x: 1200 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[2px] bg-green-400 blur-sm opacity-30 -rotate-12"
        initial={{ x: 1200 }}
        animate={{ x: -400 }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear"
        }}
      />

    </div>
  )
}