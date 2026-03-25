import { useState } from "react";
import EmptyDataState from "../components/layout/EmptyDataState";
import useAnalyticsOverview from "../hooks/useAnalyticsOverview";
import GenericKPIRow from "../components/kpis/GenericKPIRow";
import TrendLineChart from "../components/charts/TrendLineChart";
import DonutChart from "../components/charts/DonutChart";
import SectionsByDepartment from "../components/charts/SectionsByDepartment";
import DateRangeFilter from "../components/filters/DateRangeFilter";
import KPISkeleton from "../components/skeletons/KPISkeleton";
import ChartSkeleton from "../components/skeletons/ChartSkeleton";
import { formatCurrency, formatNumber } from "../utils/formatters";

export default function AnalyticsOverview() {
  const [dateRange, setDateRange] = useState({
    start: "2023-01-01",
    end: new Date().toISOString().split("T")[0],
  });
  const { kpis, monthlyTrend, departments, sections, deptNameMap, secNameMap, loading, error } =
    useAnalyticsOverview(dateRange);

  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#EC4899", "#14B8A6", "#F97316"];

  const donutData = departments.map((d, i) => ({
    name: deptNameMap[String(d.id_departamento)] || `Depto ${d.id_departamento}`,
    value: d.total_sales,
    order_count: d.order_count,
    percentage: d.percentage_of_total,
    color: colors[i % colors.length],
  }));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h1 className="text-lg font-bold text-white">Resumen Analítico</h1>
          <p className="text-xs text-slate-500">Vista general de métricas clave del negocio</p>
        </div>
        <DateRangeFilter dateRange={dateRange} onDateRangeChange={setDateRange} />
      </div>

      {error && <EmptyDataState error={error} />}

      {loading ? (
        <div className="space-y-6">
          <KPISkeleton count={4} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
          <ChartSkeleton height={300} />
        </div>
      ) : !error && (
        <div className="space-y-3">
          <GenericKPIRow items={kpis} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2">
              <TrendLineChart
                title="Tendencia Mensual de Ventas"
                data={monthlyTrend}
                lines={[
                  { dataKey: "total_sales", color: "#3B82F6", name: "Ventas" },
                ]}
                tooltipFormatter={(val, name) => [formatCurrency(val), name]}
              />
            </div>
            <DonutChart
              title="Ventas por Departamento"
              data={donutData}
            />
          </div>

          {sections.length > 0 && (
            <SectionsByDepartment data={sections} deptNameMap={deptNameMap} secNameMap={secNameMap} />
          )}
        </div>
      )}
    </>
  );
}
