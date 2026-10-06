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
  image1?: string
  image2?: string
  image3?: string
  image4?: string
  image5?: string
  image6?: string
  image7?: string
  image8?: string
  image9?: string
  image10?: string
  technologies: string[]
  link: string
}

const getProjectImages = (project: Project) => {
  const imageKeys = ["image", "image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8", "image9", "image10"] as const

  return imageKeys
    .map((key) => project[key])
    .filter((value): value is string => Boolean(value))
}

export default function ProjectsSection() {
  const [visibleCount, setVisibleCount] = useState(4)
  const [selectedTechnology, setSelectedTechnology] = useState("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Sort projects descending by ID
  const sortedProjects = [...projectsData.projects].sort((a, b) => b.id - a.id)

  const technologies = [
    "All",
    ...Array.from(new Set(sortedProjects.flatMap((project) => project.technologies))).sort((a, b) =>
      a.localeCompare(b),
    ),
  ]

  const filteredProjects =
    selectedTechnology === "All"
      ? sortedProjects
      : sortedProjects.filter((project) => project.technologies.includes(selectedTechnology))

  const visibleProjects = filteredProjects.slice(0, visibleCount)
  const selectedProjectImages = selectedProject ? getProjectImages(selectedProject) : []
  const currentProjectImage = selectedProjectImages[selectedImageIndex] || selectedProjectImages[0]

  const openProjectPopup = (project: Project) => {
    setSelectedProject(project)
    setSelectedImageIndex(0)
  }

  const goToPreviousImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? selectedProjectImages.length - 1 : prev - 1))
  }

  const goToNextImage = () => {
    setSelectedImageIndex((prev) => (prev === selectedProjectImages.length - 1 ? 0 : prev + 1))
  }

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 4)
  }

  const handleTechnologyChange = (technology: string) => {
    setSelectedTechnology(technology)
    setVisibleCount(4)
  }

  const headingVariants = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }

  const cardVariants = { hidden: { opacity: 0, scale: 0.8, rotate: -5 }, visible: { opacity: 1, scale: 1, rotate: 0 } }

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

  return (
    <section id="projects" aria-labelledby="projects-section-heading" className="relative z-20 py-20 px-6 md:px-12 bg-black/0 overflow-hidden">
      <Stars count={200} enabled={true} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12">
        <motion.h2
          id="projects-section-heading"
          className="text-3xl md:text-4xl font-bold text-white"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "tween", duration: 0.5 }}
        >
          Projects
        </motion.h2>

        <div className="w-full sm:w-72">
          <div className="relative p-[2px] rounded-xl bg-gradient-to-r from-cyan-400 via-blue-400 to-green-500 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
            <div className="relative flex items-center rounded-lg bg-[#0f111a]/90 border border-cyan-400/20">
              <select
                aria-label="Filter projects by technology"
                value={selectedTechnology}
                onChange={(event) => handleTechnologyChange(event.target.value)}
                className="appearance-none w-full bg-transparent px-4 py-3 text-sm text-white font-medium rounded-lg outline-none cursor-pointer"
              >
                {technologies.map((technology) => (
                  <option key={technology} value={technology} className="bg-[#0f111a] text-white">
                    {technology}
                  </option>
                ))}
              </select>

              <svg
                className="pointer-events-none absolute right-4 h-4 w-4 text-cyan-300"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M5.25 7.5 10 12.25 14.75 7.5H5.25Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="rounded-xl border border-cyan-400/20 bg-[#0f111a]/80 p-6 text-center text-cyan-300">
          No projects match the selected technology.
        </div>
      ) : (
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        >
          {visibleProjects.map((project) => {
            const hasMultipleImages = getProjectImages(project).length > 1
            const shouldOpenPopup = hasMultipleImages || project.link === ""

            const cardContent = (
              <>
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
              </>
            )

            return (
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
                  {shouldOpenPopup ? (
                    <button
                      type="button"
                      onClick={() => openProjectPopup(project)}
                      className="relative flex flex-col justify-start p-6 bg-[#0f111a] rounded-lg w-full h-full text-left shadow-[0_0_15px_rgba(0,255,255,0.2)] hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] transition-all duration-300"
                    >
                      {cardContent}
                    </button>
                  ) : (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex flex-col justify-start p-6 bg-[#0f111a] rounded-lg w-full h-full shadow-[0_0_15px_rgba(0,255,255,0.2)] hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] transition-all duration-300"
                    >
                      {cardContent}
                    </a>
                  )}
                </motion.div>
              </motion.li>
            )
          })}
        </motion.ul>
      )}

      {visibleCount < filteredProjects.length && (
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

      {selectedProject && (
        <div
          className="fixed inset-0 bg-[#FFFFFF]/20 z-[100] p-3 pt-[88px] md:p-6 md:pt-[96px]"
          onClick={() => setSelectedProject(null)}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div
            className="relative mx-auto w-full max-w-6xl max-h-[calc(100vh-110px)] rounded-[14px] p-[2px] bg-gradient-to-r from-cyan-400/80 via-blue-400/70 to-green-500/80 shadow-[0_0_30px_rgba(0,255,255,0.25)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="overflow-hidden rounded-[12px] border border-cyan-400/20 bg-[#11121b]/95 text-white">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold z-20"
              >
                ✕
              </button>

              <div className="w-full h-full px-4 pb-4 pt-3 md:px-6 md:pb-6 md:pt-4 overflow-hidden">
              <div className="flex flex-col h-full">
                <div className="relative flex items-center justify-center min-h-0 flex-1">
                  {selectedProjectImages.length > 1 && (
                    <button
                      type="button"
                      onClick={goToPreviousImage}
                      aria-label="Previous image"
                      className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/40 bg-[#0f111a]/80 text-xl text-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.3)] transition hover:bg-[#0f111a]"
                    >
                      ‹
                    </button>
                  )}

                  {currentProjectImage ? (
                    <img
                      src={currentProjectImage}
                      alt={`${selectedProject.title} image ${selectedImageIndex + 1}`}
                      className="max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh] w-full max-w-4xl object-contain rounded-lg bg-[#0b0d13]"
                    />
                  ) : (
                    <div className="flex h-[50vh] w-full items-center justify-center rounded-lg border border-cyan-400/20 bg-[#0b0d13] text-cyan-300">
                      No image available
                    </div>
                  )}

                  {selectedProjectImages.length > 1 && (
                    <button
                      type="button"
                      onClick={goToNextImage}
                      aria-label="Next image"
                      className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/40 bg-[#0f111a]/80 text-xl text-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.3)] transition hover:bg-[#0f111a]"
                    >
                      ›
                    </button>
                  )}
                </div>

                {selectedProjectImages.length > 1 && (
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                    {selectedProjectImages.map((image, index) => (
                      <button
                        key={`${selectedProject.id}-${index}`}
                        type="button"
                        onClick={() => setSelectedImageIndex(index)}
                        aria-label={`Show image ${index + 1}`}
                        className={`h-8 w-8 overflow-hidden rounded-md border transition ${
                          index === selectedImageIndex
                            ? "border-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.4)]"
                            : "border-cyan-400/40 hover:border-cyan-300"
                        }`}
                      >
                        <img src={image} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-4 min-h-0 overflow-hidden">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{selectedProject.title}</h3>
                  <p className="text-sm md:text-base text-white mb-4">{selectedProject.description}</p>

                  {selectedProject.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-cyan-400/10 text-cyan-300 text-xs px-2 py-1 rounded-full border border-cyan-400/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}