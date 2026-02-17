import { AlertTriangle } from 'lucide-react'

function Disclaimer() {
  return (
    <div className="card bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 mb-8">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-bold text-amber-900 mb-2">
            ⚕️ Important Medical Disclaimer
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            This AI assistant provides <strong>general medical information only</strong> and does not replace professional medical advice, diagnosis, or treatment. 
            Always consult with a qualified healthcare provider for any medical concerns. In case of emergency, call your local emergency services immediately.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Disclaimer
