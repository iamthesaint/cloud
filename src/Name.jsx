import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

export default function Name() {
  const nameRef = useRef()
  const containerRef = useRef()
  const [fontSize, setFontSize] = useState(100)
  
  useEffect(() => {
    const animateIn = () => {
      gsap.fromTo(
        nameRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: 'power2.out',
        }
      )
    }

    const resizeText = () => {
      const containerWidth = window.innerWidth * 0.95
      let testSize = 100
      nameRef.current.style.fontSize = `${testSize}px`

      while (nameRef.current.offsetWidth < containerWidth && testSize < 1000) {
        testSize += 1
        nameRef.current.style.fontSize = `${testSize}px`
      }

      while (nameRef.current.offsetWidth > containerWidth && testSize > 0) {
        testSize -= 1
        nameRef.current.style.fontSize = `${testSize}px`
      }

      setFontSize(testSize)
    }

    resizeText()
    animateIn()

    window.addEventListener('resize', resizeText)
    return () => window.removeEventListener('resize', resizeText)
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        textAlign: 'center',
      }}
    >
      <div
        ref={nameRef}
        style={{
          fontSize: `${fontSize}px`,
          fontFamily: 'Bebas Neue, sans-serif',
          color: '#000',
          opacity: 0,
        }}
      >
        Steph St.Hilaire
      </div>
    </div>
  )
}
