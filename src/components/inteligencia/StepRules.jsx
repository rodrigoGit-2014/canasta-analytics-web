import { useState } from "react";
import { Grid3x3, LayoutList } from "lucide-react";
import DatasetSummaryRow from "./DatasetSummaryRow";
import PatternCardList from "./PatternCardList";
import RelationshipTable from "./RelationshipTable";

export default function StepRules({ rules, summary }) {
  const [view, setView] = useState("cards");

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Summary KPIs */}
      {summary && (
        <DatasetSummaryRow summary={summary} rulesCount={rules.length} />
      )}

      {rules.length > 0 ? (
        <>
          {/* View toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("cards")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                view === "cards"
                  ? "bg-blue-600/15 text-blue-400 border-blue-500/20"
                  : "text-slate-400 bg-[#1a1f2e] border-[#1e2433] hover:bg-[#252d3d]"
              }`}
            >
              <Grid3x3 size={13} />
              Patrones
            </button>
            <button
              onClick={() => setView("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                view === "table"
                  ? "bg-blue-600/15 text-blue-400 border-blue-500/20"
                  : "text-slate-400 bg-[#1a1f2e] border-[#1e2433] hover:bg-[#252d3d]"
              }`}
            >
              <LayoutList size={13} />
              Tabla
            </button>
          </div>

          {view === "cards" ? (
            <PatternCardList patterns={rules} />
          ) : (
            <RelationshipTable rules={rules} />
          )}
        </>
      ) : (
        <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-10 text-center">
          <p className="text-sm text-slate-500">
            No se encontraron patrones de compra para el rango seleccionado.
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Intenta ampliar el rango de fechas o ajustar los filtros.
          </p>
        </div>
      )}
    </div>
  );
}
