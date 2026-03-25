import { useState, useEffect, useMemo } from "react";
import { getTopCustomers, getCustomerAverageSpend } from "../services/api";
import { formatCurrency, formatNumber } from "../utils/formatters";
import { Users, DollarSign, Crown } from "lucide-react";

const DEFAULT_START = "2023-01-01";
const DEFAULT_END = new Date().toISOString().split("T")[0];

export default function useCustomerInsights(limit, dateRange) {
  const [topCustomers, setTopCustomers] = useState([]);
  const [averageSpend, setAverageSpend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const start = dateRange?.start || DEFAULT_START;
  const end = dateRange?.end || DEFAULT_END;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([
      getTopCustomers(limit, start, end),
      getCustomerAverageSpend(start, end),
    ])
      .then(([top, avg]) => {
        if (cancelled) return;
        setTopCustomers(top.data || []);
        setAverageSpend(avg);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [limit, start, end]);

  const kpis = useMemo(() => {
    if (!averageSpend) return [];
    return [
      {
        title: "Total Clientes",
        value: formatNumber(averageSpend.total_customers),
        icon: Users,
        color: "#3B82F6",
      },
      {
        title: "Gasto Medio",
        value: formatCurrency(averageSpend.average_spend_per_customer),
        icon: DollarSign,
        color: "#10B981",
      },
      {
        title: "Cliente con mayor gasto",
        value: topCustomers[0] ? formatCurrency(topCustomers[0].total_spent) : "—",
        icon: Crown,
        color: "#F59E0B",
      },
    ];
  }, [topCustomers, averageSpend]);

  const frequencyDistribution = useMemo(() => {
    if (!topCustomers.length) return [];

    let frecuente = 0, regular = 0, ocasional = 0;
    for (const c of topCustomers) {
      const orders = c.order_count || 0;
      if (orders >= 10) frecuente++;
      else if (orders >= 3) regular++;
      else ocasional++;
    }

    return [
      { name: "Frecuente (10+)", value: frecuente, color: "#3B82F6" },
      { name: "Regular (3-9)", value: regular, color: "#F59E0B" },
      { name: "Ocasional (1-2)", value: ocasional, color: "#64748B" },
    ].filter(s => s.value > 0);
  }, [topCustomers]);

  return { kpis, topCustomers, frequencyDistribution, loading, error };
}
