import { useState, useCallback } from "react";
import RulesKPIRow from "../components/association/RulesKPIRow";
import ProductSearch from "../components/association/ProductSearch";
import ForceGraph from "../components/association/ForceGraph";
import RulesTable from "../components/association/RulesTable";
import SliderFilters from "../components/association/SliderFilters";
import { useAssociationData } from "../hooks/useAssociationData";
import { Network, Table, BarChart3 } from "lucide-react";

export default function AssociationDashboard({ selectedCategory }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [minLift, setMinLift] = useState(0.6);
  const [minConfidence, setMinConfidence] = useState(5);
  const [view, setView] = useState("graph");

  const { kpis, graphData, allProducts, tableRules } = useAssociationData(
    selectedCategory,
    selectedProduct,
    minLift,
    minConfidence
  );

  const handleExport = useCallback(() => {
    const header = "Antecedente,Consecuente,Soporte,Confianza,Lift\n";
    const rows = tableRules
      .map(
        (r) =>
          `"${r.antecedent}","${r.consequent}",${r.support},${r.confidence},${r.lift}`
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
          <h1 className="text-xl font-bold text-gray-900">
            Reglas de Asociacion
          </h1>
          <p className="text-sm text-gray-500">
            Analisis de cesta de mercado - Algoritmo Apriori
          </p>
        </div>
        <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setView("graph")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
              view === "graph"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Network size={13} />
            Grafo
          </button>
          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
              view === "table"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Table size={13} />
            Tabla
          </button>
        </div>
      </div>

      <RulesKPIRow kpis={kpis} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left: Filters */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-fade-in-up">
            <h4 className="text-xs font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <BarChart3 size={14} className="text-gray-400" />
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

        {/* Center/Right: Graph or Table */}
        <div className="lg:col-span-2">
          {view === "graph" ? (
            <ForceGraph
              data={graphData}
              selectedProduct={selectedProduct}
            />
          ) : (
            <RulesTable rules={tableRules} onExport={handleExport} />
          )}
        </div>
      </div>

      {/* Always show table below graph view */}
      {view === "graph" && (
        <div className="mt-6">
          <RulesTable rules={tableRules} onExport={handleExport} />
        </div>
      )}
    </>
  );
}
