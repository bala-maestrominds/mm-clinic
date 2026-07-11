import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const STATUS_STYLES = {
  Confirmed: "bg-secondary-container/20 text-on-secondary-container",
  "In-Progress": "bg-tertiary-fixed-dim/20 text-tertiary-container",
  Pending: "bg-surface-container-high text-on-surface-variant",
  Cancelled: "bg-error-container/40 text-error",
  Completed: "bg-primary/10 text-primary",
};

function formatDateLabel(dateStr) {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "2-digit", year: "numeric" });
}

/**
 * Accepts either:
 *  - the raw QR payload, e.g. {"code":"PD-4X9K2LQ","token":"9fa9b1..."}
 *  - or "PD-4X9K2LQ:9fa9b1..." typed/pasted manually
 * and returns { code, token }.
 */
function parseScanInput(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const parsed = JSON.parse(trimmed);
    if (parsed.code && parsed.token) return { code: parsed.code, token: parsed.token };
  } catch {
    // not JSON, fall through
  }
  const [code, token] = trimmed.split(":");
  if (code && token) return { code: code.trim(), token: token.trim() };
  return null;
}

export default function CheckInPage() {
  const [scanInput, setScanInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [appointment, setAppointment] = useState(null);
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkInMessage, setCheckInMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setCheckInMessage("");
    setAppointment(null);

    const parsed = parseScanInput(scanInput);
    if (!parsed) {
      setError("Couldn't read that code. Paste the full QR text, or use CODE:TOKEN format.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Verification failed.");
      setAppointment(json.data);
    } catch (err) {
      setError(err.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!appointment) return;
    setCheckingIn(true);
    setCheckInMessage("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${appointment._id}/checkin`, {
        method: "POST",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Check-in failed.");
      setAppointment(json.data);
      setCheckInMessage("Patient checked in successfully.");
    } catch (err) {
      setCheckInMessage(err.message || "Check-in failed.");
    } finally {
      setCheckingIn(false);
    }
  };

  const reset = () => {
    setScanInput("");
    setAppointment(null);
    setError("");
    setCheckInMessage("");
  };

  return (
    <AdminLayout
      title="Reception Check-In"
      subtitle="Scan or paste a patient's appointment QR code to verify and check them in."
    >
      <section className="glass-card rounded-3xl p-6 flex flex-col gap-4">
        <form onSubmit={handleVerify} className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
              qr_code_scanner
            </span>
            <input
              type="text"
              autoFocus
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder='Scan QR, or paste code — e.g. {"code":"PD-4X9K2LQ","token":"..."}'
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
          >
            {loading ? "Verifying…" : "Verify"}
          </button>
          {appointment && (
            <button
              type="button"
              onClick={reset}
              className="px-6 py-3 rounded-xl border border-outline-variant text-on-surface-variant font-bold hover:bg-surface-container-high transition-all"
            >
              Clear
            </button>
          )}
        </form>
        <p className="text-xs text-on-surface-variant">
          Tip: a USB/Bluetooth barcode-style QR scanner types the QR contents into the field above and presses Enter
          automatically — this box works with those out of the box.
        </p>
        {error && <p className="text-sm text-error font-medium">{error}</p>}
      </section>

      {appointment && (
        <section className="glass-card rounded-3xl p-6 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Booking ID</p>
              <p className="text-2xl font-bold text-primary tracking-wide">{appointment.appointmentCode}</p>
            </div>
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-bold ${STATUS_STYLES[appointment.status] || ""}`}
            >
              {appointment.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Detail label="Patient" value={appointment.patientName} />
            <Detail label="Doctor" value={appointment.doctorName} />
            <Detail label="Service" value={appointment.serviceName} />
            <Detail label="Date & Time" value={`${formatDateLabel(appointment.date)} · ${appointment.time}`} />
            <Detail label="Phone" value={appointment.patientPhone} />
            <Detail label="Email" value={appointment.patientEmail} />
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-outline-variant/10">
            {appointment.checkInStatus === "checked_in" ? (
              <span className="flex items-center gap-2 text-primary font-bold text-sm">
                <span className="material-symbols-outlined">check_circle</span>
                Checked in at {new Date(appointment.checkedInAt).toLocaleString()}
              </span>
            ) : (
              <button
                type="button"
                onClick={handleCheckIn}
                disabled={checkingIn}
                className="px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
              >
                {checkingIn ? "Checking in…" : "Check In Patient"}
              </button>
            )}
            {checkInMessage && <span className="text-sm text-on-surface-variant">{checkInMessage}</span>}
          </div>
        </section>
      )}
    </AdminLayout>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">{label}</p>
      <p className="text-sm font-semibold">{value || "-"}</p>
    </div>
  );
}