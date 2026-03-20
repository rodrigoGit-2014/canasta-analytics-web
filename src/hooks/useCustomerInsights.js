import { useState, useEffect, useMemo } from "react";
import { getTopCustomers, getCustomerAverageSpend } from "../services/api";
import { formatCurrency, formatNumber } from "../utils/formatters";
import { Users, DollarSign, Crown } from "lucide-react";

export default function useCustomerInsights(limit) {
  const [topCustomers, setTopCustomers] = useState([]);
  const [averageSpend, setAverageSpend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([
      getTopCustomers(limit),
      getCustomerAverageSpend(),
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
  }, [limit]);

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
        title: "Mayor Gasto",
        value: topCustomers[0] ? formatCurrency(topCustomers[0].total_spent) : "—",
        icon: Crown,
        color: "#F59E0B",
      },
    ];
  }, [topCustomers, averageSpend]);

  return { kpis, topCustomers, loading, error };
}
