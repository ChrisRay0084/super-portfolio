"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function Moon() {
  const { scrollYProgress } = useScroll();

  const size = 150;

  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // CONFIGURATION
  const startTop = 60;
  const endTop = 0;

  const endScroll = 0.15; // moon finishes movement

  const startLeft = viewportWidth - size - 10;
  const endLeft = -size - 360;

  const startScale = 0.8;
  const endScale = 6;

  const glowColor = "#fef3c7";
  const glowIntensity = 60;

  // Movement finishes at endScroll instead of 1
  const top = useTransform(scrollYProgress, [0, endScroll], [startTop, endTop]);
  const left = useTransform(scrollYProgress, [0, endScroll], [startLeft, endLeft]);
  const scale = useTransform(scrollYProgress, [0, endScroll], [startScale, endScale]);

  return (
    <motion.img
      src="/images/Moon.svg"
      alt="Moon"
      className="fixed pointer-events-none z-50"
      style={{
        top,
        left,
        scale,
        width: size,
        height: size,
        filter: `drop-shadow(0 0 ${glowIntensity}px ${glowColor})`,
      }}
    />
  );
}