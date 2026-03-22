import { SECTION_CATEGORIES } from "../../data/categories";

function StrengthBadge({ strength }) {
  const styles = {
    strong: "bg-emerald-500/15 text-emerald-400",
    medium: "bg-blue-500/15 text-blue-400",
    weak: "bg-slate-500/15 text-slate-400",
  };
  const labels = { strong: "Fuerte", medium: "Moderada", weak: "Debil" };

  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${styles[strength]}`}>
      {labels[strength]}
    </span>
  );
}

function LiftBar({ lift, maxLift }) {
  const pct = Math.min((lift / maxLift) * 100, 100);
  const color = lift >= 2.5 ? "bg-emerald-500" : lift >= 1.5 ? "bg-blue-500" : "bg-slate-500";

  return (
    <div className="w-full h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${color} transition-all duration-500`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function ProductCards({ product, recommendations, onCardClick }) {
  const maxLift = Math.max(...recommendations.map((r) => r.lift), 1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in-up">
      {recommendations.map((rec) => {
        const sectionColor = SECTION_CATEGORIES[rec.section]?.color || "#6B7280";
        const sectionLabel = SECTION_CATEGORIES[rec.section]?.label || "";

        return (
          <button
            key={rec.product}
            onClick={() => onCardClick?.(rec.product)}
            className="bg-[#151721] rounded-xl border border-[#1e2433] p-4 text-left hover:border-blue-500/30 hover:bg-blue-600/5 transition-all duration-200 group"
          >
            {/* Product name */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: sectionColor }}
                />
                <span className="text-sm font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                  {rec.product}
                </span>
              </div>
              <StrengthBadge strength={rec.strength} />
            </div>

            {/* Section */}
            {sectionLabel && (
              <p className="text-[10px] text-slate-600 mb-3">{sectionLabel}</p>
            )}

            {/* Lift */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-slate-500">Lift</span>
                <span className="text-xs font-bold text-white">{rec.lift.toFixed(1)}x</span>
              </div>
              <LiftBar lift={rec.lift} maxLift={maxLift} />
            </div>

            {/* Confidence */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-slate-500">Confianza</span>
                <span className="text-xs font-semibold text-slate-300">{(rec.confidence * 100).toFixed(0)}%</span>
              </div>
              <LiftBar lift={rec.confidence} maxLift={1} />
            </div>

            {/* Support */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-600">Soporte</span>
              <span className="text-[10px] text-slate-500">{(rec.support * 100).toFixed(2)}%</span>
            </div>

            {/* LLM explanation */}
            {rec.llm_explanation && (
              <p className="mt-3 pt-3 border-t border-[#1e2433] text-[10px] text-slate-500 italic leading-relaxed">
                {rec.llm_explanation}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
