import { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [selectedChat, setSelectedChat] = useState()
  const [chats, setChats] = useState([])
  const [notification, setNotification] = useState([])
  const { pathname } = useLocation()
  console.log(pathname)
  const navigate = useNavigate()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    setUser(userInfo)
    if (!userInfo && pathname !== '/dash') {
      navigate('/')
    }
  }, [setUser])
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const ChatState = () => {
  return useContext(ChatContext)
}

export default ChatProvider
