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
  "preventiveMeasures": ["measure1", "measure2"]
}

Ensure all medical information is accurate, up-to-date, and presented in a way that's easy for patients to understand.`;

async function queryMedicalAssistant(userQuery, queryType = 'general') {
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
