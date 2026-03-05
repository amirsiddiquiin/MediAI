import { 
  AlertTriangle, 
  Info, 
  Pill, 
  AlertCircle, 
  Shield,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  MapPin,
  Phone,
  Star,
  User,
  Heart,
  Stethoscope
} from 'lucide-react'

function ResultDisplay({ result, loading }) {
  if (loading) return null
  if (!result) return null

  // Result is already the data object (overview, symptoms, etc.)
  const data = result

  // Check if there's any content to display
  const hasContent = data && (
    data.overview ||
    data.possibleConditions?.length > 0 ||
    data.symptoms?.length > 0 ||
    data.causes?.length > 0 ||
    data.riskFactors?.length > 0 ||
    data.commonMedications?.length > 0 ||
    data.warnings?.length > 0 ||
    data.emergencySymptoms?.length > 0 ||
    data.whenToSeeDoctor?.length > 0 ||
    data.preventiveMeasures?.length > 0 ||
    data.recommendedSpecialists?.length > 0 ||
    data.nearbyFacilities?.length > 0
  )

  if (!hasContent) return null

  return (
    <div className="space-y-4">
      {/* Overview - Primary Information */}
      {data.overview && (
        <div className="bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-teal-500/20 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-teal-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-white mb-2">Overview</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{data.overview}</p>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Alert - Show prominently if present */}
      {data.emergencySymptoms?.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-red-400 mb-3">Emergency Symptoms</h3>
              <div className="space-y-2">
                {data.emergencySymptoms.map((symptom, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-red-200">{symptom}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-red-400 font-medium bg-red-500/10 px-3 py-2 rounded-lg">
                ⚠️ Seek immediate medical attention if experiencing these symptoms
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Two Column Grid for Conditions & Symptoms */}
      {(data.possibleConditions?.length > 0 || data.symptoms?.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Possible Conditions */}
          {data.possibleConditions?.length > 0 && (
            <div className="bg-[#111] border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-semibold text-white">Possible Conditions</h3>
              </div>
              <div className="space-y-2">
                {data.possibleConditions.map((condition, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <span className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-xs font-medium text-purple-400">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-200">{condition}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Symptoms */}
          {data.symptoms?.length > 0 && (
            <div className="bg-[#111] border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-red-400" />
                <h3 className="text-sm font-semibold text-white">Common Symptoms</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.symptoms.map((symptom, index) => (
                  <span key={index} className="px-3 py-1.5 bg-red-500/10 text-red-300 border border-red-500/20 rounded-lg text-sm">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Causes & Risk Factors */}
      {(data.causes?.length > 0 || data.riskFactors?.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Causes */}
          {data.causes?.length > 0 && (
            <div className="bg-[#111] border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-semibold text-white">Causes</h3>
              </div>
              <ul className="space-y-2">
                {data.causes.map((cause, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                    {cause}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Risk Factors */}
          {data.riskFactors?.length > 0 && (
            <div className="bg-[#111] border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                <h3 className="text-sm font-semibold text-white">Risk Factors</h3>
              </div>
              <ul className="space-y-2">
                {data.riskFactors.map((factor, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                    <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Medications - Full Width */}
      {data.commonMedications?.length > 0 && (
        <div className="bg-[#111] border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Pill className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Common Medications</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.commonMedications.map((med, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-medium text-white">{med.name}</span>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                    {med.type}
                  </span>
                </div>
                {med.purpose && (
                  <p className="text-xs text-gray-400 mb-1">
                    <span className="text-gray-500">Purpose:</span> {med.purpose}
                  </p>
                )}
                {med.generalDosage && (
                  <p className="text-xs text-gray-400">
                    <span className="text-gray-500">Dosage:</span> {med.generalDosage}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warnings */}
      {data.warnings?.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-semibold text-amber-400">Important Warnings</h3>
          </div>
          <ul className="space-y-2">
            {data.warnings.map((warning, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* When to See Doctor & Preventive Measures */}
      {(data.whenToSeeDoctor?.length > 0 || data.preventiveMeasures?.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* When to See Doctor */}
          {data.whenToSeeDoctor?.length > 0 && (
            <div className="bg-[#111] border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Stethoscope className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-semibold text-white">When to See a Doctor</h3>
              </div>
              <ul className="space-y-2">
                {data.whenToSeeDoctor.map((situation, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    {situation}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Preventive Measures */}
          {data.preventiveMeasures?.length > 0 && (
            <div className="bg-[#111] border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-teal-400" />
                <h3 className="text-sm font-semibold text-white">Preventive Measures</h3>
              </div>
              <ul className="space-y-2">
                {data.preventiveMeasures.map((measure, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    {measure}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Recommended Specialists */}
      {data.recommendedSpecialists?.length > 0 && (
        <div className="bg-[#111] border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-semibold text-white">Recommended Specialists</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {data.recommendedSpecialists.map((specialist, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <User className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-200">{specialist}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nearby Facilities */}
      {data.nearbyFacilities?.length > 0 && (
        <div className="bg-[#111] border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Nearby Medical Facilities</h3>
          </div>
          <div className="space-y-3">
            {data.nearbyFacilities.map((facility, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-medium text-white">{facility.name}</h4>
                    <p className="text-xs text-gray-500 capitalize mt-0.5">{facility.type}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded">
                    <Star className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
                    <span className="text-xs text-amber-300 font-medium">{facility.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{facility.address}</span>
                    <span className="text-emerald-400 font-medium">• {facility.distance}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-400" />
                    <span>{facility.phone}</span>
                  </div>
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
