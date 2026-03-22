import StrengthBadge from "./StrengthBadge";

export default function PatternCard({ pattern, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-[#151721] rounded-xl border border-[#1e2433] p-5 animate-fade-in-up hover:border-blue-500/30 transition-all duration-200 group"
    >
      <p className="text-sm text-slate-300 leading-relaxed mb-3">
        Los clientes que compran{" "}
        <span className="font-semibold text-white">{pattern.antecedent}</span>{" "}
        tambien suelen comprar{" "}
        <span className="font-semibold text-white">{pattern.consequent}</span>
      </p>

      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-500">Probabilidad de compra</span>
            <span className="text-xs font-semibold text-slate-300">
              {pattern.probability}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#1e2433] rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(pattern.probability, 100)}%` }}
            />
          </div>
        </div>
        <StrengthBadge value={pattern.strengthValue} />
      </div>

      <div className="mt-2 flex items-center gap-1">
        <span className="text-[11px] text-slate-600">
          Frecuencia conjunta: {pattern.frequency}%
        </span>
      </div>
    </button>
  );
}
