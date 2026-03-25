import { useState, useEffect, useMemo } from "react";
import { getOrdersCount, getMonthlyTrend } from "../services/api";
import { formatCurrency, formatNumber } from "../utils/formatters";
import { ShoppingCart, DollarSign, Receipt } from "lucide-react";

const MONTH_NAMES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

const DEFAULT_START = "2023-01-01";
const DEFAULT_END = new Date().toISOString().split("T")[0];

export default function useOrdersInsights(dateRange) {
  const [ordersCount, setOrdersCount] = useState(null);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const start = dateRange?.start || DEFAULT_START;
  const end = dateRange?.end || DEFAULT_END;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([
      getOrdersCount(start, end),
      getMonthlyTrend(start, end),
    ])
      .then(([count, trend]) => {
        if (cancelled) return;
        setOrdersCount(count);
        setMonthlyTrend(
          (trend.data || []).map((d) => ({
            ...d,
            label: `${MONTH_NAMES[d.month - 1]} ${d.year}`,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [start, end]);

  const kpis = useMemo(() => {
    if (!ordersCount) return [];
    return [
      { title: "Total Pedidos", value: formatNumber(ordersCount.total_orders), icon: ShoppingCart, color: "#3B82F6" },
      { title: "Ventas Totales", value: formatCurrency(ordersCount.total_sales), icon: DollarSign, color: "#10B981" },
      { title: "Valor Medio", value: formatCurrency(ordersCount.average_order_value), icon: Receipt, color: "#8B5CF6" },
    ];
  }, [ordersCount]);

  return { kpis, monthlyTrend, loading, error };
}
