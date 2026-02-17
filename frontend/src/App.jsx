import { useState } from 'react'
import Header from './components/Header'
import QueryForm from './components/QueryForm'
import ResultDisplay from './components/ResultDisplay'
import CategorySelector from './components/CategorySelector'
import Disclaimer from './components/Disclaimer'
import Footer from './components/Footer'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('symptoms')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              How can I help you today?
            </h2>
            <p className="text-gray-600 text-lg">
              Get AI-powered medical information and guidance
            </p>
          </div>

          <Disclaimer />

          <CategorySelector 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <QueryForm 
            selectedCategory={selectedCategory}
            onResult={setResult}
            loading={loading}
            setLoading={setLoading}
          />

          {result && (
            <ResultDisplay 
              result={result}
              loading={loading}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
