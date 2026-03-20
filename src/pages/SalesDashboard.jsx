import { useState } from "react";
import DateRangeFilter from "../components/filters/DateRangeFilter";
import KPIRow from "../components/kpis/KPIRow";
import SalesBarChart from "../components/charts/SalesBarChart";
import ProductTreemap from "../components/charts/ProductTreemap";
import GaugeRow from "../components/charts/GaugeRow";
import ProductList from "../components/products/ProductList";
import { useDashboardData } from "../hooks/useDashboardData";

export default function SalesDashboard({ selectedCategory }) {
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [timeGranularity, setTimeGranularity] = useState("monthly");

  const { kpis, salesEvolution, treemapData, gaugeValues, productList } =
    useDashboardData(selectedCategory, dateRange, timeGranularity);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Dashboard de Ventas
          </h1>
          <p className="text-sm text-gray-500">
            Analisis de transacciones 2023
          </p>
        </div>
        <DateRangeFilter
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </div>

      <KPIRow kpis={kpis} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="space-y-6">
          <SalesBarChart
            data={salesEvolution}
            granularity={timeGranularity}
            onGranularityChange={setTimeGranularity}
          />
          <ProductTreemap data={treemapData} />
        </div>
        <div className="space-y-6">
          <GaugeRow gaugeValues={gaugeValues} />
          <ProductList products={productList} />
        </div>
      </div>
    </>
  );
}
