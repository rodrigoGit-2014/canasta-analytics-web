const DEFAULT_OPTIONS = [5, 10, 20, 50];

export default function LimitSelector({ value, onChange, options = DEFAULT_OPTIONS }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">Top</span>
      <div className="flex bg-gray-100 rounded-lg p-0.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
              value === opt
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
