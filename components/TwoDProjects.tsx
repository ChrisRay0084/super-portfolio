"use client"

import { useState } from "react"
import projectsData from "@/data/projects.json"
import { motion } from "framer-motion"
import Modal from "@/components/Modal"

interface Project {
  id: number
  title: string
  description: string
  image?: string
  link: string
  technologies: string[]
}

export default function TwoDProjects() {

  const [visibleCount, setVisibleCount] = useState(6)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const sortedProjects: Project[] = [...projectsData.twoDProjects].sort(
    (a, b) => b.id - a.id
  )

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 6)
  }

  const headingVariants = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }

  const cardVariants = { hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } }

  return (
    <>
      <section 
        id="2d-projects" 
        className="relative z-30 py-20 px-6 md:px-12
        bg-gradient-to-b from-[#87CEEB]/100 via-[#6285F4] to-[#3162FF]">

        {/* Cloud Overlay */}
        <div className="absolute top-0 left-30 w-full overflow-hidden pointer-events-none z-0">
          <motion.img
            src="/images/cloud1.png"
            alt="Clouds"
            className="w-300 opacity-100"

            initial={{ x: 0, y: 100, opacity: 0 }}
            whileInView={{ x: 150, y: -16, opacity: .9 }}

            viewport={{ once: true, amount: 0.3 }}

            transition={{ duration: 2.2, ease: "easeOut" }}
          />
        </div>

        <motion.h2
          id="two-d-projects-heading"
          className="relative z-10 text-3xl md:text-4xl font-bold mb-12 text-white"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "tween", duration: 0.5 }}
        >
          2D Projects
        </motion.h2>

        <motion.ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">

          {sortedProjects.slice(0, visibleCount).map((project, index) => (
            <motion.li
              key={project.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              
              {/* Card Wrapper */}
              <motion.div
                className="relative rounded-lg group cursor-pointer overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
                onClick={() => setSelectedProject(project)}
              >

                {/* Neon Border */}
                <div className="absolute inset-0 rounded-lg border-2 border-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Card Content */}
                <div className="relative flex flex-col items-center bg-[#11121b] rounded-lg p-3 transition-colors duration-300">

                  {/* Glow Overlay */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-cyan-400/30 via-blue-400/20 to-green-400/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

                  {/* Image */}
                  <div className="w-full h-20 rounded overflow-hidden mb-2 border border-cyan-400/20">
                    <motion.img
                      src={project.image || "/images/placeholder.png"}
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    />
                  </div>

                  <h3 className="text-xs text-center text-white font-bold relative z-10">
                    {project.title}
                  </h3>

                </div>
              </motion.div>

            </motion.li>
          ))}

        </motion.ul>

        {visibleCount < sortedProjects.length && (
          <div className="mt-10 flex justify-center">
            <motion.button
              onClick={handleViewMore}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,255,255,0.5)" }}
              className="px-5 py-2 bg-[#11121b] text-white font-semibold rounded-md border border-cyan-400 shadow-[0_0_5px_rgba(0,255,255,0.3)] transition-all duration-300"
            >
              View More
            </motion.button>
          </div>
        )}

      </section>

      {/* Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      >
        {selectedProject && (
          <>
            <img
              src={selectedProject.image || "/images/placeholder.png"}
              alt={selectedProject.title}
              className="w-full max-h-[75vh] object-contain rounded-lg mb-6"
            />
            <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
            <p className="text-gray-400 font-bold mb-4">{selectedProject.description}</p>
            {selectedProject.technologies?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </Modal>
    </>
  )
}