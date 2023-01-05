import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import ChatProvider from './context/ChatProvider'
import { AuthContextProvider } from './context/AuthContext'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthContextProvider>
    <Router>
      <ChatProvider>
        <App />
      </ChatProvider>
    </Router>
  </AuthContextProvider>
)
