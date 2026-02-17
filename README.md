# 🏥 MediAI - AI Medical Assistant

An intelligent healthcare assistant application powered by Google Gemini API that provides medical information, symptom analysis, disease information, and medication guidance.

![Medical Assistant](https://img.shields.io/badge/AI-Powered-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![Gemini](https://img.shields.io/badge/Google-Gemini%20API-orange)

## ✨ Features

### 🩺 Symptom Analysis
- Enter your symptoms and get AI-powered analysis
- Receive possible conditions based on symptoms
- Get detailed explanations for each condition
- Learn when to seek medical attention

### 📋 Disease Information
- Comprehensive information about diseases and conditions
- Detailed descriptions, causes, and symptoms
- Risk factors and preventive measures
- Evidence-based medical information

### 💊 Medication Guidance
- General information about medications
- Common uses and purposes
- General dosage guidelines (non-personalized)
- Important safety warnings and precautions

### ❤️ General Health Queries
- Ask general health-related questions
- Get preventive health advice
- Learn about healthy lifestyle practices
- Understand when to consult healthcare providers

### 🛡️ Safety Features
- Clear medical disclaimers on all responses
- Emergency symptom warnings
- "When to see a doctor" guidelines
- Non-diagnostic, informational approach
- Rate limiting to prevent abuse

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **Google Gemini API** - AI language model
- **Helmet** - Security middleware
- **Express Rate Limit** - API rate limiting
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
mediAI/
├── backend/                   # Backend Node.js/Express application
│   ├── routes/
│   │   └── medical.js        # Medical API routes
│   ├── services/
│   │   └── geminiService.js  # Gemini AI integration
│   ├── index.js              # Server entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/                  # Frontend React application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Header.jsx
│   │   │   ├── CategorySelector.jsx
│   │   │   ├── QueryForm.jsx
│   │   │   ├── ResultDisplay.jsx
│   │   │   ├── Disclaimer.jsx
│   │   │   └── Footer.jsx
│   │   ├── services/         # API services
│   │   │   └── api.js
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Google Gemini API Key** ([Get it here](https://makersuite.google.com/app/apikey))

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd ~/Desktop/mediAI
   ```

2. **Set up Backend:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```
   
   Edit `backend/.env` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   PORT=5000
   NODE_ENV=development
   ```

3. **Set up Frontend:**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   ```
   
   The `frontend/.env` should contain:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### 🔑 Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the generated API key
5. Paste it in your `backend/.env` file

## 🎯 Running the Application

### Option 1: Run Both Servers Separately (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd ~/Desktop/mediAI/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd ~/Desktop/mediAI/frontend
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

### Option 2: Run Backend Only
```bash
cd ~/Desktop/mediAI/backend
npm start
```

### Option 3: Run Frontend Only
```bash
cd ~/Desktop/mediAI/frontend
npm run dev
```

## 📖 Usage Guide

### 1. Select a Category
Choose from four categories:
- **Symptom Analysis** - Describe your symptoms
- **Disease Information** - Learn about specific conditions
- **Medication Guide** - Get medication information
- **General Health** - Ask general health questions

### 2. Enter Your Query
Type your medical question or describe your symptoms in detail.

**Example queries:**
- "I have fever, headache, and body pain for 3 days"
- "What is diabetes? What are its symptoms?"
- "Tell me about paracetamol and its uses"
- "How can I improve my immune system?"

### 3. Review the Response
The AI will provide structured information including:
- Overview of the condition/topic
- Possible conditions (for symptom queries)
- Symptoms and causes
- Risk factors
- Common medications with general dosage info
- Important warnings
- When to see a doctor
- Emergency symptoms
- Preventive measures

### 4. Important Reminders
- ⚠️ This is **informational only** - not a diagnosis
- 🏥 Always consult a healthcare provider for medical decisions
- 🚑 Call emergency services for urgent symptoms

## 🔒 Security Features

- **Rate Limiting**: Prevents API abuse (100 requests per 15 minutes)
- **Helmet.js**: Secures HTTP headers
- **CORS**: Configured for secure cross-origin requests
- **Input Validation**: Validates all user inputs
- **Error Handling**: Comprehensive error handling throughout

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional medical interface
- **Responsive**: Works on desktop, tablet, and mobile
- **Intuitive Navigation**: Easy category selection
- **Visual Feedback**: Loading states and animations
- **Color-Coded Information**: Different colors for warnings, medications, etc.
- **Accessibility**: Semantic HTML and ARIA labels

## 🧪 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status.

### Get Categories
```
GET /api/medical/categories
```
Returns available query categories.

### Query Medical Assistant
```
POST /api/medical/query
```
**Body:**
```json
{
  "query": "I have fever and headache",
  "queryType": "symptoms"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": "...",
    "possibleConditions": [...],
    "symptoms": [...],
    "causes": [...],
    "commonMedications": [...],
    "warnings": [...],
    "whenToSeeDoctor": [...],
    "emergencySymptoms": [...],
    "preventiveMeasures": [...]
  },
  "disclaimer": "..."
}
```

## 🔧 Configuration

### Backend Configuration
- **Port:** 5000 (configurable via `.env`)
- **Rate limit:** 100 requests per 15 minutes
- **CORS:** Enabled for all origins in development

### Frontend Configuration
- **Port:** 3000
- **Proxy:** API requests proxied to backend at localhost:5000

### Gemini AI Configuration
- **Model:** gemini-pro
- **Response format:** Structured JSON
- **Safety guidelines:** Built into system prompt

## 🌟 Future Enhancements

- [ ] Voice Input - Voice-based symptom description
- [ ] Multi-language Support - Support for multiple languages
- [ ] User Authentication - Save query history
- [ ] Doctor Appointment Booking - Integration with healthcare providers
- [ ] Wearable Integration - Connect with fitness trackers
- [ ] Medicine Reminder - Medication schedule tracking
- [ ] PDF Export - Download medical information as PDF
- [ ] Chat History - Save and review past queries

## ⚠️ Important Disclaimers

### Medical Disclaimer
This application provides general medical information only and is not intended to:
- Replace professional medical advice
- Provide medical diagnoses
- Recommend specific treatments
- Prescribe medications

**Always consult with a qualified healthcare provider for:**
- Medical diagnoses
- Treatment decisions
- Medication prescriptions
- Emergency medical situations

### AI Limitations
- AI responses are based on training data and may not reflect the latest medical research
- Individual medical conditions vary greatly
- AI cannot account for personal medical history
- Responses are general and not personalized

### Emergency Situations
**Call emergency services immediately if you experience:**
- Chest pain or pressure
- Difficulty breathing
- Severe bleeding
- Loss of consciousness
- Severe allergic reactions
- Stroke symptoms
- Any life-threatening condition

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Google Gemini API** for powering the AI responses
- **React** and **Vite** for the frontend framework
- **TailwindCSS** for the styling system
- **Lucide** for the beautiful icons
- Medical information guidelines from WHO and CDC

## 📧 Support

For questions or issues:
- Open an issue on GitHub
- Email: support@example.com

## 🔗 Links

- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/)

---

**Made with ❤️ for better healthcare accessibility**

**Remember: This tool is for information only. Always consult healthcare professionals for medical advice.**
