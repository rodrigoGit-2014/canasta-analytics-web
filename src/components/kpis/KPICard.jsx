export default function KPICard({ title, value, icon: Icon, color, highlight }) {
  return (
    <div
      className={`rounded-xl p-4 animate-fade-in-up transition-all duration-300 group ${
        highlight
          ? "bg-[#151721] border-2 border-purple-500/40 shadow-[0_0_20px_rgba(139,92,246,0.15)] animate-pulse-glow"
          : "bg-[#151721] border border-[#1e2433] hover:border-[#2a3347]"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${
            highlight ? "text-purple-400" : "text-slate-500"
          }`}>
            {title}
          </p>
          <p
            key={value}
            className={`text-2xl font-bold animate-count-up ${
              highlight ? "text-purple-300" : "text-white"
            }`}
          >
            {value}
          </p>
        </div>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
            highlight ? "scale-110" : ""
          }`}
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );
}
