import axios from 'axios'

export const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Bare instance for internal token-refresh calls — NO interceptors to avoid retry loops
export const refreshClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})
