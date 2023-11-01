import styled from 'styled-components'
import { useAuthContext } from '../../contexts/AuthContext'
import { useWssContext } from '../../contexts/WssContext'
import { LogoutWrapper } from './LogoutWrapper'
import { SidebarChatUser } from './SidebarChatUser'

const SidebarContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  margin-top: 0.4rem;

  > hr {
    margin: 0 0.8rem;
    border-top: 1px solid ${(props) => props.theme.COLORS.ZINC_300};
  }

  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
`

const SidebarFriendContainer = styled.div`
  flex: 1;
`

const SidebarLogoContainer = styled.div``

export const Sidebar = () => {
  const { authUserId } = useAuthContext()
  const { chatUsers } = useWssContext()

  if (!chatUsers) {
    return <SidebarContainer />
  }

  const adjChatUsers = chatUsers.filter((user) => {
    return user.userId !== authUserId
  })

  return (
    <SidebarContainer>
      <SidebarFriendContainer>
        {adjChatUsers.map((user) => {
          const { userId, username, email, isUserConnected } = user

          return (
            <SidebarChatUser
              key={userId}
              userId={userId}
              username={username}
              email={email}
              isUserConnected={isUserConnected}
            />
          )
        })}
      </SidebarFriendContainer>

      <hr />

      <SidebarLogoContainer>
        <LogoutWrapper />
      </SidebarLogoContainer>
    </SidebarContainer>
  )
}
