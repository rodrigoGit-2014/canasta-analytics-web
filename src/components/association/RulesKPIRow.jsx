import { BookOpen, Target, TrendingUp } from "lucide-react";
import KPICard from "../kpis/KPICard";
import { formatNumber } from "../../utils/formatters";

export default function RulesKPIRow({ kpis }) {
  const cards = [
    {
      title: "Total Reglas",
      value: formatNumber(kpis.totalRules),
      icon: BookOpen,
      color: "#3B82F6",
    },
    {
      title: "Confianza Promedio",
      value: `${kpis.avgConfidence.toFixed(1)}%`,
      icon: Target,
      color: "#10B981",
    },
    {
      title: "Lift Promedio",
      value: kpis.avgLift.toFixed(2),
      icon: TrendingUp,
      color: "#F59E0B",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <KPICard key={card.title} {...card} />
      ))}
    </div>
  );
}
