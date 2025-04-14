import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function Name() {
  const nameRef = useRef()

  useEffect(() => {
    // Animate the name fade-in
    gsap.fromTo(
      nameRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 3,
        ease: 'power2.out',
      }
    )

    const updateFontSize = () => {
      const viewportWidth = window.innerWidth
      const textLength = nameRef.current.textContent.length
      const fontSize = viewportWidth / textLength * 3
      nameRef.current.style.fontSize = `${fontSize}px`
    }

    updateFontSize()
    window.addEventListener('resize', updateFontSize)

    return () => {
      window.removeEventListener('resize', updateFontSize)
    }
  }, [])

  return (
    <div
    ref={nameRef}
    style={{
      position: 'absolute',
      top: '30%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '50vw',
      fontFamily: 'Bebas Neue, sans-serif',
      color: '#000000',
      zIndex: 10,
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
      width: 'fit-content',
      opacity: 0,
    }}
    >
      Steph St.Hilaire
    </div>
  )
}
