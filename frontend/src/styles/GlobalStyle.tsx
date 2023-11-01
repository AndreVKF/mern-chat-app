import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    font-family: "Lato", sans-serif;
  }

  body {
    width: 100%;
    height: 100vh;
    background-color: ${(props) => props.theme.COLORS.ZINC_100};
  }

  body, input, button, textarea {
    color: ${(props) => props.theme.COLORS.ZINC_700};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  button, a {
    cursor: pointer;
    border: none;
    transition: filter 0.2s;
  }

  button {
    font-weight: 700;
    border: 1px solid ${(props) => props.theme.COLORS.ZINC_300};
    border-radius: 6px;
  }

  button:hover {
    filter: brightness(0.8);
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.COLORS.ZINC_700};
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

`
