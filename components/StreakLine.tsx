"use client"

import { motion } from "framer-motion"

export default function StreakLine() {
  return (
    <>
        <motion.div
      className="absolute top-[90%] left-[1%] w-[900px] h-[1px]
        bg-cyan-400/40 overflow-hidden rounded"
    >
      {/* Streak */}
      <motion.div
        className="h-full w-16 bg-gradient-to-r from-cyan-400/80 to-cyan-100/0"
        animate={{ x: [ -60, 900 ] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 3,
          ease: "linear",
        }}
      />
    </motion.div>
      </>
        )
}