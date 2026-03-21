const DEFAULT_OPTIONS = [5, 10, 20, 50];

export default function LimitSelector({ value, onChange, options = DEFAULT_OPTIONS }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-500">Top</span>
      <div className="flex bg-[#1a1f2e] rounded-lg p-0.5 border border-[#1e2433]">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
              value === opt
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
