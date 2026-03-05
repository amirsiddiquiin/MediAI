const express = require('express');
const router = express.Router();
const { queryMedicalAssistant } = require('../services/geminiService');

router.post('/query', async (req, res) => {
  try {
    const { query, queryType, location } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({ 
        error: 'Query is required',
        message: 'Please provide a valid medical query' 
      });
    }

    const response = await queryMedicalAssistant(query, queryType, location);
    
    res.json({
      success: true,
      data: response,
      disclaimer: 'This AI does not replace professional medical advice. Always consult a licensed healthcare provider for medical decisions.'
    });

  } catch (error) {
    console.error('Medical query error:', error);
    res.status(500).json({ 
      error: 'Failed to process medical query',
      message: error.message 
    });
  }
});

router.get('/categories', (req, res) => {
  res.json({
    categories: [
      {
        id: 'symptoms',
        name: 'Symptom Analysis',
        description: 'Describe your symptoms to get possible conditions',
        icon: '🩺'
      },
      {
        id: 'disease',
        name: 'Disease Information',
        description: 'Learn about specific diseases and conditions',
        icon: '📋'
      },
      {
        id: 'medication',
        name: 'Medication Guide',
        description: 'Get information about medications',
        icon: '💊'
      },
      {
        id: 'general',
        name: 'General Health',
        description: 'Ask general health-related questions',
        icon: '❤️'
      }
    ]
  });
});

// Location-based doctor search endpoint
router.post('/nearby-doctors', async (req, res) => {
  try {
    const { location, specialty } = req.body;

    if (!location || !location.city) {
      return res.status(400).json({ 
        error: 'Location is required',
        message: 'Please provide your location (city, state, country)' 
      });
    }

    // Generate location-aware doctors based on country
    const generateLocationDoctors = (city, state, country) => {
      const countryLower = (country || '').toLowerCase();
      const isIndia = countryLower.includes('india') || countryLower.includes('भारत');
      
      // Indian doctors for India
      if (isIndia) {
        const indianDoctors = [
          {
            name: "Dr. Rajesh Kumar",
            specialty: "General Practitioner",
            hospital: `${city} Government Hospital`,
            address: `Sector 18, ${city}${state ? ', ' + state : ''}, Uttar Pradesh`,
            distance: "1.2 km",
            rating: 4.8,
            phone: "+91-9876543210",
            availability: "Available today",
            coordinates: { lat: location.lat || 28.5355, lng: location.lng || 77.3910 }
          },
          {
            name: "Dr. Priya Sharma",
            specialty: "Cardiologist",
            hospital: `${city} Heart & Lung Institute`,
            address: `Sector 62, ${city}${state ? ', ' + state : ''}, Uttar Pradesh`,
            distance: "2.8 km",
            rating: 4.9,
            phone: "+91-9876543211",
            availability: "Available tomorrow",
            coordinates: { lat: location.lat || 28.5355, lng: location.lng || 77.3910 }
          },
          {
            name: "Dr. Amit Verma",
            specialty: "Pediatrician",
            hospital: `${city} Child Care Hospital`,
            address: `Sector 12, ${city}${state ? ', ' + state : ''}, Uttar Pradesh`,
            distance: "3.5 km",
            rating: 4.7,
            phone: "+91-9876543212",
            availability: "Available today",
            coordinates: { lat: location.lat || 28.5355, lng: location.lng || 77.3910 }
          },
          {
            name: "Dr. Sunita Gupta",
            specialty: "Neurologist",
            hospital: `${city} Neuro Sciences Centre`,
            address: `Sector 26, ${city}${state ? ', ' + state : ''}, Uttar Pradesh`,
            distance: "4.1 km",
            rating: 4.6,
            phone: "+91-9876543213",
            availability: "Available next week",
            coordinates: { lat: location.lat || 28.5355, lng: location.lng || 77.3910 }
          },
          {
            name: "Dr. Vikram Singh",
            specialty: "Dermatologist",
            hospital: `${city} Skin & Hair Clinic`,
            address: `Sector 15, ${city}${state ? ', ' + state : ''}, Uttar Pradesh`,
            distance: "1.8 km",
            rating: 4.7,
            phone: "+91-9876543214",
            availability: "Available today",
            coordinates: { lat: location.lat || 28.5355, lng: location.lng || 77.3910 }
          },
          {
            name: "Dr. Neha Kapoor",
            specialty: "Orthopedic",
            hospital: `${city} Bone & Joint Hospital`,
            address: `Sector 22, ${city}${state ? ', ' + state : ''}, Uttar Pradesh`,
            distance: "2.3 km",
            rating: 4.8,
            phone: "+91-9876543215",
            availability: "Available tomorrow",
            coordinates: { lat: location.lat || 28.5355, lng: location.lng || 77.3910 }
          }
        ];
        return indianDoctors;
      }

      // Default doctors for other countries
      const baseDoctors = [
        {
          name: "Dr. Sarah Johnson",
          specialty: "General Practitioner",
          hospital: `${city} Medical Center`,
          address: `123 Main St, ${city}${state ? ', ' + state : ''}${country ? ', ' + country : ''}`,
          distance: "1.2 km",
          rating: 4.8,
          phone: "+1-555-0123",
          availability: "Available today",
          coordinates: { lat: location.lat || 40.7128, lng: location.lng || -74.0060 }
        },
        {
          name: "Dr. Michael Chen",
          specialty: "Cardiologist",
          hospital: `${city} Heart Institute`,
          address: `456 Oak Ave, ${city}${state ? ', ' + state : ''}${country ? ', ' + country : ''}`,
          distance: "2.8 km",
          rating: 4.9,
          phone: "+1-555-0456",
          availability: "Available tomorrow",
          coordinates: { lat: location.lat || 40.7128, lng: location.lng || -74.0060 }
        },
        {
          name: "Dr. Emily Rodriguez",
          specialty: "Pediatrician",
          hospital: `${city} Children's Hospital`,
          address: `789 Pine St, ${city}${state ? ', ' + state : ''}${country ? ', ' + country : ''}`,
          distance: "3.5 km",
          rating: 4.7,
          phone: "+1-555-0789",
          availability: "Available today",
          coordinates: { lat: location.lat || 40.7128, lng: location.lng || -74.0060 }
        },
        {
          name: "Dr. James Wilson",
          specialty: "Neurologist",
          hospital: `${city} Neurology Center`,
          address: `321 Elm St, ${city}${state ? ', ' + state : ''}${country ? ', ' + country : ''}`,
          distance: "4.1 km",
          rating: 4.6,
          phone: "+1-555-0234",
          availability: "Available next week",
          coordinates: { lat: location.lat || 40.7128, lng: location.lng || -74.0060 }
        },
        {
          name: "Dr. Lisa Anderson",
          specialty: "Dermatologist",
          hospital: `${city} Skin Clinic`,
          address: `555 Elm St, ${city}${state ? ', ' + state : ''}${country ? ', ' + country : ''}`,
          distance: "1.8 km",
          rating: 4.7,
          phone: "+1-555-0987",
          availability: "Available today",
          coordinates: { lat: location.lat || 40.7128, lng: location.lng || -74.0060 }
        },
        {
          name: "Dr. Robert Martinez",
          specialty: "Orthopedic",
          hospital: `${city} Orthopedic Center`,
          address: `777 Oak Ave, ${city}${state ? ', ' + state : ''}${country ? ', ' + country : ''}`,
          distance: "2.3 km",
          rating: 4.8,
          phone: "+1-555-0321",
          availability: "Available tomorrow",
          coordinates: { lat: location.lat || 40.7128, lng: location.lng || -74.0060 }
        }
      ];

      return baseDoctors;
    };

    const mockDoctors = generateLocationDoctors(location.city, location.state || '', location.country || '');

    // Filter by specialty if provided
    let filteredDoctors = mockDoctors;
    if (specialty && specialty !== 'all') {
      filteredDoctors = mockDoctors.filter(doctor => 
        doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    }

    // Sort by distance
    filteredDoctors.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

    res.json({
      success: true,
      doctors: filteredDoctors,
      location: location
    });

  } catch (error) {
    console.error('Doctor search error:', error);
    res.status(500).json({ 
      error: 'Failed to search for doctors',
      message: error.message 
    });
  }
});

// In-memory doctor storage (replace with database in production)
let registeredDoctors = [];

// Doctor registration endpoint
router.post('/doctors/register', async (req, res) => {
  try {
    const doctorData = req.body;

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'specialty', 'qualification', 'clinicName', 'city', 'registrationNumber'];
    const missingFields = requiredFields.filter(field => !doctorData[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: `Please provide: ${missingFields.join(', ')}`
      });
    }

    // Check if email already registered
    const existingDoctor = registeredDoctors.find(d => d.email === doctorData.email);
    if (existingDoctor) {
      return res.status(400).json({
        error: 'Email already registered',
        message: 'A doctor with this email is already registered'
      });
    }

    // Create new doctor entry
    const newDoctor = {
      id: Date.now().toString(),
      ...doctorData,
      rating: 0,
      reviews: 0,
      status: 'pending', // pending, approved, rejected
      createdAt: new Date().toISOString()
    };

    registeredDoctors.push(newDoctor);

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully. Your profile is pending verification.',
      doctor: {
        id: newDoctor.id,
        name: newDoctor.name,
        specialty: newDoctor.specialty,
        status: newDoctor.status
      }
    });

  } catch (error) {
    console.error('Doctor registration error:', error);
    res.status(500).json({
      error: 'Registration failed',
      message: error.message
    });
  }
});

// Get all approved doctors
router.get('/doctors', async (req, res) => {
  try {
    // In production, fetch from database
    // For now, return mock doctors + registered approved doctors
    const approvedDoctors = registeredDoctors.filter(d => d.status === 'approved');

    // Mock doctors for demo
    const mockDoctors = [
      {
        id: '1',
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
        id: '2',
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
        id: '3',
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
        id: '4',
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
        id: '5',
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
        id: '6',
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
    ];

    res.json({
      success: true,
      doctors: [...mockDoctors, ...approvedDoctors]
    });

  } catch (error) {
    console.error('Fetch doctors error:', error);
    res.status(500).json({
      error: 'Failed to fetch doctors',
      message: error.message
    });
  }
});

module.exports = router;
