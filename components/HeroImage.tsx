"use client";

import { motion } from "framer-motion";

export default function HeroImage() {
  return (
    <motion.div
      className="w-[420px] h-[420px] flex items-center justify-center"
      animate={{
        y: [0, -18, 0], // float up and down
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <img
        src="/images/me_1.png"
        className="w-full h-full object-cover rounded-2xl"
        alt="me"
      />
    </motion.div>
  );
}