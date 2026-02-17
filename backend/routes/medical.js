const express = require('express');
const router = express.Router();
const { queryMedicalAssistant } = require('../services/geminiService');

router.post('/query', async (req, res) => {
  try {
    const { query, queryType } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({ 
        error: 'Query is required',
        message: 'Please provide a valid medical query' 
      });
    }

    const response = await queryMedicalAssistant(query, queryType);
    
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

module.exports = router;
