import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Materials from './components/Materials'
import Projects from './components/Projects'
import Contact from './components/Contact'
import WhatsAppFloat from './components/WhatsAppFloat'
import AdminPage from './pages/AdminPage'

function HomePage() {
  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main>
        <Hero />
        <Services />
        <Materials />
        <Projects />
        <Contact />
      </main>
      <WhatsAppFloat />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}
