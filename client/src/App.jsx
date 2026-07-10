// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AddDentistPage from "./pages/admin/AddDentistPage";
import ContactPage from "./pages/public/ContactPage";
import LandingPage from "./pages/public/LandingPage"; 
import AboutPage from "./pages/public/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Make Landing Page the default */}
        <Route path="/" element={<LandingPage />} />
         <Route path="/about" element={<AboutPage />} />
        

        {/* Public Routes */}
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-dentist"
          element={
            <ProtectedRoute>
              <AddDentistPage />
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;