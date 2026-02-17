import { Activity, FileText, Pill, Heart } from 'lucide-react'

const categories = [
  {
    id: 'symptoms',
    name: 'Symptom Analysis',
    description: 'Describe your symptoms',
    icon: Activity,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'disease',
    name: 'Disease Info',
    description: 'Learn about conditions',
    icon: FileText,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'medication',
    name: 'Medication Guide',
    description: 'Medicine information',
    icon: Pill,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'general',
    name: 'General Health',
    description: 'Health questions',
    icon: Heart,
    color: 'from-red-500 to-orange-500'
  }
]

function CategorySelector({ selectedCategory, onSelectCategory }) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Select Category
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = selectedCategory === category.id
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${isSelected 
                  ? 'border-medical-primary bg-blue-50 shadow-lg scale-105' 
                  : 'border-gray-200 bg-white hover:border-medical-primary hover:shadow-md'
                }
              `}
            >
              <div className={`
                inline-flex p-2 rounded-lg bg-gradient-to-br ${category.color} mb-2
              `}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">
                {category.name}
              </h4>
              <p className="text-xs text-gray-600">
                {category.description}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CategorySelector
