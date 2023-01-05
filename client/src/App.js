import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import FourOFour from './pages/FourOFour'
import Dashboard from './pages/Dashboard'
// import { ChakraProvider } from '@chakra-ui/react'
import Groups from './pages/Groups'
import Navbar from './components/Navbar'
import GroupPosts from './pages/GroupPost'
import Comments from './pages/Comments'
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path={`/group/:id/posts`} element={<GroupPosts />} />
        <Route path={`/post/:id`} element={<Comments />} />
        <Route path="*" element={<FourOFour />} />
        <Route path={`/groups`} element={<Groups />} />
      </Routes>
    </div>
  )
}

export default App
