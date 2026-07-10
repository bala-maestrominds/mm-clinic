import { useMemo, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const STATUS_STYLES = {
  Confirmed: "bg-secondary-container/20 text-on-secondary-container",
  "In-Progress": "bg-tertiary-fixed-dim/20 text-tertiary-container",
  Pending: "bg-surface-container-high text-on-surface-variant",
  Cancelled: "bg-error-container/40 text-error",
  Completed: "bg-primary/10 text-primary",
};

const INITIAL_APPOINTMENTS = [
  { id: "PD-8821", patient: "Jonathan Smith", doctor: "Dr. Michael Chen", treatment: "Root Canal Therapy", date: "2024-07-10", time: "09:30 AM", status: "Confirmed" },
  { id: "PD-7729", patient: "Alice Wonderland", doctor: "Dr. Aisha Varma", treatment: "Teeth Whitening", date: "2024-07-10", time: "11:00 AM", status: "In-Progress" },
  { id: "PD-9122", patient: "Robert Lewandowski", doctor: "Dr. James Wilson", treatment: "Routine Checkup", date: "2024-07-10", time: "02:15 PM", status: "Pending" },
  { id: "PD-6650", patient: "Maria Gonzalez", doctor: "Dr. Michael Chen", treatment: "Dental Implants", date: "2024-07-11", time: "10:00 AM", status: "Confirmed" },
  { id: "PD-5518", patient: "David Okafor", doctor: "Dr. Aisha Varma", treatment: "Gum Treatment", date: "2024-07-09", time: "03:45 PM", status: "Completed" },
  { id: "PD-4407", patient: "Priya Nair", doctor: "Dr. James Wilson", treatment: "Cavity Filling", date: "2024-07-09", time: "01:30 PM", status: "Cancelled" },
];

const STATUS_FILTERS = ["All", "Confirmed", "Pending", "In-Progress", "Completed", "Cancelled"];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showNewModal, setShowNewModal] = useState(false);

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const matchesStatus = statusFilter === "All" || a.status === statusFilter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        a.patient.toLowerCase().includes(q) ||
        a.doctor.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [appointments, search, statusFilter]);

  const updateStatus = (id, status) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  return (
    <AdminLayout
      title="Appointments"
      subtitle="View, filter, and manage every scheduled visit."
      headerActions={
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-1 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          New Appointment
        </button>
      }
    >
      {/* Filters */}
      <section className="glass-card rounded-3xl p-6 flex flex-col md:flex-row gap-4 md:items-center">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            type="text"
            placeholder="Search by patient, doctor, or ID..."
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
                  ? "px-4 py-2 rounded-full bg-primary text-on-primary text-xs font-bold transition-all"
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
                <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="p-6" />
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="p-6">
                    <p className="font-bold text-sm">{a.patient}</p>
                    <p className="text-[11px] text-on-surface-variant">ID: #{a.id}</p>
                  </td>
                  <td className="p-6 text-sm">{a.doctor}</td>
                  <td className="p-6 text-sm">{a.treatment}</td>
                  <td className="p-6 text-sm">
                    {a.date} <span className="text-on-surface-variant">· {a.time}</span>
                  </td>
                  <td className="p-6">
                    <select
                      value={a.status}
                      onChange={(e) => updateStatus(a.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-[12px] font-bold border-none outline-none cursor-pointer ${STATUS_STYLES[a.status]}`}
                    >
                      {Object.keys(STATUS_STYLES).map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-6 text-right">
                    <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
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

      {showNewModal && <NewAppointmentModal onClose={() => setShowNewModal(false)} />}
    </AdminLayout>
  );
}

function NewAppointmentModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-surface-container-lowest rounded-3xl p-6 w-full max-w-md space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-primary">New Appointment</h3>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="space-y-3">
          <input
            className="w-full h-11 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
            placeholder="Patient name"
          />
          <input
            className="w-full h-11 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
            placeholder="Treatment"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              className="w-full h-11 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
            />
            <input
              type="time"
              className="w-full h-11 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
            />
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant font-bold text-sm">
            Cancel
          </button>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm">
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}