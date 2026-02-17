import { Heart, Stethoscope, Brain, Sparkles, User, LogOut, Zap } from 'lucide-react'

function Header({ user, onProfileClick }) {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg blur opacity-25 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">MediAI</h1>
              <p className="text-xs text-zinc-500">Neural Network Active</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-zinc-400">Online</span>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-zinc-200 font-medium">{user?.name || 'User'}</p>
                <p className="text-xs text-zinc-500">Premium Member</p>
              </div>
              
              <button
                onClick={onProfileClick}
                className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/25 hover:scale-105 transition-transform"
              >
                <User className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="flex items-center space-x-2 text-xs text-zinc-500">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Gemini AI</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
