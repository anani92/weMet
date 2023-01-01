import { Box } from "@mui/material";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import {
  Login,
  Register,
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
        <Routes>
          <Route path={`/`} element={<Dashboard />} />
          <Route path={`/groups`} element={<Groups />} />
          <Route path={`/post`} element={user ? <Details /> : <Login />} />
          <Route path={`/addpost`} element={user ? <Post /> : <Register />} />
          <Route
            path={`/register`}
            element={!user ? <Register /> : <Dashboard />}
          />
          <Route path={`/login`} element={!user ? <Login /> : <Dashboard />} />
        </Routes>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
