import { Routes, Route, Navigate } from 'react-router-dom'
import Intro from './pages/Intro'
import Home from './pages/Home'
import About from './pages/About'
import Project from './pages/Project'
import MapPage from './pages/Map'
import Behind from './pages/Behind'
import Motion from './components/Motion'

export default function App() {
  return (
    <>
      <Motion />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/behind" element={<Behind />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
