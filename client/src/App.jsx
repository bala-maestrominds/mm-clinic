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
import CheckInPage from "./pages/admin/CheckInPage";
import BookingPage from "./pages/public/BookingPage";
import LandingPage from "./pages/public/LandingPage"; 
import AboutPage from "./pages/public/AboutPage";
import ServicesPage from "./pages/public/ServicesPage";
import ServiceDetailPage from "./pages/public/ServiceDetailPage";
import DoctorsPage from "./pages/public/DoctorsPage"; 
import DoctorDetailPage from "./pages/public/DoctorDetailPage"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} /> 
        <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctors/:doctorId" element={<DoctorDetailPage />} />

        {/* Public Routes */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/book" element={<BookingPage />} />

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

        <Route
          path="/admin/checkin"
          element={
            <ProtectedRoute>
              <CheckInPage />
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