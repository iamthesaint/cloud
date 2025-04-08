import './style.css'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import App from './App.jsx'

function Main() {
  const [showApp, setShowApp] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  const handleEnter = () => {
    setTransitioning(true)
    setTimeout(() => setShowApp(true), 1000)
  }

  return (
    <>
      {showApp ? (
        <App />
      ) : (
        <div className={`landing-page ${transitioning ? 'fade-out' : ''}`}>
          <button onClick={handleEnter}>Enter</button>
        </div>
      )}
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<Main />)