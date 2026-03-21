import { Calendar, X } from "lucide-react";

export default function DateRangeFilter({ dateRange, onDateRangeChange }) {
  const handleClear = () => {
    onDateRangeChange({ start: null, end: null });
  };

  const hasFilter = dateRange.start || dateRange.end;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Calendar size={20} className="text-slate-500" />
      <input
        type="date"
        value={dateRange.start || ""}
        min="2023-01-01"
        max={new Date().toISOString().split("T")[0]}
        onChange={(e) =>
          onDateRangeChange({ ...dateRange, start: e.target.value || null })
        }
        className="text-sm border border-[#1e2433] rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#151721] [color-scheme:dark]"
      />
      <span className="text-sm text-slate-500">-</span>
      <input
        type="date"
        value={dateRange.end || ""}
        min="2023-01-01"
        max={new Date().toISOString().split("T")[0]}
        onChange={(e) =>
          onDateRangeChange({ ...dateRange, end: e.target.value || null })
        }
        className="text-sm border border-[#1e2433] rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#151721] [color-scheme:dark]"
      />
      {hasFilter && (
        <button
          onClick={handleClear}
          className="p-1.5 rounded-md hover:bg-[#1e2433] text-slate-500 hover:text-slate-300 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
