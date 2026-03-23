import { ShoppingCart, Package, BarChart3, Link2 } from "lucide-react";
import KPICard from "../kpis/KPICard";
import { formatNumber } from "../../utils/formatters";

export default function DatasetSummaryRow({ summary, rulesCount }) {
  const avgPerPurchase = summary.avgProductsPerPurchase
    ? Number(summary.avgProductsPerPurchase).toFixed(2)
    : summary.totalTransactions > 0
      ? (summary.totalProducts / summary.totalTransactions).toFixed(2)
      : "0.00";

  const cards = [
    {
      title: "Total Transacciones",
      value: formatNumber(summary.totalTransactions),
      icon: ShoppingCart,
      color: "#3B82F6",
    },
    {
      title: "Productos Distintos",
      value: formatNumber(summary.totalProducts),
      icon: Package,
      color: "#10B981",
    },
    {
      title: "Promedio por Compra",
      value: avgPerPurchase,
      icon: BarChart3,
      color: "#F59E0B",
    },
  ];

  if (rulesCount != null) {
    cards.push({
      title: "Relaciones Encontradas",
      value: formatNumber(rulesCount),
      icon: Link2,
      color: "#8B5CF6",
      highlight: true,
    });
  }

  const gridCols = cards.length === 3
    ? "grid-cols-1 sm:grid-cols-3"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid ${gridCols} gap-4`}>
      {cards.map((card) => (
        <KPICard key={card.title} {...card} />
      ))}
    </div>
  );
}
