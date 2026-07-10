import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { logoutAdmin } from "../utils/auth";

export const NAV_ITEMS = [
  { icon: "dashboard", label: "Dashboard", path: "/admin/dashboard" },
  { icon: "calendar_today", label: "Appointments", path: "/admin/appointments" },
  { icon: "group", label: "Patients", path: "/admin/patients" },
  { icon: "medical_services", label: "Treatments", path: "/admin/treatments" },
  { icon: "payments", label: "Payments", path: "/admin/payments" },
  { icon: "inventory_2", label: "Inventory", path: "/admin/inventory" },
  { icon: "settings", label: "Settings", path: "/admin/settings" },
];

/**
 * AdminLayout
 *
 * Wraps every admin page with the sidebar + topbar chrome. Usage:
 *
 *   <AdminLayout title="Patients" subtitle="Manage your patient records">
 *     ...page content...
 *   </AdminLayout>
 *
 * The topbar's search box and admin identity are shared; page-specific
 * header actions (buttons like "Add Patient") are passed via `headerActions`.
 */
export default function AdminLayout({ title, subtitle, headerActions, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="bg-background text-on-background font-sans min-h-screen overflow-x-hidden">
      {/* Sidebar Navigation */}
      <aside
        className={`fixed left-0 top-0 h-full w-[280px] bg-surface-container-low border-r border-primary/5 shadow-md flex flex-col p-4 space-y-2 z-40 transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-4 py-6">
          <h1 className="font-bold text-lg text-primary">PureDent Admin</h1>
          <p className="text-on-surface-variant text-[12px] opacity-70">Main Clinic Branch</p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={
                  active
                    ? "flex items-center gap-4 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold transition-transform active:translate-x-1"
                    : "flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all duration-200"
                }
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-semibold text-xs">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-outline-variant/30 space-y-1 px-2">
          <button
            onClick={() => navigate("/admin/add-dentist")}
            className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary py-3 px-4 rounded-xl font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">add</span>
            <span className="font-semibold text-xs">Add dentist</span>
          </button>
          <a
            href="#"
            className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="font-semibold text-xs">Support</span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all text-left"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-semibold text-xs">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="lg:ml-[280px] min-h-screen flex flex-col">
        {/* TopAppBar */}
        <header className="sticky top-0 w-full z-20 bg-surface/80 backdrop-blur-md px-8 py-4 flex justify-between items-center shadow-[0px_10px_30px_rgba(15,118,110,0.04)]">
          <div className="flex items-center gap-4 w-1/3">
            <button className="lg:hidden text-primary" onClick={() => setSidebarOpen((v) => !v)}>
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="relative w-full max-w-md hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
              <input
                className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-secondary/50 transition-all"
                placeholder="Search patients, doctors, or records..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full relative transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error border-2 border-surface rounded-full" />
            </button>
            <div className="flex items-center gap-4 pl-4 border-l border-outline-variant/30">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-sm text-on-surface">Dr. Sarah Jenkins</p>
                <p className="text-[11px] text-on-surface-variant tracking-wider font-semibold uppercase">
                  Clinic Administrator
                </p>
              </div>
              <img
                className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                alt="Clinic administrator"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkxxbbVGm4TNW5B4lfSBg1pg2s6_RRaUCxVLdGw6KJvHkB07WF1rrITRQPLlznGGeJU5Sd9N9lA7Skx5Rb3ShBH19DJlgmxHcIkzeBpeQ1GOUn2Y40JNL_sQyBFOpDuuKL99SLShTcdSSnwFx0XlqNUX9Y2JtRVLQgUjxTVi3pKFqUTAHRI7Q6ion9X2NH0xeJl2mNq6x2zy1xNhXmMCu_wgZ2QHzXRPBkEk66_f47LWrsnbESuzhU"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full flex-1">
          {(title || headerActions) && (
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                {title && <h2 className="font-bold text-2xl text-primary">{title}</h2>}
                {subtitle && <p className="text-on-surface-variant">{subtitle}</p>}
              </div>
              {headerActions && <div className="flex gap-2">{headerActions}</div>}
            </section>
          )}

          {children}
        </div>

        {/* Footer */}
        <footer className="mt-auto w-full border-t border-outline-variant bg-surface-container-highest px-8 py-8 flex flex-col md:flex-row justify-between items-center text-on-surface-variant">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-lg text-primary">PureDent</span>
            <p className="font-normal text-sm mt-1">© 2024 PureDent Clinic Management. All rights reserved.</p>
          </div>
          <div className="flex gap-6 font-normal text-sm">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">Accessibility</a>
            <a className="hover:text-primary transition-colors" href="#">Cookie Policy</a>
          </div>
        </footer>
      </main>

      {/* FAB for Quick Add Dentist (Mobile Only) */}
      <button
        onClick={() => navigate("/admin/add-dentist")}
        className="fixed bottom-6 right-6 lg:hidden w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center z-50 active:scale-90 transition-transform"
        aria-label="Add dentist"
      >
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
}