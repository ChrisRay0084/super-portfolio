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
      className="fixed inset-0 bg-[#FFFFFF]/20 z-[100] p-3 pt-[88px] md:p-6 md:pt-[96px]"
      onClick={onClose}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div
        className="relative mx-auto w-full max-w-6xl max-h-[calc(100vh-120px)] rounded-2xl p-[2px] bg-gradient-to-r from-cyan-400/80 via-blue-400/70 to-green-500/80 shadow-[0_0_30px_rgba(0,255,255,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-[14px] border border-cyan-400/20 bg-[#11121b]/95 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/30 bg-[#11121b]/80 text-lg text-gray-300 transition hover:text-white"
          >
            ✕
          </button>

          <div className="max-h-[calc(100vh-150px)] overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  )
}