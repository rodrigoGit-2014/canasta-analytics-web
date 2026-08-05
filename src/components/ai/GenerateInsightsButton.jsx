import { Sparkles } from "lucide-react";

const TYPE_LABELS = {
  executive_summary: "un resumen ejecutivo",
  cross_selling: "oportunidades de cross-selling",
  merchandising: "recomendaciones de merchandising",
  seasonal: "patrones estacionales",
};

export default function GenerateInsightsButton({ onClick, type }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl p-5 text-center transition-all duration-300 group"
    >
      <div className="flex items-center justify-center gap-2 mb-1">
        <Sparkles size={18} className="text-white group-hover:animate-pulse" />
        <span className="text-base font-semibold text-white">Generar Insights Estrategicos</span>
      </div>
      <p className="text-xs text-white/60">Claude AI analizara tus reglas para generar {TYPE_LABELS[type] || "insights"}</p>
    </button>
  );
}
