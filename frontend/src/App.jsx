import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/GlobalStyle'
import theme from './styles/theme'

import { Toast } from './services/toast'

import { AuthProvider } from './contexts/AuthContext'
import { Routes } from './routes'

const AppContainer = styled.div`
  height: 100%;
`

export const App = () => {
  return (
    <AppContainer>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthProvider>
          <Routes />
          <Toast />
        </AuthProvider>
      </ThemeProvider>
    </AppContainer>
  )
}
