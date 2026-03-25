import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { formatCurrency, formatNumber } from "../../utils/formatters";

const COLUMNS = [
  { key: "_rank", label: "#", align: "center", width: "w-12" },
  { key: "nombre_producto", label: "Producto", align: "left" },
  { key: "total_quantity", label: "Cantidad", align: "right", format: (v) => formatNumber(v) },
  { key: "total_revenue", label: "Revenue", align: "right", format: (v) => formatCurrency(v) },
  { key: "avg_unit_price", label: "Precio Medio", align: "right", format: (v) => formatCurrency(v) },
];

export default function ProductRankingTable({ data }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("desc");

  const handleSort = (key) => {
    if (key === "_rank") return;
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (av == null) return 1;
        if (bv == null) return -1;
        const cmp = typeof av === "string" ? av.localeCompare(bv) : av - bv;
        return sortDir === "asc" ? cmp : -cmp;
      })
    : data;

  const totals = useMemo(() => ({
    total_quantity: data.reduce((sum, r) => sum + (r.total_quantity || 0), 0),
    total_revenue: data.reduce((sum, r) => sum + (r.total_revenue || 0), 0),
  }), [data]);

  const alignClass = (align) =>
    align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";

  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] animate-fade-in-up overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-[#1e2433] flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">
          Ranking de Productos
          <span className="ml-2 text-xs font-normal text-slate-500">
            ({data.length})
          </span>
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-auto custom-scrollbar" style={{ maxHeight: "14rem" }}>
        <table className="w-full">
          <thead className="sticky top-0 bg-[#1a1f2e] z-10">
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider ${alignClass(col.align)} ${
                    col.key !== "_rank" ? "cursor-pointer hover:text-slate-300" : ""
                  } transition-colors ${col.width || ""}`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key && (
                      sortDir === "asc"
                        ? <ChevronUp size={10} />
                        : <ChevronDown size={10} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, i) => (
              <tr
                key={i}
                className={`border-t border-[#1e2433] hover:bg-[#1e2433]/60 transition-colors duration-150 ${
                  i % 2 === 1 ? "bg-[#1a1f2e]/30" : ""
                }`}
              >
                {COLUMNS.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-2.5 text-sm ${alignClass(col.align)} ${
                      col.key === "_rank"
                        ? "text-slate-500 font-medium"
                        : col.key === "nombre_producto"
                        ? "text-slate-200 font-medium"
                        : "text-slate-300 font-mono tabular-nums"
                    } ${col.width || ""}`}
                  >
                    {col.format ? col.format(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* Totals row */}
          <tfoot className="sticky bottom-0 z-10">
            <tr className="bg-[#1a1f2e] border-t-2 border-blue-500/30">
              <td className="px-4 py-3 text-center">
                <span className="text-xs text-slate-500">Σ</span>
              </td>
              <td className="px-4 py-3 text-sm font-semibold text-white">
                Total
              </td>
              <td className="px-4 py-3 text-sm font-semibold text-white text-right font-mono tabular-nums">
                {formatNumber(totals.total_quantity)}
              </td>
              <td className="px-4 py-3 text-sm font-semibold text-white text-right font-mono tabular-nums">
                {formatCurrency(totals.total_revenue)}
              </td>
              <td className="px-4 py-3 text-sm text-slate-500 text-right">
                —
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
