import { Brain, Sparkles, User, Zap, Settings, Bell } from 'lucide-react'

function Header({ user, onProfileClick }) {
  return (
    <header className="bg-surface-900/80 backdrop-blur-xl border-b border-surface-800/50 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-all duration-300">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">MediAI</h1>
              <div className="flex items-center space-x-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                <p className="text-xs text-surface-500">AI Active</p>
              </div>
            </div>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* AI Badge */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-surface-800/50 rounded-full border border-surface-700/50">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs text-surface-300 font-medium">Gemini AI</span>
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/30">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-400 font-medium">Online</span>
            </div>
            
            {/* Notification Bell */}
            <button className="relative p-2 text-surface-400 hover:text-white hover:bg-surface-800 rounded-lg transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
            </button>
            
            {/* User Profile */}
            <button
              onClick={onProfileClick}
              className="flex items-center space-x-3 group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm text-white font-medium group-hover:text-primary-400 transition-colors">{user?.name || 'User'}</p>
                <p className="text-xs text-surface-500">Premium</p>
              </div>
              
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 group-hover:scale-105 transition-all">
                <User className="w-5 h-5 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
