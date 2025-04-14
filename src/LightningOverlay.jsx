import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function LightningOverlay() {
  const flashRef = useRef()

  useEffect(() => {
    const flash = flashRef.current
    const timeline = gsap.timeline({ delay: 2 })

    timeline
      .to(flash, {
        opacity: 1,
        duration: 0.1,
        ease: 'power4.out',
      })
      .to(flash, {
        opacity: 0,
        duration: 0.01,
        ease: 'power4.in',
      })
      .to(flash, {
        opacity: 0.8,
        duration: 0.05,
      })
      .to(flash, {
        opacity: 0,
        duration: 0.25,
      })

  }, [])

  return (
    <div
      ref={flashRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#fff',
        opacity: 0,
        zIndex: 20,
        pointerEvents: 'none',
      }}
    />
  )
}
