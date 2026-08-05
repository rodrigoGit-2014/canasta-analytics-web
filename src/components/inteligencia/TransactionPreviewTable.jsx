import { Table2, ChevronLeft, ChevronRight } from "lucide-react";
import { formatNumber } from "../../utils/formatters";

export default function TransactionPreviewTable({
  baskets,
  total,
  page,
  totalPages,
  pageSize,
  onPageChange,
  isPageLoading,
}) {
  const start = page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, total);

  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e2433]">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Table2 size={15} className="text-blue-400" />
            Vista previa de transacciones
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Mostrando {formatNumber(start)}–{formatNumber(end)} de{" "}
            {formatNumber(total)} compras
          </p>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 0 || isPageLoading}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-[#1e2433] hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-1">
              {generatePageNumbers(page, totalPages).map((p, i) =>
                p === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-1 text-xs text-slate-600">
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    disabled={isPageLoading}
                    className={`min-w-[28px] h-7 rounded-md text-xs font-medium transition-colors ${
                      p === page
                        ? "bg-blue-600/15 text-blue-400 border border-blue-500/20"
                        : "text-slate-400 hover:bg-[#1e2433] hover:text-slate-200"
                    }`}
                  >
                    {p + 1}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages - 1 || isPageLoading}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-[#1e2433] hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className={`max-h-[400px] overflow-y-auto custom-scrollbar ${isPageLoading ? "opacity-50" : ""} transition-opacity`}>
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-[#1a1f2e] z-10">
            <tr>
              <th className="text-left px-5 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-24">
                # Compra
              </th>
              <th className="text-left px-5 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Productos
              </th>
            </tr>
          </thead>
          <tbody>
            {baskets.map((basket, i) => (
              <tr
                key={basket.transaction_id}
                className="border-t border-[#1e2433] hover:bg-blue-600/5 transition-colors duration-150"
              >
                <td className="px-5 py-2.5 text-xs text-slate-500 font-mono">
                  {start + i}
                </td>
                <td className="px-5 py-2.5">
                  <div className="flex flex-wrap gap-1.5">
                    {basket.products.map((product) => (
                      <span
                        key={product}
                        className="inline-flex px-2 py-0.5 text-xs text-slate-300 bg-[#1a1f2e] rounded-md border border-[#2a3347]"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
            {baskets.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="px-5 py-10 text-center text-sm text-slate-500"
                >
                  Sin transacciones en el rango seleccionado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function generatePageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i);
  }

  const pages = new Set([0, total - 1]);
  for (let i = Math.max(1, current - 1); i <= Math.min(total - 2, current + 1); i++) {
    pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push("...");
    }
    result.push(sorted[i]);
  }

  return result;
}
