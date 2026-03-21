import { useState } from "react";
import { AlertCircle } from "lucide-react";
import useProductInsights from "../hooks/useProductInsights";
import GenericKPIRow from "../components/kpis/GenericKPIRow";
import TopProductsChart from "../components/charts/TopProductsChart";
import TopRevenueChart from "../components/charts/TopRevenueChart";
import ProductRankingTable from "../components/tables/ProductRankingTable";
import LimitSelector from "../components/filters/LimitSelector";
import DateRangeFilter from "../components/filters/DateRangeFilter";
import KPISkeleton from "../components/skeletons/KPISkeleton";
import ChartSkeleton from "../components/skeletons/ChartSkeleton";
import TableSkeleton from "../components/skeletons/TableSkeleton";
import { formatCurrency, formatNumber } from "../utils/formatters";

export default function ProductInsights() {
  const [limit, setLimit] = useState(10);
  const [dateRange, setDateRange] = useState({
    start: "2023-01-01",
    end: new Date().toISOString().split("T")[0],
  });
  const { kpis, topByQuantity, topByRevenue, loading, error } =
    useProductInsights(limit, dateRange);

  const tableData = topByRevenue.map((p, i) => ({ ...p, _rank: i + 1 }));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <div>
          <h1 className="text-lg font-bold text-white">Insights de Productos</h1>
          <p className="text-xs text-slate-500">Top productos por cantidad y revenue</p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <DateRangeFilter dateRange={dateRange} onDateRangeChange={setDateRange} />
          <LimitSelector value={limit} onChange={setLimit} />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-sm text-red-400">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-6">
          <KPISkeleton count={3} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
          <TableSkeleton rows={5} columns={5} />
        </div>
      ) : (
        <div className="space-y-2">
          <GenericKPIRow items={kpis} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <TopProductsChart data={topByQuantity} />
            <TopRevenueChart data={topByRevenue} />
          </div>

          <ProductRankingTable data={tableData} />
        </div>
      )}
    </>
  );
}
