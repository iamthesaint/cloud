import { motion, useScroll, useTransform } from 'framer-motion'

export default function About() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0.3, 0.5], [50, 0])

  return (
    <motion.div style={{ opacity, y }} className="about-section">
      <div>
        <h1>Hi, I'm Stef</h1>
        <p>I'm a creative dev who loves nature, animation, and immersive experiences.</p>
      </div>
    </motion.div>
  )
}
