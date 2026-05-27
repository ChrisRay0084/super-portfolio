"use client"

import { motion } from "framer-motion"

export default function CircuitWeb() {
  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      viewBox="0 0 600 400"
    >
      {/* Starting Node (Lower Left) */}
      <circle cx="50" cy="350" r="4" fill="#00ffc8" />

      {/* Branch 1 */}
      <motion.line
        x1="50"
        y1="350"
        x2="200"
        y2="250"
        stroke="#00ffc8"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop" }}
      />
      <motion.circle
        cx="200"
        cy="250"
        r="3"
        fill="#00ffc8"
        animate={{ r: [3,6,3] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />

      {/* Branch 2 */}
      <motion.line
        x1="50"
        y1="350"
        x2="150"
        y2="200"
        stroke="#00ffc8"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", delay: 0.2 }}
      />
      <motion.circle
        cx="150"
        cy="200"
        r="3"
        fill="#00ffc8"
        animate={{ r: [3,6,3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />

      {/* Branch 3 */}
      <motion.line
        x1="50"
        y1="350"
        x2="300"
        y2="150"
        stroke="#00ffc8"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, repeat: Infinity, repeatType: "loop", delay: 0.5 }}
      />
      <motion.circle
        cx="300"
        cy="150"
        r="3"
        fill="#00ffc8"
        animate={{ r: [3,6,3] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
      />
    </svg>
  )
}