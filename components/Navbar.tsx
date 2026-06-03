"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const sections = [
    "Home",
    "Featured",
    "Skills",
    "Projects",
    "Animated Projects",
    "2D Projects",
    "Photography",
    "Contact",
  ];

  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const formatId = (id: string) =>
    id.toLowerCase().replace(/\s+/g, "-");

  // FIXED SCROLL 
  const scrollToSection = (id: string) => {
    const el = document.getElementById(formatId(id));

    if (!el) return;

    const y =
      el.getBoundingClientRect().top +
      window.scrollY -
      80;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  // ✅ ACTIVE SECTION TRACKING
  useEffect(() => {
    const handleScroll = () => {
      let current = "home";

      sections.forEach((section) => {
        const el = document.getElementById(formatId(section));

        if (el) {
          const top = el.getBoundingClientRect().top;

          if (top <= 80) {
            current = formatId(section);
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      aria-label="Primary Navigation"
      className="
        fixed top-0 left-0 w-full z-50
        border-b border-[color:var(--color-secondary)]
        bg-[color:var(--color-primary)]/90
        backdrop-blur-md
        text-[color:var(--color-text)]
      "
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full px-6 md:px-12 py-3 flex items-center">

        {/* LEFT: Logo */}
        <div className="flex-shrink-0">
          <motion.button
            onClick={() => scrollToSection("home")}
            whileHover={{
              scale: 1.1,
              rotate: 3,
              filter: "drop-shadow(0 0 8px #0ea5e9)",
            }}
          >
            <img src="/images/logo.svg" alt="Logo" className="opacity-80 w-50 h-16" />
          </motion.button>
        </div>

        {/* DESKTOP NAV */}
        <div className="ml-auto hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6 font-bold">
            {sections.map((section) => {
              const id = formatId(section);
              const isActive = activeSection === id;

              return (
                <li key={section}>
                  <motion.button
                    onClick={() => scrollToSection(section)}
                    className={`
                      relative px-1 text-sm md:text-base
                      font-medium transition-colors duration-200
                      hover:text-[color:var(--color-accent)]
                      ${isActive ? "text-[color:var(--color-accent)]" : ""}
                    `}
                    whileHover={{ scale: 1.05 }}
                  >
                    {section}

                    <span
                      className={`
                        absolute left-0 -bottom-1 h-0.5 bg-[color:var(--color-secondary)]
                        transition-all duration-300
                        ${isActive ? "w-full" : "w-0"}
                      `}
                    />
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="ml-auto md:hidden flex flex-col gap-1 z-[60]"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="w-6 h-[2px] bg-white" />
          <span className="w-6 h-[2px] bg-white" />
          <span className="w-6 h-[2px] bg-white" />
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="
              fixed top-[64px] left-0 w-full z-[9999]
              md:hidden
              bg-[color:var(--color-primary)]/95
              border-t border-[color:var(--color-secondary)]
              backdrop-blur-md
            "
          >
            <div className="flex flex-col px-6 py-4 space-y-4 font-bold">
              {sections.map((section) => {
                const id = formatId(section);
                const isActive = activeSection === id;

                return (
                  <motion.button
                    key={section}
                    onClick={() => {
                      setMobileOpen(false);

                      // wait 1 frame so layout updates BEFORE scroll
                      requestAnimationFrame(() => {
                        scrollToSection(section);
                      });
                    }}
                    className={`
                      text-left py-2
                      ${isActive ? "text-[color:var(--color-accent)]" : ""}
                    `}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}