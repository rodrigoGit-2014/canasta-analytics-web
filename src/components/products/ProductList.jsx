import { formatCurrency, formatNumber } from "../../utils/formatters";

export default function ProductList({ products }) {
  const maxSales = products.length > 0 ? products[0].totalSales : 1;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-fade-in-up">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Ranking de Productos
      </h3>
      <div className="max-h-80 overflow-y-auto custom-scrollbar space-y-1">
        {products.map((product, index) => (
          <div
            key={product.name}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors duration-150 group"
            style={{ animationDelay: `${index * 20}ms` }}
          >
            <span className="text-xs font-medium text-gray-400 w-5 text-right">
              {index + 1}
            </span>
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: product.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {product.name}
              </p>
              <div className="mt-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(product.totalSales / maxSales) * 100}%`,
                    backgroundColor: product.color,
                    opacity: 0.6,
                  }}
                />
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-semibold text-gray-900">
                {formatCurrency(product.totalSales)}
              </p>
              <p className="text-xs text-gray-400">
                {formatNumber(product.totalQuantity)} uds
              </p>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">
            Sin datos disponibles
          </p>
        )}
      </div>
    </div>
  );
}
