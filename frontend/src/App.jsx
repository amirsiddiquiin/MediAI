import React, { useState, useRef, useEffect } from 'react'
import { MapPin } from 'lucide-react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Auth from './components/Auth'
import Header from './components/Header'
import QueryForm from './components/QueryForm'
import ResultDisplay from './components/ResultDisplay'
import Disclaimer from './components/Disclaimer'
import Footer from './components/Footer'
import LocationDoctorSearch from './components/LocationDoctorSearch'
import Profile from './components/Profile'

function AppContent() {
  const { user, isAuthenticated } = useAuth()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const [showDoctorSearch, setShowDoctorSearch] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [showProfile, setShowProfile] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (message) => {
    setMessages(prev => [...prev, message])
  }

  const handleDoctorSelect = (doctor) => {
    addMessage({
      type: 'assistant',
      content: `I found ${doctor.name} for you. They are a ${doctor.specialty} at ${doctor.hospital}, located ${doctor.distance} away. You can call them at ${doctor.phone}. They are ${doctor.availability.toLowerCase()}. Would you like me to help you prepare for your visit?`
    })
    setShowDoctorSearch(false)
  }

  // Show Auth screen if not authenticated
  if (!isAuthenticated) {
    return <Auth onAuthSuccess={() => {}} />
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header user={user} onProfileClick={() => setShowProfile(true)} />
      
      <main className="flex-grow flex flex-col max-w-4xl mx-auto w-full px-4 py-6">
        <div className="flex-grow flex flex-col bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 border-b border-zinc-800">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div className="flex-grow">
                <h2 className="text-lg font-semibold text-white">MediAI</h2>
                <p className="text-xs text-purple-200">Advanced Medical AI Assistant</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-zinc-600 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-zinc-950">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl blur opacity-25 animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  Welcome to MediAI
                </h3>
                <p className="text-zinc-400 max-w-md mx-auto text-sm leading-relaxed">
                  Your advanced medical AI assistant. Ask me anything about symptoms, diseases, medications, or general health.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {["What is diabetes?", "Headache remedies", "Fever symptoms", "Heart health tips"].map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => addMessage({ type: 'user', content: suggestion })}
                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-xs border border-zinc-700 transition-all hover:scale-105"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setShowDoctorSearch(!showDoctorSearch)}
                    className="px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 hover:from-green-600/30 hover:to-emerald-600/30 text-green-400 rounded-full text-xs border border-green-800/50 transition-all hover:scale-105 flex items-center space-x-2"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>{showDoctorSearch ? 'Hide' : 'Find'} Doctors Near Me</span>
                  </button>
                </div>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                {message.type === 'user' && (
                  <div className="max-w-xs lg:max-w-md">
                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl rounded-br-sm px-4 py-3 shadow-lg shadow-purple-500/25">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1 text-right">Just now</p>
                  </div>
                )}
                {message.type === 'assistant' && (
                  <div className="max-w-xs lg:max-w-md">
                    <div className="bg-zinc-800 border border-zinc-700 rounded-2xl rounded-bl-sm px-4 py-3">
                      <p className="text-sm text-zinc-200 leading-relaxed">{message.content}</p>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">Just now</p>
                  </div>
                )}
                {message.type === 'result' && (
                  <div className="w-full max-w-4xl px-4 py-4">
                    <ResultDisplay result={message.data} />
                  </div>
                )}
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm text-zinc-400">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Doctor Search Section */}
          {showDoctorSearch && (
            <div className="px-6 py-4 bg-zinc-900/50 border-t border-zinc-800">
              <LocationDoctorSearch onDoctorSelect={handleDoctorSelect} />
            </div>
          )}

          {/* Disclaimer */}
          <div className="px-6 py-3 bg-zinc-900 border-t border-zinc-800">
            <Disclaimer />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-zinc-900 border-t border-zinc-800">
            <QueryForm 
              onResult={(result) => addMessage({ type: 'result', data: result })}
              onUserMessage={(message) => addMessage({ type: 'user', content: message })}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Profile Modal */}
      {showProfile && (
        <Profile onClose={() => setShowProfile(false)} />
      )}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
