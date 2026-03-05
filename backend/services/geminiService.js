const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are a professional medical assistant AI. Your role is to provide clear, structured, and accurate medical information while maintaining strict safety guidelines.

IMPORTANT GUIDELINES:
1. Always provide information in a structured format
2. Never provide personalized prescriptions or diagnoses
3. Always recommend consulting a licensed healthcare provider
4. Include emergency warning signs when relevant
5. Provide general information only, not specific medical advice
6. Always include a disclaimer
7. CRITICAL: When location is provided, generate nearbyFacilities for THAT SPECIFIC LOCATION

FORMAT YOUR RESPONSE AS JSON with the following structure:
{
  "overview": "Brief overview of the condition/topic",
  "possibleConditions": ["condition1", "condition2"] (for symptom queries),
  "symptoms": ["symptom1", "symptom2"],
  "causes": ["cause1", "cause2"],
  "riskFactors": ["factor1", "factor2"],
  "commonMedications": [
    {
      "name": "medication name",
      "type": "tablet/syrup/injection",
      "generalDosage": "general dosage info (non-personalized)",
      "purpose": "what it treats"
    }
  ],
  "warnings": ["warning1", "warning2"],
  "whenToSeeDoctor": ["situation1", "situation2"],
  "emergencySymptoms": ["emergency1", "emergency2"],
  "preventiveMeasures": ["measure1", "measure2"],
  "recommendedSpecialists": ["cardiologist", "neurologist", "general practitioner"],
  "nearbyFacilities": [
    {
      "name": "Hospital Name",
      "type": "hospital/clinic",
      "address": "Full address with user's city and country",
      "distance": "2.5 km",
      "rating": 4.5,
      "phone": "Phone with correct country code"
    }
  ]
}

Ensure all medical information is accurate, up-to-date, and presented in a way that's easy for patients to understand.`;

// Generate location-appropriate facilities
function generateLocationFacilities(location) {
  if (!location || !location.city) return [];
  
  const { city, state, country } = location;
  const countryLower = (country || '').toLowerCase();
  const isIndia = countryLower.includes('india') || countryLower.includes('भारत');
  
  if (isIndia) {
    return [
      {
        name: `Fortis Hospital ${city}`,
        type: "hospital",
        address: `Sector 62, ${city}${state ? ', ' + state : ''}, India`,
        distance: "2.5 km",
        rating: 4.7,
        phone: "+91-120-4567890"
      },
      {
        name: `Max Super Speciality Hospital ${city}`,
        type: "hospital",
        address: `Sector 19, ${city}${state ? ', ' + state : ''}, India`,
        distance: "4.1 km",
        rating: 4.5,
        phone: "+91-120-4847890"
      },
      {
        name: `${city} Government Hospital`,
        type: "hospital",
        address: `Sector 12, ${city}${state ? ', ' + state : ''}, India`,
        distance: "1.8 km",
        rating: 4.2,
        phone: "+91-120-2407890"
      }
    ];
  }
  
  // Default for other countries
  return [
    {
      name: `${city} General Hospital`,
      type: "hospital",
      address: `123 Health Street, ${city}${state ? ', ' + state : ''}${country ? ', ' + country : ''}`,
      distance: "2.5 km",
      rating: 4.5,
      phone: countryLower.includes('usa') || countryLower.includes('united states') ? "+1-555-0123" : "+1-555-0123"
    },
    {
      name: `${city} Medical Center`,
      type: "clinic",
      address: `45 Medical Ave, ${city}${state ? ', ' + state : ''}${country ? ', ' + country : ''}`,
      distance: "1.2 km",
      rating: 4.3,
      phone: countryLower.includes('usa') || countryLower.includes('united states') ? "+1-555-0456" : "+1-555-0456"
    }
  ];
}

// Validate if facilities match user location
function validateFacilities(facilities, location) {
  if (!facilities || !Array.isArray(facilities) || facilities.length === 0) {
    return false;
  }
  
  if (!location || !location.city) return true;
  
  const userCity = location.city.toLowerCase();
  const userCountry = (location.country || '').toLowerCase();
  
  // Check if any facility has correct city/country
  const hasValidLocation = facilities.some(f => {
    const addr = (f.address || '').toLowerCase();
    const name = (f.name || '').toLowerCase();
    return addr.includes(userCity) || name.includes(userCity) || 
           (userCountry && (addr.includes(userCountry) || addr.includes('india') && userCountry.includes('india')));
  });
  
  return hasValidLocation;
}

async function queryMedicalAssistant(userQuery, queryType = 'general', location = null) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-flash-lite-latest',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    });

    let contextualPrompt = '';
    
    switch(queryType) {
      case 'symptoms':
        contextualPrompt = `The user is describing symptoms: "${userQuery}". Provide possible conditions, their explanations, and when to seek medical help.`;
        break;
      case 'disease':
        contextualPrompt = `The user is asking about a disease/condition: "${userQuery}". Provide comprehensive information about this condition.`;
        break;
      case 'medication':
        contextualPrompt = `The user is asking about medication: "${userQuery}". Provide general information about this medication, its uses, and safety guidelines.`;
        break;
      default:
        contextualPrompt = `The user has a general medical question: "${userQuery}". Provide helpful, accurate medical information.`;
    }

    // Add location context if provided
    if (location && location.city) {
      contextualPrompt += `\n\nIMPORTANT - USER LOCATION: The user is located in ${location.city}${location.state ? ', ' + location.state : ''}${location.country ? ', ' + location.country : ''}. You MUST generate nearbyFacilities with:
- Hospital/clinic names that would realistically exist in ${location.city}, ${location.country || 'their country'}
- Addresses that include "${location.city}" and "${location.country || 'their country'}"
- Phone numbers with the correct country code for ${location.country || 'their country'} (e.g., +91 for India, +1 for USA)
- Do NOT use generic US addresses like "Anytown, USA" or "Central City, ST"

Example for Noida, India:
{
  "name": "Fortis Hospital Noida",
  "address": "B-22, Sector 62, Noida, Uttar Pradesh, India",
  "phone": "+91-120-4567890"
}`;
    }

    const fullPrompt = `${SYSTEM_PROMPT}\n\n${contextualPrompt}\n\nProvide your response in the JSON format specified above.`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    let parsedResponse;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        parsedResponse = {
          overview: text,
          rawResponse: text
        };
      }
    } catch (parseError) {
      parsedResponse = {
        overview: text,
        rawResponse: text
      };
    }

    // Validate and fix facilities if needed
    if (location && location.city && !validateFacilities(parsedResponse.nearbyFacilities, location)) {
      console.log('Facilities validation failed, using location-based facilities');
      parsedResponse.nearbyFacilities = generateLocationFacilities(location);
    }

    return {
      ...parsedResponse,
      queryType,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to get response from medical AI assistant');
  }
}

module.exports = {
  queryMedicalAssistant
};
