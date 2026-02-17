import { Heart, Github, Twitter, Linkedin, Zap } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-300 py-8 border-t border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">MediAI</h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Advanced medical intelligence powered by cutting-edge AI technology. 
              Delivering precise healthcare insights with uncompromising safety standards.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-3 text-zinc-200">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-zinc-500 hover:text-zinc-200 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-zinc-200 transition-colors">API Access</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-zinc-200 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-zinc-200 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-3 text-zinc-200">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-zinc-500 hover:text-zinc-200 transition-colors hover:scale-110 transform">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-zinc-500 hover:text-zinc-200 transition-colors hover:scale-110 transform">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-zinc-500 hover:text-zinc-200 transition-colors hover:scale-110 transform">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-zinc-500 text-sm">
              Engineered with <Heart className="w-4 h-4 text-red-500 inline animate-pulse" /> for healthcare innovation
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
          <p className="text-zinc-600 text-xs">
            2024 MediAI. Neural network-driven medical intelligence. Not a substitute for professional medical consultation.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
