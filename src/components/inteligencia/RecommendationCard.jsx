import StrengthBadge from "./StrengthBadge";

export default function RecommendationCard({ recommendation }) {
  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-5 animate-fade-in-up hover:border-blue-500/30 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-semibold text-white">
          {recommendation.product}
        </p>
        <StrengthBadge value={recommendation.strengthValue} />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Probabilidad de compra conjunta
          </span>
          <span className="text-xs font-semibold text-blue-400">
            {recommendation.probability}%
          </span>
        </div>
        <div className="w-full h-2 bg-[#1e2433] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-700"
            style={{
              width: `${Math.min(recommendation.probability, 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
