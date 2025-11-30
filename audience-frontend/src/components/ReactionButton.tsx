import { useRef, useState } from "react"

interface Reaction {
  type: string
  label: string
  icon: string
}

interface ReactionButtonProps {
  reaction: Reaction
  onReact: (type: string, icon: string, buttonRef: React.RefObject<HTMLButtonElement>) => void
  isDisabled: boolean
}

export default function ReactionButton({ reaction, onReact, isDisabled }: ReactionButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    if (isDisabled) return
    setIsPressed(true)
    onReact(reaction.type, reaction.icon, buttonRef)
    setTimeout(() => setIsPressed(false), 300)
  }

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        ref={buttonRef}
        onClick={handleClick}
        disabled={isDisabled}
        className={`
          relative text-5xl md:text-7xl transition-all duration-300 transform cursor-pointer
          ${isHovered ? "scale-125" : "scale-100"}
          ${isPressed ? "scale-90" : ""}
          ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}
          active:scale-90
        `}
        style={{
          filter: isHovered 
            ? 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.8)) brightness(120%)' 
            : 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {reaction.icon}
      </button>

      <div className={`
        absolute -top-14 left-1/2 transform -translate-x-1/2 transition-all duration-200
        ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
      `}>
        <div className="bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded-xl whitespace-nowrap shadow-2xl">
          {reaction.label}
          <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45" />
        </div>
      </div>
    </div>
  )
}