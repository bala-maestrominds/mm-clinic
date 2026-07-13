import { useEffect, useMemo, useState, useCallback } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "../../api/servicesApi";
import { resolveAssetUrl } from "../../utils/api";

const EMPTY_FORM = {
  name: "",
  category: "General",
  shortDescription: "",
  description: "",
  priceFrom: "",
  durationMinutes: "",
  imageFile: null,
};

export default function TreatmentsPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null); // null = adding
  const [deletingId, setDeletingId] = useState(null);

  const loadServices = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchServices();
      setServices(data || []);
    } catch (err) {
      setError(err.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(services.map((s) => s.category).filter(Boolean)))],
    [services]
  );

  const filtered = useMemo(
    () => (category === "All" ? services : services.filter((s) => s.category === category)),
    [services, category]
  );

  const openAddModal = () => {
    setEditingService(null);
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setModalOpen(true);
  };

  const handleSave = async (formValues) => {
    if (editingService) {
      const updated = await updateService(editingService._id, formValues);
      setServices((prev) => prev.map((s) => (s._id === updated._id ? updated : s)));
    } else {
      const created = await createService(formValues);
      setServices((prev) => [...prev, created]);
    }
    setModalOpen(false);
    setEditingService(null);
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete service");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout
      title="Services"
      subtitle="Manage the services PureDent offers, shown live on the public website."
      headerActions={
        <button
          onClick={openAddModal}
          className="flex items-center gap-1 px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Service
        </button>
      }
    >
      <section className="flex flex-wrap gap-2 animate-fade-in">
        {categories.map((c) => (
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

      {error && (
        <div className="rounded-xl bg-red-50 text-red-600 text-sm px-4 py-3 border border-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <ServicesSkeleton />
      ) : filtered.length === 0 ? (
        <div className="glass-card rounded-3xl p-10 text-center text-on-surface-variant">
          No services yet. Click "Add Service" to create your first one.
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s, i) => (
            <ServiceCard
              key={s._id}
              service={s}
              style={{ animationDelay: `${i * 40}ms` }}
              onEdit={() => openEditModal(s)}
              onDelete={() => handleDelete(s._id)}
              deleting={deletingId === s._id}
            />
          ))}
        </section>
      )}

      {modalOpen && (
        <ServiceModal
          initial={editingService}
          onClose={() => {
            setModalOpen(false);
            setEditingService(null);
          }}
          onSave={handleSave}
        />
      )}
    </AdminLayout>
  );
}

function ServiceCard({ service, onEdit, onDelete, deleting, style }) {
  const imgSrc = resolveAssetUrl(service.imageUrl);
  return (
    <div
      style={style}
      className="glass-card rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-rise-in"
    >
      <div className="flex justify-between items-start mb-4">
        {/* <div className="w-14 h-14 rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={service.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="material-symbols-outlined">dentistry</span>
          )}
        </div> */}
        <span className="px-3 py-1 rounded-full bg-surface-container-low text-[11px] font-bold text-on-surface-variant">
          {service.category}
        </span>
      </div>
      <h4 className="font-bold text-lg text-primary mb-1">{service.name}</h4>
      <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">
        {service.shortDescription || service.description || "No description yet."}
      </p>
      <p className="text-sm text-on-surface-variant flex items-center gap-1 mb-4">
        <span className="material-symbols-outlined text-[16px]">schedule</span>
        {service.durationMinutes} min
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
        <span className="font-bold text-xl text-primary">
          {service.priceFrom ? `₹${service.priceFrom}` : "Contact us"}
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={onEdit}
            className="text-on-surface-variant hover:text-primary transition-colors active:scale-90"
            title="Edit"
          >
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button
            onClick={onDelete}
            disabled={deleting}
            className="text-on-surface-variant hover:text-red-500 transition-colors active:scale-90 disabled:opacity-40"
            title="Delete"
          >
            <span className="material-symbols-outlined">
              {deleting ? "hourglass_empty" : "delete"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ServicesSkeleton() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="glass-card rounded-3xl p-6 animate-pulse">
          <div className="w-14 h-14 rounded-xl bg-surface-container-high mb-4" />
          <div className="h-4 w-2/3 bg-surface-container-high rounded mb-2" />
          <div className="h-3 w-full bg-surface-container-high rounded mb-1" />
          <div className="h-3 w-1/2 bg-surface-container-high rounded mb-4" />
          <div className="h-5 w-1/3 bg-surface-container-high rounded" />
        </div>
      ))}
    </section>
  );
}

function ServiceModal({ initial, onClose, onSave }) {
  const isEditing = Boolean(initial);
  const [form, setForm] = useState(
    initial
      ? {
          name: initial.name || "",
          category: initial.category || "General",
          shortDescription: initial.shortDescription || "",
          description: initial.description || "",
          priceFrom: initial.priceFrom ?? "",
          durationMinutes: initial.durationMinutes ?? "",
          imageFile: null,
        }
      : EMPTY_FORM
  );
  const [preview, setPreview] = useState(initial ? resolveAssetUrl(initial.imageUrl) : "");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((f) => ({ ...f, imageFile: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.name.trim() || !form.durationMinutes) {
      setFormError("Name and duration are required.");
      return;
    }
    setSaving(true);
    try {
      await onSave({
        ...form,
        priceFrom: form.priceFrom === "" ? null : form.priceFrom,
      });
    } catch (err) {
      setFormError(err.message || "Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  return (
    /* Outer container matching PatientDetailPanel layout & backdrop structure */
    <div className="fixed inset-0 z-50 flex justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      
      {/* Form layout matched to PatientDetailPanel:
        w-full sm:w-[600px] h-full p-6 overflow-y-auto space-y-6 bg-surface-container-lowest 
      */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full sm:w-[600px] h-full bg-white shadow-2xl p-6 overflow-y-auto space-y-6"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-primary">
            {isEditing ? "Edit Service" : "Add Service"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary transition-transform hover:rotate-90 duration-200"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {formError && (
          <div className="rounded-xl bg-red-50 text-red-600 text-xs px-3 py-2 border border-red-200">
            {formError}
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container-high flex items-center justify-center shrink-0">
              {preview ? (
                <img src={preview} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-on-surface-variant">image</span>
              )}
            </div>
            <label className="flex-1 text-xs font-semibold text-on-surface-variant cursor-pointer">
              <span className="block mb-1">Service image</span>
              <input type="file" accept="image/*" onChange={handleFile} className="text-xs" />
            </label>
          </div>

          <input
            className="w-full h-11 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-shadow"
            placeholder="Service name"
            value={form.name}
            onChange={update("name")}
            required
          />
          <input
            className="w-full h-11 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-shadow"
            placeholder="Category (e.g. General, Cosmetic)"
            value={form.category}
            onChange={update("category")}
          />
          <input
            className="w-full h-11 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-shadow"
            placeholder="Short description"
            value={form.shortDescription}
            onChange={update("shortDescription")}
          />
          <textarea
            className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-shadow"
            placeholder="Full description"
            rows={3}
            value={form.description}
            onChange={update("description")}
          />
          <div className="flex gap-3">
            <input
              type="number"
              min="0"
              className="w-full h-11 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-shadow"
              placeholder="Price from ($)"
              value={form.priceFrom}
              onChange={update("priceFrom")}
            />
            <input
              type="number"
              min="5"
              className="w-full h-11 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-shadow"
              placeholder="Duration (min)"
              value={form.durationMinutes}
              onChange={update("durationMinutes")}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full h-12 rounded-xl bg-primary text-on-primary font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
        >
          {saving ? "Saving..." : isEditing ? "Save changes" : "Add service"}
        </button>
      </form>
    </div>
  );
}