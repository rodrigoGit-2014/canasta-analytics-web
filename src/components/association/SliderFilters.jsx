import { SlidersHorizontal } from "lucide-react";

export default function SliderFilters({
  minLift,
  onMinLiftChange,
  minConfidence,
  onMinConfidenceChange,
}) {
  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-4 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-3">
        <SlidersHorizontal size={14} className="text-slate-500" />
        <h4 className="text-xs font-semibold text-white">Filtros</h4>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-slate-500">Lift minimo</label>
            <span className="text-xs font-semibold text-slate-300">
              {minLift.toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="3.5"
            step="0.1"
            value={minLift}
            onChange={(e) => onMinLiftChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#1e293b] rounded-full appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-slate-500">
              Confianza minima
            </label>
            <span className="text-xs font-semibold text-slate-300">
              {minConfidence.toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            step="1"
            value={minConfidence}
            onChange={(e) => onMinConfidenceChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#1e293b] rounded-full appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
