"use client"

import { motion } from "framer-motion"

export default function LineBackAndForth() {
  return (
    <motion.div
        className="absolute top-[23%] left-[5%] w-[120px] h-[2px]
        bg-cyan-100 shadow-[0_0_10px_rgba(0,255,200,0.9)]"
        animate={{ x: [-20, 200, -20] }}
        transition={{ duration: 12, repeat: Infinity }}
       />
  )
}