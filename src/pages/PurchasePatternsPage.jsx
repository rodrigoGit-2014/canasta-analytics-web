import { useState } from "react";
import { Sparkles, LayoutList, Grid3x3 } from "lucide-react";
import { useInteligencia } from "../contexts/InteligenciaContext";
import AnalysisFilterPanel from "../components/inteligencia/AnalysisFilterPanel";
import AnalysisProgress from "../components/inteligencia/AnalysisProgress";
import DatasetSummaryRow from "../components/inteligencia/DatasetSummaryRow";
import PatternCardList from "../components/inteligencia/PatternCardList";
import RelationshipTable from "../components/inteligencia/RelationshipTable";

export default function PurchasePatternsPage() {
  const {
    filters,
    setFilters,
    runAnalysis,
    rules,
    summary,
    isLoading,
    isPolling,
    error,
    hasResults,
  } = useInteligencia();

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

      {/* Filters */}
      <AnalysisFilterPanel
        filters={filters}
        onFiltersChange={setFilters}
        onAnalyze={runAnalysis}
        isLoading={isLoading}
      />

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Loading */}
      {isLoading && <AnalysisProgress isPolling={isPolling} />}

      {/* Results */}
      {hasResults && summary && (
        <>
          <DatasetSummaryRow summary={summary} rulesCount={rules.length} />

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

      {/* Empty state */}
      {!hasResults && !isLoading && !error && (
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
