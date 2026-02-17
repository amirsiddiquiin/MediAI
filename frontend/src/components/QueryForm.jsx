import { useState } from 'react'
import { Send, Loader2, Mic, Paperclip, Sparkles } from 'lucide-react'
import { queryMedicalAssistant } from '../services/api'

function QueryForm({ onResult, onUserMessage, loading, setLoading }) {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!query.trim()) {
      setError('Please enter your query')
      return
    }

    // Add user message to chat
    onUserMessage(query.trim())
    
    setLoading(true)
    setError(null)
    setQuery('')

    try {
      // Let AI determine the category based on the query
      let category = 'general'
      const lowerQuery = query.toLowerCase()
      
      if (lowerQuery.includes('symptom') || lowerQuery.includes('pain') || lowerQuery.includes('fever') || 
          lowerQuery.includes('headache') || lowerQuery.includes('cough') || lowerQuery.includes('i have')) {
        category = 'symptoms'
      } else if (lowerQuery.includes('what is') || lowerQuery.includes('disease') || lowerQuery.includes('condition')) {
        category = 'disease'
      } else if (lowerQuery.includes('medicine') || lowerQuery.includes('drug') || lowerQuery.includes('medication') || 
                 lowerQuery.includes('paracetamol') || lowerQuery.includes('antibiotic')) {
        category = 'medication'
      }

      const response = await queryMedicalAssistant(query.trim(), category)
      onResult(response)
    } catch (err) {
      setError(err.message || 'Failed to get response. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="space-y-3">
      {error && (
        <div className="p-3 bg-red-900/50 border border-red-800 rounded-lg">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center space-x-2 bg-zinc-800 border border-zinc-700 rounded-2xl p-2 focus-within:border-purple-500 focus-within:shadow-lg focus-within:shadow-purple-500/25 transition-all">
          <button
            type="button"
            className="p-2 text-zinc-400 hover:text-white transition-colors"
            disabled={loading}
          >
            <Paperclip className="w-4 h-4" />
          </button>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything about medical symptoms, diseases, or treatments..."
            className="flex-1 bg-transparent text-white placeholder-zinc-500 focus:outline-none text-sm"
            disabled={loading}
          />
          
          <button
            type="button"
            className="p-2 text-zinc-400 hover:text-white transition-colors"
            disabled={loading}
          >
            <Mic className="w-4 h-4" />
          </button>
          
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="p-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>
      
      <div className="flex items-center justify-between text-xs text-zinc-600">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>AI Enhanced</span>
          </span>
          <span>•</span>
          <span>Press Enter to send</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-zinc-500">Powered by</span>
          <span className="text-purple-400 font-semibold">Gemini</span>
        </div>
      </div>
    </div>
  )
}

export default QueryForm
