import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

export default function ScrollContainer({ children }) {
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({ container: scrollRef })

  return (
    <div ref={scrollRef} className="scroll-container">
      {children}
    </div>
  )
}
