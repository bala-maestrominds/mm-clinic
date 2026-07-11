import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const STATUS_STYLES = {
  Confirmed: "bg-secondary-container/20 text-on-secondary-container",
  "In-Progress": "bg-tertiary-fixed-dim/20 text-tertiary-container",
  Pending: "bg-surface-container-high text-on-surface-variant",
  Cancelled: "bg-error-container/40 text-error",
  Completed: "bg-primary/10 text-primary",
};

const STATUS_FILTERS = ["All", "Confirmed", "Pending", "In-Progress", "Completed", "Cancelled"];

function formatTimeLabel(time) {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = ((h + 11) % 12) + 1;
  return `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const loadAppointments = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load appointments");
      setAppointments(json.data || []);
    } catch (err) {
      setLoadError(err.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const matchesStatus = statusFilter === "All" || a.status === statusFilter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        a.patientName?.toLowerCase().includes(q) ||
        a.doctorName?.toLowerCase().includes(q) ||
        a.appointmentCode?.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [appointments, search, statusFilter]);

  const updateStatus = async (id, status) => {
    const previous = appointments;
    setAppointments((prev) => prev.map((a) => (a._id === id ? { ...a, status } : a)));
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
    } catch (err) {
      // Revert optimistic update on failure.
      setAppointments(previous);
    }
  };

  return (
    <AdminLayout
      title="Appointments"
      subtitle="View, filter, and manage every scheduled visit."
      headerActions={
        <a
          href="/book"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          New Appointment
        </a>
      }
    >
      {/* Filters */}
      <section className="glass-card rounded-3xl p-6 flex flex-col md:flex-row gap-4 md:items-center">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            type="text"
            placeholder="Search by patient, doctor, or booking ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={
                statusFilter === s
                  ? "px-4 py-2 rounded-full bg-primary text-white text-xs font-bold transition-all"
                  : "px-4 py-2 rounded-full bg-surface-container-low text-on-surface-variant text-xs font-bold hover:bg-surface-container-high transition-all"
              }
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Table */}
      <section className="glass-card rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low/50">
              <tr>
                <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Patient</th>
                <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Doctor</th>
                <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Treatment</th>
                <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Date &amp; Time</th>
                <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Check-in</th>
                <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {loading && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-on-surface-variant text-sm">
                    Loading appointments…
                  </td>
                </tr>
              )}
              {!loading && loadError && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-error text-sm">
                    {loadError}
                  </td>
                </tr>
              )}
              {!loading &&
                !loadError &&
                filtered.map((a) => (
                  <tr key={a._id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-6">
                      <p className="font-bold text-sm">{a.patientName}</p>
                      <p className="text-[11px] text-on-surface-variant">ID: {a.appointmentCode}</p>
                    </td>
                    <td className="p-6 text-sm">{a.doctorName}</td>
                    <td className="p-6 text-sm">{a.serviceName}</td>
                    <td className="p-6 text-sm">
                      {a.date} <span className="text-on-surface-variant">· {formatTimeLabel(a.time)}</span>
                    </td>
                    <td className="p-6 text-sm">
                      {a.checkInStatus === "checked_in" ? (
                        <span className="flex items-center gap-1 text-primary font-semibold text-xs">
                          <span className="material-symbols-outlined text-[16px]">check_circle</span>
                          Checked in
                        </span>
                      ) : (
                        <span className="text-on-surface-variant text-xs">Not arrived</span>
                      )}
                    </td>
                    <td className="p-6">
                      <select
                        value={a.status}
                        onChange={(e) => updateStatus(a._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-[12px] font-bold border-none outline-none cursor-pointer ${STATUS_STYLES[a.status]}`}
                      >
                        {Object.keys(STATUS_STYLES).map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              {!loading && !loadError && filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-on-surface-variant text-sm">
                    No appointments match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  );
}