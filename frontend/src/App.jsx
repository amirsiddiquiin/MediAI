import React, { useState, useRef, useEffect } from 'react'
import { MapPin, Bot, Plus, MessageCircle, Heart, Activity, Shield, Stethoscope, Pill, AlertCircle, ChevronDown, Menu, X, Users, UserPlus } from 'lucide-react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Auth from './components/Auth'
import QueryForm from './components/QueryForm'
import ResultDisplay from './components/ResultDisplay'
import Disclaimer from './components/Disclaimer'
import LocationDoctorSearch from './components/LocationDoctorSearch'
import Profile from './components/Profile'
import DoctorListing from './components/DoctorListing'
import DoctorOnboarding from './components/DoctorOnboarding'

function AppContent() {
  const { user, isAuthenticated } = useAuth()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const [showDoctorSearch, setShowDoctorSearch] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showDoctorListing, setShowDoctorListing] = useState(false)
  const [showDoctorOnboarding, setShowDoctorOnboarding] = useState(false)
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem('mediAI_chatHistory')
    return saved ? JSON.parse(saved) : []
  })
  const [currentChatId, setCurrentChatId] = useState(null)
  const [userLocation, setUserLocation] = useState(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Get user location on mount
  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude
            const lng = position.coords.longitude
            
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`,
                { headers: { 'Accept-Language': 'en' } }
              )
              const data = await response.json()
              
              const city = data.address?.city || 
                          data.address?.town || 
                          data.address?.municipality ||
                          data.address?.county ||
                          data.display_name?.split(',')[0] ||
                          'Current Location'
              const state = data.address?.state || ''
              const country = data.address?.country || ''
              
              setUserLocation({ lat, lng, city, state, country })
            } catch (error) {
              console.error('Geocoding error:', error)
            }
          },
          () => {},
          { timeout: 10000, enableHighAccuracy: false }
        )
      }
    }
    getLocation()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem('mediAI_chatHistory', JSON.stringify(chatHistory))
  }, [chatHistory])

  // Save current chat when messages change
  useEffect(() => {
    if (messages.length > 0 && currentChatId) {
      const firstUserMessage = messages.find(m => m.type === 'user')
      const title = firstUserMessage?.content?.slice(0, 30) + '...' || 'Medical consultation'
      
      setChatHistory(prev => {
        const existingIndex = prev.findIndex(chat => chat.id === currentChatId)
        if (existingIndex >= 0) {
          const updated = [...prev]
          updated[existingIndex] = {
            ...updated[existingIndex],
            messages,
            title,
            updatedAt: new Date().toISOString()
          }
          return updated
        }
        return prev
      })
    }
  }, [messages, currentChatId])

  const addMessage = (message) => {
    if (messages.length === 0) {
      const newChatId = Date.now().toString()
      setCurrentChatId(newChatId)
      setMessages([message])
      return
    }
    setMessages(prev => [...prev, message])
  }

  // Handle API query
  const handleQuery = async (query) => {
    // Create new chat ID if needed
    const isNewChat = messages.length === 0
    const chatId = currentChatId || Date.now().toString()
    
    if (isNewChat) {
      setCurrentChatId(chatId)
    }

    // Add user message using functional update
    setMessages(prev => [...prev, { type: 'user', content: query }])

    setLoading(true)

    try {
      let category = 'general'
      const lowerQuery = query.toLowerCase()
      
      if (lowerQuery.includes('symptom') || lowerQuery.includes('pain') || lowerQuery.includes('fever') || 
          lowerQuery.includes('headache') || lowerQuery.includes('cough') || lowerQuery.includes('i have')) {
        category = 'symptoms'
      } else if (lowerQuery.includes('what is') || lowerQuery.includes('disease') || lowerQuery.includes('condition')) {
        category = 'disease'
      } else if (lowerQuery.includes('medicine') || lowerQuery.includes('drug') || lowerQuery.includes('medication') || 
                 lowerQuery.includes('paracetamol') || lowerQuery.includes('antibiotic') || lowerQuery.includes('ibuprofen')) {
        category = 'medication'
      }

      const response = await fetch('/api/medical/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, queryType: category, location: userLocation })
      })

      const data = await response.json()

      if (data.success && data.data) {
        // Add result using functional update
        setMessages(prev => [...prev, { type: 'result', data: data.data }])
      } else {
        setMessages(prev => [...prev, { 
          type: 'assistant', 
          content: data.message || 'Sorry, I could not process your request. Please try again.' 
        }])
      }
    } catch (error) {
      console.error('Query error:', error)
      setMessages(prev => [...prev, { 
        type: 'assistant', 
        content: 'Failed to get response. Please check your connection and try again.' 
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleDoctorSelect = (doctor) => {
    addMessage({
      type: 'assistant',
      content: `I found ${doctor.name} for you. They are a ${doctor.specialty} at ${doctor.hospital || doctor.clinicName}, located ${doctor.distance} away. You can call them at ${doctor.phone}. They are ${doctor.availability?.toLowerCase() || 'available'}. Would you like me to help you prepare for your visit?`
    })
    setShowDoctorSearch(false)
  }

  const startNewChat = () => {
    setCurrentChatId(null)
    setMessages([])
  }

  const loadChat = (chat) => {
    setCurrentChatId(chat.id)
    setMessages(chat.messages || [])
    setSidebarOpen(false)
  }

  const deleteChat = (chatId, e) => {
    e.stopPropagation()
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId))
    if (currentChatId === chatId) {
      setCurrentChatId(null)
      setMessages([])
    }
  }

  // Show Auth screen if not authenticated
  if (!isAuthenticated) {
    return <Auth onAuthSuccess={() => {}} />
  }

  const suggestedQueries = [
    { icon: Heart, text: "Analyze my symptoms", query: "I have been experiencing headaches and fatigue for the past week" },
    { icon: Stethoscope, text: "Learn about conditions", query: "Tell me about type 2 diabetes and its management" },
    { icon: Pill, text: "Medication information", query: "What are the common side effects of ibuprofen?" },
    { icon: Shield, text: "Prevention tips", query: "How can I improve my heart health naturally?" }
  ]

  return (
    <div className="h-screen flex bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#111] border-r border-white/10 flex flex-col transition-transform duration-200`}>
        {/* Sidebar Header */}
        <div className="p-3 border-b border-white/10">
          <button
            onClick={startNewChat}
            className="w-full flex items-center gap-2 px-3 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-2">
          <p className="px-3 py-2 text-xs text-gray-500 font-medium">Recent</p>
          {chatHistory.length > 0 ? (
            <div className="space-y-1">
              {chatHistory.slice().reverse().map(chat => (
                <button
                  key={chat.id}
                  onClick={() => loadChat(chat)}
                  className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm truncate flex items-center justify-between group ${
                    currentChatId === chat.id ? 'bg-white/10 text-white' : 'text-gray-300'
                  }`}
                >
                  <span className="truncate flex-1">{chat.title || 'Medical consultation'}</span>
                  <X 
                    className="w-3 h-3 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity"
                    onClick={(e) => deleteChat(chat.id, e)}
                  />
                </button>
              ))}
            </div>
          ) : (
            <p className="px-3 py-2 text-xs text-gray-600">No conversations yet</p>
          )}
        </div>

        {/* User Profile */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={() => setShowProfile(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-teal-400">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500">View Profile</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#111]/50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-white/5 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-teal-500 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">MediAI</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Powered by AI</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            /* Welcome Screen */
            <div className="h-full flex flex-col items-center justify-center p-4">
              <div className="max-w-2xl w-full text-center mb-8">
                <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-bold mb-2">How can I help you today?</h1>
                <p className="text-gray-400 text-sm">
                  I'm your AI medical assistant. Ask me about symptoms, conditions, medications, or general health questions.
                </p>
              </div>

              {/* Suggested Queries */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full mb-8">
                {suggestedQueries.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuery(item.query)}
                    disabled={loading}
                    className="flex items-start gap-3 p-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-left group disabled:opacity-50"
                  >
                    <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/10">
                      <item.icon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.text}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.query}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Find Doctors */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => setShowDoctorSearch(!showDoctorSearch)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Find doctors near me</span>
                </button>
                <button
                  onClick={() => setShowDoctorListing(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span>Browse all doctors</span>
                </button>
                <button
                  onClick={() => setShowDoctorOnboarding(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-teal-400 hover:text-teal-300 transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register as Doctor</span>
                </button>
              </div>

              {/* Doctor Search Panel */}
              {showDoctorSearch && (
                <div className="w-full max-w-2xl mt-4 p-4 bg-[#111] rounded-xl border border-white/10">
                  <LocationDoctorSearch onDoctorSelect={handleDoctorSelect} />
                </div>
              )}
            </div>
          ) : (
            /* Messages */
            <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
              {messages.map((message, index) => (
                <div key={index}>
                  {message.type === 'user' && (
                    <div className="flex justify-end">
                      <div className="max-w-[80%] bg-teal-500 text-white rounded-2xl px-4 py-3">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  )}
                  {message.type === 'assistant' && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-teal-400" />
                      </div>
                      <div className="flex-1 bg-[#111] rounded-2xl px-4 py-3 border border-white/10">
                        <p className="text-sm text-gray-200 leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  )}
                  {message.type === 'result' && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-teal-400" />
                      </div>
                      <div className="flex-1">
                        <ResultDisplay result={message.data} />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="bg-[#111] rounded-2xl px-4 py-3 border border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-sm text-gray-400">Analyzing...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 bg-[#111]/50 p-4">
          <div className="max-w-3xl mx-auto">
            <QueryForm 
              onSubmit={handleQuery}
              loading={loading}
            />
            <div className="mt-2 text-center">
              <Disclaimer />
            </div>
          </div>
        </div>
      </main>

      {/* Profile Modal */}
      {showProfile && (
        <Profile onClose={() => setShowProfile(false)} />
      )}

      {/* Doctor Listing Modal */}
      {showDoctorListing && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#111] rounded-2xl border border-white/10 max-w-2xl w-full my-8 max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Find a Doctor</h2>
              <button
                onClick={() => setShowDoctorListing(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <DoctorListing onSelectDoctor={(doctor) => {
                handleDoctorSelect(doctor)
                setShowDoctorListing(false)
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Doctor Onboarding Modal */}
      {showDoctorOnboarding && (
        <DoctorOnboarding onClose={() => setShowDoctorOnboarding(false)} />
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
