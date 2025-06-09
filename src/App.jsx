import { Routes, Route, useNavigate } from 'react-router-dom'
import Picture from './Picture.jsx'
import Frame from './Frame.jsx';
import './App.css'

function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <h1 className="welcome-title">
        WELCOME TO <br />
        <span className="photobooth-name">WTHELLY PHOTOBOOTH</span>
      </h1>
      <button className="start-button" onClick={() => navigate('/picture')}>
        START
      </button>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/picture" element={<Picture />} />
      <Route path="/frame" element={<Frame />} />
    </Routes>
  )
}


export default App
