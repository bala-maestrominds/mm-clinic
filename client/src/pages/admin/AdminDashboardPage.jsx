import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../utils/auth";

const NAV_ITEMS = [
  { icon: "dashboard", label: "Dashboard", active: true },
  { icon: "calendar_today", label: "Appointments" },
  { icon: "group", label: "Patients" },
  { icon: "medical_services", label: "Treatments" },
  { icon: "payments", label: "Payments" },
  { icon: "inventory_2", label: "Inventory" },
  { icon: "settings", label: "Settings" },
];

const TOP_SPECIALISTS = [
  {
    name: "Dr. Michael Chen",
    meta: "Orthodontics • 42 Appts",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjxmggMOrmqO_ghBNdAtl8QOQgsm6di-DFw8rQqmiAoDG30wlijKcJLn6FWQZ3kZDOKRvx2_Z7Wde2BOGRhIrzA4inCE8iUOw7A4VwXTnxq2tRBlujrHtCmdSIjs39H3-dwCI8N5UQHQG-BKXLUZUA8U9-eDHLSYniUrvDE6Opyq1zVEjI5Qkvsgxn15j3CavSI16aItEDvlULSftquAIlYGC9yAHj1a57NM919HpgKwFJ7FFZvtuK",
  },
  {
    name: "Dr. Aisha Varma",
    meta: "Periodontics • 38 Appts",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzJCEwTCgpx_B_X-kQbaY8XL61lS6-xnUYtpm0HP-WD7Lk7YZaZrQvTnvtCVHUgpg9QMu3JvG1a0xViOeHBtFwUpY_1q5a0-khaa0GwTjUeB6OT91SuHzvnIejp11YwXKyB7n5o77jKM1YnvR1CBtlZlawwJH88QwGAR3F_om8fSOTHCHMkiQ5qaql0UyNwnxM9m0at1bbo4GoTt7tdSfoIhdFXArhExkU4wCCDBE6HVz4H0ISuTdy",
  },
  {
    name: "Dr. James Wilson",
    meta: "General Dentistry • 35 Appts",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9YRF45_XVEmjL6LFK-XcdmQB3Tec2d1-hdXQXEYS9PMpJdGcMKD8vjff6DFZ6oLM9tcVSXYKHkpUawC7ow1POOpahIlgv-u-BTAJGrQ4sDB2wJetLMuGTKJenrIxJaD3B8CdzD6uvwUP_kKqGd_bfu8xERfKMNYM4oqIn67PA1JQJZwt26qNfzEaF-p67Xvgfd0AXCggUqC_fBvd7YVVfwMdO9XZbFdll6Ph1nf2fOlM2pyAii4tp",
  },
];

const REVENUE_ROWS = [
  { time: "09:30 AM", doctor: "Dr. Michael Chen", service: "Dental Implants", amount: "$1,200" },
  { time: "11:00 AM", doctor: "Dr. Aisha Varma", service: "Teeth Whitening", amount: "$450" },
  { time: "02:15 PM", doctor: "Dr. James Wilson", service: "Routine Checkup", amount: "$150" },
];

const APPOINTMENT_ROWS = [
  {
    initials: "JS",
    name: "Jonathan Smith",
    id: "#PD-8821",
    doctor: "Dr. Michael Chen",
    treatment: "Root Canal Therapy",
    time: "09:30 AM",
    status: "Confirmed",
    statusClass: "bg-secondary-container/20 text-on-secondary-container",
    avatarClass: "bg-primary/10 text-primary",
  },
  {
    initials: "AW",
    name: "Alice Wonderland",
    id: "#PD-7729",
    doctor: "Dr. Aisha Varma",
    treatment: "Teeth Whitening",
    time: "11:00 AM",
    status: "In-Progress",
    statusClass: "bg-tertiary-fixed-dim/20 text-tertiary-container",
    avatarClass: "bg-tertiary-container/10 text-tertiary",
  },
  {
    initials: "RL",
    name: "Robert Lewandowski",
    id: "#PD-9122",
    doctor: "Dr. James Wilson",
    treatment: "Routine Checkup",
    time: "02:15 PM",
    status: "Pending",
    statusClass: "bg-surface-container-high text-on-surface-variant",
    avatarClass: "bg-secondary-container/10 text-secondary",
  },
];

const REVENUE_BARS = [
  { height: 60, label: "$12k" },
  { height: 85, label: "$18k" },
  { height: 45, label: "$9k" },
  { height: 95, label: "$22k" },
  { height: 70, label: "$14k" },
  { height: 55, label: "$11k" },
  { height: 80, label: "$17k" },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [apptTab, setApptTab] = useState("upcoming");

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
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href="#"
              className={
                item.active
                  ? "flex items-center gap-4 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold transition-transform active:translate-x-1"
                  : "flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all duration-200"
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-semibold text-xs">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="pt-4 border-t border-outline-variant/30 space-y-1 px-2">
          {/* Renamed from "New Appointment" -> "Add dentist" per brief. */}
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

      {/* Main Content Area */}
      <main className="lg:ml-[280px] min-h-screen flex flex-col">
        {/* TopAppBar */}
        <header className="sticky top-0 w-full z-30 bg-surface/80 backdrop-blur-md px-8 py-4 flex justify-between items-center shadow-[0px_10px_30px_rgba(15,118,110,0.04)]">
          <div className="flex items-center gap-4 w-1/3">
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
            <button className="lg:hidden text-primary" onClick={() => setSidebarOpen((v) => !v)}>
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full relative transition-colors">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error border-2 border-surface rounded-full" />
              </button>
            </div>
            <div className="flex items-center gap-4 pl-md border-l border-outline-variant/30">
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

        {/* Dashboard Content */}
        <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Welcome Header */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-bold text-2xl text-primary">Clinic Overview</h2>
              <p className="text-on-surface-variant">Welcome back. Here&apos;s what&apos;s happening today at PureDent.</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-6 py-3 rounded-xl border border-primary/20 text-primary font-bold hover:bg-primary/5 transition-colors">
                <span className="material-symbols-outlined text-[20px]">download</span>
                Reports
              </button>
              <button className="flex items-center gap-1 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-[20px]">person_add</span>
                Add Patient
              </button>
            </div>
          </section>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-primary-fixed rounded-xl text-primary">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <span className="flex items-center text-secondary font-bold text-sm">
                  <span className="material-symbols-outlined text-[18px]">trending_up</span>
                  15%
                </span>
              </div>
              <div>
                <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest">
                  Today&apos;s Revenue
                </p>
                <h3 className="font-bold text-xl mt-1">$4,250</h3>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-secondary-container rounded-xl text-on-secondary-container">
                  <span className="material-symbols-outlined">group</span>
                </div>
                <span className="flex items-center text-secondary font-bold text-sm">
                  <span className="material-symbols-outlined text-[18px]">trending_up</span>
                  8%
                </span>
              </div>
              <div>
                <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest">
                  New Patients
                </p>
                <h3 className="font-bold text-xl mt-1">142</h3>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-tertiary-fixed rounded-xl text-on-tertiary-fixed-variant">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <span className="flex items-center text-error font-bold text-sm">
                  <span className="material-symbols-outlined text-[18px]">trending_down</span>
                  3%
                </span>
              </div>
              <div>
                <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest">
                  Monthly Revenue
                </p>
                <h3 className="font-bold text-xl mt-1">$52,490</h3>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-surface-container-high rounded-xl text-on-surface-variant">
                  <span className="material-symbols-outlined">reviews</span>
                </div>
                <span className="flex items-center text-secondary font-bold text-sm">
                  <span className="material-symbols-outlined text-[18px]">grade</span>
                  4.9
                </span>
              </div>
              <div>
                <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest">
                  Clinic Rating
                </p>
                <h3 className="font-bold text-xl mt-1">Excellent</h3>
              </div>
            </div>
          </div>

          {/* Today's Schedule & Revenue */}
          <section className="glass-card rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-primary/5">
              <h4 className="font-bold text-lg text-primary">Today&apos;s Schedule &amp; Revenue</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low/50">
                  <tr>
                    <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Time</th>
                    <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Doctor</th>
                    <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Service Provided</th>
                    <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider text-right">Amount Charged</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {REVENUE_ROWS.map((row) => (
                    <tr key={row.time} className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="p-6 text-sm">{row.time}</td>
                      <td className="p-6 text-sm font-bold">{row.doctor}</td>
                      <td className="p-6 text-sm">{row.service}</td>
                      <td className="p-6 text-sm text-right font-bold text-primary">{row.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Graph */}
            <div className="lg:col-span-2 glass-card p-6 rounded-3xl flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-lg text-primary">Revenue Trends</h4>
                <select className="bg-surface-container-low border-none rounded-lg py-1 px-4 text-sm focus:ring-0">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Year to Date</option>
                </select>
              </div>
              <div className="flex-1 w-full min-h-[300px] relative flex items-end gap-2 pb-6">
                <div className="absolute inset-0 flex flex-col justify-between py-6 opacity-10">
                  <div className="border-b border-on-surface" />
                  <div className="border-b border-on-surface" />
                  <div className="border-b border-on-surface" />
                  <div className="border-b border-on-surface" />
                </div>
                {REVENUE_BARS.map((bar, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-primary/30 rounded-t-lg transition-all hover:bg-primary/60 group relative"
                    style={{ height: `${bar.height}%` }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {bar.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Specialists */}
            <div className="glass-card p-6 rounded-3xl flex flex-col">
              <h4 className="font-bold text-lg text-primary mb-6">Top Specialists</h4>
              <div className="space-y-6 flex-1">
                {TOP_SPECIALISTS.map((doc) => (
                  <div key={doc.name} className="flex items-center gap-4">
                    <img className="w-12 h-12 rounded-full object-cover" alt={doc.name} src={doc.img} />
                    <div className="flex-1">
                      <p className="font-bold text-sm">{doc.name}</p>
                      <p className="text-on-surface-variant text-[12px]">{doc.meta}</p>
                    </div>
                    <span
                      className="material-symbols-outlined text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/admin/add-dentist")}
                className="w-full mt-6 py-3 rounded-xl border-2 border-dashed border-outline-variant hover:border-primary hover:text-primary transition-all text-on-surface-variant font-bold text-sm"
              >
                View All Doctors
              </button>
            </div>
          </div>

          {/* Recent Appointments Table */}
          <section className="glass-card rounded-3xl overflow-hidden">
            <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-primary/5">
              <h4 className="font-bold text-lg text-primary">Recent Appointments</h4>
              <div className="flex gap-2">
                <div className="bg-surface-container-low p-1 rounded-xl flex">
                  <button
                    onClick={() => setApptTab("upcoming")}
                    className={
                      apptTab === "upcoming"
                        ? "px-4 py-1.5 rounded-lg bg-white shadow-sm text-primary font-bold text-sm"
                        : "px-4 py-1.5 rounded-lg text-on-surface-variant text-sm hover:bg-white/50"
                    }
                  >
                    Upcoming
                  </button>
                  <button
                    onClick={() => setApptTab("completed")}
                    className={
                      apptTab === "completed"
                        ? "px-4 py-1.5 rounded-lg bg-white shadow-sm text-primary font-bold text-sm"
                        : "px-4 py-1.5 rounded-lg text-on-surface-variant text-sm hover:bg-white/50"
                    }
                  >
                    Completed
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low/50">
                  <tr>
                    <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Patient Name</th>
                    <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Doctor</th>
                    <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Treatment</th>
                    <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Time</th>
                    <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Status</th>
                    <th className="p-6" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {APPOINTMENT_ROWS.map((row) => (
                    <tr key={row.id} className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${row.avatarClass}`}>
                            {row.initials}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{row.name}</p>
                            <p className="text-[11px] text-on-surface-variant">ID: {row.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-sm">{row.doctor}</td>
                      <td className="p-6 text-sm">{row.treatment}</td>
                      <td className="p-6 text-sm">{row.time}</td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${row.statusClass}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-surface-container-low/30 text-center">
              <button className="text-primary font-bold text-sm hover:underline">View All Appointments</button>
            </div>
          </section>
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