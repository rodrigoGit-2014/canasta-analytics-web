import { Target, BarChart3, Zap } from "lucide-react";
import StrengthBadge from "./StrengthBadge";
import GaugeChart from "../charts/GaugeChart";

export default function RecommendationDetail({
  recommendation,
  selectedProduct,
}) {
  if (!recommendation) {
    return (
      <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-8 text-center">
        <p className="text-sm text-slate-500">
          Selecciona una recomendacion del ranking para ver el detalle
        </p>
      </div>
    );
  }

  const probabilityPeople = Math.round(recommendation.probability);

  const metrics = [
    {
      icon: Target,
      label: "Probabilidad",
      value: `${recommendation.probability}%`,
      color: "text-blue-400",
      bg: "bg-blue-600/10",
      explanation: `De cada 100 clientes que compran ${selectedProduct}, ${probabilityPeople} tambien compran ${recommendation.product}`,
    },
    {
      icon: BarChart3,
      label: "Frecuencia",
      value: `${recommendation.frequency || "—"}%`,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      explanation: `Esta combinacion aparece en el ${recommendation.frequency || "—"}% de todas las compras`,
    },
    {
      icon: Zap,
      label: "Fuerza",
      value: `${recommendation.strengthValue?.toFixed(1)}x`,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      explanation: `${recommendation.strengthValue?.toFixed(1)} veces mas probable que una compra aleatoria`,
    },
  ];

  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-5 animate-fade-in-up space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
            Detalle
          </p>
          <p className="text-lg font-bold text-white">
            {recommendation.product}
          </p>
        </div>
        <StrengthBadge value={recommendation.strengthValue} />
      </div>

      {/* Gauge */}
      <div className="flex justify-center">
        <div className="w-48">
          <GaugeChart value={recommendation.probability} label="Probabilidad" />
        </div>
      </div>

      {/* Insight text */}
      <div className="bg-blue-600/8 border border-blue-500/15 rounded-lg p-3">
        <p className="text-sm text-blue-300 leading-relaxed">
          Los clientes que compran{" "}
          <span className="font-bold text-blue-200">{selectedProduct}</span>{" "}
          tambien suelen comprar{" "}
          <span className="font-bold text-blue-200">{recommendation.product}</span>
        </p>
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        {metrics.map((m) => (
          <div key={m.label} className={`${m.bg} rounded-lg p-3`}>
            <div className="flex items-center gap-2 mb-1">
              <m.icon size={14} className={m.color} />
              <span className={`text-xs font-semibold ${m.color}`}>
                {m.label}: {m.value}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {m.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
