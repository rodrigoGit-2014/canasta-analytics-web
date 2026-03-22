import { Sparkles } from "lucide-react";

export default function AnalysisProgress({ isPolling }) {
  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-10 animate-fade-in-up">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-600/15 flex items-center justify-center">
          <Sparkles size={24} className="text-blue-400 animate-pulse" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-white mb-1">
            {isPolling ? "Procesando gran volumen de datos..." : "Analizando compras..."}
          </p>
          <p className="text-xs text-slate-500">
            {isPolling
              ? "Esto puede tomar unos momentos"
              : "Buscando patrones de compra en tus transacciones"}
          </p>
        </div>
        <div className="w-48 h-1.5 bg-[#1e2433] rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
