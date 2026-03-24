import { useState, useMemo, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useInteligencia } from "../contexts/InteligenciaContext";
import { getRecommendationsForProduct } from "../utils/ruleTranslator";
import SimulatorCart from "../components/inteligencia/SimulatorCart";
import SimulatorKPIRow from "../components/inteligencia/SimulatorKPIRow";
import RecommendationRanking from "../components/inteligencia/RecommendationRanking";
import RecommendationDetail from "../components/inteligencia/RecommendationDetail";
import InsightExplainer from "../components/inteligencia/InsightExplainer";

export default function ProductRecommendationsPage() {
  const { rules, allProducts, hasResults } = useInteligencia();
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const recommendations = useMemo(
    () => (selectedProduct ? getRecommendationsForProduct(selectedProduct, rules) : []),
    [selectedProduct, rules]
  );

  // Auto-select first recommendation when product changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [selectedProduct]);

  // Enrich selected recommendation with frequency from rules
  const selectedRecommendation = useMemo(() => {
    const rec = recommendations[selectedIndex];
    if (!rec || !selectedProduct) return null;
    const rule = rules.find(
      (r) => r.antecedent === selectedProduct && r.consequent === rec.product
    );
    return {
      ...rec,
      frequency: rule?.frequency || null,
    };
  }, [recommendations, selectedIndex, selectedProduct, rules]);

  // No analysis results — CTA
  if (!hasResults) {
    return (
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={20} className="text-blue-400" />
            <h1 className="text-xl font-bold text-white">
              Simulador de Recomendaciones
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            Descubre que productos recomendar basandote en datos reales
          </p>
        </div>

        <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-16 text-center animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles size={32} className="text-blue-400/60" />
          </div>
          <p className="text-sm font-medium text-slate-400 mb-1">
            Primero ejecuta un analisis de patrones
          </p>
          <p className="text-xs text-slate-600 mb-4">
            Necesitas reglas de asociacion para generar recomendaciones
          </p>
          <button
            onClick={() => navigate("/inteligencia/patrones")}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ir a Patrones de Compra
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={20} className="text-blue-400" />
          <h1 className="text-xl font-bold text-white">
            Simulador de Recomendaciones
          </h1>
        </div>
        <p className="text-sm text-slate-500">
          Selecciona un producto y descubre que otros productos recomendar a tus clientes
        </p>
      </div>

      {/* Cart */}
      <SimulatorCart
        products={allProducts}
        selectedProduct={selectedProduct}
        onSelectProduct={setSelectedProduct}
      />

      {/* Results */}
      {selectedProduct && recommendations.length > 0 && (
        <>
          <SimulatorKPIRow recommendations={recommendations} />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <RecommendationRanking
                recommendations={recommendations}
                selectedIndex={selectedIndex}
                onSelect={setSelectedIndex}
              />
            </div>
            <div className="lg:col-span-2">
              <RecommendationDetail
                recommendation={selectedRecommendation}
                selectedProduct={selectedProduct}
              />
            </div>
          </div>
        </>
      )}

      {/* No recommendations for this product */}
      {selectedProduct && recommendations.length === 0 && (
        <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-10 text-center animate-fade-in-up">
          <p className="text-sm text-slate-400">
            No se encontraron recomendaciones para{" "}
            <span className="font-semibold text-white">{selectedProduct}</span>
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Prueba con otro producto o ejecuta un nuevo analisis con un rango de fechas mas amplio
          </p>
        </div>
      )}

      {/* Explainer */}
      <InsightExplainer />
    </div>
  );
}
