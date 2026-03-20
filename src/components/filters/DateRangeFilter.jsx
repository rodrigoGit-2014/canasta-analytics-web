import { Calendar, X } from "lucide-react";

export default function DateRangeFilter({ dateRange, onDateRangeChange }) {
  const handleClear = () => {
    onDateRangeChange({ start: null, end: null });
  };

  const hasFilter = dateRange.start || dateRange.end;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Calendar size={16} className="text-gray-400" />
      <input
        type="date"
        value={dateRange.start || ""}
        min="2023-01-01"
        max="2023-12-31"
        onChange={(e) =>
          onDateRangeChange({ ...dateRange, start: e.target.value || null })
        }
        className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      />
      <span className="text-xs text-gray-400">-</span>
      <input
        type="date"
        value={dateRange.end || ""}
        min="2023-01-01"
        max="2023-12-31"
        onChange={(e) =>
          onDateRangeChange({ ...dateRange, end: e.target.value || null })
        }
        className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      />
      {hasFilter && (
        <button
          onClick={handleClear}
          className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
