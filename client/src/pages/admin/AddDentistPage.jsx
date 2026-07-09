import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SPECIALIZATIONS = [
  "General Dentistry",
  "Orthodontics",
  "Periodontics",
  "Oral Surgery",
  "Cosmetic Dentistry",
  "Endodontics",
  "Pediatric Dentistry",
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const initialForm = {
  fullName: "",
  specialization: SPECIALIZATIONS[0],
  email: "",
  phone: "",
  experienceYears: "",
  consultationFee: "",
  bio: "",
  workingDays: [],
};

export default function AddDentistPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // "success" | "error" | null

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleWorkingDay = (day) => {
    setForm((prev) => {
      const alreadySelected = prev.workingDays.includes(day);
      return {
        ...prev,
        workingDays: alreadySelected
          ? prev.workingDays.filter((d) => d !== day)
          : [...prev.workingDays, day],
      };
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, photo: "Please upload an image file." }));
      return;
    }

    setPhotoFile(file);
    setErrors((prev) => ({ ...prev, photo: undefined }));

    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    if (!form.experienceYears || Number(form.experienceYears) < 0)
      next.experienceYears = "Enter a valid number of years.";
    if (form.workingDays.length === 0) next.workingDays = "Select at least one working day.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        payload.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
      });
      if (photoFile) payload.append("photo", photoFile);

      const res = await fetch(`${API_BASE_URL}/api/dentists`, {
        method: "POST",
        body: payload,
      });

      if (!res.ok) throw new Error("Request failed");

      setSubmitStatus("success");
      setForm(initialForm);
      setPhotoFile(null);
      setPhotoPreview(null);
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen">
      {/* Header */}
      <header className="sticky top-0 w-full z-30 bg-surface/80 backdrop-blur-md px-margin-mobile md:px-margin-desktop py-4 flex items-center gap-md shadow-[0px_10px_30px_rgba(15,118,110,0.04)]">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="p-2 rounded-full hover:bg-surface-container-low text-primary transition-colors"
          aria-label="Back to dashboard"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h1 className="font-headline-sm text-headline-sm text-primary">Add Dentist</h1>
          <p className="text-on-surface-variant text-body-sm">Onboard a new specialist to PureDent</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-lg md:p-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-8 glass-card bg-white/80 backdrop-blur-md border border-primary/5 shadow-[0px_10px_30px_rgba(15,118,110,0.04)] rounded-xxl p-lg space-y-lg"
          noValidate
        >
          {/* Photo Upload */}
          <div className="flex items-center gap-lg">
            <div className="w-20 h-20 rounded-full bg-surface-container-low border-2 border-dashed border-outline-variant flex items-center justify-center overflow-hidden shrink-0">
              {photoPreview ? (
                <img src={photoPreview} alt="Dentist preview" className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-outline text-3xl">person</span>
              )}
            </div>
            <div>
              <label
                htmlFor="photo"
                className="inline-flex items-center gap-xs px-lg py-2.5 rounded-xl border border-primary/20 text-primary font-bold hover:bg-primary/5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">upload</span>
                Upload Photo
              </label>
              <input id="photo" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              {errors.photo && <p className="text-error text-body-sm mt-1">{errors.photo}</p>}
              <p className="text-on-surface-variant text-body-sm mt-1">JPG or PNG, at least 400x400px.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant">Full Name</label>
              <input
                type="text"
                placeholder="Dr. Jane Doe"
                className="w-full h-12 px-md rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
              />
              {errors.fullName && <p className="text-error text-body-sm">{errors.fullName}</p>}
            </div>

            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant">Specialization</label>
              <select
                className="w-full h-12 px-md rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                value={form.specialization}
                onChange={(e) => updateField("specialization", e.target.value)}
              >
                {SPECIALIZATIONS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant">Email Address</label>
              <input
                type="email"
                placeholder="jane.doe@puredent.com"
                className="w-full h-12 px-md rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
              {errors.email && <p className="text-error text-body-sm">{errors.email}</p>}
            </div>

            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 (555) 234-9000"
                className="w-full h-12 px-md rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
              {errors.phone && <p className="text-error text-body-sm">{errors.phone}</p>}
            </div>

            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant">Years of Experience</label>
              <input
                type="number"
                min="0"
                placeholder="8"
                className="w-full h-12 px-md rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                value={form.experienceYears}
                onChange={(e) => updateField("experienceYears", e.target.value)}
              />
              {errors.experienceYears && <p className="text-error text-body-sm">{errors.experienceYears}</p>}
            </div>

            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant">Consultation Fee (USD)</label>
              <input
                type="number"
                min="0"
                placeholder="150"
                className="w-full h-12 px-md rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                value={form.consultationFee}
                onChange={(e) => updateField("consultationFee", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-xs">
            <label className="font-label-md text-label-md text-on-surface-variant">Bio</label>
            <textarea
              rows={4}
              placeholder="A short professional summary shown on the doctor's profile..."
              className="w-full p-md rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
              value={form.bio}
              onChange={(e) => updateField("bio", e.target.value)}
            />
          </div>

          <div className="space-y-xs">
            <label className="font-label-md text-label-md text-on-surface-variant">Working Days</label>
            <div className="flex flex-wrap gap-sm">
              {WEEKDAYS.map((day) => {
                const selected = form.workingDays.includes(day);
                return (
                  <button
                    type="button"
                    key={day}
                    onClick={() => toggleWorkingDay(day)}
                    className={
                      selected
                        ? "px-md py-2 rounded-full bg-secondary-container text-on-secondary-container font-bold text-body-sm transition-all"
                        : "px-md py-2 rounded-full bg-surface-container-low text-on-surface-variant font-bold text-body-sm hover:bg-surface-container-high transition-all"
                    }
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            {errors.workingDays && <p className="text-error text-body-sm">{errors.workingDays}</p>}
          </div>

          {submitStatus === "success" && (
            <div className="flex items-center gap-xs bg-secondary-container/20 border border-secondary/10 text-on-secondary-container rounded-xl px-md py-sm text-body-sm">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              Dentist added successfully.
            </div>
          )}
          {submitStatus === "error" && (
            <div className="flex items-center gap-xs bg-error-container/20 border border-error/10 text-error rounded-xl px-md py-sm text-body-sm">
              <span className="material-symbols-outlined text-[18px]">error</span>
              Something went wrong. Please try again.
            </div>
          )}

          <div className="flex gap-sm">
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="px-lg py-3 rounded-xl border border-outline-variant text-on-surface-variant font-bold hover:bg-surface-container-low transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-xs px-lg py-3 rounded-xl bg-primary text-on-primary font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-on-primary/40 border-t-on-primary rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                  Save Dentist
                </>
              )}
            </button>
          </div>
        </form>

        {/* Live Preview */}
        <div className="lg:col-span-4">
          <div className="glass-card bg-white/80 backdrop-blur-md border border-primary/5 shadow-[0px_10px_30px_rgba(15,118,110,0.04)] rounded-xxl p-lg sticky top-24">
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-md">
              Profile Preview
            </p>
            <div className="flex flex-col items-center text-center gap-sm">
              <div className="w-24 h-24 rounded-full bg-surface-container-low border-2 border-primary/10 flex items-center justify-center overflow-hidden">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-outline text-4xl">person</span>
                )}
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary">
                {form.fullName || "Dentist Name"}
              </h3>
              <p className="text-on-surface-variant text-body-sm">{form.specialization}</p>
              {form.experienceYears && (
                <span className="bg-secondary-container/20 text-on-secondary-container px-3 py-1 rounded-full text-[12px] font-bold">
                  {form.experienceYears} yrs experience
                </span>
              )}
              {form.bio && <p className="text-body-sm text-on-surface-variant mt-sm">{form.bio}</p>}
              {form.workingDays.length > 0 && (
                <div className="flex flex-wrap justify-center gap-xs mt-sm">
                  {form.workingDays.map((d) => (
                    <span key={d} className="px-2 py-0.5 rounded-full bg-surface-container-low text-[11px] font-bold text-on-surface-variant">
                      {d}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}