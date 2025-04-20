import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './style.css'

gsap.registerPlugin(ScrollTrigger)

export default function About({ portfolioRef }) {
  const sectionRef = useRef()
  const blurbRef = useRef()
  const containerRef = useRef()
  const arrowRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const containerWidth = containerRef.current.scrollWidth
      const viewportWidth = window.innerWidth

      gsap.to(containerRef.current, {
        x: -(containerWidth - viewportWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: `+=${containerWidth}`,
          scrub: true,
          pin: true,
        },
      })

      gsap.to(arrowRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: 'power1.inOut',
      })

      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: portfolioRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          pin: false,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [portfolioRef])


  return (
    <>
    <section
      ref={sectionRef}
      style={{
        height: '50vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        background: '#111',
        color: '#fff',
        fontFamily: 'Oswald, sans-serif',
        textTransform: 'uppercase',
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          width: 'fit-content',
          position: 'absolute',
        }}
      >
        {/* Section 1 */}
        <div
          style={{
            minWidth: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 2vw',
          }}
        >
          <p
            ref={blurbRef}
            style={{
              fontSize: '5vw',
              whiteSpace: 'nowrap',
              opacity: 1,
            }}
          >
            Creative developer blending art and code into immersive digital experiences
          </p>
        </div>
        {/* Section 2 */}
        <div
          style={{
            minWidth: '70vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
          ref={arrowRef}
          style={{
            position: 'absolute',
            fontSize: '15vw',
            padding: '10%',
            color: '#fff',
            animation: 'bounce 1s infinite',
          }}
        >
          ↓
        </div>
        </div>
        </div>
    </section>
    <section
      ref={portfolioRef}
      style={{
        height: '2vw',
        width: '45vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#111',
        color: '#fff',
        fontFamily: 'Oswald, sans-serif',
      }}
    >
      </section>
      </>
  )
}


