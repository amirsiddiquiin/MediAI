import { 
  AlertTriangle, 
  Info, 
  Pill, 
  AlertCircle, 
  Shield,
  Activity,
  TrendingUp,
  Clock,
  Brain,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Phone,
  Star,
  User,
  Calendar
} from 'lucide-react'

function ResultDisplay({ result, loading }) {
  if (loading) {
    return null // Loading is handled in App.jsx
  }

  if (!result) return null

  const { data, disclaimer } = result

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Clean Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-zinc-800">
        <div className="w-6 h-6 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
          <Brain className="w-3 h-3 text-white" />
        </div>
        <span className="text-sm text-zinc-400">Medical Analysis</span>
      </div>

      {/* Overview Section */}
      {data.overview && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-blue-500/20 rounded flex items-center justify-center">
              <Info className="w-3 h-3 text-blue-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-300">Overview</h3>
          </div>
          <div className="pl-7">
            <p className="text-zinc-200 leading-relaxed text-sm">{data.overview}</p>
          </div>
        </div>
      )}

      {/* Possible Conditions */}
      {data.possibleConditions && data.possibleConditions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-purple-500/20 rounded flex items-center justify-center">
              <Activity className="w-3 h-3 text-purple-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-300">Possible Conditions</h3>
          </div>
          <div className="space-y-2 pl-7">
            {data.possibleConditions.map((condition, index) => (
              <div key={index} className="flex items-center space-x-3 py-2 group">
                <div className="w-6 h-6 bg-purple-500/10 rounded-full flex items-center justify-center text-xs text-purple-400 font-medium">
                  {index + 1}
                </div>
                <span className="text-zinc-200 text-sm group-hover:text-zinc-100 transition-colors">{condition}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Symptoms */}
      {data.symptoms && data.symptoms.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-blue-500/20 rounded flex items-center justify-center">
              <TrendingUp className="w-3 h-3 text-blue-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-300">Common Symptoms</h3>
          </div>
          <div className="grid grid-cols-1 gap-2 pl-7">
            {data.symptoms.map((symptom, index) => (
              <div key={index} className="flex items-center space-x-2 py-1">
                <ChevronRight className="w-3 h-3 text-blue-400" />
                <span className="text-zinc-200 text-sm">{symptom}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Causes */}
      {data.causes && data.causes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-orange-500/20 rounded flex items-center justify-center">
              <AlertCircle className="w-3 h-3 text-orange-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-300">Causes</h3>
          </div>
          <div className="space-y-2 pl-7">
            {data.causes.map((cause, index) => (
              <div key={index} className="flex items-start space-x-2 py-1">
                <span className="text-orange-400 mt-1 text-sm">•</span>
                <span className="text-zinc-200 text-sm">{cause}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risk Factors */}
      {data.riskFactors && data.riskFactors.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-yellow-500/20 rounded flex items-center justify-center">
              <AlertTriangle className="w-3 h-3 text-yellow-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-300">Risk Factors</h3>
          </div>
          <div className="space-y-2 pl-7">
            {data.riskFactors.map((factor, index) => (
              <div key={index} className="flex items-center space-x-2 py-1">
                <span className="text-yellow-400 mt-1 text-sm">⚠</span>
                <span className="text-zinc-200 text-sm">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Medications */}
      {data.commonMedications && data.commonMedications.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-green-500/20 rounded flex items-center justify-center">
              <Pill className="w-3 h-3 text-green-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-300">Common Medications</h3>
          </div>
          <div className="space-y-4 pl-7">
            {data.commonMedications.map((med, index) => (
              <div key={index} className="space-y-2 pb-3 border-b border-zinc-800/50 last:border-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-zinc-100 text-sm">{med.name}</span>
                  <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">{med.type}</span>
                </div>
                {med.purpose && (
                  <p className="text-xs text-zinc-400">
                    <span className="text-zinc-500">Purpose:</span> {med.purpose}
                  </p>
                )}
                {med.generalDosage && (
                  <p className="text-xs text-zinc-400">
                    <span className="text-zinc-500">Dosage:</span> {med.generalDosage}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warnings */}
      {data.warnings && data.warnings.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-red-500/20 rounded flex items-center justify-center">
              <AlertTriangle className="w-3 h-3 text-red-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-300">Important Warnings</h3>
          </div>
          <div className="space-y-2 pl-7">
            {data.warnings.map((warning, index) => (
              <div key={index} className="flex items-start space-x-2 py-2">
                <CheckCircle2 className="w-3 h-3 text-red-400 mt-0.5" />
                <span className="text-zinc-200 text-sm">{warning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emergency Symptoms */}
      {data.emergencySymptoms && data.emergencySymptoms.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-red-500/20 rounded flex items-center justify-center animate-pulse">
              <AlertCircle className="w-3 h-3 text-red-400" />
            </div>
            <h3 className="text-sm font-medium text-red-400">Emergency Symptoms</h3>
          </div>
          <div className="space-y-2 pl-7">
            {data.emergencySymptoms.map((symptom, index) => (
              <div key={index} className="flex items-start space-x-2 py-2">
                <span className="text-red-400 mt-0.5 text-sm font-bold">🚑</span>
                <span className="text-red-200 text-sm font-medium">{symptom}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* When to See Doctor */}
      {data.whenToSeeDoctor && data.whenToSeeDoctor.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-blue-500/20 rounded flex items-center justify-center">
              <Clock className="w-3 h-3 text-blue-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-300">When to See a Doctor</h3>
          </div>
          <div className="space-y-2 pl-7">
            {data.whenToSeeDoctor.map((situation, index) => (
              <div key={index} className="flex items-start space-x-2 py-2">
                <span className="text-blue-400 mt-0.5 text-sm">👨‍⚕️</span>
                <span className="text-zinc-200 text-sm">{situation}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preventive Measures */}
      {data.preventiveMeasures && data.preventiveMeasures.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-teal-500/20 rounded flex items-center justify-center">
              <Shield className="w-3 h-3 text-teal-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-300">Preventive Measures</h3>
          </div>
          <div className="space-y-2 pl-7">
            {data.preventiveMeasures.map((measure, index) => (
              <div key={index} className="flex items-start space-x-2 py-2">
                <CheckCircle2 className="w-3 h-3 text-teal-400 mt-0.5" />
                <span className="text-zinc-200 text-sm">{measure}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Specialists */}
      {data.recommendedSpecialists && data.recommendedSpecialists.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-indigo-500/20 rounded flex items-center justify-center">
              <User className="w-3 h-3 text-indigo-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-300">Recommended Specialists</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-7">
            {data.recommendedSpecialists.map((specialist, index) => (
              <div key={index} className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50 hover:bg-zinc-800/70 transition-all">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-zinc-100 text-sm">{specialist}</h4>
                    <p className="text-xs text-zinc-400">Medical Specialist</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nearby Facilities */}
      {data.nearbyFacilities && data.nearbyFacilities.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-green-500/20 rounded flex items-center justify-center">
              <MapPin className="w-3 h-3 text-green-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-300">Nearby Medical Facilities</h3>
          </div>
          <div className="space-y-3 pl-7">
            {data.nearbyFacilities.map((facility, index) => (
              <div key={index} className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50 hover:bg-zinc-800/70 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-grow">
                    <h4 className="font-medium text-zinc-100 text-sm">{facility.name}</h4>
                    <p className="text-xs text-zinc-400 capitalize">{facility.type}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    <span className="text-xs text-zinc-300">{facility.rating}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-zinc-400">
                    <MapPin className="w-3 h-3" />
                    <span>{facility.address}</span>
                    <span className="text-green-400">• {facility.distance}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-zinc-400">
                    <div className="flex items-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span>{facility.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2 border-t border-zinc-700/50">
                  <button className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs hover:bg-green-500/30 transition-colors">
                    Get Directions
                  </button>
                  <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs hover:bg-blue-500/30 transition-colors">
                    Call Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ResultDisplay
