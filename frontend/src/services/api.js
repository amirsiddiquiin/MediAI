import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const queryMedicalAssistant = async (query, queryType = 'general') => {
  try {
    const response = await api.post('/medical/query', {
      query,
      queryType,
    })
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to get response from server')
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.')
    } else {
      throw new Error('Failed to send request. Please try again.')
    }
  }
}

export const getCategories = async () => {
  try {
    const response = await api.get('/medical/categories')
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch categories')
  }
}

export const checkHealth = async () => {
  try {
    const response = await api.get('/health')
    return response.data
  } catch (error) {
    throw new Error('Server is not responding')
  }
}

export default api
