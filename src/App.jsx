import CloudHero from '/CloudHero.jsx'
import About from '/About.jsx'
import Name from '/Name.jsx'
import Projects from '/Projects.jsx'
import { useRef } from 'react'

export default function App() {

  const portfolioRef = useRef()
  
  return (
    <div>
      <section id="hero" style={{ height: '100vh' }} >
        <CloudHero />
        </section>
        <section id="about-section" >
        <About portfolioRef={portfolioRef} />
        </section >
        <section id="name-section">
          <Name />
        </section>
        <section id="projects-section">
        <Projects triggerRef={portfolioRef} />
      </section>
    </div>
  )
}
