import styled from 'styled-components'

import { Door } from 'phosphor-react'
import { useAuthContext } from '../../contexts/AuthContext'
import { useWssContext } from '../../contexts/WssContext'

const LogoutContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.6rem 0.8rem;
`

const LogoutDivWrapper = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;

  > svg {
    color: ${(props) => props.theme.COLORS.PINK_700};
  }

  > span {
    color: ${(props) => props.theme.COLORS.PINK_700};
  }
`

const UserProfile = styled.div`
  display: flex;
  align-items: center;

  > span {
    font-weight: bold;
    font-size: 1.125rem;

    background: -webkit-linear-gradient(
      0deg,
      ${(props) => props.theme.COLORS.FUCHSIA_700},
      ${(props) => props.theme.COLORS.PINK_700}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

export const LogoutWrapper = () => {
  const { logout, authUsername, authToken } = useAuthContext()
  const { ws } = useWssContext()

  const handleLogout = () => {
    const logoutMessage = {
      messageType: 'TERMINATE',
      token: authToken,
    }

    logout()
    ws.send(JSON.stringify(logoutMessage))
  }

  return (
    <LogoutContainer onClick={handleLogout}>
      <UserProfile>
        <span>{authUsername}</span>
      </UserProfile>
      <LogoutDivWrapper>
        <Door size={32} />
        <span>Logout</span>
      </LogoutDivWrapper>
    </LogoutContainer>
  )
}
