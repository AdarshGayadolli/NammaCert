import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Admin Layout
import AdminLayout from "../layouts/AdminLayout";

// Student Layout
import StudentLayout from "../layouts/StudentLayout"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Admin Dashboard */}

        <Route path="/admin/*" element={<AdminLayout />} />

        {/* Student Dashboard */}

        <Route path="/student/*" element={<StudentLayout />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;