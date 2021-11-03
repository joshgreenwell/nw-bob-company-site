import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { LocalizationProvider } from '@mui/lab'
import { Auth0Provider } from '@auth0/auth0-react'

import App from './App'
import reportWebVitals from './reportWebVitals'

export const queryClient = new QueryClient()

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#272624'
    },
    secondary: {
      dark: '#ffb10f',
      main: '#fff1ce'
    }
  },
  typography: {
    fontFamily: 'IM Fell DW Pica,Times,Times Roman,Times New Roman,serif'
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <QueryClientProvider client={queryClient}>
          <Auth0Provider
            domain="dev-a0dow-ii.us.auth0.com"
            clientId="PYyQGHodMwqvgSESrzyvypEj0IKiE15R"
            redirectUri={window.location.origin}
          >
            <div
              style={{
                position: 'fixed',
                width: '100%',
                height: '100%',
                left: '50%',
                transform: 'translatex(-50%)',
                maxWidth: '1920px',
                zIndex: -1,
                bottom: 0,
                background:
                  'url(//d2lchq0n03yu65.cloudfront.net/statics/2021-10-14/images/texture-bottom.jpg) no-repeat bottom'
              }}
            />
            <div
              style={{
                position: 'fixed',
                width: '100%',
                height: '100%',
                left: '50%',
                transform: 'translatex(-50%)',
                maxWidth: '1920px',
                zIndex: -1,
                background:
                  'url(//d2lchq0n03yu65.cloudfront.net/statics/2021-10-14/images/diamond-texture-top.png) no-repeat top'
              }}
            />
            <App />
          </Auth0Provider>
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
