import { DollarSign, Users, ShoppingCart, UserCheck } from "lucide-react";
import KPICard from "./KPICard";
import { formatCurrency, formatNumber } from "../../utils/formatters";

export default function KPIRow({ kpis }) {
  const cards = [
    {
      title: "Ventas Totales",
      value: formatCurrency(kpis.totalSales),
      icon: DollarSign,
      color: "#3B82F6",
    },
    {
      title: "Total Clientes",
      value: formatNumber(kpis.totalCustomers),
      icon: Users,
      color: "#10B981",
    },
    {
      title: "Ticket Medio / Pedido",
      value: formatCurrency(kpis.avgTicketOrder),
      icon: ShoppingCart,
      color: "#F59E0B",
    },
    {
      title: "Ticket Medio / Cliente",
      value: formatCurrency(kpis.avgTicketCustomer),
      icon: UserCheck,
      color: "#8B5CF6",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <KPICard key={card.title} {...card} />
      ))}
    </div>
  );
}
