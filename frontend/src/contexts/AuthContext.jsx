import { createContext, useContext, useEffect, useState } from 'react'
import { routes } from '../common/routes'
import {
  api,
  removeApiHeaderAuthorization,
  setApiHeaderAuthorization,
} from '../services/api'
import { axiosErrorHandler } from '../utils/axiosErrorHandler'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [authObject, setAuthObject] = useState({})
  const [loadingAuthInfo, setLoadingAuthInfo] = useState(false)

  const setLoginInfo = (token, userId, username) => {
    setAuthObject({ token, userId, username })
    storeTokenInLocalStorage(token)
    setApiHeaderAuthorization(token)
  }

  const clearLoginInfo = () => {
    setAuthObject({})
    removeTokenFromLocalStorage()
    removeApiHeaderAuthorization()
  }

  const storeTokenInLocalStorage = (token) => {
    localStorage.setItem('@chat-app', token)
  }

  const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('@chat-app')
  }

  const refreshLogin = () => {
    const token = localStorage.getItem('@chat-app')

    if (!token || token === 'undefined') {
      clearLoginInfo()
      return
    }
    setApiHeaderAuthorization(token)

    setLoadingAuthInfo(true)
    // validate and refresh token
    api
      .get(routes.refresh)
      .then((resp) => {
        const { token: refreshedToken, userId, username } = resp.data
        setLoginInfo(refreshedToken, userId, username)
      })
      .catch()
      .finally(() => {
        setLoadingAuthInfo(false)
      })
  }

  const login = ({ email, password }) => {
    setLoadingAuthInfo(true)

    api
      .post(routes.sessions, { email, password })
      .then((resp) => {
        const { token, userId, username } = resp.data
        setLoginInfo(token, userId, username)
      })
      .catch(axiosErrorHandler)
      .finally(() => {
        setLoadingAuthInfo(false)
      })
  }

  const logout = () => {
    clearLoginInfo()
  }

  useEffect(() => {
    refreshLogin()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        authToken: authObject.token,
        authUserId: authObject.userId,
        authUsername: authObject.username,
        loadingAuthInfo,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  return context
}
