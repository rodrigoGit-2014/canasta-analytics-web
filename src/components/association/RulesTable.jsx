import { ArrowRight, Download } from "lucide-react";
import { PRODUCT_SECTION_MAP, SECTION_CATEGORIES } from "../../data/categories";

function LiftBadge({ lift }) {
  let bg, text;
  if (lift >= 2.5) {
    bg = "bg-emerald-100";
    text = "text-emerald-700";
  } else if (lift >= 1.5) {
    bg = "bg-blue-100";
    text = "text-blue-700";
  } else if (lift >= 1.0) {
    bg = "bg-amber-100";
    text = "text-amber-700";
  } else {
    bg = "bg-gray-100";
    text = "text-gray-500";
  }
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${bg} ${text}`}
    >
      {lift.toFixed(2)}
    </span>
  );
}

function ProductTag({ name }) {
  const section = PRODUCT_SECTION_MAP[name];
  const color = SECTION_CATEGORIES[section]?.color || "#6B7280";
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-gray-800">
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      {name}
    </span>
  );
}

export default function RulesTable({ rules, onExport }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 animate-fade-in-up">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">
          Reglas de Asociacion
          <span className="ml-2 text-xs font-normal text-gray-400">
            ({rules.length})
          </span>
        </h3>
        {onExport && (
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Download size={13} />
            CSV
          </button>
        )}
      </div>

      <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gray-50 z-10">
            <tr>
              <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Antecedente
              </th>
              <th className="px-2 py-2.5" />
              <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Consecuente
              </th>
              <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Soporte
              </th>
              <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Confianza
              </th>
              <th className="text-right px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Lift
              </th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, i) => (
              <tr
                key={`${rule.antecedent}-${rule.consequent}-${i}`}
                className="border-t border-gray-50 hover:bg-blue-50/40 transition-colors duration-150"
              >
                <td className="px-5 py-3">
                  <ProductTag name={rule.antecedent} />
                </td>
                <td className="px-2 py-3 text-gray-300">
                  <ArrowRight size={14} />
                </td>
                <td className="px-5 py-3">
                  <ProductTag name={rule.consequent} />
                </td>
                <td className="px-5 py-3 text-xs text-gray-500">
                  {rule.support.toFixed(1)}%
                </td>
                <td className="px-5 py-3 text-xs text-gray-500">
                  {rule.confidence.toFixed(1)}%
                </td>
                <td className="px-5 py-3 text-right">
                  <LiftBadge lift={rule.lift} />
                </td>
              </tr>
            ))}
            {rules.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-sm text-gray-400"
                >
                  Sin reglas para los filtros seleccionados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
