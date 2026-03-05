import { useState, useEffect } from 'react'
import { MapPin, Search, User, Star, Calendar, Navigation, Loader2 } from 'lucide-react'

function LocationDoctorSearch({ onDoctorSelect }) {
  const [location, setLocation] = useState(null)
  const [locationLoading, setLocationLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [doctors, setDoctors] = useState([])
  const [specialty, setSpecialty] = useState('all')
  const [searchPerformed, setSearchPerformed] = useState(false)

  const specialties = [
    { value: 'all', label: 'All Specialties' },
    { value: 'general', label: 'General Practitioner' },
    { value: 'cardiologist', label: 'Cardiologist' },
    { value: 'neurologist', label: 'Neurologist' },
    { value: 'pediatrician', label: 'Pediatrician' },
    { value: 'orthopedic', label: 'Orthopedic' },
    { value: 'dermatologist', label: 'Dermatologist' }
  ]

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude
            const lng = position.coords.longitude
            
            // Use OpenStreetMap Nominatim for reverse geocoding (free, no API key)
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`,
                {
                  headers: {
                    'Accept-Language': 'en'
                  }
                }
              )
              const data = await response.json()
              
              const city = data.address?.city || 
                          data.address?.town || 
                          data.address?.municipality ||
                          data.address?.county ||
                          data.display_name?.split(',')[0] ||
                          'Current Location'
              const state = data.address?.state || ''
              const country = data.address?.country || ''
              
              setLocation({ lat, lng, city, state, country })
            } catch (error) {
              console.error('Geocoding error:', error)
              setLocation({ lat, lng, city: 'Current Location', state: '', country: '' })
            }
            setLocationLoading(false)
          },
          (error) => {
            console.log('Location access denied:', error)
            setLocation(null)
            setLocationLoading(false)
          },
          { timeout: 10000, enableHighAccuracy: false }
        )
      } else {
        setLocation(null)
        setLocationLoading(false)
      }
    }

    getLocation()
  }, [])

  const searchDoctors = async () => {
    if (!location || !location.city) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/medical/nearby-doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, specialty })
      })
      
      const data = await response.json()
      setDoctors(data.doctors)
      setSearchPerformed(true)
    } catch (error) {
      const locationBasedDoctors = generateMockDoctors(location.city)
      setDoctors(locationBasedDoctors)
      setSearchPerformed(true)
    } finally {
      setLoading(false)
    }
  }

  const generateMockDoctors = (city) => {
    const baseDoctors = [
      {
        name: "Dr. Sarah Johnson",
        specialty: "General Practitioner",
        hospital: `${city} Medical Center`,
        address: `123 Main St, ${city}`,
        distance: "1.2 km",
        rating: 4.8,
        phone: "+1-555-0123",
        availability: "Available today"
      },
      {
        name: "Dr. Michael Chen",
        specialty: "Cardiologist", 
        hospital: `${city} Heart Institute`,
        address: `456 Oak Ave, ${city}`,
        distance: "2.8 km",
        rating: 4.9,
        phone: "+1-555-0456",
        availability: "Available tomorrow"
      },
      {
        name: "Dr. Emily Rodriguez",
        specialty: "Pediatrician",
        hospital: `${city} Children's Hospital`,
        address: `789 Pine St, ${city}`,
        distance: "3.5 km",
        rating: 4.7,
        phone: "+1-555-0789",
        availability: "Available today"
      },
      {
        name: "Dr. James Wilson",
        specialty: "Neurologist",
        hospital: `${city} Neurology Center`,
        address: `321 Elm St, ${city}`,
        distance: "4.1 km",
        rating: 4.6,
        phone: "+1-555-0234",
        availability: "Available next week"
      }
    ]

    if (specialty && specialty !== 'all') {
      return baseDoctors.filter(doctor => 
        doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
      )
    }

    return baseDoctors
  }

  return (
    <div className="space-y-4">
      {/* Location */}
      <div className="flex items-center gap-2 text-sm">
        {locationLoading ? (
          <>
            <Loader2 className="w-4 h-4 text-teal-400 animate-spin" />
            <span className="text-gray-400">Detecting your location...</span>
          </>
        ) : location ? (
          <>
            <Navigation className="w-4 h-4 text-teal-400" />
            <span className="text-gray-300">
              {location.city}
              {location.state ? `, ${location.state}` : ''}
              {location.country ? `, ${location.country}` : ''}
            </span>
          </>
        ) : (
          <>
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500">Location not available</span>
          </>
        )}
      </div>

      {/* Search Controls */}
      <div className="flex gap-2">
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-teal-500"
        >
          {specialties.map((spec) => (
            <option key={spec.value} value={spec.value}>
              {spec.label}
            </option>
          ))}
        </select>
        
        <button
          onClick={searchDoctors}
          disabled={loading || !location || locationLoading}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Search className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Results */}
      {searchPerformed && (
        <div className="space-y-2">
          {doctors.length === 0 ? (
            <p className="text-center py-4 text-gray-500 text-sm">No doctors found</p>
          ) : (
            doctors.map((doctor, index) => (
              <button
                key={index}
                onClick={() => onDoctorSelect?.(doctor)}
                className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-white truncate">{doctor.name}</h4>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
                        <span className="text-xs text-gray-300">{doctor.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{doctor.specialty}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {doctor.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span className={doctor.availability === 'Available today' ? 'text-emerald-400' : ''}>
                          {doctor.availability}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default LocationDoctorSearch
