import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Verify from './pages/Verify'
import Survey from './pages/Survey'
import Chatbot from './pages/Chatbot'
import Matching from './pages/Matching'
import Chat from './pages/Chat'
import './App.css'

export default function App() {
  const [appState, setAppState] = useState({
    isVerified: false,
    userEmail: '',
    university: '',
    surveyCompleted: false,
    surveyData: {},
    chatbotCompleted: false,
    likedUsers: new Set(),
  })

  const updateState = (updates) => {
    setAppState(prev => ({ ...prev, ...updates }))
  }

  return (
    <div className="app" id="app-root">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Landing appState={appState} />} />
          <Route path="/verify" element={<Verify appState={appState} updateState={updateState} />} />
          <Route path="/survey" element={<Survey appState={appState} updateState={updateState} />} />
          <Route path="/chatbot" element={<Chatbot appState={appState} updateState={updateState} />} />
          <Route path="/matching" element={<Matching appState={appState} updateState={updateState} />} />
          <Route path="/chat" element={<Chat appState={appState} />} />
        </Routes>
      </main>
    </div>
  )
}
