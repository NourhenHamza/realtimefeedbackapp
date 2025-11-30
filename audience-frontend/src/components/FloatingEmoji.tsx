
interface FloatingEmojiData {
  id: number
  emoji: string
  x: number
  y: number
  xOffset: number
  xOffsetEnd: number
  rotation: number
  rotationEnd: number
  duration: number
  delay: number
}

interface FloatingEmojiProps {
  emojis: FloatingEmojiData[]
}

export default function FloatingEmoji({ emojis }: FloatingEmojiProps) {
  return (
    <>
      {/* ✅ CHANGEMENT CRITIQUE: fixed au lieu de absolute */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {emojis.map((emoji) => (
          <div
            key={emoji.id}
            className="absolute text-4xl"
            style={{
              // ✅ Les coordonnées sont maintenant correctes car le parent est fixed
              left: `${emoji.x}px`,
              top: `${emoji.y}px`,
              animation: `floatUp ${emoji.duration}s ease-out ${emoji.delay}s forwards`,
              willChange: "transform, opacity",
            }}
          >
            <div
              style={{
                animation: `floatUpTransform ${emoji.duration}s ease-out ${emoji.delay}s forwards`,
                // CSS variables pour l'animation
                ["--x-offset" as string]: `${emoji.xOffset}px`,
                ["--x-offset-end" as string]: `${emoji.xOffsetEnd}px`,
                ["--rotation" as string]: `${emoji.rotation}deg`,
                ["--rotation-end" as string]: `${emoji.rotationEnd}deg`,
              }}
            >
              {emoji.emoji}
            </div>
          </div>
        ))}
      </div>

      {/* Keyframes CSS */}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
          }
          70% {
            opacity: 0.9;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes floatUpTransform {
          0% {
            transform: translateY(0) translateX(0) rotate(var(--rotation)) scale(1);
          }
          50% {
            transform: translateY(-150px) translateX(var(--x-offset))
              rotate(calc(var(--rotation) + var(--rotation-end) * 0.5)) scale(1.2);
          }
          100% {
            transform: translateY(-300px) translateX(var(--x-offset-end))
              rotate(calc(var(--rotation) + var(--rotation-end))) scale(0.5);
          }
        }
      `}</style>
    </>
  )
}