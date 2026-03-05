import { useState, useEffect } from 'react'
import { Search, MapPin, Star, Clock, Phone, ChevronRight, Filter, X, Loader2 } from 'lucide-react'

const specialties = [
  { value: 'all', label: 'All Specialties' },
  { value: 'General Practitioner', label: 'General Practitioner' },
  { value: 'Cardiologist', label: 'Cardiologist' },
  { value: 'Neurologist', label: 'Neurologist' },
  { value: 'Pediatrician', label: 'Pediatrician' },
  { value: 'Orthopedic', label: 'Orthopedic' },
  { value: 'Dermatologist', label: 'Dermatologist' },
  { value: 'Gynecologist', label: 'Gynecologist' },
  { value: 'Ophthalmologist', label: 'Ophthalmologist' },
  { value: 'ENT Specialist', label: 'ENT Specialist' },
  { value: 'Psychiatrist', label: 'Psychiatrist' }
]

function DoctorListing({ onSelectDoctor }) {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/medical/doctors')
      const data = await response.json()
      setDoctors(data.doctors || [])
    } catch (error) {
      console.error('Failed to fetch doctors:', error)
      // Use mock data if API fails
      setDoctors(getMockDoctors())
    } finally {
      setLoading(false)
    }
  }

  const getMockDoctors = () => [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      specialty: 'General Practitioner',
      qualification: 'MBBS, MD',
      experience: 15,
      rating: 4.8,
      reviews: 234,
      clinicName: 'Kumar Healthcare Clinic',
      city: 'Noida',
      state: 'Uttar Pradesh',
      consultationFee: '₹500',
      consultationType: 'In-Person & Online',
      availability: 'Mon-Sat, 10AM-6PM',
      phone: '+91-9876543210',
      languages: ['English', 'Hindi'],
      about: 'Experienced general practitioner specializing in primary care and preventive medicine.'
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      specialty: 'Cardiologist',
      qualification: 'MBBS, MD, DM Cardiology',
      experience: 12,
      rating: 4.9,
      reviews: 189,
      clinicName: 'Fortis Hospital Noida',
      city: 'Noida',
      state: 'Uttar Pradesh',
      consultationFee: '₹1000',
      consultationType: 'In-Person',
      availability: 'Mon-Fri, 9AM-5PM',
      phone: '+91-9876543211',
      languages: ['English', 'Hindi'],
      about: 'Senior cardiologist with expertise in interventional cardiology and heart disease management.'
    },
    {
      id: 3,
      name: 'Dr. Amit Verma',
      specialty: 'Pediatrician',
      qualification: 'MBBS, DCH',
      experience: 10,
      rating: 4.7,
      reviews: 156,
      clinicName: 'Child Care Hospital',
      city: 'Noida',
      state: 'Uttar Pradesh',
      consultationFee: '₹600',
      consultationType: 'In-Person & Online',
      availability: 'Mon-Sat, 10AM-8PM',
      phone: '+91-9876543212',
      languages: ['English', 'Hindi'],
      about: 'Dedicated pediatrician focused on child health, growth, and development.'
    },
    {
      id: 4,
      name: 'Dr. Sunita Gupta',
      specialty: 'Dermatologist',
      qualification: 'MBBS, MD Dermatology',
      experience: 8,
      rating: 4.6,
      reviews: 98,
      clinicName: 'Skin & Hair Clinic',
      city: 'Noida',
      state: 'Uttar Pradesh',
      consultationFee: '₹700',
      consultationType: 'In-Person',
      availability: 'Tue-Sat, 11AM-7PM',
      phone: '+91-9876543213',
      languages: ['English', 'Hindi'],
      about: 'Expert dermatologist specializing in skin conditions, cosmetic procedures, and hair treatments.'
    },
    {
      id: 5,
      name: 'Dr. Vikram Singh',
      specialty: 'Orthopedic',
      qualification: 'MBBS, MS Orthopedics',
      experience: 18,
      rating: 4.8,
      reviews: 267,
      clinicName: 'Bone & Joint Hospital',
      city: 'Noida',
      state: 'Uttar Pradesh',
      consultationFee: '₹800',
      consultationType: 'In-Person',
      availability: 'Mon-Sat, 9AM-4PM',
      phone: '+91-9876543214',
      languages: ['English', 'Hindi'],
      about: 'Experienced orthopedic surgeon specializing in joint replacements and sports medicine.'
    },
    {
      id: 6,
      name: 'Dr. Neha Kapoor',
      specialty: 'Gynecologist',
      qualification: 'MBBS, MS Obstetrics',
      experience: 14,
      rating: 4.9,
      reviews: 312,
      clinicName: "Women's Health Center",
      city: 'Noida',
      state: 'Uttar Pradesh',
      consultationFee: '₹700',
      consultationType: 'In-Person & Online',
      availability: 'Mon-Fri, 10AM-6PM',
      phone: '+91-9876543215',
      languages: ['English', 'Hindi'],
      about: 'Specialized in women health, pregnancy care, and reproductive medicine.'
    }
  ]

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.city.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  const handleViewProfile = (doctor) => {
    setSelectedDoctor(doctor)
  }

  return (
    <div className="space-y-4">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, specialty, or city..."
            className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="pl-10 pr-8 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500 appearance-none cursor-pointer"
          >
            {specialties.map(spec => (
              <option key={spec.value} value={spec.value}>{spec.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-xs text-gray-500">
        {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
      </p>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-teal-400 animate-spin" />
        </div>
      )}

      {/* Doctor Cards */}
      {!loading && (
        <div className="space-y-3">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">No doctors found matching your criteria</p>
            </div>
          ) : (
            filteredDoctors.map(doctor => (
              <div
                key={doctor.id}
                className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => handleViewProfile(doctor)}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-medium text-teal-400">
                      {doctor.name.charAt(4)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-white">{doctor.name}</h4>
                        <p className="text-sm text-teal-400">{doctor.specialty}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded">
                        <Star className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
                        <span className="text-xs text-amber-300 font-medium">{doctor.rating}</span>
                        <span className="text-xs text-gray-500">({doctor.reviews})</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {doctor.city}, {doctor.state}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {doctor.availability}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">{doctor.qualification}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{doctor.experience} yrs exp</span>
                      </div>
                      <span className="text-sm font-medium text-teal-400">{doctor.consultationFee}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#111] rounded-2xl border border-white/10 max-w-lg w-full my-8 max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="relative p-5 border-b border-white/10">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-medium text-teal-400">
                    {selectedDoctor.name.charAt(4)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{selectedDoctor.name}</h3>
                  <p className="text-teal-400">{selectedDoctor.specialty}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400" fill="currentColor" />
                      <span className="text-sm text-amber-300 font-medium">{selectedDoctor.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({selectedDoctor.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-500">Experience</p>
                  <p className="text-sm font-medium text-white">{selectedDoctor.experience} Years</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-500">Consultation Fee</p>
                  <p className="text-sm font-medium text-teal-400">{selectedDoctor.consultationFee}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Qualification</p>
                  <p className="text-sm text-gray-300">{selectedDoctor.qualification}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Clinic/Hospital</p>
                  <p className="text-sm text-gray-300">{selectedDoctor.clinicName}</p>
                  <p className="text-xs text-gray-500">{selectedDoctor.city}, {selectedDoctor.state}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Consultation Type</p>
                  <p className="text-sm text-gray-300">{selectedDoctor.consultationType}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Availability</p>
                  <p className="text-sm text-gray-300">{selectedDoctor.availability}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Languages</p>
                  <p className="text-sm text-gray-300">{selectedDoctor.languages?.join(', ')}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">About</p>
                  <p className="text-sm text-gray-300">{selectedDoctor.about}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-white/10 flex gap-3">
              <a
                href={`tel:${selectedDoctor.phone}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
              <button
                onClick={() => {
                  onSelectDoctor?.(selectedDoctor)
                  setSelectedDoctor(null)
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm"
              >
                <ChevronRight className="w-4 h-4" />
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorListing
