import { formatCurrency, formatNumber } from "../../utils/formatters";

export default function ProductList({ products }) {
  const maxSales = products.length > 0 ? products[0].totalSales : 1;

  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-5 animate-fade-in-up">
      <h3 className="text-sm font-semibold text-white mb-4">
        Ranking de Productos
      </h3>
      <div className="max-h-80 overflow-y-auto custom-scrollbar space-y-1">
        {products.map((product, index) => (
          <div
            key={product.name}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1e2433] transition-colors duration-150 group"
            style={{ animationDelay: `${index * 20}ms` }}
          >
            <span className="text-xs font-medium text-slate-500 w-5 text-right">
              {index + 1}
            </span>
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: product.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">
                {product.name}
              </p>
              <div className="mt-1 h-1 bg-[#1e293b] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(product.totalSales / maxSales) * 100}%`,
                    backgroundColor: product.color,
                    opacity: 0.7,
                  }}
                />
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-semibold text-white">
                {formatCurrency(product.totalSales)}
              </p>
              <p className="text-xs text-slate-500">
                {formatNumber(product.totalQuantity)} uds
              </p>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-8">
            Sin datos disponibles
          </p>
        )}
      </div>
    </div>
  );
}
