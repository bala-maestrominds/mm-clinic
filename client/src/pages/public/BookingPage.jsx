import { useEffect, useMemo, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const STEPS = [
  { n: 1, label: "Schedule" },
  { n: 2, label: "Info" },
  { n: 3, label: "Payment" },
  { n: 4, label: "Confirm" },
];

const SERVICE_ICONS = {
  Cosmetic: "dentistry",
  Surgical: "medical_services",
  General: "cleaning_services",
  Orthodontics: "sentiment_satisfied",
  Emergency: "masks",
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function formatDateLabel(dateStr) {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

function formatTimeLabel(time) {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = ((h + 11) % 12) + 1;
  return `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
}

const initialPatient = {
  patientName: "",
  patientEmail: "",
  patientPhone: "",
  patientAge: "",
  patientGender: "",
  notes: "",
};

export default function BookingPage() {
  const [step, setStep] = useState(1);

  // Step 1 data
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [date, setDate] = useState(todayISO());
  const [slots, setSlots] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [scheduleError, setScheduleError] = useState("");

  // Step 2 data
  const [patient, setPatient] = useState(initialPatient);
  const [patientErrors, setPatientErrors] = useState({});

  // Step 3 data
  const [paymentMethod, setPaymentMethod] = useState("Card");

  // Submission / confirmation
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(null); // { appointment, qrCodeDataUrl, emailSent }

  const selectedService = useMemo(
    () => services.find((s) => s._id === selectedServiceId),
    [services, selectedServiceId]
  );
  const selectedDoctor = useMemo(
    () => doctors.find((d) => d._id === selectedDoctorId),
    [doctors, selectedDoctorId]
  );

  // Load services + doctors once.
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoadingOptions(true);
      try {
        const [svcRes, docRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/services`),
          fetch(`${API_BASE_URL}/api/doctors`),
        ]);
        const svcJson = await svcRes.json();
        const docJson = await docRes.json();
        if (cancelled) return;
        setServices(svcJson.data || []);
        setDoctors((docJson.data || []).filter((d) => d.isActive !== false));
      } catch (err) {
        if (!cancelled) setScheduleError("Couldn't load services/doctors. Please refresh the page.");
      } finally {
        if (!cancelled) setLoadingOptions(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Load availability whenever doctor/date changes.
  useEffect(() => {
    if (!selectedDoctorId || !date) {
      setSlots([]);
      return;
    }
    let cancelled = false;
    async function loadAvailability() {
      setLoadingSlots(true);
      setSelectedTime("");
      try {
        const [availRes, bookedRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/doctors/${selectedDoctorId}/availability?date=${date}`),
          fetch(`${API_BASE_URL}/api/appointments?doctorId=${selectedDoctorId}&date=${date}`),
        ]);
        const availJson = await availRes.json();
        const bookedJson = await bookedRes.json();
        if (cancelled) return;
        setSlots(availJson.data?.slots || []);
        const taken = (bookedJson.data || [])
          .filter((a) => a.status !== "Cancelled")
          .map((a) => a.time);
        setBookedTimes(taken);
      } catch (err) {
        if (!cancelled) setSlots([]);
      } finally {
        if (!cancelled) setLoadingSlots(false);
      }
    }
    loadAvailability();
    return () => {
      cancelled = true;
    };
  }, [selectedDoctorId, date]);

  const goToStep = (n) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStep(n);
  };

  const handleContinueFromSchedule = () => {
    setScheduleError("");
    if (!selectedServiceId) return setScheduleError("Please select a service.");
    if (!selectedDoctorId) return setScheduleError("Please choose a specialist.");
    if (!date) return setScheduleError("Please select a date.");
    if (!selectedTime) return setScheduleError("Please select an available time slot.");
    goToStep(2);
  };

  const updatePatientField = (field, value) => {
    setPatient((prev) => ({ ...prev, [field]: value }));
    setPatientErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validatePatient = () => {
    const errs = {};
    if (!patient.patientName.trim()) errs.patientName = "Full name is required.";
    if (!patient.patientEmail.trim()) errs.patientEmail = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(patient.patientEmail)) errs.patientEmail = "Enter a valid email address.";
    if (!patient.patientPhone.trim()) errs.patientPhone = "Phone number is required.";
    setPatientErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinueFromInfo = () => {
    if (!validatePatient()) return;
    goToStep(3);
  };

  const handleConfirmAndPay = async () => {
    setSubmitError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: selectedDoctorId,
          serviceId: selectedServiceId,
          date,
          time: selectedTime,
          patientName: patient.patientName.trim(),
          patientEmail: patient.patientEmail.trim(),
          patientPhone: patient.patientPhone.trim(),
          patientAge: patient.patientAge ? Number(patient.patientAge) : undefined,
          patientGender: patient.patientGender || undefined,
          notes: patient.notes?.trim() || "",
          paymentMethod,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Could not confirm your booking. Please try again.");
      }

      setConfirmation(json.data);
      goToStep(4);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetWizard = () => {
    setStep(1);
    setSelectedServiceId("");
    setSelectedDoctorId("");
    setDate(todayISO());
    setSelectedTime("");
    setPatient(initialPatient);
    setPaymentMethod("Card");
    setConfirmation(null);
    setSubmitError("");
  };

  const progressPct = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full min-h-screen bg-background text-on-surface font-sans">
      {/* Top bar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-6 md:px-10 py-4 w-full max-w-7xl mx-auto">
          <div className="font-bold text-lg text-primary">PureDent Clinic</div>
          <div className="text-xs text-on-surface-variant hidden md:block">Book Appointment</div>
        </div>
      </nav>

      <main className="pt-28 pb-16 px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">Book Your Appointment</h1>
          </div>

          {/* Progress tracker */}
          <div className="relative flex justify-between items-center mb-8 max-w-2xl mx-auto px-6">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-surface-container-high -translate-y-1/2 -z-10" />
            <div
              className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 -z-10 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
            {STEPS.map((s) => (
              <div key={s.n} className="flex flex-col items-center gap-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md transition-colors duration-300 ${
                    step >= s.n ? "bg-primary text-white" : "bg-surface-container-highest text-on-surface-variant"
                  }`}
                >
                  {step > s.n ? <span className="material-symbols-outlined text-[20px]">check</span> : s.n}
                </div>
                <span
                  className={`text-[11px] font-semibold tracking-wide ${
                    step >= s.n ? "text-primary" : "text-on-surface-variant"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="glass-card rounded-3xl shadow-[0px_10px_30px_rgba(15,118,110,0.04)] overflow-hidden min-h-[560px] flex flex-col">
            {step === 1 && (
              <ScheduleStep
                loadingOptions={loadingOptions}
                services={services}
                doctors={doctors}
                selectedServiceId={selectedServiceId}
                setSelectedServiceId={setSelectedServiceId}
                selectedDoctorId={selectedDoctorId}
                setSelectedDoctorId={setSelectedDoctorId}
                date={date}
                setDate={setDate}
                slots={slots}
                bookedTimes={bookedTimes}
                loadingSlots={loadingSlots}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                error={scheduleError}
                onContinue={handleContinueFromSchedule}
              />
            )}

            {step === 2 && (
              <PatientInfoStep
                patient={patient}
                errors={patientErrors}
                updateField={updatePatientField}
                onBack={() => goToStep(1)}
                onContinue={handleContinueFromInfo}
              />
            )}

            {step === 3 && (
              <PaymentStep
                selectedService={selectedService}
                selectedDoctor={selectedDoctor}
                date={date}
                time={selectedTime}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                submitting={submitting}
                error={submitError}
                onBack={() => goToStep(2)}
                onConfirm={handleConfirmAndPay}
              />
            )}

            {step === 4 && confirmation && (
              <ConfirmationStep confirmation={confirmation} apiBaseUrl={API_BASE_URL} onReset={resetWizard} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function ScheduleStep({
  loadingOptions,
  services,
  doctors,
  selectedServiceId,
  setSelectedServiceId,
  selectedDoctorId,
  setSelectedDoctorId,
  date,
  setDate,
  slots,
  bookedTimes,
  loadingSlots,
  selectedTime,
  setSelectedTime,
  error,
  onContinue,
}) {
  return (
    <section className="p-6 md:p-8 flex flex-col gap-6 flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: Service -> Date -> Available Slots */}
        <div className="flex flex-col gap-4">
          <label className="text-lg font-semibold text-on-surface">Select Service</label>
          {loadingOptions ? (
            <p className="text-sm text-on-surface-variant">Loading services…</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {services.map((svc) => {
                const active = svc._id === selectedServiceId;
                return (
                  <button
                    type="button"
                    key={svc._id}
                    onClick={() => setSelectedServiceId(svc._id)}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-2 transition-all active:scale-[0.98] ${
                      active
                        ? "border-2 border-primary bg-primary/5"
                        : "border-primary/10 bg-white hover:border-primary/50"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-primary"
                      style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {SERVICE_ICONS[svc.category] || "medical_services"}
                    </span>
                    <span className={`text-sm text-on-surface ${active ? "font-bold" : ""}`}>{svc.name}</span>
                    <span className="text-xs text-on-surface-variant">
                      {svc.priceFrom ? `$${svc.priceFrom} • ` : ""}
                      {svc.durationMinutes} min
                    </span>
                  </button>
                );
              })}
              {services.length === 0 && (
                <p className="col-span-2 text-sm text-on-surface-variant">No services available yet.</p>
              )}
            </div>
          )}

          <label className="text-lg font-semibold text-on-surface mt-2">Select Date</label>
          <input
            type="date"
            min={todayISO()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-outline-variant bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
          />

          <label className="text-lg font-semibold text-on-surface mt-2">Available Slots</label>
          {!selectedDoctorId ? (
            <p className="text-sm text-on-surface-variant">Choose a specialist to see available slots.</p>
          ) : loadingSlots ? (
            <p className="text-sm text-on-surface-variant">Loading slots…</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {slots.map((slot) => {
                const taken = bookedTimes.includes(slot);
                const active = slot === selectedTime;
                return (
                  <button
                    type="button"
                    key={slot}
                    disabled={taken}
                    onClick={() => setSelectedTime(slot)}
                    className={
                      taken
                        ? "py-2 px-3 rounded-lg bg-surface-container-low text-outline-variant cursor-not-allowed text-sm line-through"
                        : active
                        ? "py-2 px-3 rounded-lg border-2 border-primary bg-primary text-white text-sm font-bold"
                        : "py-2 px-3 rounded-lg border border-primary/10 text-sm text-on-surface hover:bg-primary hover:text-white transition-all"
                    }
                  >
                    {formatTimeLabel(slot)}
                  </button>
                );
              })}
              {slots.length === 0 && (
                <p className="col-span-3 text-sm text-on-surface-variant">No slots available on this date.</p>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: Doctors */}
        <div className="flex flex-col gap-4">
          <label className="text-lg font-semibold text-on-surface">Choose Specialist</label>
          <div className="flex flex-col gap-2">
            {doctors.map((doc) => {
              const active = doc._id === selectedDoctorId;
              return (
                <div
                  key={doc._id}
                  onClick={() => setSelectedDoctorId(doc._id)}
                  className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all ${
                    active ? "border-primary/10 bg-white" : "border-transparent bg-surface-container-low hover:border-primary/20"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container shrink-0">
                    {doc.photoUrl ? (
                      <img
                        className="w-full h-full object-cover"
                        src={doc.photoUrl.startsWith("http") ? doc.photoUrl : `${API_BASE_URL}${doc.photoUrl}`}
                        alt={doc.name}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary font-bold">
                        {doc.name?.[0] || "D"}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{doc.name}</div>
                    <div className="text-xs text-on-surface-variant">
                      {doc.specialty} {doc.experienceYears ? `• ${doc.experienceYears}yr Exp` : ""}
                    </div>
                  </div>
                  <span
                    className={`material-symbols-outlined ml-auto ${active ? "text-primary" : "text-outline-variant"}`}
                    style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {active ? "check_circle" : "circle"}
                  </span>
                </div>
              );
            })}
            {!loadingOptions && doctors.length === 0 && (
              <p className="text-sm text-on-surface-variant">No specialists available yet.</p>
            )}
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-error font-medium">{error}</p>}

      <div className="mt-auto pt-6 border-t border-primary/5 flex justify-end">
        <button
          type="button"
          onClick={onContinue}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
        >
          Continue to Personal Info
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </section>
  );
}

function PatientInfoStep({ patient, errors, updateField, onBack, onContinue }) {
  const field = (name, label, type = "text", placeholder = "") => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-on-surface-variant px-1">{label}</label>
      <input
        type={type}
        value={patient[name]}
        onChange={(e) => updateField(name, e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
      />
      {errors[name] && <span className="text-xs text-error">{errors[name]}</span>}
    </div>
  );

  return (
    <section className="p-6 md:p-8 flex flex-col gap-6 flex-1">
      <div className="max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-primary mb-6">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {field("patientName", "Full Name", "text", "John Doe")}
          {field("patientEmail", "Email Address", "email", "john@example.com")}
          {field("patientPhone", "Phone Number", "tel", "+1 (555) 000-0000")}
          <div className="grid grid-cols-2 gap-4">
            {field("patientAge", "Age", "number", "28")}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant px-1">Gender</label>
              <select
                value={patient.patientGender}
                onChange={(e) => updateField("patientGender", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm bg-white"
              >
                <option value="">Prefer not to say</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface-variant px-1">
              Additional Notes (Medical History, Fears, etc.)
            </label>
            <textarea
              rows={4}
              value={patient.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="Any specific concerns..."
              className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none text-sm"
            />
          </div>
        </div>
      </div>
      <div className="mt-auto pt-6 border-t border-primary/5 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 text-on-surface-variant font-bold hover:bg-surface-container rounded-xl transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
        >
          Proceed to Payment
          <span className="material-symbols-outlined">payments</span>
        </button>
      </div>
    </section>
  );
}

const PAYMENT_METHODS = [
  { id: "Card", label: "Credit/Debit Card", sub: "Stripe Secure Payment", icon: "credit_card" },
  { id: "PayPal", label: "PayPal", sub: "Fast & Secure", icon: "account_balance_wallet" },
  { id: "Razorpay", label: "Razorpay", sub: "UPI, Net Banking", icon: "account_balance" },
  { id: "Pay at Clinic", label: "Pay at Clinic", sub: "Settle in person at reception", icon: "storefront" },
];

function PaymentStep({
  selectedService,
  selectedDoctor,
  date,
  time,
  paymentMethod,
  setPaymentMethod,
  submitting,
  error,
  onBack,
  onConfirm,
}) {
  return (
    <section className="p-6 md:p-8 flex flex-col gap-6 flex-1">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-primary">Summary</h2>
          <div className="bg-surface-container-low rounded-xl p-5 flex flex-col gap-3">
            <Row label="Service" value={selectedService?.name} />
            <Row label="Doctor" value={selectedDoctor?.name} />
            <Row label="Date" value={formatDateLabel(date)} />
            <Row label="Time" value={formatTimeLabel(time)} />
            <hr className="border-primary/10" />
            <div className="flex justify-between items-center text-lg">
              <span className="font-bold">Total Amount</span>
              <span className="font-bold text-primary">
                ${Number(selectedService?.priceFrom || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-primary">Payment Method</h2>
          <div className="grid grid-cols-1 gap-3">
            {PAYMENT_METHODS.map((m) => {
              const active = paymentMethod === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  className={`p-3 rounded-xl cursor-pointer flex items-center gap-3 transition-all ${
                    active ? "border-2 border-primary bg-primary/5" : "border border-primary/10 bg-white hover:border-primary/30"
                  }`}
                >
                  <span className={`material-symbols-outlined ${active ? "text-primary" : "text-on-surface-variant"}`}>
                    {m.icon}
                  </span>
                  <div className="grow">
                    <div className="font-bold text-sm">{m.label}</div>
                    <div className="text-xs text-on-surface-variant">{m.sub}</div>
                  </div>
                  <span
                    className={`material-symbols-outlined ${active ? "text-primary" : "text-outline-variant"}`}
                    style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {active ? "radio_button_checked" : "radio_button_unchecked"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-error font-medium">{error}</p>}

      <div className="mt-auto pt-6 border-t border-primary/5 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="px-5 py-3 text-on-surface-variant font-bold hover:bg-surface-container rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={submitting}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 disabled:opacity-60"
        >
          {submitting ? "Confirming…" : "Pay & Confirm"}
          <span className="material-symbols-outlined">verified</span>
        </button>
      </div>
    </section>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-on-surface-variant text-sm">{label}</span>
      <span className="font-bold text-sm">{value || "-"}</span>
    </div>
  );
}

function ConfirmationStep({ confirmation, apiBaseUrl, onReset }) {
  const { appointment, qrCodeDataUrl, emailSent } = confirmation;
  const pdfUrl = `${apiBaseUrl}/api/appointments/${appointment._id}/pdf`;

  return (
    <section className="p-6 md:p-10 flex flex-col items-center justify-center text-center gap-8 min-h-[520px] flex-1">
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary scale-110 mb-2">
        <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'wght' 700" }}>
          check
        </span>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-primary mb-1">Appointment Confirmed!</h2>
        <p className="text-on-surface-variant">Your visit to PureDent Clinic has been successfully scheduled.</p>
        {emailSent ? (
          <p className="text-xs text-on-surface-variant mt-2">
            A confirmation email with your PDF ticket has been sent to {appointment.patientEmail}.
          </p>
        ) : (
          <p className="text-xs text-error mt-2">
            We couldn't send the confirmation email right now, but you can still download your ticket below.
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="flex-1 bg-white p-5 rounded-xl border border-primary/10 flex flex-col gap-2 items-center shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Appointment ID</span>
          <span className="text-xl font-bold text-primary tracking-widest">{appointment.appointmentCode}</span>
          <div className="mt-3 w-32 h-32 bg-surface-container-low p-2 rounded-lg">
            <img className="w-full h-full" src={qrCodeDataUrl} alt="Appointment QR code" />
          </div>
          <span className="text-xs text-on-surface-variant mt-2">Scan at clinic reception</span>
        </div>
        <div className="flex-1 flex flex-col gap-4 justify-center">
          <div className="text-left bg-primary/5 p-4 rounded-xl border border-primary/10">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-sm">calendar_month</span>
              <span className="text-sm font-bold">
                {formatDateLabel(appointment.date)} at {formatTimeLabel(appointment.time)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">person</span>
              <span className="text-sm">with {appointment.doctorName}</span>
            </div>
          </div>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
          >
            <span className="material-symbols-outlined">picture_as_pdf</span>
            Download PDF Ticket
          </a>
          <button
            type="button"
            onClick={onReset}
            className="w-full py-3 bg-surface-container text-on-surface rounded-xl font-bold hover:bg-surface-container-high transition-all"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    </section>
  );
}