import { Box } from "@mui/material";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import {
  Login,
  Register,
  // Sidebar,
  Navbar,
  Groups,
  Post,
  Dashboard,
  Footer,
  Details,
} from "./components";

function App() {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <Box>
        <Navbar />
        {/* <Sidebar /> */}
        <Routes>
          <Route path={`/`} element={<Dashboard />} />
          <Route path={`/groups`} element={<Groups />} />
          <Route path={`/post`} element={<Details />} />
          <Route path={`/addpost`} element={<Post />} />
          <Route
            path={`/register`}
            element={!user ? <Register /> : <Navigate to={"/"} />}
          />
          <Route
            path={`/login`}
            element={!user ? <Login /> : <Navigate to={-1} />}
          />
        </Routes>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
