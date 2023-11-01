import { BrowserRouter } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

import { Blank } from '../pages/Blank'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export const Routes = () => {
  const { authToken, loadingAuthInfo } = useAuthContext()

  if (loadingAuthInfo) {
    return <Blank />
  }

  return (
    <BrowserRouter>{authToken ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>
  )
}
