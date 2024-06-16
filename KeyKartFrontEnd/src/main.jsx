import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
        domain="dev-mqzx0ckhfl41mzxd.jp.auth0.com"
        clientId="E8VdjWcbW6Bc6ZjaVhAWMjzBIgk5xNYx"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "https://user-api",
          scope: "openid profile email"
        }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
