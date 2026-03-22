import { useState } from "react";
import { Sparkles, LayoutList, Grid3x3 } from "lucide-react";
import { useInteligencia } from "../contexts/InteligenciaContext";
import useDatasetPreview from "../hooks/useDatasetPreview";
import AnalysisFilterPanel from "../components/inteligencia/AnalysisFilterPanel";
import AnalysisProgress from "../components/inteligencia/AnalysisProgress";
import DatasetSummaryRow from "../components/inteligencia/DatasetSummaryRow";
import TransactionPreviewTable from "../components/inteligencia/TransactionPreviewTable";
import AnalyzeButton from "../components/inteligencia/AnalyzeButton";
import PatternCardList from "../components/inteligencia/PatternCardList";
import RelationshipTable from "../components/inteligencia/RelationshipTable";

export default function PurchasePatternsPage() {
  const {
    filters,
    setFilters,
    runAnalysis,
    rules,
    summary: analysisSummary,
    isLoading,
    isPolling,
    error,
    hasResults,
  } = useInteligencia();

  const preview = useDatasetPreview(filters);
  const [view, setView] = useState("cards");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={20} className="text-blue-400" />
          <h1 className="text-xl font-bold text-white">Patrones de Compra</h1>
        </div>
        <p className="text-sm text-slate-500">
          Descubre que productos se compran juntos con mayor frecuencia
        </p>
      </div>

      {/* Filters (without button) */}
      <AnalysisFilterPanel
        filters={filters}
        onFiltersChange={setFilters}
        onAnalyze={runAnalysis}
        isLoading={isLoading}
        hideButton
      />

      {/* Preview loading */}
      {preview.isLoading && (
        <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-8 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3">
            <span className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
            <p className="text-sm text-slate-400">Cargando vista previa del dataset...</p>
          </div>
        </div>
      )}

      {/* Preview error */}
      {preview.error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-400">
          {preview.error}
        </div>
      )}

      {/* Dataset preview: table + summary */}
      {preview.hasPreview && (
        <>
          <TransactionPreviewTable
            baskets={preview.baskets}
            total={preview.totalBaskets}
            page={preview.page}
            totalPages={preview.totalPages}
            pageSize={preview.pageSize}
            onPageChange={preview.goToPage}
            isPageLoading={preview.isPageLoading}
          />
          <DatasetSummaryRow summary={preview.summary} rulesCount={null} />
        </>
      )}

      {/* Analyze button — visible when dates are selected */}
      {filters.startDate && filters.endDate && (
        <AnalyzeButton onClick={runAnalysis} isLoading={isLoading} />
      )}

      {/* Analysis error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Loading analysis */}
      {isLoading && <AnalysisProgress isPolling={isPolling} />}

      {/* Analysis results */}
      {hasResults && analysisSummary && (
        <>
          <DatasetSummaryRow summary={analysisSummary} rulesCount={rules.length} />

          {rules.length > 0 && (
            <>
              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView("cards")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                    view === "cards"
                      ? "bg-blue-600/15 text-blue-400 border-blue-500/20"
                      : "text-slate-400 bg-[#1a1f2e] border-[#1e2433] hover:bg-[#252d3d]"
                  }`}
                >
                  <Grid3x3 size={13} />
                  Patrones
                </button>
                <button
                  onClick={() => setView("table")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                    view === "table"
                      ? "bg-blue-600/15 text-blue-400 border-blue-500/20"
                      : "text-slate-400 bg-[#1a1f2e] border-[#1e2433] hover:bg-[#252d3d]"
                  }`}
                >
                  <LayoutList size={13} />
                  Tabla
                </button>
              </div>

              {view === "cards" ? (
                <PatternCardList patterns={rules} />
              ) : (
                <RelationshipTable rules={rules} />
              )}
            </>
          )}

          {rules.length === 0 && (
            <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-10 text-center">
              <p className="text-sm text-slate-500">
                No se encontraron patrones de compra para el rango seleccionado.
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Intenta ampliar el rango de fechas o ajustar los filtros.
              </p>
            </div>
          )}
        </>
      )}

      {/* Empty state — only when no dates selected and no results */}
      {!hasResults && !isLoading && !preview.hasPreview && !preview.isLoading && !error && (
        <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles size={32} className="text-blue-400/60" />
          </div>
          <p className="text-sm font-medium text-slate-400 mb-1">
            Selecciona un rango de fechas para comenzar
          </p>
          <p className="text-xs text-slate-600">
            Analizaremos tus transacciones para descubrir patrones de compra
          </p>
        </div>
      )}
    </div>
  );
}
