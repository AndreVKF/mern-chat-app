import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})

export const setApiHeaderAuthorization = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const removeApiHeaderAuthorization = () => {
  delete api.defaults.headers.common.Authorization
}
