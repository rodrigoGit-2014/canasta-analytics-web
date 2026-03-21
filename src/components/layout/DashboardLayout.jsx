import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({ sidebar, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0f1117]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#151721] border-r border-[#1e2433] flex-shrink-0 flex-col">
        {sidebar}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-[#151721] border-r border-[#1e2433] z-50 transform transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end p-4">
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded-lg hover:bg-[#1e2433] text-slate-400"
          >
            <X size={20} />
          </button>
        </div>
        {sidebar}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="lg:hidden p-4 pb-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-[#1e2433] bg-[#151721] border border-[#1e2433] text-slate-400"
          >
            <Menu size={20} />
          </button>
        </div>
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}
