import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/manifest.json">
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
)
