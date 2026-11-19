"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
      <Image
        src="/images/me_1.png"
        width={420}
        height={420}
        preload
        sizes="(max-width: 768px) 100vw, 420px"
        className="w-full h-full object-cover rounded-2xl"
        alt="me"
      />
    </motion.div>
  );
}