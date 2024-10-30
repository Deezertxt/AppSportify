import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
      <GoogleOAuthProvider clientId="936546885114-n5trqm2gep2941m3sjag58ro506d5sht.apps.googleusercontent.com">
          <App />
      </GoogleOAuthProvider>
      </BrowserRouter>
  </StrictMode>,
)
