import styled from 'styled-components'
import { capitalizeText } from '../../common/functions'
import { useWssContext } from '../../contexts/WssContext'

const SidebarChatUserContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 0.6rem;
  padding: 0.4rem 0.6rem;

  cursor: pointer;

  background-color: inherit;

  background-color: ${(props) =>
    props.$isSelected && props.theme.COLORS.FUCHSIA_100};

  border-left: ${(props) =>
    props.$isSelected && `6px solid ${props.theme.COLORS.FUCHSIA_700}`};
`

const AvatarContainer = styled.div`
  height: 2.8rem;
  width: 2.8rem;

  display: grid;
  place-items: center;

  border: 1px solid ${(props) => props.theme.COLORS.PINK_400};
  background: ${(props) => props.theme.COLORS.FUCHSIA_200};
  border-radius: 9999px;

  position: relative;

  > div {
    > span {
      color: ${(props) => props.theme.COLORS.ZINC_900};
      text-overflow: ellipsis;
    }
  }
`

const UserStatusWrapper = styled.div`
  position: absolute;

  width: 16px;
  height: 16px;

  border-radius: 9999px;

  bottom: 0;
  right: -2px;

  background-color: ${(props) =>
    props.$isUserConnected
      ? props.theme.COLORS.ONLINE_STATUS
      : props.theme.COLORS.OFFLINE_STATUS};
`

const UserDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.1rem;

  > p {
    font-size: 0.9rem;
    color: ${(props) => props.theme.COLORS.ZINC_900};
  }

  > span {
    font-size: 0.8rem;
    color: ${(props) => props.theme.COLORS.ZINC_500};
  }
`

export const SidebarChatUser = ({
  userId,
  username,
  email,
  isUserConnected,
  ...props
}) => {
  const capitalizedUsername = capitalizeText(username)
  const usernameArray = capitalizedUsername.split(' ')
  const usernameTag =
    usernameArray.length >= 2
      ? `${usernameArray[0][0]}${usernameArray[1][0]}`
      : usernameArray[0][0]

  const { selectedUserId, setSelectedUserId } = useWssContext()

  const handleSelectUser = () => {
    if (!selectedUserId) {
      setSelectedUserId(() => userId)
    } else {
      const updateSelectUserId = selectedUserId === userId ? null : userId
      setSelectedUserId(() => updateSelectUserId)
    }
  }

  return (
    <SidebarChatUserContainer
      $isSelected={selectedUserId === userId}
      onClick={handleSelectUser}
      {...props}
    >
      <AvatarContainer>
        <div>
          <span>{usernameTag}</span>
        </div>
        <UserStatusWrapper $isUserConnected={isUserConnected} />
      </AvatarContainer>

      <UserDescription>
        <p>{capitalizedUsername}</p>
        <span>{email}</span>
      </UserDescription>
    </SidebarChatUserContainer>
  )
}
