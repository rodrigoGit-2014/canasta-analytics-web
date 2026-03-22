import { useState, useCallback } from "react";
import RulesKPIRow from "../components/association/RulesKPIRow";
import ProductSearch from "../components/association/ProductSearch";
import ForceGraph from "../components/association/ForceGraph";
import RulesTable from "../components/association/RulesTable";
import SliderFilters from "../components/association/SliderFilters";
import AprioriConfigPanel from "../components/association/AprioriConfigPanel";
import { useAssociationData } from "../hooks/useAssociationData";
import useAnalysisPolling from "../hooks/useAnalysisPolling";
import { triggerAprioriAnalysis } from "../services/api";
import { Network, Table, Loader2, AlertCircle, Sparkles } from "lucide-react";

export default function AssociationDashboard() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [minLift, setMinLift] = useState(0.6);
  const [minConfidence, setMinConfidence] = useState(5);
  const [view, setView] = useState("graph");
  const [activeRunId, setActiveRunId] = useState(null);
  const [currentRunId, setCurrentRunId] = useState(null);

  const { kpis, graphData, allProducts, tableRules, loading, error, refetch } =
    useAssociationData(currentRunId, selectedProduct, minLift, minConfidence);

  const { run: pollingRun, isPolling } = useAnalysisPolling(activeRunId, {
    enabled: !!activeRunId,
  });

  // When polling completes, load the new results
  if (pollingRun?.status === "completed" && activeRunId) {
    setCurrentRunId(activeRunId);
    setActiveRunId(null);
    setTimeout(() => refetch(), 500);
  }
  if (pollingRun?.status === "failed" && activeRunId) {
    setActiveRunId(null);
  }

  const handleAnalyze = async (config) => {
    try {
      const result = await triggerAprioriAnalysis(config);
      setActiveRunId(result.run_id);
    } catch (err) {
      console.error("Failed to trigger analysis:", err);
    }
  };

  const handleExport = useCallback(() => {
    const header = "Antecedente,Consecuente,Soporte,Confianza,Lift,Fuerza\n";
    const rows = tableRules
      .map(
        (r) =>
          `"${r.antecedent}","${r.consequent}",${r.support.toFixed(2)},${r.confidence.toFixed(2)},${r.lift.toFixed(2)},${r.strength}`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reglas_asociacion.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [tableRules]);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">
            Reglas de Asociacion
          </h1>
          <p className="text-sm text-slate-500">
            Analisis de cesta de mercado - Algoritmo Apriori
          </p>
        </div>
        <div className="flex items-center bg-[#1a1f2e] rounded-lg p-0.5 border border-[#1e2433]">
          <button
            onClick={() => setView("graph")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
              view === "graph"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Network size={13} />
            Grafo
          </button>
          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
              view === "table"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Table size={13} />
            Tabla
          </button>
        </div>
      </div>

      {/* Config Panel */}
      <AprioriConfigPanel onAnalyze={handleAnalyze} isAnalyzing={isPolling} />

      {/* Polling status */}
      {isPolling && pollingRun && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-blue-600/10 border border-blue-500/20 rounded-xl">
          <Loader2 size={16} className="animate-spin text-blue-400" />
          <div>
            <p className="text-sm font-medium text-blue-400">Analisis en progreso...</p>
            <p className="text-xs text-slate-500">
              Estado: {pollingRun.status}
              {pollingRun.total_transactions && ` · ${pollingRun.total_transactions.toLocaleString()} pedidos`}
            </p>
          </div>
        </div>
      )}

      {pollingRun?.status === "failed" && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-red-600/10 border border-red-500/20 rounded-xl">
          <AlertCircle size={16} className="text-red-400" />
          <div>
            <p className="text-sm font-medium text-red-400">Analisis fallido</p>
            <p className="text-xs text-slate-500">{pollingRun.error_message}</p>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && !isPolling && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-blue-400 mb-3" />
          <p className="text-sm text-slate-500">Cargando reglas de asociacion...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Sparkles size={32} className="text-slate-600 mb-3" />
          <p className="text-sm text-slate-400 mb-1">No hay analisis disponible</p>
          <p className="text-xs text-slate-600 mb-4">Configura y ejecuta tu primer analisis Apriori</p>
        </div>
      )}

      {/* Data loaded */}
      {!loading && !error && (
        <>
          <RulesKPIRow kpis={kpis} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="space-y-4">
              <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-4 animate-fade-in-up">
                <h4 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
                  <Sparkles size={14} className="text-slate-500" />
                  Buscar Producto
                </h4>
                <ProductSearch
                  products={allProducts}
                  selectedProduct={selectedProduct}
                  onSelectProduct={setSelectedProduct}
                />
              </div>
              <SliderFilters
                minLift={minLift}
                onMinLiftChange={setMinLift}
                minConfidence={minConfidence}
                onMinConfidenceChange={setMinConfidence}
              />
            </div>

            <div className="lg:col-span-2">
              {view === "graph" ? (
                <ForceGraph data={graphData} selectedProduct={selectedProduct} />
              ) : (
                <RulesTable rules={tableRules} onExport={handleExport} />
              )}
            </div>
          </div>

          {view === "graph" && (
            <div className="mt-6">
              <RulesTable rules={tableRules} onExport={handleExport} />
            </div>
          )}
        </>
      )}
    </>
  );
}
