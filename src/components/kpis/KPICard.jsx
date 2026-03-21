export default function KPICard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-5 animate-fade-in-up hover:border-[#2a3347] transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
            {title}
          </p>
          <p
            key={value}
            className="text-2xl font-bold text-white animate-count-up"
          >
            {value}
          </p>
        </div>
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );
}
