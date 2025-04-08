import CloudHero from '/CloudHero.jsx'
import About from '/About.jsx'

export default function App() {
  return (
    <div>
      <section id="hero" style={{ height: '100vh' }}>
        <CloudHero />
        </section>
        <section id="about" style={{ height: '100vh', backgroundColor: '#111', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <About />
      </section>
    </div>
  )
}
