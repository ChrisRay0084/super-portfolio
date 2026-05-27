"use client"

import { useState } from "react"
import projectsData from "@/data/projects.json"
import { motion } from "framer-motion"
import Modal from "@/components/Modal"

interface Project {
  id: number
  title: string
  description: string
  image?: string   // thumbnail
  video?: string   // mp4
  link: string
  technologies: string[]
}

export default function AnimatedProjects() {
  const [visibleCount, setVisibleCount] = useState(8)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const sortedProjects: Project[] = [...projectsData.animatedProjects].sort((a, b) => b.id - a.id)
  const handleViewMore = () => setVisibleCount(prev => prev + 8)

  const headingVariants = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }
  const cardVariants = { hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } }

  return (
    <>
      <section
        id="animated-projects"
        className="relative z-25 py-20 px-6 md:px-12
                  bg-gradient-to-b from-transparent via-[#2C3E50]/50 to-[#87CEEB]/100"
      >

        {/* Cloud Overlay */}
        <div className="absolute top-41 left-0 w-full overflow-visible pointer-events-none z-0">
          <motion.img
            src="/images/cloud2.png"
            alt="Cloud Left"
            className="absolute left-[-10%] w-[60%] max-w-[1000px]"
            initial={{ x: -80, y: 100, opacity: 0 }}
            whileInView={{ x: 0, y: -16, opacity: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          />
        </div>

        <div className="absolute top-41 right-0 w-full overflow-visible pointer-events-none z-0">
          <motion.img
            src="/images/cloud2b.png"
            alt="Cloud Right"
            className="absolute right-[-10%] w-[60%] max-w-[1000px]"
            initial={{ x: 80, y: 100, opacity: 0 }}
            whileInView={{ x: 0, y: -16, opacity: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          />
        </div>

        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-white"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
        >
          Animated Projects
        </motion.h2>

        {/* Grid */}
        <motion.ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {sortedProjects.slice(0, visibleCount).map((project, index) => (
            <motion.li
              key={project.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <motion.div
                className="relative rounded-lg group cursor-pointer overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Border */}
                <div className="absolute inset-0 rounded-lg border-2 border-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Card */}
                <div className="relative flex flex-col items-center bg-[#11121b] rounded-lg p-3">
                  
                  {/* Glow overlay */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-cyan-400/30 via-blue-400/20 to-green-400/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

                  {/* Media */}
                  <div className="w-full h-20 rounded overflow-hidden mb-2 border border-cyan-400/20 relative">

                    {/* Thumbnail */}
                    <img
                      src={project.image || "/images/placeholder.png"}
                      alt={`${project.title} thumbnail`}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75 group-hover:blur-[1px]"
                    />

                    {/* Video overlay */}
                    {project.video && (
                      <video
                        src={project.video}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                      />
                    )}
                  </div>

                  <h3 className="text-xs text-center text-white font-bold z-10">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>

        {/* View More */}
        {visibleCount < sortedProjects.length && (
          <div className="mt-10 flex justify-center">
            <motion.button
              onClick={handleViewMore}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,255,255,0.5)" }}
              className="px-5 py-2 bg-[#11121b] text-white font-semibold rounded-md border border-cyan-400"
            >
              View More
            </motion.button>
          </div>
        )}
      </section>

      {/* Modal */}
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <>
            {selectedProject.video ? (
              <video
                src={selectedProject.video}
                controls
                autoPlay
                preload="auto"
                className="w-full max-h-[75vh] object-contain rounded-lg mb-6"
              />
            ) : (
              <img
                src={selectedProject.image || "/images/placeholder.png"}
                alt={selectedProject.title}
                className="w-full max-h-[75vh] object-contain rounded-lg mb-6"
              />
            )}

            <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
            <p className="text-gray-400 font-bold mb-4">
              {selectedProject.description}
            </p>
          </>
        )}
      </Modal>
    </>
  )
}