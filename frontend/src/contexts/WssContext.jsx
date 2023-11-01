import { createContext, useContext, useEffect, useState } from 'react'
import { wssRoute } from '../common/routes'
import { useAuthContext } from './AuthContext'

const WssContext = createContext({})

export const WssProvider = ({ children }) => {
  const [ws, setWs] = useState(null)
  const [chatUsers, setChatUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [messageHistoryArray, setMessageHistoryArray] = useState([])

  const { authUserId, authToken } = useAuthContext()

  const handleHistoryMessages = (ev) => {
    const { messages, messageType } = JSON.parse(ev.data)

    if (messages && messageType === 'HISTORY') {
      setMessageHistoryArray(messages)
    }
  }

  const handleNewMessage = (ev) => {
    const { message, messageType } = JSON.parse(ev.data)

    if (message && messageType === 'NEW_MESSAGE') {
      if (
        (message.authorId === authUserId &&
          message.recipientId === selectedUserId) ||
        (message.authorId === selectedUserId &&
          message.recipientId === authUserId)
      ) {
        setMessageHistoryArray((prev) => [...prev, message])
      }
    }
  }

  const handleInitConnection = (ev) => {
    const { chatUsers } = JSON.parse(ev.data)

    if (chatUsers) {
      setChatUsers(chatUsers)
    }
  }

  const connectToWs = () => {
    const wssAuthRoute = wssRoute + `?token=${authToken}`
    const wss = new WebSocket(wssAuthRoute)
    setWs(wss)

    wss.addEventListener('message', handleInitConnection)
    wss.addEventListener('message', handleHistoryMessages)
    wss.addEventListener('message', handleNewMessage)
    // wss.addEventListener('close', () => {
    //   console.log('Disconnected. Trying to reconnect...')
    //   setTimeout(() => {
    //     connectToWs()
    //   }, 1000)
    // })
  }

  useEffect(() => {
    if (!authToken) return

    const wssAuthRoute = wssRoute + `?token=${authToken}`
    const wss = new WebSocket(wssAuthRoute)
    setWs(wss)

    wss.addEventListener('message', handleInitConnection)

    return () => {
      wss.removeEventListener('message', handleInitConnection)
    }
  }, [authToken])

  useEffect(() => {
    if (!ws) return

    ws.addEventListener('message', handleHistoryMessages)
    ws.addEventListener('message', handleNewMessage)

    return () => {
      ws.removeEventListener('message', handleHistoryMessages)
      ws.removeEventListener('message', handleNewMessage)
    }
  }, [selectedUserId, authUserId, ws, authToken])

  useEffect(() => {
    if (!selectedUserId) return

    const messageObject = {
      messageType: 'HISTORY',
      authorId: authUserId,
      recipientId: selectedUserId,
    }

    ws.send(JSON.stringify(messageObject))
  }, [selectedUserId, authUserId, ws])

  return (
    <WssContext.Provider
      value={{
        ws,
        chatUsers,
        messageHistoryArray,
        selectedUserId,
        setSelectedUserId,
      }}
    >
      {children}
    </WssContext.Provider>
  )
}

export const useWssContext = () => {
  const context = useContext(WssContext)

  return context
}
