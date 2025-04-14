import CloudHero from '/CloudHero.jsx'
import About from '/About.jsx'

export default function App() {
  
  return (
    <div>
      <section id="hero" style={{ height: '200vh' }} >
        <CloudHero />
        </section>
        <section id="about-section" >
        <About />
      </section >
    </div>
  )
}
