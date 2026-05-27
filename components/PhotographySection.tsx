"use client"

import { useState } from "react"
import projectsData from "@/data/projects.json"
import Modal from "@/components/Modal"
import { motion, AnimatePresence, Variants } from "framer-motion"

interface Photo {
  id: number
  title: string
  description: string
  image?: string
  technologies: string[]
}

export default function PhotographySection() {

  const [visibleCount, setVisibleCount] = useState(5)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const photos = [...projectsData.photography].sort((a, b) => b.id - a.id)

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 5)
  }
    
  const headingVariants = { 
    hidden: { opacity: 0, x: -50 }, 
    visible: { opacity: 1, x: 0 } 
  }

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14
      }
    }
  }

  return (
    <>
      <section
  id="photography"
  aria-labelledby="photography-heading"
  className="relative z-35 py-20 px-6 md:px-12
  bg-[linear-gradient(to_bottom,#3162FF,#4A5FD6,#5A4BB0,#3A2F6E,#1B1735,#050510)]"
>

        
        <motion.h2
          id="two-d-projects-heading"
          className="text-3xl md:text-4xl font-bold mb-12 text-white"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "tween", duration: 0.5 }}
        >
          Photography
        </motion.h2>

        {/* Grid */}
        <motion.div
          layout
          className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4"
        >

          <AnimatePresence>

            {photos.slice(0, visibleCount).map((photo, index) => (

              <motion.div
                key={photo.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                exit="hidden"
                transition={{ delay: index * 0.05 }}
                layout
                className="mb-4 break-inside-avoid cursor-pointer group relative"
                onClick={() => setSelectedPhoto(photo)}
              >

                <img
                  src={photo.image || "/images/photography/placeholder.png"}
                  onError={(e) => (e.currentTarget.src = "/images/placeholder.png")}
                  alt={photo.title}
                  className="w-full rounded-lg shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-4">
                  <span className="text-white text-sm font-medium">{photo.title}</span>
                </div>

              </motion.div>

            ))}

          </AnimatePresence>

        </motion.div>

        {/* View More Button */}
        {visibleCount < photos.length && (
          <div className="mt-10 flex justify-center">
            <motion.button
              onClick={handleViewMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="px-5 py-2 bg-[#11121b] text-white font-semibold rounded-md border border-cyan-400 shadow-[0_0_5px_rgba(0,255,255,0.3)] transition-all duration-300"
            >
              View More
            </motion.button>
          </div>
        )}

      </section>

      {/* Modal */}
      <Modal isOpen={!!selectedPhoto} onClose={() => setSelectedPhoto(null)}>
        {selectedPhoto && (
          <>
            <img
              src={selectedPhoto.image || "/images/placeholder.png"}
              alt={selectedPhoto.title}
              className="w-full max-h-[75vh] object-contain rounded-lg mb-6"
            />
            <h3 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h3>
            <p className="text-gray-700 mb-4">{selectedPhoto.description}</p>

            {selectedPhoto.technologies?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedPhoto.technologies.map((tech, i) => (
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