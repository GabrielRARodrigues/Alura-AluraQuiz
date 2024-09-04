import { createGlobalStyle, ThemeProvider } from 'styled-components'

import db from '../db.json'

const theme = db.theme

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    min-height: 100vh;
  }
  
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* New styles */
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
  }


  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }

`
export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
