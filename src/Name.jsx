import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import './style.css'

export default function Name() {
  const nameRef = useRef()
  
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
  
    animateIn()
  }, [])

  return (
    <>
      <div ref={nameRef} className="name" data-text="STEPH ST.HILAIRE">
        STEPH ST.HILAIRE
      </div>
        <p className="subtitle">
          creative developer
        </p>
    </>
  )
}