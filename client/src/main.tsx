import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes/router.tsx'
import UserContextProvider from './UserContext.tsx'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
if (import.meta.env.VITE_NODE_ENV === "production") disableReactDevTools()

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URI,
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <ApolloProvider client={client}>
    <UserContextProvider>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </UserContextProvider>
   </ApolloProvider>
  </React.StrictMode>,
)
