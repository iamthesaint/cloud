import './style.css'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'



 function Main() {

  return (
    <>
        <App />
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<Main />)