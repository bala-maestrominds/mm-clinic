import { useMemo, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const PATIENTS = [
  { id: "PD-8821", name: "Jonathan Smith", email: "jonathan.smith@email.com", phone: "+1 (555) 201-3344", lastVisit: "2024-07-10", nextVisit: "2024-08-14", totalVisits: 12 },
  { id: "PD-7729", name: "Alice Wonderland", email: "alice.w@email.com", phone: "+1 (555) 402-9981", lastVisit: "2024-07-10", nextVisit: "—", totalVisits: 4 },
  { id: "PD-9122", name: "Robert Lewandowski", email: "robert.l@email.com", phone: "+1 (555) 778-2210", lastVisit: "2024-07-10", nextVisit: "2024-07-24", totalVisits: 8 },
  { id: "PD-6650", name: "Maria Gonzalez", email: "maria.g@email.com", phone: "+1 (555) 331-0092", lastVisit: "2024-07-01", nextVisit: "2024-07-11", totalVisits: 21 },
  { id: "PD-5518", name: "David Okafor", email: "david.okafor@email.com", phone: "+1 (555) 664-7723", lastVisit: "2024-06-28", nextVisit: "—", totalVisits: 3 },
  { id: "PD-4407", name: "Priya Nair", email: "priya.nair@email.com", phone: "+1 (555) 890-1123", lastVisit: "2024-06-20", nextVisit: "2024-08-02", totalVisits: 15 },
];

function initials(name) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PATIENTS;
    return PATIENTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <AdminLayout
      title="Patients"
      subtitle="Search and manage patient records."
      headerActions={
        <button className="flex items-center gap-1 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Add Patient
        </button>
      }
    >
      <section className="glass-card rounded-3xl p-6">
        <div className="relative max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            type="text"
            placeholder="Search patients by name, email, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-sm"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
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
        {filtered.length === 0 && (
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
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md h-full bg-surface-container-lowest shadow-2xl p-6 overflow-y-auto space-y-6">
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

        <div className="flex gap-2">
          <button className="flex-1 py-2.5 rounded-xl border border-primary/20 text-primary font-bold text-sm hover:bg-primary/5">
            Edit Record
          </button>
          <button className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}