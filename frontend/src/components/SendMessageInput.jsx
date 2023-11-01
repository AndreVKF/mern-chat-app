import styled from 'styled-components'
import { InputWithRef } from './InputWithRef'

import { PaperPlaneRight } from 'phosphor-react'
import { useRef } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { useWssContext } from '../contexts/WssContext'

const SendMessageInputContainer = styled.form`
  width: 100%;

  display: flex;
  align-items: center;

  background: ${(props) => props.theme.COLORS.ZINC_50};
  border-radius: 8px;

  padding: 1.6rem 1rem;
`

const SendMessageButtonContainer = styled.button`
  background: transparent;
  border: 0;
  outline: none;

  &:hover {
    color: ${(props) => props.theme.COLORS.FUCHSIA_700};
  }

  &:focus {
    border: 0;
    color: ${(props) => props.theme.COLORS.FUCHSIA_700};
  }
`

export const SendMessageInput = ({ selectedUserId, ...props }) => {
  const { ws } = useWssContext()
  const { authUserId } = useAuthContext()

  const inputRef = useRef()

  const handleSendMessage = (event) => {
    event.preventDefault()

    const message = inputRef.current.value.trim()

    if (!message) {
      return
    }

    const messageObject = {
      messageType: 'NEW_MESSAGE',
      authorId: authUserId,
      recipientId: selectedUserId,
      message,
    }

    ws.send(JSON.stringify(messageObject))

    inputRef.current.value = ''
  }

  const SubmitMessageIcon = () => {
    return (
      <SendMessageButtonContainer type="submit" onClick={handleSendMessage}>
        <PaperPlaneRight size={22} />
      </SendMessageButtonContainer>
    )
  }

  return (
    <SendMessageInputContainer>
      <InputWithRef
        placeholder="Type your message"
        icon={SubmitMessageIcon}
        ref={inputRef}
        {...props}
      />
    </SendMessageInputContainer>
  )
}
