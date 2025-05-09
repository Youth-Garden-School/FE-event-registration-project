import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.request.use((cfg) => {
  // log request
  console.log('⮕ REQUEST:', `${cfg.baseURL}${cfg.url}`)
  // đính kèm token
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('ACCESS_TOKEN')
    : null
  if (token) {
    cfg.headers = {
      ...cfg.headers,
      Authorization: `Bearer ${token}`,
    }
  }
  console.log('⮕ HEADERS:', cfg.headers)
  return cfg
})

export default api
