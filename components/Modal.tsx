"use client"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-[#FFFFFF]/20 flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#11121b] rounded-xl max-w-5xl w-full p-6 relative text-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-1 text-gray-400 hover:text-white text-xl font-bold"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  )
}