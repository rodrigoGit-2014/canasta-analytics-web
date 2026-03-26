import InsightCard from "./InsightCard";
import { Lightbulb } from "lucide-react";

export default function InsightCardGrid({ findings, crossSelling, recommendations, trends }) {
  return (
    <div className="space-y-6">
      {/* Findings */}
      {findings.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Hallazgos Clave</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {findings.map((f, i) => (
              <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <InsightCard
                  title={f.titulo}
                  description={f.descripcion}
                  impact={f.impacto}
                  type={f.tipo || "tendencia"}
                  actions={[]}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cross-selling */}
      {crossSelling.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Oportunidades de Cross-Selling</h3>
          <div className="bg-[#151721] rounded-xl border border-[#1e2433] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1a1f2e]">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-400 uppercase">Productos</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-400 uppercase">Confianza</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-400 uppercase">Lift</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-400 uppercase">Accion</th>
                </tr>
              </thead>
              <tbody>
                {crossSelling.map((opp, i) => (
                  <tr key={i} className="border-t border-[#1e2433]">
                    <td className="px-4 py-3 text-white font-medium">{opp.combinacion?.join(" + ") || "—"}</td>
                    <td className="px-4 py-3 text-blue-400">{opp.confidence != null ? `${(opp.confidence * 100).toFixed(0)}%` : "—"}</td>
                    <td className="px-4 py-3 text-emerald-400">{opp.lift != null ? `${Number(opp.lift).toFixed(1)}x` : "—"}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{opp.recomendacion_accion || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Recomendaciones Estrategicas</h3>
          <div className="space-y-3">
            {recommendations.map((rec, i) => (
              <div key={i} className="bg-[#151721] rounded-xl border border-[#1e2433] p-4 flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                  rec.prioridad === "alta" ? "bg-red-500/15" : rec.prioridad === "media" ? "bg-amber-500/15" : "bg-slate-500/15"
                }`}>
                  <Lightbulb size={12} className={
                    rec.prioridad === "alta" ? "text-red-400" : rec.prioridad === "media" ? "text-amber-400" : "text-slate-400"
                  } />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white">{rec.titulo}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a1f2e] text-slate-500 uppercase">{rec.tipo}</span>
                  </div>
                  <p className="text-xs text-slate-400">{rec.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trends */}
      {trends.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Tendencias Detectadas</h3>
          <div className="flex flex-wrap gap-2">
            {trends.map((t, i) => (
              <span key={i} className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-400">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
