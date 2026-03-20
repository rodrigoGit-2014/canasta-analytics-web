import { useState } from "react";
import { AlertCircle } from "lucide-react";
import useAnalyticsOverview from "../hooks/useAnalyticsOverview";
import GenericKPIRow from "../components/kpis/GenericKPIRow";
import TrendLineChart from "../components/charts/TrendLineChart";
import DonutChart from "../components/charts/DonutChart";
import HorizontalBarChart from "../components/charts/HorizontalBarChart";
import DateRangeFilter from "../components/filters/DateRangeFilter";
import KPISkeleton from "../components/skeletons/KPISkeleton";
import ChartSkeleton from "../components/skeletons/ChartSkeleton";
import { formatCurrency, formatNumber } from "../utils/formatters";

export default function AnalyticsOverview() {
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const { kpis, monthlyTrend, departments, sections, loading, error } =
    useAnalyticsOverview(dateRange);

  const donutData = departments.map((d, i) => {
    const colors = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#EC4899", "#14B8A6", "#F97316"];
    return { name: d.id_departamento, value: d.total_sales, color: colors[i % colors.length] };
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Resumen Analítico</h1>
          <p className="text-sm text-gray-500">Vista general de métricas clave del negocio</p>
        </div>
        <DateRangeFilter dateRange={dateRange} onDateRangeChange={setDateRange} />
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-700">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-6">
          <KPISkeleton count={4} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
          <ChartSkeleton height={300} />
        </div>
      ) : (
        <div className="space-y-6">
          <GenericKPIRow items={kpis} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrendLineChart
              title="Tendencia Mensual de Ventas"
              data={monthlyTrend}
              lines={[
                { dataKey: "total_sales", color: "#3B82F6", name: "Ventas" },
              ]}
              tooltipFormatter={(val, name) => [formatCurrency(val), name]}
            />
            <DonutChart
              title="Ventas por Departamento"
              data={donutData}
            />
          </div>

          {sections.length > 0 && (
            <HorizontalBarChart
              title="Ventas por Sección"
              data={sections}
              dataKey="total_sales"
              nameKey="id_seccion"
              color="#8B5CF6"
              formatter={(v) => formatCurrency(v)}
              tooltipLabel="Ventas"
            />
          )}
        </div>
      )}
    </>
  );
}
