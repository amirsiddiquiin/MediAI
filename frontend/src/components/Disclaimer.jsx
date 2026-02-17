import { AlertTriangle } from 'lucide-react'

function Disclaimer() {
  return (
    <div className="flex items-center space-x-2 text-xs text-amber-400 bg-amber-900/20 border border-amber-800/50 rounded-lg px-3 py-2">
      <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-400" />
      <p className="leading-tight text-amber-200">
        <strong className="text-amber-300">Medical Disclaimer:</strong> This AI provides general information only. Always consult healthcare professionals for medical advice. Call emergency services for urgent care.
      </p>
    </div>
  )
}

export default Disclaimer
