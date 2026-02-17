import { useState, useEffect } from 'react'
import { MapPin, Search, User, Phone, Star, Calendar, ChevronRight } from 'lucide-react'

function LocationDoctorSearch({ onDoctorSelect }) {
  const [location, setLocation] = useState(null)
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
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Reverse geocoding to get city name (in real app, you'd use a geocoding API)
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          // For demo purposes, let's set a default city based on coordinates
          // In a real app, you'd use Google Maps Geocoding API
          let city = 'Current Location';
          let state = '';
          let country = '';
          
          // Simple coordinate-based city detection (for demo)
          if (lat > 40.7 && lat < 40.8 && lng > -74.1 && lng < -73.9) {
            city = 'New York';
            state = 'NY';
            country = 'USA';
          } else if (lat > 34.0 && lat < 34.2 && lng > -118.5 && lng < -118.2) {
            city = 'Los Angeles';
            state = 'CA';
            country = 'USA';
          } else if (lat > 41.8 && lat < 42.0 && lng > -87.7 && lng < -87.6) {
            city = 'Chicago';
            state = 'IL';
            country = 'USA';
          } else {
            city = 'Current Location';
          }
          
          setLocation({
            lat: lat,
            lng: lng,
            city: city,
            state: state,
            country: country
          });
        },
        (error) => {
          console.log('Location access denied:', error)
          // Set default location based on user preference or IP
          setLocation({
            lat: 40.7128,
            lng: -74.0060,
            city: 'New York',
            state: 'NY',
            country: 'USA'
          })
        }
      )
    } else {
      // Browser doesn't support geolocation
      setLocation({
        lat: 40.7128,
        lng: -74.0060,
        city: 'New York',
        state: 'NY',
        country: 'USA'
      })
    }
  }, [])

  const searchDoctors = async () => {
    if (!location || !location.city) {
      alert('Please enable location access or set your location manually')
      return
    }

    setLoading(true)
    try {
      // Call your backend API
      const response = await fetch('/api/medical/nearby-doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: location,
          specialty: specialty
        })
      })
      
      const data = await response.json()
      setDoctors(data.doctors)
      setSearchPerformed(true)
    } catch (error) {
      console.error('Error searching doctors:', error)
      // Use location-aware mock data if API fails
      const locationBasedDoctors = generateMockDoctors(location.city)
      setDoctors(locationBasedDoctors)
      setSearchPerformed(true)
    } finally {
      setLoading(false)
    }
  }

  // Generate location-aware mock doctors
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
    ];

    // Filter by specialty if needed
    if (specialty && specialty !== 'all') {
      return baseDoctors.filter(doctor => 
        doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    }

    return baseDoctors;
  }

  return (
    <div className="space-y-6">
      {/* Location Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-zinc-800">
        <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
          <MapPin className="w-3 h-3 text-white" />
        </div>
        <span className="text-sm text-zinc-300">Find Doctors Near You</span>
      </div>

      {/* Location Info */}
      <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
        <div className="flex items-center space-x-3">
          <MapPin className="w-4 h-4 text-zinc-400" />
          <div>
            <p className="text-sm text-zinc-200">
              {location ? `${location.city}${location.state ? ', ' + location.state : ''}${location.country ? ', ' + location.country : ''}` : 'Detecting location...'}
            </p>
            <p className="text-xs text-zinc-500">Based on your current location</p>
          </div>
        </div>
      </div>

      {/* Search Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          {specialties.map((spec) => (
            <option key={spec.value} value={spec.value}>
              {spec.label}
            </option>
          ))}
        </select>
        
        <button
          onClick={searchDoctors}
          disabled={loading || !location}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent border-r-transparent animate-spin"></div>
              <span>Searching...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Search Doctors</span>
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {searchPerformed && (
        <div className="space-y-4">
          {doctors.length === 0 ? (
            <div className="text-center py-8 text-zinc-400">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-zinc-500" />
              <p className="text-sm">No doctors found matching your criteria</p>
            </div>
          ) : (
            <div className="space-y-3">
              {doctors.map((doctor, index) => (
                <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all cursor-pointer" onClick={() => onDoctorSelect && onDoctorSelect(doctor)}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-grow">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{doctor.name}</h4>
                          <p className="text-xs text-zinc-400">{doctor.specialty}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                        <span className="text-sm text-zinc-300">{doctor.rating}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-xs text-zinc-400">
                        <div className="w-4 h-4 bg-zinc-700 rounded flex items-center justify-center">
                          <MapPin className="w-2 h-2 text-zinc-400" />
                        </div>
                        <span>{doctor.hospital}</span>
                        <span className="text-green-400">• {doctor.distance}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-zinc-400">
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{doctor.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span className={doctor.availability === 'Available today' ? 'text-green-400' : 'text-zinc-400'}>
                            {doctor.availability}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-3 border-t border-zinc-800">
                      <ChevronRight className="w-4 h-4 text-zinc-400" />
                      <span className="text-xs text-zinc-400">Click for details</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default LocationDoctorSearch
