import { useMemo, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const INITIAL_INVENTORY = [
  { name: "Dental Composite Resin", category: "Restorative", stock: 42, reorderAt: 20, unit: "tubes" },
  { name: "Disposable Gloves (M)", category: "Safety", stock: 8, reorderAt: 30, unit: "boxes" },
  { name: "Local Anesthetic Cartridges", category: "Pharmaceutical", stock: 65, reorderAt: 25, unit: "units" },
  { name: "Sterilization Pouches", category: "Sterilization", stock: 12, reorderAt: 15, unit: "packs" },
  { name: "Dental Floss", category: "Consumables", stock: 120, reorderAt: 40, unit: "units" },
  { name: "Impression Material", category: "Restorative", stock: 18, reorderAt: 10, unit: "cartridges" },
  { name: "Surgical Masks", category: "Safety", stock: 5, reorderAt: 25, unit: "boxes" },
  { name: "X-Ray Film", category: "Diagnostic", stock: 30, reorderAt: 15, unit: "packs" },
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [showLowOnly, setShowLowOnly] = useState(false);

  const lowStockCount = useMemo(
    () => inventory.filter((i) => i.stock <= i.reorderAt).length,
    [inventory]
  );

  const visible = useMemo(
    () => (showLowOnly ? inventory.filter((i) => i.stock <= i.reorderAt) : inventory),
    [inventory, showLowOnly]
  );

  const restock = (name) => {
    setInventory((prev) =>
      prev.map((i) => (i.name === name ? { ...i, stock: i.stock + Math.max(i.reorderAt * 2, 20) } : i))
    );
  };

  return (
    <AdminLayout
      title="Inventory"
      subtitle="Monitor clinic supplies and restock before you run out."
      headerActions={
        <button className="flex items-center gap-1 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Item
        </button>
      }
    >
      {lowStockCount > 0 && (
        <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-error-container/20 border border-error/10">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-error">warning</span>
            <p className="text-sm text-error font-medium">
              {lowStockCount} item{lowStockCount > 1 ? "s are" : " is"} at or below reorder level.
            </p>
          </div>
          <button
            onClick={() => setShowLowOnly((v) => !v)}
            className="text-error font-bold text-sm hover:underline shrink-0"
          >
            {showLowOnly ? "Show all items" : "View low-stock items"}
          </button>
        </div>
      )}

      <section className="glass-card rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low/50">
              <tr>
                <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Item</th>
                <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Category</th>
                <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Stock Level</th>
                <th className="p-6 font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Reorder At</th>
                <th className="p-6" />
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {visible.map((item) => {
                const low = item.stock <= item.reorderAt;
                const pct = Math.min(100, Math.round((item.stock / (item.reorderAt * 3)) * 100));
                return (
                  <tr key={item.name} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-6 text-sm font-bold">{item.name}</td>
                    <td className="p-6 text-sm text-on-surface-variant">{item.category}</td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 rounded-full bg-surface-container-high overflow-hidden">
                          <div
                            className={`h-full rounded-full ${low ? "bg-error" : "bg-secondary"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className={`text-sm font-bold ${low ? "text-error" : "text-on-surface"}`}>
                          {item.stock} {item.unit}
                        </span>
                      </div>
                    </td>
                    <td className="p-6 text-sm text-on-surface-variant">
                      {item.reorderAt} {item.unit}
                    </td>
                    <td className="p-6 text-right">
                      {low ? (
                        <button
                          onClick={() => restock(item.name)}
                          className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:opacity-90 transition-all"
                        >
                          Restock
                        </button>
                      ) : (
                        <span className="text-xs text-on-surface-variant">In stock</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-on-surface-variant text-sm">
                    No items match this view.
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