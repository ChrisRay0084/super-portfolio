"use client"

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"
import { motion } from "framer-motion"

import { Variants } from "framer-motion"

export default function Footer() {
  // Parent container variants for stagger
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <motion.footer
      className="relative z-45 bg-black text-white py-16 px-6 md:px-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        {/* Brand */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-4">Chris Ray</h3>
          <p className="text-gray-400 max-w-sm">
            Highly motivated developer focused on building modern, scalable, and high-performance web experiences using cutting-edge frameworks and technologies.
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div variants={itemVariants}>
          <h4 className="text-lg font-semibold mb-4">Navigation</h4>
          
          <ul className="grid grid-cols-2 gap-y-2 gap-x-6 text-gray-400">
            {[
              "Home",
              "Featured",
              "Skills",
              "Projects",
              "Animated Projects",
              "2D Projects",
              "Photography",
              "Contact",
            ].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Social */}
        <motion.div variants={itemVariants}>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <ul className="flex space-x-4 text-gray-400">
            {/* <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <FaGithub /> GitHub
              </a>
            </li>*/}
            <li>
              <a
                href="https://www.linkedin.com/in/ucchrisray"
                target="_blank"
                className="hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <FaLinkedin /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto:chrisray0084@gmail.com"
                className="hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <FaEnvelope /> Email
              </a>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        className="border-t border-[color:var(--color-secondary)] mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm"
        variants={itemVariants}
      >
        <span>© {new Date().getFullYear()} Chris Ray. All rights reserved.</span>
        <span className="mt-2 md:mt-0">Built with 💚 + ☕</span>
      </motion.div>
    </motion.footer>
  )
}