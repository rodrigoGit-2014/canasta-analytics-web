import { ShoppingCart, Package, BarChart3, Link2 } from "lucide-react";
import KPICard from "../kpis/KPICard";
import { formatNumber } from "../../utils/formatters";

export default function DatasetSummaryRow({ summary, rulesCount }) {
  const avgPerPurchase = summary.avgProductsPerPurchase
    ? Number(summary.avgProductsPerPurchase).toFixed(1)
    : summary.totalTransactions > 0
      ? (summary.totalProducts / summary.totalTransactions).toFixed(1)
      : "0";

  const cards = [
    {
      title: "Total Compras",
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
    {
      title: "Relaciones Encontradas",
      value: formatNumber(rulesCount),
      icon: Link2,
      color: "#8B5CF6",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <KPICard key={card.title} {...card} />
      ))}
    </div>
  );
}
