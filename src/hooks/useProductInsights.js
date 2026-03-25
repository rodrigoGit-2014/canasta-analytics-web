import { useState, useEffect, useMemo } from "react";
import { getTopProductsByQuantity, getTopProductsByRevenue } from "../services/api";
import { formatCurrency, formatNumber } from "../utils/formatters";
import { TrendingUp, Package, LayoutGrid } from "lucide-react";

const DEFAULT_START = "2023-01-01";
const DEFAULT_END = new Date().toISOString().split("T")[0];

export default function useProductInsights(limit, dateRange) {
  const [topByQuantity, setTopByQuantity] = useState([]);
  const [topByRevenue, setTopByRevenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const start = dateRange?.start || DEFAULT_START;
  const end = dateRange?.end || DEFAULT_END;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([
      getTopProductsByQuantity(limit, start, end),
      getTopProductsByRevenue(limit, start, end),
    ])
      .then(([qty, rev]) => {
        if (cancelled) return;
        setTopByQuantity(qty.data || []);
        setTopByRevenue(rev.data || []);
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
    const totalRevenue = topByRevenue.reduce((sum, p) => sum + (p.total_revenue || 0), 0);
    const totalQuantity = topByQuantity.reduce((sum, p) => sum + (p.total_quantity || 0), 0);
    return [
      {
        title: "Total Revenue",
        value: formatCurrency(totalRevenue),
        icon: TrendingUp,
        color: "#3B82F6",
      },
      {
        title: "Total Cantidad",
        value: formatNumber(totalQuantity),
        icon: Package,
        color: "#10B981",
      },
      {
        title: "Productos Mostrados",
        value: formatNumber(topByRevenue.length),
        icon: LayoutGrid,
        color: "#F59E0B",
      },
    ];
  }, [topByQuantity, topByRevenue]);

  return { kpis, topByQuantity, topByRevenue, loading, error };
}
