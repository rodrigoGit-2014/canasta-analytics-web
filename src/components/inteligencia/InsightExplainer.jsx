import { useState } from "react";
import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react";

export default function InsightExplainer() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#151721] rounded-xl border border-dashed border-[#2a3347] p-5 animate-fade-in-up">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Lightbulb size={18} className="text-amber-400" />
          <p className="text-sm font-semibold text-slate-300">
            Como funciona este simulador?
          </p>
        </div>
        {expanded ? (
          <ChevronUp size={16} className="text-slate-500" />
        ) : (
          <ChevronDown size={16} className="text-slate-500" />
        )}
      </button>

      {expanded && (
        <div className="mt-4 space-y-3 animate-fade-in-up">
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600/15 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-400">1</span>
            </div>
            <p className="text-sm text-slate-400">
              <span className="text-slate-300 font-medium">Analisis de datos reales:</span>{" "}
              Se analizan miles de compras historicas de tu tienda para encontrar patrones.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600/15 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-400">2</span>
            </div>
            <p className="text-sm text-slate-400">
              <span className="text-slate-300 font-medium">Productos que se compran juntos:</span>{" "}
              El algoritmo identifica combinaciones de productos que aparecen frecuentemente en la misma compra.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600/15 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-400">3</span>
            </div>
            <p className="text-sm text-slate-400">
              <span className="text-slate-300 font-medium">Probabilidades reales:</span>{" "}
              Cada porcentaje representa la probabilidad real de que un cliente compre el producto recomendado junto con el producto seleccionado.
            </p>
          </div>
          <div className="mt-2 p-3 bg-amber-500/8 border border-amber-500/15 rounded-lg">
            <p className="text-xs text-amber-400/80">
              Usa estas recomendaciones para mejorar la ubicacion de productos en tienda,
              crear promociones cruzadas y aumentar el ticket promedio de compra.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
