import { useState, useEffect } from "react";
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
const DAY_FULL_NAME = {
  Mon: "monday",
  Tue: "tuesday",
  Wed: "wednesday",
  Thu: "thursday",
  Fri: "friday",
  Sat: "saturday",
  Sun: "sunday",
};

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
  selectedServices: [],
  languages: "English",
  startTime: "09:00",
  endTime: "17:00",
  slotDurationMinutes: "30",
};

export default function AddDentistPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [availableServices, setAvailableServices] = useState([]);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Fetch real services from the backend on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/services`);
        if (res.ok) {
          const jsonResponse = await res.json();
          if (jsonResponse && Array.isArray(jsonResponse.data)) {
            setAvailableServices(jsonResponse.data);
          } else {
            console.error("Unexpected response structure:", jsonResponse);
          }
        }
      } catch (err) {
        console.error("Failed to load services from DB:", err);
      }
    };
    fetchServices();
  }, []);

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

  const toggleService = (serviceId) => {
    setForm((prev) => {
      const alreadySelected = prev.selectedServices.includes(serviceId);
      return {
        ...prev,
        selectedServices: alreadySelected
          ? prev.selectedServices.filter((id) => id !== serviceId)
          : [...prev.selectedServices, serviceId],
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
    if (form.startTime >= form.endTime) next.workingDays = "End time must be after start time.";
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

      const workingHours = form.workingDays.map((day) => ({
        day: DAY_FULL_NAME[day],
        startTime: form.startTime,
        endTime: form.endTime,
      }));

      const languagesArray = form.languages
        .split(",")
        .map((lang) => lang.trim())
        .filter((lang) => lang.length > 0);

      payload.append("name", form.fullName);
      payload.append("specialty", form.specialization);
      payload.append("email", form.email);
      payload.append("phone", form.phone);
      payload.append("experience", `${form.experienceYears} Years Experience`);
      payload.append("price", form.consultationFee);
      payload.append("bio", form.bio);
      payload.append("education", form.education || "DDS, Dental Medical Board Certification");
      payload.append("slotDurationMinutes", form.slotDurationMinutes);
      payload.append("rating", "5.0");
      payload.append("reviews", "0");

      if (photoFile) payload.append("photo", photoFile);
      form.selectedServices.forEach((serviceId) => {
        payload.append("services[]", serviceId);
      });

      languagesArray.forEach((lang) => {
        payload.append("languages[]", lang);
      });

      workingHours.forEach((hourObj, index) => {
        payload.append(`workingHours[${index}][day]`, hourObj.day);
        payload.append(`workingHours[${index}][startTime]`, hourObj.startTime);
        payload.append(`workingHours[${index}][endTime]`, hourObj.endTime);
      });

      const res = await fetch(`${API_BASE_URL}/api/doctors/`, {
        method: "POST",
        body: payload,
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Request failed");
      }

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
          type="button"
          onClick={() => navigate("/admin/dashboard")}
          className="p-2 rounded-full hover:bg-surface-container-low text-primary transition-colors"
          aria-label="Back to dashboard"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h1 className="font-headline-sm text-headline-sm text-primary">Add Dentist</h1>
          <p className="text-on-surface-variant text-body-sm">Onboard a new specialist with pricing and custom schedules</p>
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
                placeholder="Dr. Robert Johnson"
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
                placeholder="robert.johnson@puredent.com"
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
                placeholder="20"
                className="w-full h-12 px-md rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                value={form.experienceYears}
                onChange={(e) => updateField("experienceYears", e.target.value)}
              />
              {errors.experienceYears && <p className="text-error text-body-sm">{errors.experienceYears}</p>}
            </div>

            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant">Consultation Price / Fee (USD)</label>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant">Education Qualifications</label>
              <input
                type="text"
                placeholder="DDS, University of Pennsylvania"
                className="w-full h-12 px-md rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                value={form.education || ""}
                onChange={(e) => updateField("education", e.target.value)}
              />
            </div>

            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant">Languages Spoken</label>
              <input
                type="text"
                placeholder="English, Italian, Spanish"
                className="w-full h-12 px-md rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                value={form.languages}
                onChange={(e) => updateField("languages", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-xs">
            <label className="font-label-md text-label-md text-on-surface-variant">Bio Description</label>
            <textarea
              rows={3}
              placeholder="Dr. Robert Johnson specializes in complex restorative..."
              className="w-full p-md rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
              value={form.bio}
              onChange={(e) => updateField("bio", e.target.value)}
            />
          </div>

          {/* Assigned Services Checkbox Grid */}
          <div className="space-y-xs">
            <label className="font-label-md text-label-md text-on-surface-variant block mb-1">Offered Treatments / Services</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-surface-container-lowest p-md border border-outline-variant rounded-xl">
              {availableServices.length > 0 ? (
                availableServices.map((service) => {
                  const serviceId = service._id;
                  const checked = form.selectedServices.includes(serviceId);
                  return (
                    <label key={serviceId} className="flex items-center gap-sm p-2 rounded-lg hover:bg-surface-container-low cursor-pointer text-body-sm transition-colors">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleService(serviceId)}
                        className="w-4 h-4 text-primary bg-background border-outline-variant rounded focus:ring-primary/20 accent-primary"
                      />
                      <span className={checked ? "text-primary font-semibold" : "text-on-surface-variant"}>
                        {service.name}
                      </span>
                    </label>
                  );
                })
              ) : (
                <p className="text-on-surface-variant text-body-sm p-2 col-span-2">Loading target services from server database...</p>
              )}
            </div>
          </div>

          <div className="space-y-xs">
            <label className="font-label-md text-label-md text-on-surface-variant">Weekly Availability Structure</label>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant">Shift Starts</label>
              <input
                type="time"
                className="w-full h-12 px-md rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                value={form.startTime}
                onChange={(e) => updateField("startTime", e.target.value)}
              />
            </div>
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant">Shift Ends</label>
              <input
                type="time"
                className="w-full h-12 px-md rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                value={form.endTime}
                onChange={(e) => updateField("endTime", e.target.value)}
              />
            </div>
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant">Booking Blocks (mins)</label>
              <input
                type="number"
                min="5"
                step="5"
                className="w-full h-12 px-md rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                value={form.slotDurationMinutes}
                onChange={(e) => updateField("slotDurationMinutes", e.target.value)}
              />
            </div>
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
              className="flex-1 flex items-center justify-center gap-xs px-lg py-3 rounded-xl bg-primary text-white font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
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

        {/* Live Preview Pane */}
        <div className="lg:col-span-4">
          <div className="glass-card bg-white/80 backdrop-blur-md border border-primary/5 shadow-[0px_10px_30px_rgba(15,118,110,0.04)] rounded-xxl p-lg sticky top-24 space-y-md">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-sm">
                Profile Preview
              </p>
              <div className="flex flex-col items-center text-center gap-xs">
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
                <p className="text-on-surface-variant text-body-sm font-semibold">{form.specialization}</p>

                {form.consultationFee && (
                  <p className="text-primary font-bold text-sm">${form.consultationFee} / Consultation</p>
                )}

                {form.experienceYears && (
                  <span className="bg-secondary-container/20 text-on-secondary-container px-3 py-0.5 rounded-full text-[11px] font-bold">
                    {form.experienceYears} Years Experience
                  </span>
                )}
              </div>
            </div>

            {form.selectedServices.length > 0 && (
              <div className="border-t border-outline-variant/30 pt-3">
                <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Selected Services</p>
                <div className="flex flex-wrap gap-1">
                  {form.selectedServices.map(id => {
                    const match = availableServices.find(s => (s._id) === id);
                    return match ? (
                      <span key={id} className="text-[10px] bg-primary/5 text-primary px-2 py-0.5 rounded">
                        {match.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}