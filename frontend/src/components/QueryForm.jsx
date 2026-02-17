import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { queryMedicalAssistant } from '../services/api'

const placeholders = {
  symptoms: 'e.g., I have high fever, body pain, and headache for 2 days...',
  disease: 'e.g., What is dengue fever? Tell me about diabetes...',
  medication: 'e.g., What is paracetamol used for? Tell me about antibiotics...',
  general: 'e.g., How can I improve my immune system? What foods are good for heart health?'
}

function QueryForm({ selectedCategory, onResult, loading, setLoading }) {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!query.trim()) {
      setError('Please enter your query')
      return
    }

    setLoading(true)
    setError(null)
    onResult(null)

    try {
      const response = await queryMedicalAssistant(query, selectedCategory)
      onResult(response)
    } catch (err) {
      setError(err.message || 'Failed to get response. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card mb-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your Query
          </label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholders[selectedCategory]}
            rows="4"
            className="input-field resize-none"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Get Medical Information</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default QueryForm
