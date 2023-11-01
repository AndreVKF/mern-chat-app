import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { removeDuplicateObjects } from '../../common/functions'
import { useAuthContext } from '../../contexts/AuthContext'
import { useWssContext } from '../../contexts/WssContext'
import { MessageWrapper } from './MessageWrapper'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const MessageWrapperContainer = styled.main`
  flex: 1;

  display: inline-flex;
  flex-direction: column;
  gap: 0.8rem;

  padding: 0.2rem 4rem;
  padding-bottom: 1.2rem;

  overflow-y: auto;
  max-height: 85vh;
`

export const MessagesWrapper = () => {
  const { messageHistoryArray } = useWssContext()
  const { authUserId } = useAuthContext()

  const [messagesArray, setMessagesArray] = useState(
    removeDuplicateObjects(messageHistoryArray, '_id'),
  )

  const messagesWrapperRef = useRef()

  const scrollToBottom = () => {
    messagesWrapperRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }

  useEffect(() => {
    setMessagesArray(removeDuplicateObjects(messageHistoryArray, '_id'))
  }, [messageHistoryArray])

  useEffect(() => {
    scrollToBottom()
  }, [messagesArray])

  return (
    <MessageWrapperContainer>
      {messagesArray.map((data) => {
        const { _id, message, authorId, createdAt } = data

        const relativeDate = dayjs(createdAt).from(dayjs())

        return (
          <MessageWrapper
            key={_id}
            messageText={message}
            messageTime={relativeDate}
            fromSelf={authorId === authUserId}
          />
        )
      })}
      <div style={{ height: '0.125rem' }} ref={messagesWrapperRef} />
    </MessageWrapperContainer>
  )
}
