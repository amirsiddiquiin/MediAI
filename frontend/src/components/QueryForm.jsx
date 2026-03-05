import { useState } from 'react'
import { ArrowUp, Loader2 } from 'lucide-react'

function QueryForm({ onSubmit, loading }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!query.trim() || loading) return

    onSubmit(query.trim())
    setQuery('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end gap-2 bg-[#1a1a1a] border border-white/10 rounded-2xl p-2 focus-within:border-white/20 transition-colors">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message MediAI..."
          className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm resize-none max-h-32 py-2 px-2"
          disabled={loading}
          rows={1}
          style={{ minHeight: '24px' }}
        />
        
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ArrowUp className="w-4 h-4" />
          )}
        </button>
      </div>
    </form>
  )
}

export default QueryForm
