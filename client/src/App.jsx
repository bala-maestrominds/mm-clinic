import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AddDentistPage from "./pages/admin/AddDentistPage";
import AppointmentsPage from "./pages/admin/AppointmentsPage";
import PatientsPage from "./pages/admin/PatientsPage";
import TreatmentsPage from "./pages/admin/TreatmentsPage";
import PaymentsPage from "./pages/admin/PaymentsPage";
import InventoryPage from "./pages/admin/InventoryPage";
import SettingsPage from "./pages/admin/SettingsPage";
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

        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute>
              <AppointmentsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/patients"
          element={
            <ProtectedRoute>
              <PatientsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/treatments"
          element={
            <ProtectedRoute>
              <TreatmentsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute>
              <PaymentsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/inventory"
          element={
            <ProtectedRoute>
              <InventoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
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