"use client"

import { useState } from "react"
import projectsData from "@/data/projects.json"
import { motion } from "framer-motion"
import Stars from "./Stars"

interface Project {
  id: number
  title: string
  description: string
  image?: string
  technologies: string[]
  link: string
}

export default function ProjectsSection() {
  const [visibleCount, setVisibleCount] = useState(4)

  // Sort projects descending by ID
  const sortedProjects = [...projectsData.projects].sort((a, b) => b.id - a.id)

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 4)
  }

  const headingVariants = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }

  const cardVariants = { hidden: { opacity: 0, scale: 0.8, rotate: -5 }, visible: { opacity: 1, scale: 1, rotate: 0 } }

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

  return (
    <section id="projects" aria-labelledby="projects-section-heading" className="relative z-20 py-20 px-6 md:px-12 bg-black/0 overflow-hidden">
      
      <Stars count={200} enabled={true} />
      
      <motion.h2
        id="projects-section-heading"
        className="text-3xl md:text-4xl font-bold mb-12 text-white"
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        Projects
      </motion.h2>

      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
      >
        {sortedProjects.slice(0, visibleCount).map((project) => (
          <motion.li
            key={project.id}
            variants={cardVariants}
            transition={{ type: "spring", stiffness: 250, damping: 12 }}
            className="flex"
          >
            {/* Neon Border Wrapper */}
            <motion.div
              className="relative p-[2px] rounded-xl w-full group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              {/* Animated Neon Border */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-cyan-400 via-blue-400 to-green-500"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                style={{ backgroundSize: "300% 300%", WebkitMask: "linear-gradient(#fff 0 0)" }}
              />

              {/* Card Content */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex flex-col justify-start p-6 bg-[#0f111a] rounded-lg w-full h-full shadow-[0_0_15px_rgba(0,255,255,0.2)] hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] transition-all duration-300"
              >
                {/* Image Container */}
                <div className="mb-4 w-full h-48 rounded-lg overflow-hidden border border-cyan-400/20">
                  <motion.img
                    src={project.image || "/images/placeholder.png"}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.5 }}
                    whileHover={{ scale: 1.0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-white tracking-wide">{project.title}</h3>

                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-cyan-400/10 text-cyan-300 text-xs px-2 py-1 rounded-full border border-cyan-400/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <details className="mt-auto group">
                  <summary className="list-none cursor-pointer text-cyan-400 font-medium flex items-center gap-2">
                    <svg
                      className="w-3 h-3 transition-transform duration-200 group-open:rotate-90"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M6 4l8 6-8 6V4z" />
                    </svg>
                    <span>View description</span>
                  </summary>
                  <p className="mt-2 text-white font-bold">{project.description}</p>
                </details>
              </a>
            </motion.div>
          </motion.li>
        ))}
      </motion.ul>

      {visibleCount < sortedProjects.length && (
        <div className="mt-8 flex justify-center">
          <motion.button
            onClick={handleViewMore}
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,255,255,0.5)" }}
            className="px-6 py-3 bg-[#0f111a] text-white font-semibold rounded-lg border border-cyan-400 hover:border-cyan-300 shadow-[0_0_5px_rgba(0,255,255,0.3)] transition-all duration-300"
          >
            View More
          </motion.button>
        </div>
      )}
    </section>
  )
}