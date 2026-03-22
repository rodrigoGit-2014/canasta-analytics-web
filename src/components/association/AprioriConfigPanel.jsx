import { useState } from "react";
import { Settings, Play, ChevronDown, ChevronUp, Zap, Shield, Search as SearchIcon, Loader2 } from "lucide-react";

const PRESETS = [
  { label: "Exploratorio", icon: SearchIcon, min_support: 0.005, min_confidence: 0.10, min_lift: 1.0, desc: "Descubre asociaciones poco frecuentes" },
  { label: "Conservador", icon: Shield, min_support: 0.02, min_confidence: 0.30, min_lift: 1.5, desc: "Solo asociaciones frecuentes y confiables" },
  { label: "Estricto", icon: Zap, min_support: 0.03, min_confidence: 0.50, min_lift: 2.0, desc: "Solo las asociaciones mas fuertes" },
];

export default function AprioriConfigPanel({ onAnalyze, isAnalyzing }) {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState({
    min_support: 0.01,
    min_confidence: 0.15,
    min_lift: 1.0,
    max_itemset_size: 3,
    max_rules: 500,
  });

  const applyPreset = (preset) => {
    setConfig((c) => ({
      ...c,
      min_support: preset.min_support,
      min_confidence: preset.min_confidence,
      min_lift: preset.min_lift,
    }));
  };

  const handleSubmit = () => {
    onAnalyze(config);
  };

  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] animate-fade-in-up mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5"
      >
        <div className="flex items-center gap-2">
          <Settings size={15} className="text-blue-400" />
          <span className="text-sm font-semibold text-white">Configurar Analisis</span>
          <span className="text-xs text-slate-500">Parametros del algoritmo Apriori</span>
        </div>
        {open ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-[#1e2433] pt-4">
          {/* Presets */}
          <div className="flex gap-2 mb-5">
            {PRESETS.map((preset) => {
              const Icon = preset.icon;
              return (
                <button
                  key={preset.label}
                  onClick={() => applyPreset(preset)}
                  className="flex-1 p-3 rounded-lg border border-[#1e2433] bg-[#1a1f2e] hover:border-blue-500/40 hover:bg-blue-600/10 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={13} className="text-slate-500 group-hover:text-blue-400" />
                    <span className="text-xs font-semibold text-slate-300 group-hover:text-blue-400">{preset.label}</span>
                  </div>
                  <p className="text-[10px] text-slate-600">{preset.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs text-slate-500">Soporte minimo</label>
                <span className="text-xs font-semibold text-slate-300">{(config.min_support * 100).toFixed(1)}%</span>
              </div>
              <input
                type="range" min="0.001" max="0.1" step="0.001"
                value={config.min_support}
                onChange={(e) => setConfig((c) => ({ ...c, min_support: parseFloat(e.target.value) }))}
                className="w-full h-1.5 bg-[#1e293b] rounded-full appearance-none cursor-pointer accent-blue-500"
              />
              <p className="text-[10px] text-slate-600 mt-1">En cuantos pedidos aparece la combinacion</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs text-slate-500">Confianza minima</label>
                <span className="text-xs font-semibold text-slate-300">{(config.min_confidence * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range" min="0.05" max="0.8" step="0.05"
                value={config.min_confidence}
                onChange={(e) => setConfig((c) => ({ ...c, min_confidence: parseFloat(e.target.value) }))}
                className="w-full h-1.5 bg-[#1e293b] rounded-full appearance-none cursor-pointer accent-blue-500"
              />
              <p className="text-[10px] text-slate-600 mt-1">Si compran A, con que frecuencia compran B</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs text-slate-500">Lift minimo</label>
                <span className="text-xs font-semibold text-slate-300">{config.min_lift.toFixed(1)}</span>
              </div>
              <input
                type="range" min="0.5" max="5" step="0.1"
                value={config.min_lift}
                onChange={(e) => setConfig((c) => ({ ...c, min_lift: parseFloat(e.target.value) }))}
                className="w-full h-1.5 bg-[#1e293b] rounded-full appearance-none cursor-pointer accent-blue-500"
              />
              <p className="text-[10px] text-slate-600 mt-1">Cuanto mas probable que el azar (&gt;1)</p>
            </div>
          </div>

          {/* Advanced */}
          <div className="flex items-center gap-4 mb-5">
            <div>
              <label className="text-xs text-slate-500 block mb-1">Max productos</label>
              <select
                value={config.max_itemset_size}
                onChange={(e) => setConfig((c) => ({ ...c, max_itemset_size: parseInt(e.target.value) }))}
                className="bg-[#1a1f2e] border border-[#1e2433] text-slate-300 text-xs rounded-lg px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={2}>2 (pares)</option>
                <option value={3}>3 (trios)</option>
                <option value={4}>4</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1">Max reglas</label>
              <select
                value={config.max_rules}
                onChange={(e) => setConfig((c) => ({ ...c, max_rules: parseInt(e.target.value) }))}
                className="bg-[#1a1f2e] border border-[#1e2433] text-slate-300 text-xs rounded-lg px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={100}>100</option>
                <option value={500}>500</option>
                <option value={1000}>1,000</option>
                <option value={2000}>2,000</option>
              </select>
            </div>
          </div>

          {/* Execute button */}
          <button
            onClick={handleSubmit}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {isAnalyzing ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Analizando...
              </>
            ) : (
              <>
                <Play size={15} />
                Ejecutar Analisis
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
