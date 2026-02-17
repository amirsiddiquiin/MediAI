import { Heart, Github, Mail } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-600">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>using Google Gemini AI</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-medical-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="mailto:support@example.com"
              className="text-gray-600 hover:text-medical-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="text-center mt-4 text-sm text-gray-500">
          <p>© 2024 MediAI Assistant. For informational purposes only.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
