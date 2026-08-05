import { useState } from "react";
import { FileText, ShoppingBag, BarChart3, Download, Loader2 } from "lucide-react";
import { useInteligencia } from "../../contexts/InteligenciaContext";
import useAIReports from "../../hooks/useAIReports";
import AIRequiresAnalysis from "./AIRequiresAnalysis";

const REPORT_TYPES = [
  { id: "executive", label: "Resumen Ejecutivo", desc: "Resumen de alto nivel para directivos", icon: FileText },
  { id: "cross_selling", label: "Cross-Selling", desc: "Oportunidades de venta cruzada", icon: ShoppingBag },
  { id: "patterns", label: "Patrones Detallados", desc: "Analisis completo de reglas y metricas", icon: BarChart3 },
];

const FORMATS = [
  { id: "pdf", label: "PDF", color: "text-red-400 bg-red-500/10 border-red-500/20" },
  { id: "docx", label: "Word", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { id: "pptx", label: "PowerPoint", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
];

export default function ReportsPanel() {
  const { hasResults, filters } = useInteligencia();
  const { job, isGenerating, error, requestReport, reset } = useAIReports();
  const [selectedType, setSelectedType] = useState("executive");

  if (!hasResults) return <AIRequiresAnalysis />;

  const handleDownload = (format) => {
    reset();
    requestReport({
      start_date: filters.startDate,
      end_date: filters.endDate,
      department_id: filters.departmentId,
      section_id: filters.sectionId,
      format,
      report_type: selectedType,
    });
  };

  return (
    <div className="space-y-6">
      {/* Type selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {REPORT_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-5 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-purple-500/5 border-purple-500/30"
                  : "bg-[#151721] border-[#1e2433] hover:border-purple-500/20"
              }`}
            >
              <Icon size={20} className={isSelected ? "text-purple-400 mb-2" : "text-slate-500 mb-2"} />
              <h4 className="text-sm font-semibold text-white mb-1">{type.label}</h4>
              <p className="text-xs text-slate-500">{type.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Download buttons */}
      <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Descargar Reporte</h3>
        <div className="flex flex-wrap gap-3">
          {FORMATS.map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => handleDownload(fmt.id)}
              disabled={isGenerating}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium transition ${fmt.color} hover:opacity-80 disabled:opacity-40`}
            >
              <Download size={14} />
              {fmt.label}
            </button>
          ))}
        </div>

        {isGenerating && (
          <div className="flex items-center gap-2 mt-4 text-sm text-purple-400">
            <Loader2 size={16} className="animate-spin" />
            <span>Generando reporte... {job?.status}</span>
          </div>
        )}

        {error && <p className="text-sm text-red-400 mt-4">{error}</p>}

        {job?.status === "completed" && (
          <p className="text-sm text-emerald-400 mt-4">Reporte descargado exitosamente</p>
        )}
      </div>
    </div>
  );
}
