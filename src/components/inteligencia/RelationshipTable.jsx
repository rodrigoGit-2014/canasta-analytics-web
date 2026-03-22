import { ArrowRight, Download } from "lucide-react";
import { PRODUCT_SECTION_MAP, SECTION_CATEGORIES } from "../../data/categories";
import StrengthBadge from "./StrengthBadge";

function ProductTag({ name }) {
  const section = PRODUCT_SECTION_MAP[name];
  const color = SECTION_CATEGORIES[section]?.color || "#6B7280";
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-slate-300">
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      {name}
    </span>
  );
}

export default function RelationshipTable({ rules, onExport }) {
  const exportCSV = () => {
    const header = "Producto,Se compra con,Frecuencia Conjunta %,Probabilidad %,Fuerza\n";
    const rows = rules
      .map((r) => `"${r.antecedent}","${r.consequent}",${r.frequency},${r.probability},${r.strengthLabel}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "patrones-de-compra.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] animate-fade-in-up">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e2433]">
        <h3 className="text-sm font-semibold text-white">
          Patrones de Compra
          <span className="ml-2 text-xs font-normal text-slate-500">
            ({rules.length})
          </span>
        </h3>
        <button
          onClick={onExport || exportCSV}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 bg-[#1a1f2e] rounded-lg hover:bg-[#252d3d] hover:text-slate-200 transition-colors border border-[#1e2433]"
        >
          <Download size={13} />
          CSV
        </button>
      </div>

      <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-[#1a1f2e] z-10">
            <tr>
              <th className="text-left px-5 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-2 py-2.5" />
              <th className="text-left px-5 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Se compra con
              </th>
              <th className="text-left px-5 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Frecuencia Conjunta
              </th>
              <th className="text-left px-5 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Probabilidad
              </th>
              <th className="text-right px-5 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Fuerza
              </th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, i) => (
              <tr
                key={`${rule.antecedent}-${rule.consequent}-${i}`}
                className="border-t border-[#1e2433] hover:bg-blue-600/5 transition-colors duration-150"
              >
                <td className="px-5 py-3">
                  <ProductTag name={rule.antecedent} />
                </td>
                <td className="px-2 py-3 text-slate-600">
                  <ArrowRight size={14} />
                </td>
                <td className="px-5 py-3">
                  <ProductTag name={rule.consequent} />
                </td>
                <td className="px-5 py-3 text-xs text-slate-500">
                  {rule.frequency}%
                </td>
                <td className="px-5 py-3 text-xs text-slate-500">
                  {rule.probability}%
                </td>
                <td className="px-5 py-3 text-right">
                  <StrengthBadge value={rule.strengthValue} />
                </td>
              </tr>
            ))}
            {rules.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-sm text-slate-500"
                >
                  Sin patrones para los filtros seleccionados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
