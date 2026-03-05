import { Brain, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-surface-900/50 backdrop-blur-sm border-t border-surface-800/50 py-6 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/25">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-medium text-white">MediAI</span>
              <span className="text-xs text-surface-500 ml-2">© 2024</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <a href="#" className="p-2 text-surface-400 hover:text-white hover:bg-surface-800 rounded-lg transition-all">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 text-surface-400 hover:text-white hover:bg-surface-800 rounded-lg transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 text-surface-400 hover:text-white hover:bg-surface-800 rounded-lg transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 text-surface-400 hover:text-white hover:bg-surface-800 rounded-lg transition-all">
              <Mail className="w-4 h-4" />
            </a>
          </div>
          
          <div className="flex items-center space-x-4 text-xs text-surface-500">
            <a href="#" className="hover:text-primary-400 transition-colors">Privacy</a>
            <span className="text-surface-700">•</span>
            <a href="#" className="hover:text-primary-400 transition-colors">Terms</a>
            <span className="text-surface-700">•</span>
            <a href="#" className="hover:text-primary-400 transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-surface-800/50 text-center">
          <p className="text-xs text-surface-500 flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-400" fill="currentColor" />
            <span>for better healthcare</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
