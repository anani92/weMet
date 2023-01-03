import { Box } from '@mui/material'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Login, Register, Navbar, Groups, Dashboard } from './components'
// import { useEffect } from "react";
// import axios from "axios";
import { useAuthContext } from './hooks/useAuthContext'
import GroupPost from './components/GroupPost'
import PostDetails from './components/PostDetails'
import ChatPage from './components/Chat/pages/ChatPage'
function App() {
  const { user, dispatch } = useAuthContext()
  // useEffect(() => {
  //   const getUser = () => {
  //     fetch("http://localhost:8000/auth/login/success", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     })
  //       .then((res) => {
  //         if (res.status === 200) return res.json();
  //         // throw new Error("Authentication has been failed");
  //       })
  //       .then((resObject) => {
  //         // dispatch({ type: "LOGIN", payload: resObject.user });
  //         localStorage.setItem("user", JSON.stringify(resObject.user));
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   getUser();
  // }, []);

  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path={`/`} element={<Dashboard />} />
        <Route path={`/groups`} element={<Groups />} />
        <Route path={`/chats`} element={<ChatPage />} />

        <Route path={`/group/posts`} element={<GroupPost />} />
        <Route path={`/post`} element={user ? <PostDetails /> : <Login />} />
        <Route
          path={`/register`}
          element={!user ? <Register /> : <Dashboard />}
        />
        <Route path={`/login`} element={!user ? <Login /> : <Dashboard />} />
      </Routes>
    </Box>
  )
}

export default App
