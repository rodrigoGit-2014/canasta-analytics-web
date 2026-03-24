import { useState } from "react";
import EmptyDataState from "../components/layout/EmptyDataState";
import useOrdersInsights from "../hooks/useOrdersInsights";
import GenericKPIRow from "../components/kpis/GenericKPIRow";
import AreaTrendChart from "../components/charts/AreaTrendChart";
import DateRangeFilter from "../components/filters/DateRangeFilter";
import KPISkeleton from "../components/skeletons/KPISkeleton";
import ChartSkeleton from "../components/skeletons/ChartSkeleton";
import { formatCurrency, formatNumber } from "../utils/formatters";

export default function OrdersInsights() {
  const [dateRange, setDateRange] = useState({
    start: "2023-01-01",
    end: new Date().toISOString().split("T")[0],
  });
  const { kpis, monthlyTrend, loading, error } = useOrdersInsights(dateRange);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Insights de Pedidos</h1>
          <p className="text-sm text-slate-500">Análisis de órdenes y valores</p>
        </div>
        <DateRangeFilter dateRange={dateRange} onDateRangeChange={setDateRange} />
      </div>

      {error && <EmptyDataState error={error} />}

      {loading ? (
        <div className="space-y-6">
          <KPISkeleton count={3} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
        </div>
      ) : !error && (
        <div className="space-y-6">
          <GenericKPIRow items={kpis} />

          <AreaTrendChart
            title="Evolución Mensual de Pedidos"
            data={monthlyTrend}
            dataKey="order_count"
            color="#3B82F6"
            name="Pedidos"
            tooltipFormatter={(val, name) => [formatNumber(val), name]}
          />

          <AreaTrendChart
            title="Valor Medio por Pedido (Mensual)"
            data={monthlyTrend}
            dataKey="avg_order_value"
            color="#8B5CF6"
            name="Valor Medio"
            tooltipFormatter={(val, name) => [formatCurrency(val), name]}
          />
        </div>
      )}
    </>
  );
}
