"use client"

import { motion } from "framer-motion"
import { useState } from "react";

import TechGrid from "./TechGrid"
import NeonLines from "./NeonLines"
import GlassPanels from "./GlassPanels"
import StreakLine from "./StreakLine"
import CircuitWeb from "./CircuitWeb"
import HeroImage from "./HeroImage"
import FloatingOrbs from "./FloatingOrbs"
import LineBackAndForth from "./LineBackAndForth"
import Typewriter from "./Typewriter"
import Stars from "./Stars"
import Galaxy from "./Galaxy"
import Modal from "@/components/Modal"

export default function HeroSection({ heroImage }: { heroImage?: React.ReactNode }) {

  const [aboutOpen, setAboutOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-start md:items-center justify-center pt-24 md:pt-0 overflow-hidden
                bg-gradient-to-b from-black via-slate-900 to-black"
    >

      <div className="absolute inset-0 z-0" />

      {/* Neon Glow Background */}
      <div
        className="absolute z-0 w-[800px] h-[800px] rounded-full blur-[200px] opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,200,0.4) 0%, transparent 70%)"
        }}
      />

      {/* Layers */}
      <LineBackAndForth />
      <GlassPanels />
      <StreakLine />
      <FloatingOrbs />
      <Stars count={50} enabled={true} />
      <Galaxy />

      {/* Hero Content */}
      <div className="px-6 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative z-20">

        {/* LEFT */}
        <div className="relative z-20 flex-1 text-center md:text-left space-y-6">

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold tracking-wide text-white"
          >
            CHRISTOPHER RAY
          </motion.h1>

          {/* Typewriter */}
          <div className="pt-2 md:pt-4 pb-4 px-2 md:px-0">
            <Typewriter
              phrases={[
                "Senior Web Developer",
                "React & Next.js Engineer",
                "Frontend Systems Engineer",
                "Interactive Web Experience Designer",
                "Accessibility & Web Compliance Master",
                "Full Stack Developer"
              ]}
              typingSpeed={100}
              deletingSpeed={50}
              pauseTime={1500}
            />
          </div>

          {/* Tagline */}
          <div className="pt-0 md:pt-0 pb-8 px-2 md:px-0">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-6 text-lg max-w-lg
              bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-300
              bg-clip-text text-transparent"
            >
              Engineering the Web of the Future
            </motion.p>
          </div>

          {/* BUTTONS */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

            {/* ABOUT ME */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="px-8 py-3 rounded-md
                bg-[#11121b]/90 border border-[color:var(--color-secondary)]
                text-white font-bold
                shadow-[0_0_10px_rgba(34,197,94,0.5),0_0_20px_rgba(34,197,94,0.3)]
                hover:shadow-[0_0_15px_rgba(34,197,94,0.8),0_0_30px_rgba(34,197,94,0.5)]
                hover:scale-105
                transition-transform transition-shadow duration-800"
              onClick={() => setAboutOpen(true)}
            >
              ABOUT ME
            </motion.button>

            {/* GET IN TOUCH */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="px-8 py-3 rounded-md
                border border-[color:var(--color-accent)]
                text-white
                bg-[color:var(--color-primary)]/10
                shadow-[0_0_10px_rgba(14,165,233,0.3),0_0_20px_rgba(14,165,233,0.2)]
                hover:shadow-[0_0_15px_rgba(14,165,233,0.6),0_0_30px_rgba(14,165,233,0.4)]
                hover:scale-105
                transition-transform transition-shadow duration-300"
              onClick={() => scrollToSection("contact")}
            >
              GET IN TOUCH
            </motion.button>

          </div>
        </div>

        {/* RIGHT */}
        <div className="relative z-30 flex justify-center md:justify-end">
          {heroImage}
        </div>

      </div>


      {/* ABOUT MODAL */}
      <Modal isOpen={aboutOpen} onClose={() => setAboutOpen(false)}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-white"
        >
          {/* HEADER */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold mb-8"
          >
            Web Developer / Software Engineer • 20+ Years Experience
          </motion.h2>

          {/* MAIN DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 mb-4 leading-relaxed"
          >
            I build scalable, client-facing web applications with a focus on
            frontend engineering, accessibility (WCAG 2.x / Section 508), and
            full-stack development.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 mb-8 leading-relaxed"
          >
            I’ve modernized legacy systems, improved accessibility compliance,
            and delivered high-impact user experiences. I enjoy mentoring developers
            and collaborating with product, design, and stakeholders to create
            thoughtful, accessible solutions.
          </motion.p>

          {/* SKILLS GRID */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.4,
                },
              },
            }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
          >
            {[
              "Frontend Engineering",
              "Accessibility (WCAG)",
              "Full-Stack Development",
              "System Modernization",
              "Mentorship",
              "Client Collaboration",
            ].map((item) => (
              <motion.div
                key={item}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.05,
                }}
                className="bg-white/5 border border-white/10 p-4 rounded-xl text-sm text-gray-300 hover:border-cyan-400/40 hover:bg-cyan-400/5 transition"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>

          {/* PERSONAL TOUCH */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-500 text-sm mt-8"
          >
            I care about building software that not only works — but works for everyone.
          </motion.p>
        </motion.div>
      </Modal>

    </section>
  )
}