"use client"

import { useState, useEffect } from "react"

type TypewriterProps = {
  phrases: string[]
  typingSpeed?: number      // optional speed for typing
  deletingSpeed?: number    // optional speed for deleting
  pauseTime?: number        // optional pause at the end of a phrase
}

export default function Typewriter({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 1500,
}: TypewriterProps) {
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[index]
    const speed = isDeleting ? deletingSpeed : typingSpeed

    const timeout = setTimeout(() => {
      setText(
        isDeleting
          ? current.substring(0, text.length - 1)
          : current.substring(0, text.length + 1)
      )

      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      }

      if (isDeleting && text === "") {
        setIsDeleting(false)
        setIndex((prev) => (prev + 1) % phrases.length)
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, index, phrases, typingSpeed, deletingSpeed, pauseTime])

  return (
    <span className="inline-flex items-center space-x-1">
      <span className="text-white text-base md:text-2xl font-bold">{text || "\u00A0"}</span>
      {/* Neon Cursor */}
      <span
        className="w-1 h-6 bg-cyan-400 rounded animate-blink"
        style={{
          boxShadow: "0 0 8px rgba(0,255,200,0.8), 0 0 16px rgba(0,255,200,0.6)",
        }}
      />
    </span>
  )
}