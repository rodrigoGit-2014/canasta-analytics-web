import { useState, useEffect } from "react";
import { getProductRecommendations, getAssociationRules } from "../services/api";
import ProductSearch from "../components/association/ProductSearch";
import RadialGraph from "../components/association/RadialGraph";
import ProductCards from "../components/association/ProductCards";
import { Orbit, LayoutGrid, Loader2, Sparkles } from "lucide-react";

export default function ProductExplorer() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState("radial");

  // Load product list from latest rules
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getAssociationRules("latest", { page_size: 1000 });
        const products = new Set();
        (data.rules || []).forEach((r) => {
          products.add(r.antecedent);
          products.add(r.consequent);
        });
        setAllProducts([...products].sort());
      } catch {
        setAllProducts([]);
      }
    }
    loadProducts();
  }, []);

  // Fetch recommendations when product changes
  useEffect(() => {
    if (!selectedProduct) {
      setRecommendations(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    getProductRecommendations(selectedProduct, undefined, 20)
      .then((data) => {
        if (!cancelled) setRecommendations(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [selectedProduct]);

  const handleNodeClick = (productName) => {
    setSelectedProduct(productName);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">
            Explorador de Producto
          </h1>
          <p className="text-sm text-slate-500">
            Selecciona un producto para ver sus asociaciones
          </p>
        </div>
        <div className="flex items-center bg-[#1a1f2e] rounded-lg p-0.5 border border-[#1e2433]">
          <button
            onClick={() => setView("radial")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
              view === "radial"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Orbit size={13} />
            Radial
          </button>
          <button
            onClick={() => setView("cards")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
              view === "cards"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <LayoutGrid size={13} />
            Tarjetas
          </button>
        </div>
      </div>

      {/* Product Search */}
      <div className="max-w-md mb-6">
        <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-4">
          <ProductSearch
            products={allProducts}
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
          />
        </div>
      </div>

      {/* Empty state */}
      {!selectedProduct && !loading && (
        <div className="flex flex-col items-center justify-center py-24">
          <Sparkles size={40} className="text-slate-700 mb-4" />
          <p className="text-sm text-slate-400">Selecciona un producto para explorar sus asociaciones</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 size={32} className="animate-spin text-blue-400 mb-3" />
          <p className="text-sm text-slate-500">Buscando asociaciones para {selectedProduct}...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-24">
          <p className="text-sm text-slate-400">{error}</p>
        </div>
      )}

      {/* Results */}
      {recommendations && !loading && !error && (
        <>
          {/* Summary */}
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[#151721] rounded-xl border border-[#1e2433] px-4 py-3">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Producto</p>
              <p className="text-sm font-semibold text-white">{recommendations.product}</p>
            </div>
            <div className="bg-[#151721] rounded-xl border border-[#1e2433] px-4 py-3">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Asociaciones</p>
              <p className="text-sm font-semibold text-blue-400">{recommendations.total_associations}</p>
            </div>
          </div>

          {/* Visualization */}
          {view === "radial" ? (
            <RadialGraph
              product={recommendations.product}
              recommendations={recommendations.recommendations}
              onNodeClick={handleNodeClick}
            />
          ) : (
            <ProductCards
              product={recommendations.product}
              recommendations={recommendations.recommendations}
              onCardClick={handleNodeClick}
            />
          )}
        </>
      )}
    </>
  );
}
