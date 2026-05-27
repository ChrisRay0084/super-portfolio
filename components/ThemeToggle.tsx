"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(true);

  // Toggle dark mode class
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`relative w-18 h-8 flex items-center rounded-full p-1 transition-all duration-500
        ${darkMode
          ? "bg-gradient-to-r from-blue-600 to-blue-400"
          : "bg-gradient-to-r from-gray-300 to-white shadow-inner"}`}
    >
      {/* Handle */}
      <div
        className={`absolute top-1 left-1 w-6 h-6 rounded-full shadow-lg bg-white transform
          transition-transform duration-500 ease-in-out
          ${darkMode ? "translate-x-10" : "translate-x-0"}`}
      />

      {/* Icons */}
      <div className="absolute w-full h-full flex items-center justify-between px-2">
        {/* Sun / Dark Icon */}
        <svg
          className={`w-4 h-4 transition-all duration-500 ease-in-out
            ${darkMode ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
          viewBox="0 0 24 24"
          fill="#84cc16"
        >
          <path d="M12 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zM5 12a7 7 0 0114 0 7 7 0 01-14 0z" />
        </svg>

        {/* Moon / Light Icon */}
        <svg
          className={`w-4 h-4 transition-all duration-500 ease-in-out
            ${darkMode ? "opacity-0 translate-x-2" : "opacity-100 translate-x-0"}`}
          viewBox="0 0 24 24"
          fill="#6b7280"
        >
          <circle cx="12" cy="12" r="5" />
        </svg>
      </div>
    </button>
  );
}