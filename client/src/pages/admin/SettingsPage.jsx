import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function SettingsPage() {
  const [clinicName, setClinicName] = useState("PureDent Clinic");
  const [email, setEmail] = useState("hariharabalan787@gmail.com");
  const [phone, setPhone] = useState("+1 (555) 234-9000");
  const [address, setAddress] = useState("1200 Health Plaza, Suite 400, Central Medical District, NY 10001");

  const [hours, setHours] = useState(
    Object.fromEntries(
      DAYS.map((d) => [d, { open: "09:00", close: "18:00", closed: d === "Sunday" }])
    )
  );

  const [notifications, setNotifications] = useState({
    newAppointments: true,
    cancellations: true,
    lowStock: true,
    dailySummary: false,
  });

  const [saved, setSaved] = useState(false);

  const updateHours = (day, field, value) => {
    setHours((prev) => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout title="Settings" subtitle="Manage clinic profile, hours, and notification preferences.">
      <form onSubmit={handleSave} className="space-y-6">
        {/* Clinic Profile */}
        <section className="glass-card rounded-3xl p-6 space-y-4">
          <h4 className="font-bold text-lg text-primary">Clinic Profile</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface-variant">Clinic Name</label>
              <input
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface-variant">Contact Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface-variant">Phone Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-semibold text-on-surface-variant">Address</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
              />
            </div>
          </div>
        </section>

        {/* Working Hours */}
        <section className="glass-card rounded-3xl p-6 space-y-4">
          <h4 className="font-bold text-lg text-primary">Working Hours</h4>
          <div className="space-y-2">
            {DAYS.map((day) => (
              <div key={day} className="flex flex-col sm:flex-row sm:items-center gap-3 py-2 border-b border-outline-variant/10 last:border-0">
                <span className="w-28 font-medium text-sm shrink-0">{day}</span>
                <label className="flex items-center gap-2 text-xs text-on-surface-variant shrink-0">
                  <input
                    type="checkbox"
                    checked={!hours[day].closed}
                    onChange={(e) => updateHours(day, "closed", !e.target.checked)}
                    className="accent-primary"
                  />
                  Open
                </label>
                {!hours[day].closed ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={hours[day].open}
                      onChange={(e) => updateHours(day, "open", e.target.value)}
                      className="h-9 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm"
                    />
                    <span className="text-on-surface-variant text-sm">to</span>
                    <input
                      type="time"
                      value={hours[day].close}
                      onChange={(e) => updateHours(day, "close", e.target.value)}
                      className="h-9 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm"
                    />
                  </div>
                ) : (
                  <span className="text-sm text-on-surface-variant italic">Closed</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section className="glass-card rounded-3xl p-6 space-y-4">
          <h4 className="font-bold text-lg text-primary">Notification Preferences</h4>
          <div className="space-y-3">
            {[
              { key: "newAppointments", label: "New appointment bookings" },
              { key: "cancellations", label: "Appointment cancellations" },
              { key: "lowStock", label: "Low inventory alerts" },
              { key: "dailySummary", label: "Daily revenue summary email" },
            ].map((n) => (
              <label key={n.key} className="flex items-center justify-between py-2 cursor-pointer">
                <span className="text-sm">{n.label}</span>
                <button
                  type="button"
                  onClick={() => toggleNotification(n.key)}
                  className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${notifications[n.key] ? "bg-primary" : "bg-surface-container-high"
                    }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${notifications[n.key] ? "translate-x-5" : "translate-x-0.5"
                      }`}
                  />
                </button>
              </label>
            ))}
          </div>
        </section>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-primary text-white font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
          >
            Save Changes
          </button>
          {saved && (
            <span className="flex items-center gap-1 text-secondary text-sm font-medium">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              Settings saved
            </span>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}