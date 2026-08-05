import { useState } from "react";
import { Network, Sparkles } from "lucide-react";
import { useInteligencia } from "../contexts/InteligenciaContext";
import { useNavigate } from "react-router-dom";
import RelationshipGraph from "../components/inteligencia/RelationshipGraph";
import RelationshipTable from "../components/inteligencia/RelationshipTable";
import ProductSearch from "../components/association/ProductSearch";

export default function ProductRelationshipsPage() {
  const { rules, graphData, allProducts, hasResults } = useInteligencia();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter graph data by selected product
  const filteredGraphData = selectedProduct
    ? {
        nodes: graphData.nodes.filter((n) => {
          return graphData.links.some(
            (l) =>
              ((l.source === selectedProduct || l.source.id === selectedProduct) &&
                (l.target === n.id || l.target.id === n.id)) ||
              ((l.target === selectedProduct || l.target.id === selectedProduct) &&
                (l.source === n.id || l.source.id === n.id)) ||
              n.id === selectedProduct
          );
        }),
        links: graphData.links.filter(
          (l) =>
            (l.source === selectedProduct || l.source.id === selectedProduct) ||
            (l.target === selectedProduct || l.target.id === selectedProduct)
        ),
      }
    : graphData;

  const filteredRules = selectedProduct
    ? rules.filter(
        (r) => r.antecedent === selectedProduct || r.consequent === selectedProduct
      )
    : rules;

  if (!hasResults) {
    return (
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Network size={20} className="text-blue-400" />
            <h1 className="text-xl font-bold text-white">
              Relaciones entre Productos
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            Visualiza como se conectan los productos en las compras
          </p>
        </div>
        <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles size={32} className="text-blue-400/60" />
          </div>
          <p className="text-sm font-medium text-slate-400 mb-2">
            Primero ejecuta un analisis
          </p>
          <p className="text-xs text-slate-600 mb-4">
            Ve a Patrones de Compra para analizar tus transacciones
          </p>
          <button
            onClick={() => navigate("/inteligencia/patrones")}
            className="px-4 py-2 text-sm font-medium text-blue-400 bg-blue-600/10 rounded-lg hover:bg-blue-600/20 transition-colors"
          >
            Ir a Patrones de Compra
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Network size={20} className="text-blue-400" />
          <h1 className="text-xl font-bold text-white">
            Relaciones entre Productos
          </h1>
        </div>
        <p className="text-sm text-slate-500">
          Visualiza como se conectan los productos en las compras
        </p>
      </div>

      {/* Filters */}
      <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-4 animate-fade-in-up">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-72">
            <ProductSearch
              products={allProducts}
              selectedProduct={selectedProduct}
              onSelectProduct={setSelectedProduct}
            />
          </div>
          {selectedProduct && (
            <p className="text-xs text-slate-500">
              Mostrando relaciones de{" "}
              <span className="text-slate-300 font-medium">
                {selectedProduct}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Graph */}
      <RelationshipGraph
        data={filteredGraphData}
        selectedProduct={selectedProduct}
      />

      {/* Table */}
      <RelationshipTable rules={filteredRules} />
    </div>
  );
}
