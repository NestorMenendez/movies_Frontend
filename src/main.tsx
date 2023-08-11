import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

const { VITE_AUTH_DOMAIN: domain, VITE_AUTH_CLIENT_ID: clientId, VITE_AUTH_CLIENT_SECRET: clientSecret } = import.meta.env;
export const redirectUri: string = window.location.origin + "/home";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri
      }}
    >

      <App />

    </Auth0Provider>
  </React.StrictMode>,
)
