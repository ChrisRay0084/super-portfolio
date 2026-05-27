"use client"

import { motion } from "framer-motion"
import skillsData from "@/data/skills.json"

export default function SkillsSection() {
  const skills = skillsData.skills || []
  const applications = skillsData.applications || []

  const headingVariants = {
    hidden: { opacity: 0, x: -50 },  // start 50px to the left, invisible
    visible: { opacity: 1, x: 0 },   // final position, fully visible
  }

  const logoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.2 },
  }

  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative z-15 py-20 px-6 md:px-12 bg-white/80 overflow-hidden">
      <motion.h2 id="skills-heading" className="text-3xl md:text-4xl font-bold mb-12 text-black"
                 initial="hidden"
                 variants={headingVariants}
                 whileInView="visible"       
                 viewport={{ once: false, amount: 0.2 }}
                 transition={{type: "tween", duration: 0.5 }}>
        Skills
      </motion.h2>

      {/* Skills Row */}
      {skills.length > 0 && (
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="w-20 h-20 flex items-center justify-center relative cursor-pointer group"
              variants={logoVariants}
              initial="hidden"
              whileInView="visible"       
              viewport={{ once: false, amount: 0.2 }}
              whileHover="hover"
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.05 }}
            >
              <img
                src={skill.image || "/images/placeholder.png"}
                alt={skill.name}
                className="w-16 h-16 object-contain"
              />
              {/* Hover Name */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Applications Row */}
      {applications.length > 0 && (
        <div className="flex flex-wrap justify-center gap-6">
          {applications.map((app, index) => (
            <motion.div
              key={index}
              className="w-20 h-20 flex items-center justify-center relative cursor-pointer group"
              variants={logoVariants}
              initial="hidden"
              whileInView="visible"     
              viewport={{ once: false, amount: 0.2 }}
              whileHover="hover"
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.05 }}
            >
              <img
                src={app.image || "/images/placeholder.png"}
                alt={app.name}
                className="w-16 h-16 object-contain"
              />
              {/* Hover Name */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap">
                {app.name}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}