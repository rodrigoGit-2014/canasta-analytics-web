import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

export default function ProductSearch({
  products,
  selectedProduct,
  onSelectProduct,
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = query
    ? products.filter((p) => p.toLowerCase().includes(query.toLowerCase()))
    : products;

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (product) => {
    onSelectProduct(product);
    setQuery("");
    setOpen(false);
  };

  const handleClear = () => {
    onSelectProduct(null);
    setQuery("");
  };

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={selectedProduct || query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              if (selectedProduct) onSelectProduct(null);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Buscar producto..."
            className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
          {(selectedProduct || query) && (
            <button
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-gray-100 text-gray-400"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {open && !selectedProduct && (
        <div className="absolute z-30 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto custom-scrollbar">
          {filtered.length === 0 ? (
            <p className="px-3 py-2 text-sm text-gray-400">
              Sin resultados
            </p>
          ) : (
            filtered.map((p) => (
              <button
                key={p}
                onClick={() => handleSelect(p)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                {p}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
