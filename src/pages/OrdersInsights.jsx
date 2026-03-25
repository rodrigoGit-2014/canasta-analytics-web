import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EmptyDataState from "../components/layout/EmptyDataState";
import useOrdersInsights from "../hooks/useOrdersInsights";
import GenericKPIRow from "../components/kpis/GenericKPIRow";
import AreaTrendChart from "../components/charts/AreaTrendChart";
import ChartCard from "../components/charts/ChartCard";
import DateRangeFilter from "../components/filters/DateRangeFilter";
import KPISkeleton from "../components/skeletons/KPISkeleton";
import ChartSkeleton from "../components/skeletons/ChartSkeleton";
import { formatCurrency, formatNumber, formatCompact } from "../utils/formatters";

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
        <div className="space-y-5">
          <GenericKPIRow items={kpis} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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

          <ChartCard title="Volumen de Ventas Mensual">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} angle={-45} textAnchor="end" height={50} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} tickFormatter={formatCompact} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #1e2433", backgroundColor: "#1a1f2e", color: "#e2e8f0", fontSize: "12px" }} formatter={(val) => [formatCurrency(val), "Ventas"]} />
                <Bar dataKey="total_sales" fill="#3B82F6" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}
    </>
  );
}
