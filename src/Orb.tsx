import { useRef, type PointerEvent } from 'react'

export default function Orb() {
  const tilt = useRef<HTMLDivElement>(null)
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    if (tilt.current) tilt.current.style.transform = `rotateY(${x * 26}deg) rotateX(${-y * 26}deg)`
  }
  const reset = () => { if (tilt.current) tilt.current.style.transform = '' }
  return (
    <div className="orb-wrap" onPointerMove={move} onPointerLeave={reset} aria-hidden="true">
      <div ref={tilt} className="orb-tilt">
        <div className="orb" />
        <div className="ring r1" />
        <div className="ring r2" />
      </div>
    </div>
  )
}
