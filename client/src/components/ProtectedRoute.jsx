import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "../utils/auth";

/**
 * Wrap any admin-only route with this component:
 *
 *   <Route
 *     path="/admin/dashboard"
 *     element={
 *       <ProtectedRoute>
 *         <AdminDashboardPage />
 *       </ProtectedRoute>
 *     }
 *   />
 */
export default function ProtectedRoute({ children }) {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}