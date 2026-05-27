"use client"

import { motion, useScroll, useTransform } from "framer-motion"

export default function Galaxy() {
  const { scrollY } = useScroll()

  // Scroll-based transforms
  const y = useTransform(scrollY, [0, 800], [0, -300])      // move up
  const scale = useTransform(scrollY, [0, 800], [1, 0.6])  // shrink
  const opacity = useTransform(scrollY, [0, 150], [0.5, 0.2]) // fade

  return (
    <motion.div
      style={{ y, scale, opacity }}
      className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
    >
      <motion.img
        src="/images/galaxy.svg" // must be in /public/images/galaxy.svg
        alt="Galaxy background"
        className="w-[70vw] max-w-[800px] min-w-[350px] mix-blend-screen"
      />
    </motion.div>
  )
}