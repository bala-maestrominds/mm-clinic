import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { resolveAssetUrl } from "../../utils/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const STATUS_STYLES = {
  Confirmed: { row: "bg-secondary-container/20 text-on-secondary-container", avatar: "bg-primary/10 text-primary" },
  "In-Progress": { row: "bg-tertiary-fixed-dim/20 text-tertiary-container", avatar: "bg-tertiary-container/10 text-tertiary" },
  Pending: { row: "bg-surface-container-high text-on-surface-variant", avatar: "bg-secondary-container/10 text-secondary" },
  Completed: { row: "bg-primary/10 text-primary", avatar: "bg-primary/10 text-primary" },
  Cancelled: { row: "bg-error-container/40 text-error", avatar: "bg-error-container/20 text-error" },
};
const DEFAULT_STATUS_STYLE = { row: "bg-surface-container-high text-on-surface-variant", avatar: "bg-surface-container-high text-on-surface-variant" };

const UPCOMING_STATUSES = ["Confirmed", "Pending", "In-Progress"];

// ---- small date/format helpers -------------------------------------------

function toDateKey(date) {
  // Matches the "YYYY-MM-DD" format Appointment.date is stored in.
  return date.toISOString().slice(0, 10);
}

function formatCurrency(amount) {
  return `$${Number(amount || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function formatTimeLabel(time) {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  if (Number.isNaN(h)) return time;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = ((h + 11) % 12) + 1;
  return `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
}

function initialsFor(name = "") {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?"
  );
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [apptTab, setApptTab] = useState("upcoming");

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      setLoading(true);
      setLoadError("");
      try {
        const [appointmentsRes, doctorsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/appointments`),
          fetch(`${API_BASE_URL}/api/doctors`),
        ]);

        const appointmentsJson = await appointmentsRes.json().catch(() => ({}));
        const doctorsJson = await doctorsRes.json().catch(() => ({}));

        if (!appointmentsRes.ok) throw new Error(appointmentsJson.error || "Failed to load appointments");
        if (!doctorsRes.ok) throw new Error(doctorsJson.error || "Failed to load doctors");

        if (isMounted) {
          setAppointments(appointmentsJson.data || []);
          setDoctors(doctorsJson.data || []);
        }
      } catch (err) {
        if (isMounted) setLoadError(err.message || "Failed to load dashboard data");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadDashboardData();
    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const today = new Date();
    const todayKey = toDateKey(today);
    const monthKey = todayKey.slice(0, 7); // "YYYY-MM"
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const todaysAppointments = appointments.filter((a) => a.date === todayKey);
    const todaysRevenue = todaysAppointments.reduce((sum, a) => sum + (a.amount || 0), 0);

    const monthlyRevenue = appointments
      .filter((a) => a.date?.startsWith(monthKey))
      .reduce((sum, a) => sum + (a.amount || 0), 0);

    const newPatientEmails = new Set(
      appointments
        .filter((a) => a.createdAt && new Date(a.createdAt) >= thirtyDaysAgo)
        .map((a) => a.patientEmail)
    );

    const pendingCount = appointments.filter((a) => a.status === "Pending").length;

    const ratedDoctors = doctors.filter((d) => d.reviews > 0);
    const clinicRating = ratedDoctors.length
      ? ratedDoctors.reduce((sum, d) => sum + d.rating, 0) / ratedDoctors.length
      : null;

    return {
      todayKey,
      todaysRevenue,
      todaysAppointments,
      monthlyRevenue,
      newPatientsCount: newPatientEmails.size,
      pendingCount,
      clinicRating,
    };
  }, [appointments, doctors]);

  // Last 7 days of revenue, oldest to newest, for the trends bar chart.
  const revenueBars = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return toDateKey(d);
    });

    const totals = days.map((dateKey) =>
      appointments.filter((a) => a.date === dateKey).reduce((sum, a) => sum + (a.amount || 0), 0)
    );
    const max = Math.max(1, ...totals);

    return days.map((dateKey, i) => ({
      dateKey,
      amount: totals[i],
      height: Math.max(6, Math.round((totals[i] / max) * 100)),
      label: formatCurrency(totals[i]),
    }));
  }, [appointments]);

  // Doctors ranked by how many appointments actually reference them.
  const topSpecialists = useMemo(() => {
    const countsByDoctor = new Map();
    appointments.forEach((a) => {
      const key = a.doctor?._id || a.doctor;
      if (!key) return;
      countsByDoctor.set(key, (countsByDoctor.get(key) || 0) + 1);
    });

    return [...doctors]
      .map((doc) => ({ ...doc, appointmentCount: countsByDoctor.get(doc._id) || 0 }))
      .sort((a, b) => b.appointmentCount - a.appointmentCount)
      .slice(0, 3);
  }, [appointments, doctors]);

  const recentAppointments = useMemo(() => {
    const sorted = [...appointments].sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
    return sorted
      .filter((a) => (apptTab === "upcoming" ? UPCOMING_STATUSES.includes(a.status) : a.status === "Completed"))
      .slice(0, 8);
  }, [appointments, apptTab]);

  return (
    <AdminLayout
      title="Clinic Overview"
      subtitle="Welcome back. Here's what's happening today at PureDent."
      headerActions={
        <>
          <button className="flex items-center gap-1 px-6 py-3 rounded-xl border border-primary/20 text-primary font-bold hover:bg-primary/5 transition-colors">
            <span className="material-symbols-outlined text-[20px]">download</span>
            Reports
          </button>
          <button
            onClick={() => navigate("/admin/add-dentist")}
            className="flex items-center gap-1 px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            Add Dentist
          </button>
        </>
      }
    >
      {loadError && (
        <div className="glass-card rounded-2xl p-4 border border-error/20 bg-error-container/10 text-error text-sm font-semibold">
          Couldn't load live dashboard data: {loadError}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-primary-fixed rounded-xl text-primary">
              <span className="material-symbols-outlined">payments</span>
            </div>
          </div>
          <div>
            <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest">Today&apos;s Revenue</p>
            <h3 className="font-bold text-xl mt-1">{loading ? "—" : formatCurrency(stats.todaysRevenue)}</h3>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-secondary-container rounded-xl text-on-secondary-container">
              <span className="material-symbols-outlined">group</span>
            </div>
          </div>
          <div>
            <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest">New Patients (30d)</p>
            <h3 className="font-bold text-xl mt-1">{loading ? "—" : stats.newPatientsCount}</h3>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-tertiary-fixed rounded-xl text-on-tertiary-fixed-variant">
              <span className="material-symbols-outlined">payments</span>
            </div>
          </div>
          <div>
            <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest">Monthly Revenue</p>
            <h3 className="font-bold text-xl mt-1">{loading ? "—" : formatCurrency(stats.monthlyRevenue)}</h3>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-surface-container-high rounded-xl text-on-surface-variant">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
          </div>
          <div>
            <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest">Pending Appointments</p>
            <h3 className="font-bold text-xl mt-1">{loading ? "—" : stats.pendingCount}</h3>
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
              {loading ? (
                <tr>
                  <td className="p-6 text-sm text-on-surface-variant" colSpan={4}>Loading today&apos;s schedule...</td>
                </tr>
              ) : stats.todaysAppointments.length === 0 ? (
                <tr>
                  <td className="p-6 text-sm text-on-surface-variant" colSpan={4}>No appointments scheduled for today.</td>
                </tr>
              ) : (
                stats.todaysAppointments
                  .slice()
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((row) => (
                    <tr key={row._id} className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="p-6 text-sm">{formatTimeLabel(row.time)}</td>
                      <td className="p-6 text-sm font-bold">{row.doctorName}</td>
                      <td className="p-6 text-sm">{row.serviceName}</td>
                      <td className="p-6 text-sm text-right font-bold text-primary">{formatCurrency(row.amount)}</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Graph */}
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-lg text-primary">Revenue Trends</h4>
            <span className="bg-surface-container-low rounded-lg py-1 px-4 text-sm text-on-surface-variant">Last 7 Days</span>
          </div>
          <div className="flex-1 w-full min-h-[300px] relative flex items-end gap-2 pb-6">
            <div className="absolute inset-0 flex flex-col justify-between py-6 opacity-10">
              <div className="border-b border-on-surface" />
              <div className="border-b border-on-surface" />
              <div className="border-b border-on-surface" />
              <div className="border-b border-on-surface" />
            </div>
            {loading ? (
              <p className="text-sm text-on-surface-variant m-auto">Loading revenue trends...</p>
            ) : (
              revenueBars.map((bar) => (
                <div
                  key={bar.dateKey}
                  className="flex-1 bg-primary/30 rounded-t-lg transition-all hover:bg-primary/60 group relative"
                  style={{ height: `${bar.height}%` }}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {bar.label}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Specialists */}
        <div className="glass-card p-6 rounded-3xl flex flex-col">
          <h4 className="font-bold text-lg text-primary mb-6">Top Specialists</h4>
          <div className="space-y-6 flex-1">
            {loading ? (
              <p className="text-sm text-on-surface-variant">Loading specialists...</p>
            ) : topSpecialists.length === 0 ? (
              <p className="text-sm text-on-surface-variant">No doctors on record yet.</p>
            ) : (
              topSpecialists.map((doc) => (
                <div key={doc._id} className="flex items-center gap-4">
                  {doc.photoUrl ? (
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      alt={doc.name}
                      src={resolveAssetUrl(doc.photoUrl)}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {initialsFor(doc.name)}
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-bold text-sm">{doc.name}</p>
                    <p className="text-on-surface-variant text-[12px]">
                      {doc.specialty} • {doc.appointmentCount} Appts
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                </div>
              ))
            )}
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
              {loading ? (
                <tr>
                  <td className="p-6 text-sm text-on-surface-variant" colSpan={6}>Loading appointments...</td>
                </tr>
              ) : recentAppointments.length === 0 ? (
                <tr>
                  <td className="p-6 text-sm text-on-surface-variant" colSpan={6}>
                    No {apptTab === "upcoming" ? "upcoming" : "completed"} appointments to show.
                  </td>
                </tr>
              ) : (
                recentAppointments.map((row) => {
                  const style = STATUS_STYLES[row.status] || DEFAULT_STATUS_STYLE;
                  return (
                    <tr key={row._id} className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${style.avatar}`}>
                            {initialsFor(row.patientName)}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{row.patientName}</p>
                            <p className="text-[11px] text-on-surface-variant">ID: {row.appointmentCode}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-sm">{row.doctorName}</td>
                      <td className="p-6 text-sm">{row.serviceName}</td>
                      <td className="p-6 text-sm">{formatTimeLabel(row.time)}</td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${style.row}`}>{row.status}</span>
                      </td>
                      <td className="p-6 text-right">
                        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-surface-container-low/30 text-center">
          <button
            onClick={() => navigate("/admin/appointments")}
            className="text-primary font-bold text-sm hover:underline"
          >
            View All Appointments
          </button>
        </div>
      </section>
    </AdminLayout>
  );
}
