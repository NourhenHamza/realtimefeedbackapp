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
      <style jsx>{`
        @keyframes floatUpTikTok {
          0% {
            transform: translate(-50%, -50%) translateY(0) translateX(0) scale(0.8) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) translateY(-300px) translateX(var(--float-x)) scale(1.2) rotate(var(--rotate-mid));
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translateY(-600px) translateX(var(--float-x-end)) scale(0.3) rotate(var(--rotate-end));
            opacity: 0;
          }
        }
      `}</style>
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        {emojis.map((emoji) => (
          <div
            key={emoji.id}
            className="absolute"
            style={{
              left: `${emoji.x}px`,
              top: `${emoji.y}px`,
              fontSize: '2.5rem',
              // @ts-ignore
              '--float-x': `${emoji.xOffset}px`,
              '--float-x-end': `${emoji.xOffsetEnd}px`,
              '--rotate-mid': `${emoji.rotation}deg`,
              '--rotate-end': `${emoji.rotationEnd}deg`,
              '--duration': `${emoji.duration}s`,
              animationDelay: `${emoji.delay}s`,
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))',
              animation: 'floatUpTikTok var(--duration) ease-out forwards'
            }}
          >
            {emoji.emoji}
          </div>
        ))}
      </div>
    </>
  )
}