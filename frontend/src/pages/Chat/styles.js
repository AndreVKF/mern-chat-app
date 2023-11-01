import styled from 'styled-components'

export const PageContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-columns: minmax(300px, 400px) minmax(640px, 1fr);
  overflow-y: hidden;
`

export const SidebarContainer = styled.aside`
  border-right: 2px solid ${(props) => props.theme.COLORS.PINK_500};
  background-color: ${(props) => props.theme.COLORS.ZINC_100};

  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  > hr {
    margin: 0 0.8rem;
    border-top: 1px solid ${(props) => props.theme.COLORS.ZINC_300};
  }
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 0.4rem;

  padding-top: 0.4rem;
  padding-left: 0.4rem;

  > img {
    width: 2.8rem;
    height: 2.8rem;
  }

  > h2 {
    background: -webkit-linear-gradient(
      0deg,
      ${(props) => props.theme.COLORS.FUCHSIA_700},
      ${(props) => props.theme.COLORS.PINK_700}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

export const ChatContainer = styled.main`
  max-width: 100%;
  padding: 1.6rem 3.2rem 1.2rem;

  display: flex;
  flex-direction: column;
`
