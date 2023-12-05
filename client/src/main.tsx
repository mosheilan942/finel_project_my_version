import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes/router.tsx'
import UserContextProvider from './UserContext.tsx'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if (import.meta.env.VITE_NODE_ENV === "production") disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>,
)
