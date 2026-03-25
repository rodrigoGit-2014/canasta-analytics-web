import { useState } from "react";
import { useInteligencia } from "../../contexts/InteligenciaContext";
import useAIInsights from "../../hooks/useAIInsights";
import GenerateInsightsButton from "./GenerateInsightsButton";
import ExecutiveSummaryBanner from "./ExecutiveSummaryBanner";
import InsightCardGrid from "./InsightCardGrid";
import AIRequiresAnalysis from "./AIRequiresAnalysis";
import { Loader2, RefreshCw } from "lucide-react";

export default function InsightsPanel() {
  const { hasResults, filters } = useInteligencia();
  const { insights, isLoading, error, generateInsights, reset } = useAIInsights();
  const [selectedType, setSelectedType] = useState("executive_summary");

  if (!hasResults) return <AIRequiresAnalysis />;

  const handleGenerate = () => {
    generateInsights({
      start_date: filters.startDate,
      end_date: filters.endDate,
      department_id: filters.departmentId,
      section_id: filters.sectionId,
      insight_type: selectedType,
    });
  };

  const types = [
    { id: "executive_summary", label: "Resumen Ejecutivo" },
    { id: "cross_selling", label: "Cross-Selling" },
    { id: "merchandising", label: "Merchandising" },
    { id: "seasonal", label: "Estacionalidad" },
  ];

  return (
    <div className="space-y-6">
      {/* Type selector */}
      <div className="flex gap-2 flex-wrap">
        {types.map((t) => (
          <button
            key={t.id}
            onClick={() => { setSelectedType(t.id); reset(); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedType === t.id
                ? "bg-purple-600/20 text-purple-400 border border-purple-500/20"
                : "bg-[#151721] text-slate-400 border border-[#1e2433] hover:border-purple-500/20"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Generate button or loading */}
      {!insights && !isLoading && (
        <GenerateInsightsButton onClick={handleGenerate} type={selectedType} />
      )}

      {isLoading && (
        <div className="bg-[#151721] rounded-xl border border-purple-500/20 p-8 text-center animate-pulse">
          <Loader2 size={32} className="text-purple-400 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">Analizando datos con inteligencia artificial...</p>
          <p className="text-xs text-slate-600 mt-1">Esto puede tomar unos segundos</p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Results */}
      {insights && insights.data && (
        <div className="space-y-6 animate-fade-in-up">
          <div className="flex justify-end">
            <button
              onClick={() => { reset(); handleGenerate(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-purple-400 bg-[#1e2433] rounded-lg transition"
            >
              <RefreshCw size={13} /> Regenerar
            </button>
          </div>
          <ExecutiveSummaryBanner
            title={insights.data.titulo}
            summary={insights.data.resumen_general}
          />
          <InsightCardGrid
            findings={insights.data.hallazgos_clave || []}
            crossSelling={insights.data.oportunidades_cross_selling || []}
            recommendations={insights.data.recomendaciones_estrategicas || []}
            trends={insights.data.tendencias_detectadas || []}
          />
        </div>
      )}
    </div>
  );
}
