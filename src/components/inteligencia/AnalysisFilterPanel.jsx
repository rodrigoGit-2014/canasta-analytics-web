import { Sparkles } from "lucide-react";
import DateRangeFilter from "../filters/DateRangeFilter";
import DepartmentSectionFilter from "./DepartmentSectionFilter";

export default function AnalysisFilterPanel({
  filters,
  onFiltersChange,
  onAnalyze,
  isLoading,
}) {
  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-5 animate-fade-in-up">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4">
        <div className="flex-1 flex flex-col sm:flex-row gap-4 flex-wrap">
          <DateRangeFilter
            dateRange={{ start: filters.startDate, end: filters.endDate }}
            onDateRangeChange={({ start, end }) =>
              onFiltersChange({ ...filters, startDate: start, endDate: end })
            }
          />
          <DepartmentSectionFilter
            departmentId={filters.departmentId}
            sectionId={filters.sectionId}
            onDepartmentChange={(v) =>
              onFiltersChange({ ...filters, departmentId: v })
            }
            onSectionChange={(v) =>
              onFiltersChange({ ...filters, sectionId: v })
            }
          />
        </div>

        <button
          onClick={onAnalyze}
          disabled={isLoading || !filters.startDate || !filters.endDate}
          className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analizando...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Analizar Compras
            </>
          )}
        </button>
      </div>
    </div>
  );
}
