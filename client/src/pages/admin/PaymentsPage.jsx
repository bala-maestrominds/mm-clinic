import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const STATUS_STYLES = {
  Paid: "bg-secondary-container/20 text-on-secondary-container",
  Pending: "bg-surface-container-high text-on-surface-variant",
  Overdue: "bg-error-container/40 text-error",
};

const STATUS_FILTERS = ["All", "Paid", "Pending", "Overdue"];

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState("All");

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPaymentsData() {
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

    loadPaymentsData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Parse live backend records into the expected format matching the table rows
  const parsedPayments = useMemo(() => {
    const todayStr = new Date().toISOString().slice(0, 10);

    return appointments.map((appt) => {
      // Re-map Mongoose paymentStatus ('paid'/'pending') and general status ('Cancelled') into view filters
      let unifiedStatus = "Pending";
      if (appt.paymentStatus === "paid" || appt.status === "Completed") {
        unifiedStatus = "Paid";
      } else if (appt.date < todayStr && appt.paymentStatus !== "paid" && appt.status !== "Cancelled") {
        unifiedStatus = "Overdue";
      }

      return {
        id: appt.appointmentCode || appt._id?.slice(-6).toUpperCase(),
        patient: appt.patientName || "Unknown Patient",
        treatment: appt.serviceName || "General Consultation",
        date: appt.date || "—",
        amount: appt.amount || appt.servicePrice || 0,
        method: appt.paymentMethod || "Pay at Clinic",
        status: unifiedStatus,
      };
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort newest items first
  }, [appointments]);

  const filtered = useMemo(
    () => (statusFilter === "All" ? parsedPayments : parsedPayments.filter((p) => p.status === statusFilter)),
    [statusFilter, parsedPayments]
  );

  const totals = useMemo(() => {
    const paid = parsedPayments.filter((p) => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0);
    const pending = parsedPayments.filter((p) => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0);
    const overdue = parsedPayments.filter((p) => p.status === "Overdue").reduce((sum, p) => sum + p.amount, 0);
    return { paid, pending, overdue };
  }, [parsedPayments]);

  return (
    <AdminLayout
      title="Payments"
      subtitle="Track invoices, payment methods, and outstanding balances."
      headerActions={
        <button className="flex items-center gap-1 px-6 py-3 rounded-xl border border-primary/20 text-primary font-bold hover:bg-primary/5 transition-colors">
          <span className="material-symbols-outlined text-[20px]">download</span>
          Export
        </button>
      }
    >
      {loadError && (
        <div className="glass-card rounded-2xl p-4 border border-error/20 bg-error-container/10 text-error text-sm font-semibold">
          Couldn&apos;t load live dashboard data: {loadError}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl">
          <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest mb-2">Total Collected</p>
          <h3 className="font-bold text-2xl text-primary">₹{totals.paid.toLocaleString()}</h3>
        </div>
        <div className="glass-card p-6 rounded-3xl">
          <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest mb-2">Pending</p>
          <h3 className="font-bold text-2xl text-on-surface">₹{totals.pending.toLocaleString()}</h3>
        </div>
        <div className="glass-card p-6 rounded-3xl">
          <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest mb-2">Overdue</p>
          <h3 className="font-bold text-2xl text-error">₹{totals.overdue.toLocaleString()}</h3>
        </div>
      </div>

      {/* Filters */}
      <section className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={
              statusFilter === s
                ? "px-4 py-2 rounded-full bg-primary text-white text-xs font-bold transition-all"
                : "px-4 py-2 rounded-full bg-surface-container-low text-on-surface-variant text-xs font-bold hover:bg-surface-container-high transition-all"
            }
          >
            {s}
          </button>
        ))}
      </section>

      {/* Table */}
      <section className="glass-card rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low/50">
              <tr>
                <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Invoice</th>
                <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Patient</th>
                <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Treatment</th>
                <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Date</th>
                <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Method</th>
                <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider text-right">Amount</th>
                <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-on-surface-variant text-sm">
                    Loading payments data...
                  </td>
                </tr>
              ) : filtered.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="p-6 text-sm font-bold text-primary">#{p.id}</td>
                  <td className="p-6 text-sm">{p.patient}</td>
                  <td className="p-6 text-sm">{p.treatment}</td>
                  <td className="p-6 text-sm">{p.date}</td>
                  <td className="p-6 text-sm">{p.method}</td>
                  <td className="p-6 text-sm text-right font-bold">₹{p.amount.toLocaleString()}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${STATUS_STYLES[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-on-surface-variant text-sm">
                    No payments match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  );
}