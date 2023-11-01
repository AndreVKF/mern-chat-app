import { MessagesWrapper } from '../../components/MessagesWrapper'
import { SendMessageInput } from '../../components/SendMessageInput'
import { Sidebar } from '../../components/Sidebar'

import {
  ChatContainer,
  LogoContainer,
  PageContainer,
  SidebarContainer,
} from './styles'

import Logo from '../../assets/Logo.png'
import { NoUserSelectedWrapper } from '../../components/SelectUserToChat'
import { useWssContext } from '../../contexts/WssContext'

export const Chat = () => {
  const { selectedUserId } = useWssContext()

  return (
    <PageContainer>
      <SidebarContainer>
        <LogoContainer>
          <img src={Logo} alt="Logo" />
          <h2>Chat App</h2>
        </LogoContainer>

        <hr />

        <Sidebar />
      </SidebarContainer>

      <ChatContainer>
        {selectedUserId ? <MessagesWrapper /> : <NoUserSelectedWrapper />}
        {selectedUserId && <SendMessageInput selectedUserId={selectedUserId} />}
      </ChatContainer>
    </PageContainer>
  )
}
