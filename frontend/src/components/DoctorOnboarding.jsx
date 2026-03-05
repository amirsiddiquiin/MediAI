import { useState } from 'react'
import { X, User, Mail, Phone, MapPin, GraduationCap, Award, Clock, DollarSign, Plus, Loader2, CheckCircle } from 'lucide-react'

const specialties = [
  'General Practitioner',
  'Cardiologist',
  'Neurologist',
  'Pediatrician',
  'Orthopedic',
  'Dermatologist',
  'Gynecologist',
  'Ophthalmologist',
  'ENT Specialist',
  'Psychiatrist',
  'Oncologist',
  'Pulmonologist',
  'Endocrinologist',
  'Gastroenterologist',
  'Nephrologist'
]

const consultationTypes = [
  'In-Person',
  'Video Consultation',
  'Phone Consultation',
  'Both In-Person & Online'
]

function DoctorOnboarding({ onClose }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    qualification: '',
    experience: '',
    consultationFee: '',
    consultationType: '',
    availability: '',
    clinicName: '',
    clinicAddress: '',
    city: '',
    state: '',
    about: '',
    languages: '',
    registrationNumber: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.specialty) newErrors.specialty = 'Specialty is required'
    if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required'
    if (!formData.experience) newErrors.experience = 'Experience is required'
    if (!formData.clinicName.trim()) newErrors.clinicName = 'Clinic/Hospital name is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await fetch('/api/medical/doctors/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        setErrors({ general: data.message || 'Registration failed' })
      }
    } catch (error) {
      setErrors({ general: 'Failed to submit registration. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-[#111] rounded-2xl border border-white/10 max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Registration Successful!</h2>
          <p className="text-gray-400 text-sm">
            Your profile has been submitted for verification. You will be notified once approved.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-[#111] rounded-2xl border border-white/10 max-w-2xl w-full my-8 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <h2 className="text-lg font-semibold text-white">Doctor Registration</h2>
            <p className="text-sm text-gray-400">Join our network of healthcare professionals</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
          {errors.general && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{errors.general}</p>
            </div>
          )}

          {/* Personal Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Dr. John Doe"
                    className={`w-full pl-10 pr-3 py-2.5 bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-lg text-white text-sm focus:outline-none focus:border-teal-500`}
                  />
                </div>
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="doctor@example.com"
                    className={`w-full pl-10 pr-3 py-2.5 bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-lg text-white text-sm focus:outline-none focus:border-teal-500`}
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Phone *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91-9876543210"
                    className={`w-full pl-10 pr-3 py-2.5 bg-white/5 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-lg text-white text-sm focus:outline-none focus:border-teal-500`}
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Medical Registration No. *</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="MCI/State Council Number"
                  className={`w-full px-3 py-2.5 bg-white/5 border ${errors.registrationNumber ? 'border-red-500/50' : 'border-white/10'} rounded-lg text-white text-sm focus:outline-none focus:border-teal-500`}
                />
                {errors.registrationNumber && <p className="text-red-400 text-xs mt-1">{errors.registrationNumber}</p>}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Specialty *</label>
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className={`w-full px-3 py-2.5 bg-white/5 border ${errors.specialty ? 'border-red-500/50' : 'border-white/10'} rounded-lg text-white text-sm focus:outline-none focus:border-teal-500`}
                >
                  <option value="">Select specialty</option>
                  {specialties.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
                {errors.specialty && <p className="text-red-400 text-xs mt-1">{errors.specialty}</p>}
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Qualification *</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="MBBS, MD, MS, etc."
                    className={`w-full pl-10 pr-3 py-2.5 bg-white/5 border ${errors.qualification ? 'border-red-500/50' : 'border-white/10'} rounded-lg text-white text-sm focus:outline-none focus:border-teal-500`}
                  />
                </div>
                {errors.qualification && <p className="text-red-400 text-xs mt-1">{errors.qualification}</p>}
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Experience (Years) *</label>
                <div className="relative">
                  <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="10"
                    min="0"
                    max="50"
                    className={`w-full pl-10 pr-3 py-2.5 bg-white/5 border ${errors.experience ? 'border-red-500/50' : 'border-white/10'} rounded-lg text-white text-sm focus:outline-none focus:border-teal-500`}
                  />
                </div>
                {errors.experience && <p className="text-red-400 text-xs mt-1">{errors.experience}</p>}
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Consultation Fee</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleChange}
                    placeholder="₹500 or $100"
                    className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Consultation Type</label>
                <select
                  name="consultationType"
                  value={formData.consultationType}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500"
                >
                  <option value="">Select type</option>
                  {consultationTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Availability</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    placeholder="Mon-Sat, 10AM-6PM"
                    className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Clinic Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Clinic/Hospital Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Clinic/Hospital Name *</label>
                <input
                  type="text"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={handleChange}
                  placeholder="City Medical Center"
                  className={`w-full px-3 py-2.5 bg-white/5 border ${errors.clinicName ? 'border-red-500/50' : 'border-white/10'} rounded-lg text-white text-sm focus:outline-none focus:border-teal-500`}
                />
                {errors.clinicName && <p className="text-red-400 text-xs mt-1">{errors.clinicName}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Clinic Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <textarea
                    name="clinicAddress"
                    value={formData.clinicAddress}
                    onChange={handleChange}
                    placeholder="Full address with landmark"
                    rows={2}
                    className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500 resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Mumbai"
                  className={`w-full px-3 py-2.5 bg-white/5 border ${errors.city ? 'border-red-500/50' : 'border-white/10'} rounded-lg text-white text-sm focus:outline-none focus:border-teal-500`}
                />
                {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Maharashtra"
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Additional Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Languages Spoken</label>
                <input
                  type="text"
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                  placeholder="English, Hindi, Marathi"
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">About</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Brief introduction about yourself, your expertise, and approach to patient care..."
                  rows={3}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 p-5 border-t border-white/10">
          <p className="text-xs text-gray-500">* Required fields</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Register
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorOnboarding
