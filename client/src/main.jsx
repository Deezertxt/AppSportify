import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
<<<<<<< HEAD
import {BrowserRouter} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
=======
import { BrowserRouter } from 'react-router-dom'
>>>>>>> 56c13f7efbb29e7713e25467afee086194ae803b


createRoot(document.getElementById('root')).render(
  <StrictMode>
<<<<<<< HEAD
      <BrowserRouter>
      <GoogleOAuthProvider clientId="936546885114-n5trqm2gep2941m3sjag58ro506d5sht.apps.googleusercontent.com">
          <App />
      </GoogleOAuthProvider>
      </BrowserRouter>
=======
    <BrowserRouter>
          <App />
    </BrowserRouter>
>>>>>>> 56c13f7efbb29e7713e25467afee086194ae803b
  </StrictMode>,
)
