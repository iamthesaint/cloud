import CloudHero from '/CloudHero.jsx'
import { useEffect } from 'react'

export default function App() {

    useEffect(() => {
      window.dispatchEvent(new Event('resize'))
    }, [])

  return (
    <>
    <div>
      <section id="hero" className='hero'>
        <CloudHero setStormProgress />
        </section>
      </div>
      </>
  )
}
