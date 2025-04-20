import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '/style.css'

gsap.registerPlugin(ScrollTrigger)

export default function Projects({ triggerRef }) {
  useEffect(() => {
    if (!triggerRef?.current) return

    const projectWrappers = document.querySelectorAll('.project-title-wrapper')
    if (projectWrappers.length === 0) return 

    gsap.from(projectWrappers, {
      opacity: 0,
      y: 100,
      stagger: 0.2,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top center',
        end: '+=200',
        toggleActions: 'play none none reverse',
      },
    })
  }, [triggerRef])

  const playDropletSound = () => {
    const audio = new Audio('/two-drops-87977.mp3')
    audio.volume = 0.7
    audio.play()
  }

  const handleClick = (e) => {
    const wrapper = e.currentTarget

    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY

    wrapper.style.setProperty('--x', `${x}px`)
    wrapper.style.setProperty('--y', `${y}px`)

    wrapper.classList.remove('ripple')
    void wrapper.offsetWidth
    wrapper.classList.add('ripple')

    wrapper.addEventListener(
        'animationend',
        () => {
          wrapper.classList.remove('ripple')
        },
        { once: true }
      )

    playDropletSound()
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'transparent',
        border: 'none',
        color: '#000000',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '10vh 10vw',
        fontFamily: 'Oswald, sans-serif',
        textTransform: 'uppercase',
        fontWeight: '100',
        fontSize: '1rem',
      }}
    >
      <div
      className="projects-title"
        style={{
          fontSize: '2rem',
          fontFamily: 'Oswald, sans-serif',
          textTransform: 'uppercase',
          fontWeight: '100',
        }}
      >
        My Work
      </div>
      <div
        className="projects-list"
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '400px',
        }}
      >
        <a href="https://weather-dashboard-b6h3.onrender.com/" className="project-title-wrapper" style={{ cursor: 'pointer' }} onClick={handleClick}>
          <h2 className="project-title" style={{ marginBottom: '0.5rem' }}>Weather Dashboard</h2>
        </a>

        <a href="https://example.com/weather-expedition" target="_blank" rel="noopener noreferrer" className="project-title-wrapper" style={{ cursor: 'pointer' }} onClick={handleClick}>
          <h2 className="project-title" style={{ marginBottom: '0.5rem' }}>Weather Expedition</h2>
        </a>

        <a href="https://iamthesaint.github.io/cash-guardian/" className="project-title-wrapper" style={{ cursor: 'pointer' }} onClick={handleClick}>
          <h2 className="project-title" style={{ marginBottom: '0.5rem' }}>Cash Guardian</h2>
        </a>

        <a href="https://candidate-search-zm1f.onrender.com/" className="project-title-wrapper" style={{ cursor: 'pointer' }} onClick={handleClick}>
          <h2 className="project-title" style={{ marginBottom: '0.5rem' }}>Tech Candidate Search</h2>
        </a>

        <a href="https://example.com/kanban" target="_blank" rel="noopener noreferrer" className="project-title-wrapper" style={{ cursor: 'pointer' }} onClick={handleClick}>
          <h2 className="project-title" style={{ marginBottom: '0.5rem' }}>Kanban</h2>
        </a>
        
        <a href="https://example.com/google-book-search" target="_blank" rel="noopener noreferrer" className="project-title-wrapper" style={{ cursor: 'pointer' }} onClick={handleClick}>
          <h2 className="project-title" style={{ marginBottom: '0.5rem' }}>Google Book Search</h2>
        </a>

        <a href="https://example.com/python-quiz" target="_blank" rel="noopener noreferrer" className="project-title-wrapper" style={{ cursor: 'pointer' }} onClick={handleClick}>
          <h2 className="project-title" style={{ marginBottom: '0.5rem' }}>Python Quiz</h2>
        </a>

        <a href="https://example.com/trip-zen" target="_blank" rel="noopener noreferrer" className="project-title-wrapper" style={{ cursor: 'pointer' }} onClick={handleClick}>
          <h2 className="project-title" style={{ marginBottom: '0.5rem' }}>Trip Zen</h2>
        </a>

        <a href="https://example.com/tarot-reading" target="_blank" rel="noopener noreferrer" className="project-title-wrapper" style={{ cursor: 'pointer' }} onClick={handleClick}>
          <h2 className="project-title" style={{ marginBottom: '0.5rem' }}>Tarot Reading</h2>
        </a>

      </div>
    </div>
  )
}