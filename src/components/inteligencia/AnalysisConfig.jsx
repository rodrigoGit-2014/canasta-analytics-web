import { BarChart3, Target, Zap } from "lucide-react";

const LIFT_OPTIONS = [
  { value: 1.0, label: "Normal", description: "Todas las relaciones" },
  { value: 1.5, label: "Fuerte", description: "Solo significativas" },
  { value: 2.5, label: "Muy fuerte", description: "Solo excepcionales" },
];

export default function AnalysisConfig({ params, onParamsChange }) {
  const update = (key, value) => onParamsChange({ ...params, [key]: value });

  return (
    <div className="animate-fade-in-up space-y-3">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        Configuracion del analisis
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Support */}
        <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600/15 flex items-center justify-center">
              <BarChart3 size={14} className="text-blue-400" />
            </div>
            <p className="text-xs font-semibold text-slate-300">Frecuencia minima</p>
          </div>
          <input
            type="range"
            min={0.5}
            max={15}
            step={0.5}
            value={params.support}
            onChange={(e) => update("support", parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#1e2433] rounded-full appearance-none cursor-pointer accent-blue-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-blue-500/30"
          />
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px] text-slate-600">Poco frecuente</span>
            <span className="text-xs font-bold text-blue-400">{params.support}%</span>
            <span className="text-[10px] text-slate-600">Muy frecuente</span>
          </div>
        </div>

        {/* Confidence */}
        <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center">
              <Target size={14} className="text-emerald-400" />
            </div>
            <p className="text-xs font-semibold text-slate-300">Probabilidad conjunta</p>
          </div>
          <input
            type="range"
            min={5}
            max={95}
            step={5}
            value={params.confidence}
            onChange={(e) => update("confidence", parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#1e2433] rounded-full appearance-none cursor-pointer accent-emerald-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-emerald-500/30"
          />
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px] text-slate-600">Baja</span>
            <span className="text-xs font-bold text-emerald-400">{params.confidence}%</span>
            <span className="text-[10px] text-slate-600">Alta</span>
          </div>
        </div>

        {/* Lift */}
        <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center">
              <Zap size={14} className="text-amber-400" />
            </div>
            <p className="text-xs font-semibold text-slate-300">Fuerza de relacion</p>
          </div>
          <div className="flex gap-1.5">
            {LIFT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => update("lift", option.value)}
                className={`flex-1 px-2 py-2 rounded-lg border text-center transition-all duration-200 ${
                  params.lift === option.value
                    ? "bg-amber-500/10 border-amber-500/30"
                    : "border-[#1e2433] hover:border-[#2a3347]"
                }`}
              >
                <p
                  className={`text-xs font-semibold ${
                    params.lift === option.value ? "text-amber-300" : "text-slate-400"
                  }`}
                >
                  {option.label}
                </p>
                <p className="text-[10px] text-slate-600 mt-0.5">{option.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
