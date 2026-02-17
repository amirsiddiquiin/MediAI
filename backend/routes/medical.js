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

    // Generate location-aware mock doctors
    const generateLocationDoctors = (city, state) => {
      const cityLower = city.toLowerCase();
      const baseDoctors = [
        {
          name: "Dr. Sarah Johnson",
          specialty: "General Practitioner",
          hospital: `${city} Medical Center`,
          address: `123 Main St, ${city}, ${state}`,
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
          address: `456 Oak Ave, ${city}, ${state}`,
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
          address: `789 Pine St, ${city}, ${state}`,
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
          address: `321 Elm St, ${city}, ${state}`,
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
          address: "555 Elm St, " + `${city}, ${state}`,
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
          address: "777 Oak Ave, " + `${city}, ${state}`,
          distance: "2.3 km",
          rating: 4.8,
          phone: "+1-555-0321",
          availability: "Available tomorrow",
          coordinates: { lat: location.lat || 40.7128, lng: location.lng || -74.0060 }
        }
      ];

      return baseDoctors;
    };

    const mockDoctors = generateLocationDoctors(location.city, location.state || '');

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

module.exports = router;
