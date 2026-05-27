"use client"
import projectsData from "@/data/projects.json"
import { motion } from "framer-motion"
import Stars from "./Stars"

interface Project {
  id: number
  title: string
  description: string
  link: string
  image: string
  technologies: string[]
}

interface FeaturedProjectsProps {
  featuredIds: number[]
}

const headingVariants = { 
  hidden: { opacity: 0, x: -50 }, 
  visible: { opacity: 1, x: 0 } 
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

export default function FeaturedProjects({ featuredIds }: FeaturedProjectsProps) {
  const featuredProjects: Project[] = projectsData.projects.filter((p) => featuredIds.includes(p.id))

  return (
    <section id="featured" aria-labelledby="featured-projects-heading" className="relative z-10 py-20 px-6 md:px-12 bg-black/0 overflow-hidden">
      
      <Stars count={200} enabled={true} />

      <motion.h2
        id="featured-projects-heading"
        className="text-3xl md:text-4xl font-bold mb-12 text-white"
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        Featured Projects
      </motion.h2>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredProjects.map((project, index) => (
          <motion.li
            key={project.id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 250, damping: 12, delay: index * 0.1 }}
            className="flex"
          >
            {/* Animated Neon Border Wrapper */}
            <motion.div
              className="relative p-[2px] rounded-xl w-full group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              {/* Border Animation */}
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
                    alt={`${project.title} preview image`}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.5 }}
                    whileHover={{ scale: 1.0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-white tracking-wide">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="bg-cyan-400/10 text-cyan-300 text-xs px-2 py-1 rounded-full border border-cyan-400/20">{tech}</span>
                  ))}
                </div>

                <details className="mt-auto group">
                  <summary className="list-none cursor-pointer text-cyan-400 font-medium flex justify-end items-center gap-2">
                    <svg className="w-3 h-3 transition-transform duration-200 group-open:rotate-90" viewBox="0 0 20 20" fill="currentColor">
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
      </ul>
    </section>
  )
}