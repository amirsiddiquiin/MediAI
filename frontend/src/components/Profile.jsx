import { useState } from 'react'
import { X, User, Heart, Save, Edit2, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

function Profile({ onClose }) {
  const { user, updateProfile, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    bloodGroup: user?.bloodGroup || '',
    allergies: user?.allergies?.join(', ') || '',
    medications: user?.medications?.join(', ') || '',
    conditions: user?.conditions?.join(', ') || '',
    emergencyContact: user?.emergencyContact || ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const updateData = {
        ...formData,
        allergies: formData.allergies.split(',').map(a => a.trim()).filter(Boolean),
        medications: formData.medications.split(',').map(m => m.trim()).filter(Boolean),
        conditions: formData.conditions.split(',').map(c => c.trim()).filter(Boolean)
      }

      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updateData)
      })

      const data = await response.json()

      if (data.success) {
        updateProfile(data.user)
        setSuccess('Profile updated successfully!')
        setIsEditing(false)
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError(data.message || 'Failed to update profile')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-[#111] border border-white/10 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        {success && (
          <div className="mx-4 mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <p className="text-emerald-400 text-sm">{success}</p>
          </div>
        )}
        {error && (
          <div className="mx-4 mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-6 overflow-y-auto max-h-[60vh]">
          {/* User Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-teal-500/20 rounded-full flex items-center justify-center">
              <span className="text-xl font-medium text-teal-400">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-white">{user?.name || 'User'}</h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Basic Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Information</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm disabled:opacity-60 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm disabled:opacity-60 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm disabled:opacity-60 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Medical Information</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm disabled:opacity-60 focus:outline-none focus:border-teal-500"
                >
                  <option value="">Select</option>
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
              <div>
                <label className="block text-xs text-gray-400 mb-1">Emergency Contact</label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm disabled:opacity-60 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Allergies</label>
              <input
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="e.g., Peanuts, Penicillin"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm disabled:opacity-60 focus:outline-none focus:border-teal-500 placeholder-gray-600"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Current Medications</label>
              <input
                type="text"
                name="medications"
                value={formData.medications}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="e.g., Aspirin, Metformin"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm disabled:opacity-60 focus:outline-none focus:border-teal-500 placeholder-gray-600"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Medical Conditions</label>
              <input
                type="text"
                name="conditions"
                value={formData.conditions}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="e.g., Diabetes, Hypertension"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm disabled:opacity-60 focus:outline-none focus:border-teal-500 placeholder-gray-600"
              />
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 transition-colors text-sm"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </>
                )}
              </button>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
