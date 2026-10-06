"use client"

import { motion } from "framer-motion"
import skillsData from "@/data/skills.json"
import Stars from "./Stars"

type SkillItem = {
  name: string
  image?: string
}

function RowSection({
  items,
  title,
}: {
  items: SkillItem[]
  title: string
}) {
  if (items.length === 0) return null

  return (
 <div>
    <Stars count={200} enabled={true} />

    <div className="mb-12">
      <motion.p
        className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.25em] bg-gradient-to-r from-cyan-300 via-sky-300 to-cyan-200 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {title}
      </motion.p>

      <div className="flex flex-wrap justify-center gap-6">
        {items.map((item, index) => (
          <motion.div
            key={`${title}-${item.name}-${index}`}
            className="group relative flex h-20 w-20 items-center justify-center rounded-full border border-slate-300/70 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:scale-110"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 0.45,
              delay: index * 0.03,
              ease: "easeOut",
            }}
          >
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
              <img
                src={item.image || "/images/placeholder.png"}
                alt={item.name}
                className="h-16 w-16 object-contain"
              />
            </div>

            <span className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>
      
    </div>
    </div>
  )
}

export default function SkillsSection() {
  const skills = skillsData.skills || []
  const applications = skillsData.applications || []
  const certifications = skillsData.certifications || []

  const headingVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative z-15 py-20 px-6 md:px-12 bg-white/0 overflow-hidden">
      <motion.h2 id="skills-heading" className="text-3xl md:text-4xl font-bold mb-12 text-white"
                 initial="hidden"
                 variants={headingVariants}
                 whileInView="visible"       
                 viewport={{ once: false, amount: 0.2 }}
                 transition={{type: "tween", duration: 0.5 }}>
        Skills
      </motion.h2>

      <RowSection items={certifications} title="Certifications" />
      <RowSection items={skills} title="Skills" />
      <RowSection items={applications} title="Applications" />
    </section>
  )
}