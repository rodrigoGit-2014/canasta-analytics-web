import { useState } from "react";
import { ChevronDown } from "lucide-react";
import StrengthBadge from "./StrengthBadge";

function getBarGradient(strengthValue) {
  if (strengthValue >= 2.5) return "from-emerald-600 to-emerald-400";
  if (strengthValue >= 1.5) return "from-blue-600 to-blue-400";
  if (strengthValue >= 1.0) return "from-amber-600 to-amber-400";
  return "from-slate-600 to-slate-400";
}

export default function RecommendationRanking({
  recommendations,
  selectedIndex,
  onSelect,
}) {
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_COUNT = 10;
  const visible = showAll ? recommendations : recommendations.slice(0, VISIBLE_COUNT);
  const hasMore = recommendations.length > VISIBLE_COUNT;

  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-5 animate-fade-in-up">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
        Ranking de recomendaciones
      </p>

      <div className="space-y-2">
        {visible.map((rec, index) => {
          const isSelected = index === selectedIndex;
          const gradient = getBarGradient(rec.strengthValue);

          return (
            <button
              key={rec.product}
              onClick={() => onSelect(index)}
              className={`w-full text-left px-3 py-3 rounded-lg transition-all duration-200 animate-slide-in-right ${
                isSelected
                  ? "bg-[#1a1f2e] border border-blue-500/30"
                  : "hover:bg-[#1a1f2e] border border-transparent"
              }`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex items-center gap-3">
                {/* Position badge */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-[#252d3d] text-slate-400"
                  }`}
                >
                  {index + 1}
                </div>

                {/* Product name + bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <p
                      className={`text-sm font-medium truncate ${
                        isSelected ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {rec.product}
                    </p>
                    <span className="text-xs font-bold text-slate-300 ml-2 shrink-0">
                      {rec.probability}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#1e2433] rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-700`}
                      style={{
                        width: `${Math.min(rec.probability, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Strength badge */}
                <div className="shrink-0 hidden sm:block">
                  <StrengthBadge value={rec.strengthValue} />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Show more */}
      {hasMore && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="flex items-center gap-1 mx-auto mt-4 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-blue-400 transition-colors"
        >
          Ver {recommendations.length - VISIBLE_COUNT} mas
          <ChevronDown size={14} />
        </button>
      )}
    </div>
  );
}
