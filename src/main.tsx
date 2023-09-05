import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

const { VITE_AUTH_DOMAIN: domain, VITE_AUTH_CLIENT_ID: clientId, VITE_AUTH_CLIENT_SECRET: clientSecret, VITE_AUTH_AUDIENCE: audience } = import.meta.env;
export const redirectUri: string = window.location.origin + "/home";

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>

      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: redirectUri,
          audience: audience
        }}
      >

        <App />


      </Auth0Provider>

    </React.StrictMode>
  );
} else {
  console.error('Element "root" doesnt exists or not found!!!');
}