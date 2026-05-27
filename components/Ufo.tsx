"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function Ufo() {
  const { scrollYProgress } = useScroll();

  // ✅ Separate dimensions
  const width = 180;
  const height = 90;

  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // CONFIGURATION
  const startScroll = 0.50;
  const endScroll = 0.75; // UFO finishes movement here

  // Use WIDTH for horizontal math
  const startLeft = -width - 100;
  const endLeft = viewportWidth + 100;

  const fixedTop = 200;

  // Movement
  const left = useTransform(
    scrollYProgress,
    [startScroll, endScroll],
    [startLeft, endLeft]
  );

  // float down or up
  const floatY = useTransform(
    scrollYProgress,
    [startScroll, endScroll],
    [0, -40]
  );

  return (
    <motion.img
      src="/images/ufo.svg"
      alt="UFO"
      className="fixed pointer-events-none"
      style={{
        top: fixedTop,
        left,
        y: floatY,
        width: width,
        height: height,
        zIndex: 6,
      }}
    />
  );
}