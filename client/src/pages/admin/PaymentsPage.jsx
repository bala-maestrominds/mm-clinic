import { useMemo, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const PAYMENTS = [
  { id: "INV-3301", patient: "Jonathan Smith", treatment: "Root Canal Therapy", date: "2024-07-10", amount: 900, method: "Card", status: "Paid" },
  { id: "INV-3300", patient: "Alice Wonderland", treatment: "Teeth Whitening", date: "2024-07-10", amount: 350, method: "Insurance", status: "Paid" },
  { id: "INV-3299", patient: "Robert Lewandowski", treatment: "Routine Checkup", date: "2024-07-10", amount: 60, method: "Cash", status: "Pending" },
  { id: "INV-3298", patient: "Maria Gonzalez", treatment: "Dental Implants", date: "2024-07-01", amount: 2200, method: "Card", status: "Paid" },
  { id: "INV-3297", patient: "David Okafor", treatment: "Gum Treatment", date: "2024-06-28", amount: 400, method: "Insurance", status: "Overdue" },
  { id: "INV-3296", patient: "Priya Nair", treatment: "Cavity Filling", date: "2024-06-20", amount: 150, method: "Card", status: "Paid" },
];

const STATUS_STYLES = {
  Paid: "bg-secondary-container/20 text-on-secondary-container",
  Pending: "bg-surface-container-high text-on-surface-variant",
  Overdue: "bg-error-container/40 text-error",
};

const STATUS_FILTERS = ["All", "Paid", "Pending", "Overdue"];

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(
    () => (statusFilter === "All" ? PAYMENTS : PAYMENTS.filter((p) => p.status === statusFilter)),
    [statusFilter]
  );

  const totals = useMemo(() => {
    const paid = PAYMENTS.filter((p) => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0);
    const pending = PAYMENTS.filter((p) => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0);
    const overdue = PAYMENTS.filter((p) => p.status === "Overdue").reduce((sum, p) => sum + p.amount, 0);
    return { paid, pending, overdue };
  }, []);

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
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl">
          <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest mb-2">Total Collected</p>
          <h3 className="font-bold text-2xl text-primary">${totals.paid.toLocaleString()}</h3>
        </div>
        <div className="glass-card p-6 rounded-3xl">
          <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest mb-2">Pending</p>
          <h3 className="font-bold text-2xl text-on-surface">${totals.pending.toLocaleString()}</h3>
        </div>
        <div className="glass-card p-6 rounded-3xl">
          <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest mb-2">Overdue</p>
          <h3 className="font-bold text-2xl text-error">${totals.overdue.toLocaleString()}</h3>
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
                ? "px-4 py-2 rounded-full bg-primary text-on-primary text-xs font-bold transition-all"
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
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="p-6 text-sm font-bold text-primary">{p.id}</td>
                  <td className="p-6 text-sm">{p.patient}</td>
                  <td className="p-6 text-sm">{p.treatment}</td>
                  <td className="p-6 text-sm">{p.date}</td>
                  <td className="p-6 text-sm">{p.method}</td>
                  <td className="p-6 text-sm text-right font-bold">${p.amount.toLocaleString()}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${STATUS_STYLES[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
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