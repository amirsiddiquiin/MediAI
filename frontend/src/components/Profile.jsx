import { useState } from 'react'
import { User, Mail, Phone, Calendar, Heart, Activity, Edit2, Save, X, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

function Profile({ onClose }) {
  const { user, token, updateProfile, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    dateOfBirth: user?.profile?.dateOfBirth || '',
    gender: user?.profile?.gender || '',
    bloodGroup: user?.profile?.bloodGroup || '',
    allergies: user?.profile?.allergies?.join(', ') || ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const updatedProfile = {
        name: formData.name,
        phone: formData.phone,
        profile: {
          ...user.profile,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          bloodGroup: formData.bloodGroup,
          allergies: formData.allergies.split(',').map(a => a.trim()).filter(a => a)
        }
      }

      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedProfile)
      })

      const data = await response.json()
      if (data.success) {
        updateProfile(data.user)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Profile update error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      dateOfBirth: user?.profile?.dateOfBirth || '',
      gender: user?.profile?.gender || '',
      bloodGroup: user?.profile?.bloodGroup || '',
      allergies: user?.profile?.allergies?.join(', ') || ''
    })
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    onClose()
  }

  if (!user) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">My Profile</h2>
                <p className="text-zinc-200 text-sm">Manage your medical information</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <User className="w-5 h-5 text-violet-400" />
              <span>Basic Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Email</label>
                <div className="flex items-center space-x-2 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2">
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-300">{user.email}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-400" />
              <span>Medical Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-zinc-400 text-sm mb-2">Allergies (comma separated)</label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={3}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-400" />
              <span>Activity</span>
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-violet-400">12</p>
                <p className="text-zinc-400 text-sm">Queries</p>
              </div>
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-green-400">3</p>
                <p className="text-zinc-400 text-sm">Doctor Searches</p>
              </div>
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-400">7</p>
                <p className="text-zinc-400 text-sm">Days Active</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-zinc-800 flex items-center justify-between">
          <button onClick={handleLogout} className="flex items-center space-x-2 text-red-400 hover:text-red-300">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
          
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <button onClick={handleCancel} disabled={loading} className="px-4 py-2 bg-zinc-700 text-white rounded-xl hover:bg-zinc-600 disabled:opacity-50">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={loading} className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50">
                  {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent border-r-transparent animate-spin"></div> : <Save className="w-4 h-4" />}
                  <span>Save</span>
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="flex items-center space-x-2 px-4 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700">
                <Edit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
