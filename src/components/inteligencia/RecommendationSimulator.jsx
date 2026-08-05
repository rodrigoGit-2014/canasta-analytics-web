import { Lightbulb } from "lucide-react";
import ProductSearch from "../association/ProductSearch";
import RecommendationCard from "./RecommendationCard";

export default function RecommendationSimulator({
  products,
  recommendations,
  selectedProduct,
  onSelectProduct,
}) {
  return (
    <div className="space-y-6">
      {/* Product Search */}
      <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-5 animate-fade-in-up">
        <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-3">
          Selecciona un producto
        </p>
        <div className="max-w-md">
          <ProductSearch
            products={products}
            selectedProduct={selectedProduct}
            onSelectProduct={onSelectProduct}
          />
        </div>
      </div>

      {/* Recommendations */}
      {selectedProduct && recommendations.length > 0 && (
        <>
          <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-4 animate-fade-in-up">
            <div className="flex items-start gap-3">
              <Lightbulb size={18} className="text-blue-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-blue-300">
                  Si un cliente compra{" "}
                  <span className="font-semibold text-white">
                    {selectedProduct}
                  </span>
                  , encontramos{" "}
                  <span className="font-semibold text-white">
                    {recommendations.length}
                  </span>{" "}
                  {recommendations.length === 1
                    ? "producto frecuentemente comprado"
                    : "productos frecuentemente comprados"}{" "}
                  junto a este.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {recommendations.map((rec) => (
              <RecommendationCard key={rec.product} recommendation={rec} />
            ))}
          </div>
        </>
      )}

      {selectedProduct && recommendations.length === 0 && (
        <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-10 text-center">
          <p className="text-sm text-slate-500">
            No se encontraron recomendaciones para{" "}
            <span className="text-slate-300">{selectedProduct}</span>
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Intenta con otro producto
          </p>
        </div>
      )}

      {!selectedProduct && (
        <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mx-auto mb-4">
            <Lightbulb size={32} className="text-blue-400/60" />
          </div>
          <p className="text-sm font-medium text-slate-400 mb-1">
            Busca un producto para ver recomendaciones
          </p>
          <p className="text-xs text-slate-600">
            Te mostraremos los productos que se compran frecuentemente junto al
            seleccionado
          </p>
        </div>
      )}
    </div>
  );
}
