import { Box } from "@mui/system";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login, Register, Sidebar, Navbar } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Box>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path={`/register`} element={<Register />} />
          <Route path={`/login`} element={<Login />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
