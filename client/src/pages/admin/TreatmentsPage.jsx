import { useMemo, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const TREATMENTS = [
  { name: "Teeth Cleaning", category: "General", duration: "30 min", price: 80, icon: "dentistry" },
  { name: "Cavity Filling", category: "General", duration: "45 min", price: 150, icon: "medical_services" },
  { name: "Root Canal Therapy", category: "Endodontics", duration: "90 min", price: 900, icon: "healing" },
  { name: "Dental Implants", category: "Oral Surgery", duration: "120 min", price: 2200, icon: "clinical_notes" },
  { name: "Teeth Whitening", category: "Cosmetic", duration: "60 min", price: 350, icon: "auto_awesome" },
  { name: "Orthodontic Braces", category: "Orthodontics", duration: "45 min", price: 3800, icon: "health_and_safety" },
  { name: "Gum Treatment", category: "Periodontics", duration: "60 min", price: 400, icon: "spa" },
  { name: "Routine Checkup", category: "General", duration: "20 min", price: 60, icon: "search" },
];

const CATEGORIES = ["All", ...Array.from(new Set(TREATMENTS.map((t) => t.category)))];

export default function TreatmentsPage() {
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filtered = useMemo(
    () => (category === "All" ? TREATMENTS : TREATMENTS.filter((t) => t.category === category)),
    [category]
  );

  return (
    <AdminLayout
      title="Treatments"
      subtitle="Manage the services PureDent offers and their pricing."
      headerActions={
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Treatment
        </button>
      }
    >
      <section className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={
              category === c
                ? "px-4 py-2 rounded-full bg-primary text-white text-xs font-bold transition-all"
                : "px-4 py-2 rounded-full bg-surface-container-low text-on-surface-variant text-xs font-bold hover:bg-surface-container-high transition-all"
            }
          >
            {c}
          </button>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t) => (
          <div key={t.name} className="glass-card rounded-3xl p-6 hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">{t.icon}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-surface-container-low text-[11px] font-bold text-on-surface-variant">
                {t.category}
              </span>
            </div>
            <h4 className="font-bold text-lg text-primary mb-1">{t.name}</h4>
            <p className="text-sm text-on-surface-variant flex items-center gap-1 mb-4">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              {t.duration}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
              <span className="font-bold text-xl text-primary">${t.price.toLocaleString()}</span>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
          </div>
        ))}
      </section>

      {showModal && <AddTreatmentModal onClose={() => setShowModal(false)} />}
    </AdminLayout>
  );
}

function AddTreatmentModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-surface-container-lowest rounded-3xl p-6 w-full max-w-md space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-primary">Add Treatment</h3>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="space-y-3">
          <input
            className="w-full h-11 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
            placeholder="Treatment name"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              className="w-full h-11 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
              placeholder="Duration (e.g. 30 min)"
            />
            <input
              type="number"
              className="w-full h-11 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
              placeholder="Price (USD)"
            />
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant font-bold text-sm">
            Cancel
          </button>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold text-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}