import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ChatProvider from './components/Chat/context/ChatProvider'
import { AuthContextProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </AuthContextProvider>
  </BrowserRouter>
)
