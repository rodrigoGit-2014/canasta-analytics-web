import { Calendar, Building2, FolderTree } from "lucide-react";
import AnalyzeButton from "./AnalyzeButton";
import AnalysisProgress from "./AnalysisProgress";
import DatasetSummaryRow from "./DatasetSummaryRow";
import AnalysisConfig from "./AnalysisConfig";

export default function StepAnalysis({
  filters,
  runAnalysis,
  isLoading,
  isPolling,
  error,
  hasResults,
  summary,
  rulesCount,
  params,
  onParamsChange,
}) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Selected filters summary */}
      <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Datos seleccionados
        </p>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1f2e] rounded-lg border border-[#2a3347]">
            <Calendar size={14} className="text-blue-400" />
            <span className="text-xs text-slate-300">
              {filters.startDate} — {filters.endDate}
            </span>
          </div>
          {filters.departmentId && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1f2e] rounded-lg border border-[#2a3347]">
              <Building2 size={14} className="text-emerald-400" />
              <span className="text-xs text-slate-300">
                Depto: {filters.departmentId}
              </span>
            </div>
          )}
          {filters.sectionId && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1f2e] rounded-lg border border-[#2a3347]">
              <FolderTree size={14} className="text-amber-400" />
              <span className="text-xs text-slate-300">
                Seccion: {filters.sectionId}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Config + Analyze button — visible when not loading and no results yet */}
      {!isLoading && !hasResults && (
        <>
          <AnalysisConfig params={params} onParamsChange={onParamsChange} />
          <AnalyzeButton onClick={runAnalysis} isLoading={isLoading} />
        </>
      )}

      {/* Analysis error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Loading analysis */}
      {isLoading && <AnalysisProgress isPolling={isPolling} />}

      {/* Results summary */}
      {hasResults && summary && (
        <DatasetSummaryRow summary={summary} rulesCount={rulesCount} />
      )}
    </div>
  );
}
