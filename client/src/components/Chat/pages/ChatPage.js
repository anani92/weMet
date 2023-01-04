import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { ChatState } from '../context/ChatProvider'
import SideDrawer from '../chatComponents/SideDrawer'
import MyChats from '../chatComponents/MyChats'
import ChatBox from '../chatComponents/ChatBox'
import { ToastContainer } from 'react-toastify'
import { ChakraProvider } from '@chakra-ui/react'

const ChatPage = () => {
  const { user } = ChatState()
  const [fetchAgain, setFetchAgain] = useState(false)
  return (
    <ChakraProvider>
      <div style={{ height: '100vh' }} className="chatContainer">
        {user && <SideDrawer />}
        <Box
          d="flex"
          justifyContent="space-between"
          w="100%"
          h="91.rvh"
          p="10px"
        >
          {user && <MyChats fetchAgain={fetchAgain} />}
          {user && (
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
        <ToastContainer theme="colored" />
      </div>
    </ChakraProvider>
  )
}

export default ChatPage
