import { useState, useMemo } from "react";
import { Lightbulb, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useInteligencia } from "../contexts/InteligenciaContext";
import { getRecommendationsForProduct } from "../utils/ruleTranslator";
import RecommendationSimulator from "../components/inteligencia/RecommendationSimulator";

export default function ProductRecommendationsPage() {
  const { rules, allProducts, hasResults } = useInteligencia();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const recommendations = useMemo(() => {
    if (!selectedProduct) return [];
    return getRecommendationsForProduct(selectedProduct, rules);
  }, [selectedProduct, rules]);

  if (!hasResults) {
    return (
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb size={20} className="text-blue-400" />
            <h1 className="text-xl font-bold text-white">
              Recomendaciones de Producto
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            Simula que productos sugerir junto a una compra
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
          <Lightbulb size={20} className="text-blue-400" />
          <h1 className="text-xl font-bold text-white">
            Recomendaciones de Producto
          </h1>
        </div>
        <p className="text-sm text-slate-500">
          Simula que productos sugerir junto a una compra
        </p>
      </div>

      <RecommendationSimulator
        products={allProducts}
        recommendations={recommendations}
        selectedProduct={selectedProduct}
        onSelectProduct={setSelectedProduct}
      />
    </div>
  );
}
