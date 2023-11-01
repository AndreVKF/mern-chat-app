import styled from 'styled-components'

export const PageContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  place-items: center;

  padding-bottom: 4.8rem;
`

export const FormContainer = styled.div`
  border: 1px solid ${(props) => props.theme.COLORS.ZINC_400};
  background-color: ${(props) => props.theme.COLORS.ZINC_50};

  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  padding: 2rem 4rem;
  border-radius: 8px;

  > h1 {
    font-size: 2.4rem;
  }

  > img {
    height: 3.6rem;
    width: 3.6rem;
  }

  > span {
    white-space: nowrap;

    a {
      color: ${(props) => props.theme.COLORS.FUCHSIA_700};
      transition: color 0.6s;

      &:hover {
        color: ${(props) => props.theme.COLORS.PINK_700};
      }
    }
  }
`

export const FormGrid = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  > input {
    border: 0;
    border-bottom: 1px solid ${(props) => props.theme.COLORS.ZINC_500};
    padding-bottom: 0.2rem;
    background: transparent;

    padding: 0.4rem 0;
    outline: none;
  }

  > button {
    margin-top: 2rem;
    padding: 0.4rem 0.6rem;

    color: ${(props) => props.theme.COLORS.ZINC_50};

    background-color: ${(props) => props.theme.COLORS.FUCHSIA_600};
    transition: background-color 0.6s;

    &:hover {
      filter: brightness(1);
      background-color: ${(props) => props.theme.COLORS.PINK_500};
    }
  }
`
