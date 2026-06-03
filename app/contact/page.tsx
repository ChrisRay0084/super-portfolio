"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ContactParticles from "@/components/ContactParticles"

export default function ContactPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState<null | "success" | "error">(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed")

      setModal("success")
      setFormData({ name: "", email: "", subject: "", message: "" })

    } catch {
      setModal("error")
    } finally {
      setLoading(false)
    }
  }

  const headingVariantsTop = { 
    hidden: { opacity: 0, y: -40 }, 
    visible: { opacity: 1, y: 0 } 
  }

  const headingVariantsRight = { 
    hidden: { opacity: 0, x: 50 }, 
    visible: { opacity: 1, x: 0 } 
  }

  const headingVariantsCenter = { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1} 
  }

  return (
    <section
      id="contact"
      className="relative z-40 py-32 px-6 md:px-12 overflow-hidden
      bg-[linear-gradient(to_bottom,#050510_10%,#1B1735_60%,#000000_80%)]"
    >

      {/* SVG OVERLAY */}
      <motion.div 
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          duration: 3.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/images/contact_bg_1.svg"
          alt=""
          className="w-full h-full object-cover opacity-100"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        viewport={{ once: true }}
        className="max-w-2xl ml-auto md:mr-12"
      >


        <div
          className="relative rounded-xl p-10
          bg-[#000000]/50 backdrop-blur
          border border-cyan-400/20
          shadow-[0_0_25px_rgba(0,255,255,0.15)]"
        >

          <div className="absolute inset-0 rounded-xl
          bg-gradient-to-tr from-cyan-400/10 via-blue-400/10 to-green-400/10
          opacity-10 pointer-events-none " />

          <ContactParticles />

          <div className="relative z-10">

            <motion.h2
              id="contact-me-text"
              className="text-3xl md:text-4xl font-bold text-white mb-10"
              variants={headingVariantsTop}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              transition={{ type: "tween", duration: 0.5 }}
            >
              Contact Me
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12">

              {/* LEFT: FORM */}
              <motion.form
                id="lets-connect"
                className="flex flex-col gap-4"
                variants={headingVariantsCenter}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.9 }}
                transition={{ type: "tween", duration: 0.9 }}

                onSubmit={handleSubmit}
                noValidate
              >

                <input
                  name="name"
                  placeholder="Name *"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-[#000000] border border-cyan-400/20
                  text-white rounded-md p-3
                  focus:border-cyan-400 outline-none transition"
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#000000] border border-cyan-400/20
                  text-white rounded-md p-3
                  focus:border-cyan-400 outline-none transition"
                />

                <input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-[#000000] border border-cyan-400/20
                  text-white rounded-md p-3
                  focus:border-cyan-400 outline-none transition"
                />

                <textarea
                  name="message"
                  rows={5}
                  placeholder="Message *"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-[#000000] border border-cyan-400/20
                  text-white rounded-md p-3
                  focus:border-cyan-400 outline-none transition"
                />

                <motion.button
                  type="submit"
                  disabled={loading}
                  variants={headingVariantsCenter}        
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ type: "tween", duration: 0.3, delay: 0.1 }}  // optional delay
                  
                  whileHover={{ scale: 1.04,
                     backgroundColor: "#134e20",
                    borderColor: "rgba(34, 211, 238, 1)",
                    boxShadow: "0 0 25px rgba(34, 211, 238, 0.5)",
                  }}
                  
                  whileTap={{ scale: 0.97 }}
                  
                  className="mt-2 px-6 py-3
                    bg-[#11121b]
                    text-white font-semibold
                    rounded-md
                    border border-cyan-400
                    shadow-[0_0_5px_rgba(0,255,255,0.3)]
                    hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]
                    transition-all duration-300"
                >
                  {loading ? "Sending..." : "Send Message"}
                </motion.button>

              </motion.form>

              {/* RIGHT: CONTACT INFO */}
              <div className="flex flex-col justify-between">

                <div>

                  <motion.h3
                    id="lets-connect"
                    className="text-3xl md:text-4xl font-bold mb-4 text-white"
                    variants={headingVariantsRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ type: "tween", duration: 0.5 }}
                  >
                    Let’s Connect
                  </motion.h3>

                  <motion.p
                    id="connect-question"
                    className="text-gray-400 mb-6 leading-relaxed font-bold"
                    variants={headingVariantsRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.9 }}
                    transition={{ type: "tween", duration: 0.9 }}
                  >
                    Have a project idea or collaboration in mind?
                    Reach out directly or connect through one of the platforms below.
                  </motion.p>

                  <motion.div 
                    id="connect-contact-links"
                    className="space-y-3"
                    variants={headingVariantsRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 1.0 }}
                    transition={{ type: "tween", duration: 1.0 }}
                    >

                    <a
                      href="mailto:chrisray0084@gmail.com"
                      className="block text-white hover:text-cyan-400 transition"
                    >
                      📧 chrisray0084@gmail.com
                    </a>

                    <a
                      href="https://github.com/yourusername"
                      target="_blank"
                      className="block text-white hover:text-cyan-400 transition"
                    >
                      💻 GitHub
                    </a>

                    <a
                      href="https://linkedin.com/in/yourusername"
                      target="_blank"
                      className="block text-white hover:text-cyan-400 transition"
                    >
                      🔗 LinkedIn
                    </a>

                  </motion.div>

                </div>

                <motion.div 
                    id="connect-contact-links"
                    className="mt-8 text-sm text-gray-500"
                    variants={headingVariantsCenter}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 1.0 }}
                    transition={{ type: "tween", duration: 1.0 }}
                    >
                  I typically respond within 24–48 hours.
                </motion.div>

              </div>


            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-[#11121b] border border-cyan-400/20
            text-white rounded-xl p-6 w-[90%] max-w-md
            shadow-[0_0_25px_rgba(0,255,255,0.2)] text-center"
            onClick={(e) => e.stopPropagation()}
          >

            {modal === "success" ? (
              <>
                <h2 className="text-xl font-semibold text-cyan-400 mb-3">
                  Message Sent!
                </h2>
                <p className="text-gray-300 mb-4">
                  Thanks for reaching out. I’ll get back to you soon.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-red-400 mb-3">
                  Something Went Wrong
                </h2>
                <p className="text-gray-300 mb-4">
                  Please try again later.
                </p>
              </>
            )}

            <button
              onClick={() => setModal(null)}
              className="mt-2 px-4 py-2
              border border-cyan-400 rounded-md
              hover:bg-cyan-400/10 transition"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </section>
  )
}