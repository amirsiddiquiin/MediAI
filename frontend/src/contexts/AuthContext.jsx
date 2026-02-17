import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('mediAI_token')
    const savedUser = localStorage.getItem('mediAI_user')

    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        setToken(savedToken)
      } catch (error) {
        console.error('Error parsing saved user data:', error)
        // Clear invalid data
        localStorage.removeItem('mediAI_token')
        localStorage.removeItem('mediAI_user')
      }
    }
    setLoading(false)
  }, [])

  const login = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
    localStorage.setItem('mediAI_token', userToken)
    localStorage.setItem('mediAI_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('mediAI_token')
    localStorage.removeItem('mediAI_user')
  }

  const updateProfile = (updatedUserData) => {
    setUser(updatedUserData)
    localStorage.setItem('mediAI_user', JSON.stringify(updatedUserData))
  }

  const isAuthenticated = !!token && !!user

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      isAuthenticated,
      login,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
