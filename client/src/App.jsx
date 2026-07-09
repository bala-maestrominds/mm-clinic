import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AddDentistPage from "./pages/admin/AddDentistPage";
import ContactPage from "./pages/public/ContactPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect the root URL to the admin login page */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

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