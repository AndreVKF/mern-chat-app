import styled from 'styled-components'

import Logo from '../assets/Logo.png'

const NoUserSelectedWrapperContainer = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  place-items: center;
`

const NoUserMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 8rem;

  > img {
    height: 16rem;
    width: 16rem;
    filter: opacity(0.1);
  }

  > h2 {
    font-size: 2.4rem;
    background: -webkit-linear-gradient(
      0deg,
      ${(props) => props.theme.COLORS.FUCHSIA_200},
      ${(props) => props.theme.COLORS.PINK_300}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

export const NoUserSelectedWrapper = () => {
  return (
    <NoUserSelectedWrapperContainer>
      <NoUserMessageContainer>
        <img src={Logo} alt="Chat App Logo" />
        <h2>Select a user to chat.</h2>
      </NoUserMessageContainer>
    </NoUserSelectedWrapperContainer>
  )
}
