import { Route, Routes } from 'react-router-dom'

import { WssProvider } from '../contexts/WssContext'
import { Chat } from '../pages/Chat'

export const AppRoutes = () => {
  const ChatElement = (
    <WssProvider>
      <Chat />
    </WssProvider>
  )

  return (
    <Routes>
      <Route path="/" element={ChatElement} />
    </Routes>
  )
}
