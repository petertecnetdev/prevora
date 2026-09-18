import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.petertecnet.com.br/api',
  timeout: 12000,
  headers: {
    Accept: 'application/json',
    'X-App-Slug': import.meta.env.VITE_APP_SLUG || 'prevora',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('prevora_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
