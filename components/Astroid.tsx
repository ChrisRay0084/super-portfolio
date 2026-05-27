"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  animate,
} from "framer-motion";
import { useEffect, useState } from "react";

export default function Astroit() {
  const { scrollYProgress } = useScroll();

  const width = 180;
  const height = 180;

  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // 🎯 Activation window
  const start = 0.19;
  const end = 0.45;

  // 🔄 motion path
  const xRaw = useTransform(
    scrollYProgress,
    [start, end],
    [-450, viewportWidth + 200]
  );

  const yRaw = useTransform(
    scrollYProgress,
    [start, end],
    [80, 180]
  );

  const scaleRaw = useTransform(
    scrollYProgress,
    [start, end],
    [3.5, 0.8]
  );

  const rotateRaw = useTransform(
    scrollYProgress,
    [start, end],
    [0, 360]
  );

  // 🌊 smoothing
  const x = useSpring(xRaw, { stiffness: 60, damping: 20 });
  const y = useSpring(yRaw, { stiffness: 60, damping: 20 });
  const scale = useSpring(scaleRaw, { stiffness: 60, damping: 20 });
  const rotate = useSpring(rotateRaw, { stiffness: 50, damping: 25 });

  // 🌬️ drift
  const driftX = useSpring(
    useTransform(scrollYProgress, [start, end], [0, -25]),
    { stiffness: 25, damping: 30 }
  );

  const driftY = useSpring(
    useTransform(scrollYProgress, [start, end], [0, 10]),
    { stiffness: 25, damping: 30 }
  );

  // 🌪️ TRUE INDEPENDENT WOBBLE (NOT scroll-based)
  const wobbleX = useMotionValue(0);
  const wobbleY = useMotionValue(0);

  useEffect(() => {
    const controlsX = animate(wobbleX, [-6, 6], {
      duration: 2.5,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    });

    const controlsY = animate(wobbleY, [4, -4], {
      duration: 3.2,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    });

    return () => {
      controlsX.stop();
      controlsY.stop();
    };
  }, [wobbleX, wobbleY]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,

        x: useTransform(
          [x, driftX, wobbleX] as const,
          (values) => {
            const [main, drift, wobble] = values as number[];
            return main + drift + wobble;
          }
        ),

        y: useTransform(
          [y, driftY, wobbleY] as const,
          (values) => {
            const [main, drift, wobble] = values as number[];
            return main + drift + wobble;
          }
        ),

        scale,

        rotate,

        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      <img
        src="images/astroid.png"
        alt="astroid"
        style={{
          width,
          height,
          objectFit: "contain",
          display: "block",
        }}
      />
    </motion.div>
  );
}