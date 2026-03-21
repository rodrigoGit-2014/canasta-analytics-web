import { useState, useEffect, useMemo } from "react";
import {
  getSalesTotal,
  getMonthlyTrend,
  getDepartments,
  getSections,
} from "../services/api";
import { formatCurrency, formatNumber } from "../utils/formatters";
import { DollarSign, ShoppingCart, Receipt, Users } from "lucide-react";

const MONTH_NAMES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

const DEFAULT_START = "2023-01-01";
const DEFAULT_END = "2023-12-31";

export default function useAnalyticsOverview(dateRange) {
  const [salesTotal, setSalesTotal] = useState(null);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const start = dateRange?.start || DEFAULT_START;
  const end = dateRange?.end || DEFAULT_END;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([
      getSalesTotal(start, end),
      getMonthlyTrend(),
      getDepartments(start, end),
      getSections(),
    ])
      .then(([sales, trend, deps, secs]) => {
        if (cancelled) return;
        setSalesTotal(sales);
        setMonthlyTrend(
          (trend.data || []).map((d) => ({
            ...d,
            label: `${MONTH_NAMES[d.month - 1]} ${d.year}`,
          }))
        );
        setDepartments(deps.data || []);
        setSections(secs.data || []);
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
    if (!salesTotal) return [];
    return [
      { title: "Ventas Totales", value: "$ " + formatNumber(Math.round(salesTotal.total_sales)), icon: DollarSign, color: "#3B82F6" },
      { title: "Total Pedidos", value: formatNumber(salesTotal.total_orders), icon: ShoppingCart, color: "#F59E0B" },
      { title: "Valor Medio Pedido", value: "$ " + formatNumber(salesTotal.average_order_value, 2), icon: Receipt, color: "#8B5CF6" },
      { title: "Total Clientes", value: formatNumber(salesTotal.total_clients), icon: Users, color: "#10B981" },
    ];
  }, [salesTotal]);

  return { kpis, monthlyTrend, departments, sections, loading, error };
}
