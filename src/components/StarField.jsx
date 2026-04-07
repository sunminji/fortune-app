import { useMemo } from 'react'

const COLORS = ['#c4b5fd', '#f9a8d4', '#fbcfe8', '#ddd6fe', '#fecdd3', '#bfdbfe']

export default function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {stars.map(s => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: '50%',
            background: s.color,
            opacity: 0.5,
            animation: `twinkle ${s.duration}s ${s.delay}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  )
}
