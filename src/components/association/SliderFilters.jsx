import { SlidersHorizontal } from "lucide-react";

export default function SliderFilters({
  minLift,
  onMinLiftChange,
  minConfidence,
  onMinConfidenceChange,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-3">
        <SlidersHorizontal size={14} className="text-gray-400" />
        <h4 className="text-xs font-semibold text-gray-900">Filtros</h4>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-gray-500">Lift minimo</label>
            <span className="text-xs font-semibold text-gray-700">
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
            className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-gray-500">
              Confianza minima
            </label>
            <span className="text-xs font-semibold text-gray-700">
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
            className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>
    </div>
  );
}
