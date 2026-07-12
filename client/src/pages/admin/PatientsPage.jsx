import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function initials(name) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function formatTimeLabel(time) {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  if (Number.isNaN(h)) return time;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = ((h + 11) % 12) + 1;
  return `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
}

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPatientsData() {
      setLoading(true);
      setLoadError("");
      try {
        const res = await fetch(`${API_BASE_URL}/api/appointments`);
        const json = await res.json().catch(() => ({}));

        if (!res.ok) throw new Error(json.error || "Failed to load appointments");

        if (isMounted) {
          setAppointments(json.data || []);
        }
      } catch (err) {
        if (isMounted) setLoadError(err.message || "Failed to load dashboard data");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadPatientsData();
    return () => {
      isMounted = false;
    };
  }, []);

  const patientsList = useMemo(() => {
    const patientMap = new Map();
    const todayStr = new Date().toISOString().slice(0, 10);

    const sorted = [...appointments].sort(
      (a, b) => new Date(a.date || 0) - new Date(b.date || 0)
    );

    sorted.forEach((appt) => {
      const key = appt.patientEmail?.toLowerCase() || appt.patientName || appt._id;
      if (!key) return;

      if (!patientMap.has(key)) {
        patientMap.set(key, {
          id: appt.appointmentCode || appt._id?.slice(-6),
          name: appt.patientName,
          email: appt.patientEmail,
          phone: appt.patientPhone,
          age: appt.patientAge,
          gender: appt.patientGender,
          lastVisit: "—",
          nextVisit: "—",
          totalVisits: 0,
          history: []
        });
      }

      const existing = patientMap.get(key);
      const apptDate = appt.date;

      if (appt.patientAge && !existing.age) existing.age = appt.patientAge;
      if (appt.patientGender && !existing.gender) existing.gender = appt.patientGender;

      if (apptDate) {
        if (apptDate <= todayStr) {
          existing.lastVisit = apptDate;
        } else if (existing.nextVisit === "—" || apptDate < existing.nextVisit) {
          existing.nextVisit = apptDate;
        }
      }

      if (appt.status === "Completed" || apptDate <= todayStr) {
        existing.totalVisits += 1;
      }

      existing.history.push({
        _id: appt._id,
        code: appt.appointmentCode,
        date: appt.date,
        time: appt.time,
        serviceName: appt.serviceName,
        doctorName: appt.doctorName,
        status: appt.status,
        amount: appt.amount,
        paymentStatus: appt.paymentStatus,
        notes: appt.notes,
        createdAt: appt.createdAt
      });
    });

    const result = Array.from(patientMap.values());
    result.forEach(p => {
      p.history.sort((a, b) => new Date(b.date + "T" + b.time) - new Date(a.date + "T" + a.time));
    });

    return result;
  }, [appointments]);

  // Keep detail panel sync'd up if underlying data changes
  useEffect(() => {
    if (selected) {
      const liveRecord = patientsList.find(p => p.email?.toLowerCase() === selected.email?.toLowerCase());
      if (liveRecord) setSelected(liveRecord);
    }
  }, [patientsList]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase().replace("#", "");
    if (!q) return patientsList;
    return patientsList.filter(
      (p) => p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
    );
  }, [search, patientsList]);

  return (
    <AdminLayout
      title="Patients"
      subtitle="Search and manage patient records."
      headerActions={
        <button className="flex items-center gap-1 px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Add Patient
        </button>
      }
    >
      {loadError && (
        <div className="glass-card rounded-2xl p-4 border border-error/20 bg-error-container/10 text-error text-sm font-semibold">
          Couldn&apos;t load live dashboard data: {loadError}
        </div>
      )}

      {/* Search Bar Section */}
      <div className="mb-8 relative max-w-md">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[22px]">
          search
        </span>
        <input
          type="text"
          placeholder="Search patients by name, email, or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-auto pl-12 pr-4 py-3 rounded-2xl border border-outline-variant/30 bg-surface-container-low focus:outline-none focus:border-primary/50 text-sm transition-all shadow-sm"
        />
        {search && (
          <button 
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-16 text-on-surface-variant text-sm">
            Loading patients data...
          </div>
        ) : filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className="glass-card rounded-3xl p-6 text-left hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                {initials(p.name)}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm truncate">{p.name}</p>
                <p className="text-[11px] text-on-surface-variant">ID: #{p.id}</p>
              </div>
            </div>
            <div className="space-y-1 text-sm text-on-surface-variant">
              <p className="truncate">{p.email}</p>
              <p>{p.phone}</p>
            </div>
            <div className="flex justify-between mt-4 pt-4 border-t border-outline-variant/20 text-xs">
              <span className="text-on-surface-variant">Last visit: {p.lastVisit}</span>
              <span className="font-bold text-primary">{p.totalVisits} visits</span>
            </div>
          </button>
        ))}
        {!loading && filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-on-surface-variant text-sm">
            No patients match your search.
          </div>
        )}
      </section>

      {selected && <PatientDetailPanel patient={selected} onClose={() => setSelected(null)} />}
    </AdminLayout>
  );
}

function PatientDetailPanel({ patient, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full sm:w-[600px] h-full bg-white shadow-2xl p-6 overflow-y-auto space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-primary">Patient Details</h3>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl shrink-0">
            {initials(patient.name)}
          </div>
          <div>
            <p className="font-bold text-lg">{patient.name}</p>
            <p className="text-sm text-on-surface-variant">ID: #{patient.id}</p>
            {(patient.age || patient.gender) && (
              <p className="text-xs text-on-surface-variant mt-0.5">
                {[patient.age ? `${patient.age} yrs` : "", patient.gender].filter(Boolean).join(" • ")}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low text-sm">
            <span className="material-symbols-outlined text-primary text-[20px]">mail</span>
            {patient.email}
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low text-sm">
            <span className="material-symbols-outlined text-primary text-[20px]">call</span>
            {patient.phone}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-surface-container-low text-center">
            <p className="text-xs text-on-surface-variant uppercase tracking-wide">Last Visit</p>
            <p className="font-bold mt-1">{patient.lastVisit}</p>
          </div>
          <div className="p-4 rounded-xl bg-surface-container-low text-center">
            <p className="text-xs text-on-surface-variant uppercase tracking-wide">Next Visit</p>
            <p className="font-bold mt-1">{patient.nextVisit}</p>
          </div>
        </div>

        {/* Treatment History Records Section */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-primary uppercase tracking-wider">Treatment History</h4>
          <div className="space-y-3">
            {patient.history.map((record) => (
              <div key={record._id} className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-sm">{record.serviceName}</p>
                    <p className="text-xs text-on-surface-variant">Dr. {record.doctorName}</p>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                    {record.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-on-surface-variant pt-2 border-t border-outline-variant/10">
                  <span>{record.date} at {formatTimeLabel(record.time)}</span>
                  <span className="font-mono text-[11px] text-primary">#{record.code}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-on-surface-variant">
                  <span>Method: {record.paymentStatus === "paid" ? "Paid" : "Pending"}</span>
                  <span className="font-bold text-surface-on">${record.amount}</span>
                </div>
                {record.notes && (
                  <div className="mt-2 p-2 bg-white/60 rounded text-xs text-on-surface-variant italic border-l-2 border-primary/30">
                    <strong>Notes:</strong> {record.notes}
                  </div>
                )}
              </div>
            ))}
            {patient.history.length === 0 && (
              <p className="text-xs text-on-surface-variant text-center py-4">No appointment history records found.</p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 py-2.5 rounded-xl border border-primary/20 text-primary font-bold text-sm hover:bg-primary/5">
            Edit Record
          </button>
          <button className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold text-sm">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}