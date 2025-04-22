import CloudHero from '/CloudHero.jsx'
import Name from '/Name.jsx'
import Projects from '/Projects.jsx'
import { useEffect } from 'react'

export default function App() {

    useEffect(() => {
      window.dispatchEvent(new Event('resize'))
    }, [])

  return (
    <>
    <div>
      <section id="hero" style={{ height: '70vh' }}>
        <CloudHero setStormProgress />
      </section>
        <section id="name-section" className='name-section'>
          <Name />
        </section>
        {/* <section id="projects-section" style={{ height: '100vh' }}>
          <Projects />
        </section> */}
      </div>
      </>
  )
}
