import { Package, TrendingUp, Zap } from "lucide-react";
import { getStrengthLabel } from "../../utils/ruleTranslator";

export default function SimulatorKPIRow({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  const totalRelated = recommendations.length;
  const maxProbability = Math.max(...recommendations.map((r) => r.probability));
  const avgStrength =
    recommendations.reduce((sum, r) => sum + r.strengthValue, 0) / recommendations.length;
  const strengthInfo = getStrengthLabel(avgStrength);

  const kpis = [
    {
      label: "Productos relacionados",
      value: totalRelated,
      icon: Package,
      color: "text-blue-400",
      bg: "bg-blue-600/15",
    },
    {
      label: "Mayor probabilidad",
      value: `${maxProbability}%`,
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-500/15",
    },
    {
      label: "Fuerza promedio",
      value: strengthInfo.label,
      icon: Zap,
      color: strengthInfo.text,
      bg: strengthInfo.bg,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-[#151721] rounded-xl border border-[#1e2433] p-4 flex items-center gap-3"
        >
          <div className={`w-10 h-10 rounded-lg ${kpi.bg} flex items-center justify-center shrink-0`}>
            <kpi.icon size={20} className={kpi.color} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">{kpi.label}</p>
            <p className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
