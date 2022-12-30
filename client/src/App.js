import { Box } from "@mui/system";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  Login,
  Register,
  Sidebar,
  Navbar,
  Groups,
  Post,
  Dashboard,
} from "./components";

function App() {
  return (
    <BrowserRouter>
      <Box>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path={`/`} element={<Dashboard />} />
          <Route path={`/groups`} element={<Groups />} />
          <Route path={`/addpost`} element={<Post />} />
          <Route path={`/register`} element={<Register />} />
          <Route path={`/login`} element={<Login />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
