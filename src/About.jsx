import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef()
  const blurbRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1000%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })

      tl.to(blurbRef.current, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      })
    }, sectionRef)
    

    return () => ctx.revert()
  }, [])



  return (
    <section
      ref={sectionRef}
      style={{
        height: '50vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
        background: '#111',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Bebas Neue, sans-serif',
      }}
    >
      <div style={{ display: 'flex', width: '100vw', position: 'relative' }}>
        <p
          ref={blurbRef}
          style={{
            fontSize: '5vw',
            whiteSpace: 'nowrap',
            position: 'absolute',
            left: 100,
            opacity: 0,
          }}
        >
          Creative developer blending art and code into immersive digital experiences.
        </p> 
      </div>
    </section>
  )
}
