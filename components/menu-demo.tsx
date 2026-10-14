"use client";

import { useState } from "react";

const items = [
  { name: "Filter coffee", price: "₹40" },
  { name: "Masala dosa", price: "₹90" },
  { name: "Lemon rice", price: "₹70" },
];

export function MenuDemo() {
  const [order, setOrder] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-20 md:px-8">
      <div className="card-glass grid gap-8 rounded-3xl p-6 md:grid-cols-2 md:p-10 border border-[#0d9488]/15 bg-white/90 shadow-xl shadow-slate-950/5">
        <div>
          <span className="badge-mint">Interactive Live Simulation</span>
          <h3 className="display mt-3 text-3xl font-bold text-slate-900">Digital Menu Demonstration</h3>
          <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-[#475569]">
            Experience the real-time guest ordering workflow. Add items to simulate how customers interact with dynamic QR digital menus on mobile.
          </p>
          {order.length > 0 ? (
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-800 border border-emerald-200">
              <span>Cart: {order.length} item{order.length > 1 ? "s" : ""} selected</span>
            </div>
          ) : null}
        </div>
        <div>
          <ul className="divide-y divide-slate-900/8">
            {items.map((item) => (
              <li key={item.name} className="flex items-center justify-between gap-4 py-3.5">
                <div>
                  <span className="font-semibold text-slate-900">{item.name}</span>
                  <span className="ml-3 text-xs font-bold text-[#0d9488]">{item.price}</span>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost h-9 px-3.5 text-xs font-semibold"
                  onClick={() => {
                    setSent(false);
                    setOrder((current) => [...current, item.name]);
                  }}
                >
                  + Add Item
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setSent(true)}
              disabled={order.length === 0}
            >
              Place Simulated Order ({order.length})
            </button>
            {order.length > 0 ? (
              <button
                type="button"
                className="btn btn-ghost text-xs"
                onClick={() => {
                  setOrder([]);
                  setSent(false);
                }}
              >
                Clear Cart
              </button>
            ) : null}
          </div>
          {sent ? (
            <div role="status" className="mt-4 rounded-xl bg-emerald-50 p-4 border border-emerald-200 text-xs text-emerald-900 font-medium">
              ✓ Demonstration completed successfully. {order.length} item(s) logged: {order.join(", ")}.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
