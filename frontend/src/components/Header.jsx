import { Heart, Stethoscope } from 'lucide-react'

function Header() {
  return (
    <header className="bg-white shadow-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-medical-primary to-medical-secondary p-3 rounded-xl shadow-lg">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-medical-primary to-medical-secondary bg-clip-text text-transparent">
                MediAI Assistant
              </h1>
              <p className="text-sm text-gray-600 hidden md:block">
                Your intelligent health companion
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-medical-danger">
            <Heart className="w-6 h-6 animate-pulse" />
            <span className="hidden md:inline text-sm font-medium">
              Always here for you
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
