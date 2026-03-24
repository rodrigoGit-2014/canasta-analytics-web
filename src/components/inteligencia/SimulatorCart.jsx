import { ShoppingCart, X } from "lucide-react";
import ProductSearch from "../association/ProductSearch";

export default function SimulatorCart({ products, selectedProduct, onSelectProduct }) {
  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-5 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Label */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-blue-600/15 flex items-center justify-center">
            <ShoppingCart size={18} className="text-blue-400" />
          </div>
          <p className="text-sm font-semibold text-slate-300">
            {selectedProduct ? "Tu cliente compra:" : "Selecciona un producto:"}
          </p>
        </div>

        {/* Search or chip */}
        {selectedProduct ? (
          <div className="flex items-center gap-2 animate-fade-in-up">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-600/15 border border-blue-500/30 rounded-lg">
              <span className="text-sm font-semibold text-blue-300">
                {selectedProduct}
              </span>
              <button
                onClick={() => onSelectProduct(null)}
                className="p-0.5 rounded hover:bg-blue-500/20 text-blue-400 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 max-w-md">
            <ProductSearch
              products={products}
              selectedProduct={selectedProduct}
              onSelectProduct={onSelectProduct}
            />
          </div>
        )}
      </div>
    </div>
  );
}
