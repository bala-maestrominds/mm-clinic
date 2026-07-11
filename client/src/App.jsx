import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));
const AddDentistPage = lazy(() => import("./pages/admin/AddDentistPage"));
const AppointmentsPage = lazy(() => import("./pages/admin/AppointmentsPage"));
const PatientsPage = lazy(() => import("./pages/admin/PatientsPage"));
const TreatmentsPage = lazy(() => import("./pages/admin/TreatmentsPage"));
const PaymentsPage = lazy(() => import("./pages/admin/PaymentsPage"));
const InventoryPage = lazy(() => import("./pages/admin/InventoryPage"));
const SettingsPage = lazy(() => import("./pages/admin/SettingsPage"));
const ContactPage = lazy(() => import("./pages/public/ContactPage"));
const CheckInPage = lazy(() => import("./pages/admin/CheckInPage"));
const BookingPage = lazy(() => import("./pages/public/BookingPage"));
const LandingPage = lazy(() => import("./pages/public/LandingPage"));
const AboutPage = lazy(() => import("./pages/public/AboutPage"));
const ServicesPage = lazy(() => import("./pages/public/ServicesPage"));
const ServiceDetailPage = lazy(() => import("./pages/public/ServiceDetailPage"));
const DoctorsPage = lazy(() => import("./pages/public/DoctorsPage"));
const DoctorDetailPage = lazy(() => import("./pages/public/DoctorDetailPage"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3 animate-fade-in">
        <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-sm text-on-surface-variant font-medium">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
