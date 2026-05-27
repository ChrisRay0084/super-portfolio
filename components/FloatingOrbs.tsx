"use client"

import { motion } from "framer-motion"

export default function FloatingOrbs() {
    return (
        <div className="absolute inset-0 pointer-events-none">

      {/* Node 1 */}
      <motion.div
        className="absolute top-[93%] left-[4%] w-2 h-2 rounded-full bg-white
        shadow-[0_0_10px_rgba(0,255,200,0.9)]"
        animate={{ y: [-8, 12, -8] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Node 2 */}
      <motion.div
        className="absolute top-[95%] left-[2%] w-2 h-2 rounded-full bg-green-400
        shadow-[0_0_10px_rgba(0,255,150,0.9)]"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      

    </div>
    )
}