import { 
  AlertTriangle, 
  Info, 
  Pill, 
  AlertCircle, 
  Shield,
  Activity,
  TrendingUp,
  Clock
} from 'lucide-react'

function ResultDisplay({ result, loading }) {
  if (loading) {
    return (
      <div className="card text-center py-12">
        <div className="loading-dots text-medical-primary mb-4">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className="text-gray-600">Analyzing your query...</p>
      </div>
    )
  }

  if (!result) return null

  const { data, disclaimer } = result

  return (
    <div className="space-y-6 animate-slide-up">
      {data.overview && (
        <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <Info className="w-6 h-6 text-medical-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Overview</h3>
              <p className="text-gray-700 leading-relaxed">{data.overview}</p>
            </div>
          </div>
        </div>
      )}

      {data.possibleConditions && data.possibleConditions.length > 0 && (
        <div className="card">
          <div className="flex items-start space-x-3 mb-4">
            <Activity className="w-6 h-6 text-purple-600 flex-shrink-0" />
            <h3 className="text-xl font-bold text-gray-800">Possible Conditions</h3>
          </div>
          <div className="space-y-2">
            {data.possibleConditions.map((condition, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg">
                <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <span className="text-gray-800">{condition}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.symptoms && data.symptoms.length > 0 && (
        <div className="card">
          <div className="flex items-start space-x-3 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <h3 className="text-xl font-bold text-gray-800">Common Symptoms</h3>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {data.symptoms.map((symptom, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <span className="text-gray-700">{symptom}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.causes && data.causes.length > 0 && (
        <div className="card">
          <div className="flex items-start space-x-3 mb-4">
            <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
            <h3 className="text-xl font-bold text-gray-800">Causes</h3>
          </div>
          <ul className="space-y-2">
            {data.causes.map((cause, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-orange-600 mt-1">•</span>
                <span className="text-gray-700">{cause}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.riskFactors && data.riskFactors.length > 0 && (
        <div className="card bg-yellow-50 border-yellow-200">
          <div className="flex items-start space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <h3 className="text-xl font-bold text-gray-800">Risk Factors</h3>
          </div>
          <ul className="space-y-2">
            {data.riskFactors.map((factor, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span className="text-gray-700">{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.commonMedications && data.commonMedications.length > 0 && (
        <div className="card bg-green-50 border-green-200">
          <div className="flex items-start space-x-3 mb-4">
            <Pill className="w-6 h-6 text-green-600 flex-shrink-0" />
            <h3 className="text-xl font-bold text-gray-800">Common Medications</h3>
          </div>
          <div className="space-y-4">
            {data.commonMedications.map((med, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-green-200">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-gray-800">{med.name}</h4>
                  <span className="badge badge-success">{med.type}</span>
                </div>
                {med.purpose && (
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Purpose:</strong> {med.purpose}
                  </p>
                )}
                {med.generalDosage && (
                  <p className="text-sm text-gray-600">
                    <strong>General Dosage:</strong> {med.generalDosage}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.warnings && data.warnings.length > 0 && (
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-start space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <h3 className="text-xl font-bold text-gray-800">Important Warnings</h3>
          </div>
          <ul className="space-y-2">
            {data.warnings.map((warning, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-red-600 mt-1">⚠️</span>
                <span className="text-gray-700 font-medium">{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.emergencySymptoms && data.emergencySymptoms.length > 0 && (
        <div className="card bg-red-100 border-red-300">
          <div className="flex items-start space-x-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-700 flex-shrink-0" />
            <h3 className="text-xl font-bold text-red-800">🚨 Emergency Symptoms - Seek Immediate Help</h3>
          </div>
          <ul className="space-y-2">
            {data.emergencySymptoms.map((symptom, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-red-700 mt-1 font-bold">🚑</span>
                <span className="text-red-800 font-semibold">{symptom}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.whenToSeeDoctor && data.whenToSeeDoctor.length > 0 && (
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3 mb-4">
            <Clock className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <h3 className="text-xl font-bold text-gray-800">When to See a Doctor</h3>
          </div>
          <ul className="space-y-2">
            {data.whenToSeeDoctor.map((situation, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">👨‍⚕️</span>
                <span className="text-gray-700">{situation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.preventiveMeasures && data.preventiveMeasures.length > 0 && (
        <div className="card bg-teal-50 border-teal-200">
          <div className="flex items-start space-x-3 mb-4">
            <Shield className="w-6 h-6 text-teal-600 flex-shrink-0" />
            <h3 className="text-xl font-bold text-gray-800">Preventive Measures</h3>
          </div>
          <ul className="space-y-2">
            {data.preventiveMeasures.map((measure, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-teal-600 mt-1">✓</span>
                <span className="text-gray-700">{measure}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="card bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-red-800 mb-2">Medical Disclaimer</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {disclaimer}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultDisplay
