import { useState, useEffect, useMemo } from "react";
import { getTopProductsByQuantity, getTopProductsByRevenue } from "../services/api";
import { formatCurrency, formatNumber } from "../utils/formatters";
import { TrendingUp, Package, LayoutGrid } from "lucide-react";

export default function useProductInsights(limit) {
  const [topByQuantity, setTopByQuantity] = useState([]);
  const [topByRevenue, setTopByRevenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([
      getTopProductsByQuantity(limit),
      getTopProductsByRevenue(limit),
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
  }, [limit]);

  const kpis = useMemo(() => {
    const topRev = topByRevenue[0];
    const topQty = topByQuantity[0];
    return [
      {
        title: "Top Revenue",
        value: topRev ? formatCurrency(topRev.total_revenue) : "—",
        icon: TrendingUp,
        color: "#3B82F6",
      },
      {
        title: "Top Cantidad",
        value: topQty ? formatNumber(topQty.total_quantity) : "—",
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
