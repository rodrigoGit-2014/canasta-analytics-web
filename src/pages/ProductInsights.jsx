import { useState } from "react";
import { AlertCircle } from "lucide-react";
import useProductInsights from "../hooks/useProductInsights";
import GenericKPIRow from "../components/kpis/GenericKPIRow";
import HorizontalBarChart from "../components/charts/HorizontalBarChart";
import DataTable from "../components/tables/DataTable";
import LimitSelector from "../components/filters/LimitSelector";
import KPISkeleton from "../components/skeletons/KPISkeleton";
import ChartSkeleton from "../components/skeletons/ChartSkeleton";
import TableSkeleton from "../components/skeletons/TableSkeleton";
import { formatCurrency, formatNumber } from "../utils/formatters";

const TABLE_COLUMNS = [
  { key: "_rank", label: "#", format: (_, row) => row._rank },
  { key: "nombre_producto", label: "Producto" },
  { key: "total_quantity", label: "Cantidad", align: "right", format: (v) => formatNumber(v) },
  { key: "total_revenue", label: "Revenue", align: "right", format: (v) => formatCurrency(v) },
  { key: "avg_unit_price", label: "Precio Medio", align: "right", format: (v) => formatCurrency(v) },
];

export default function ProductInsights() {
  const [limit, setLimit] = useState(10);
  const { kpis, topByQuantity, topByRevenue, loading, error } =
    useProductInsights(limit);

  const tableData = topByRevenue.map((p, i) => ({ ...p, _rank: i + 1 }));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Insights de Productos</h1>
          <p className="text-sm text-gray-500">Top productos por cantidad y revenue</p>
        </div>
        <LimitSelector value={limit} onChange={setLimit} />
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-700">
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
        <div className="space-y-6">
          <GenericKPIRow items={kpis} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HorizontalBarChart
              title="Top Productos por Cantidad"
              data={topByQuantity}
              dataKey="total_quantity"
              nameKey="nombre_producto"
              color="#10B981"
              formatter={(v) => formatNumber(v)}
              tooltipLabel="Cantidad"
            />
            <HorizontalBarChart
              title="Top Productos por Revenue"
              data={topByRevenue}
              dataKey="total_revenue"
              nameKey="nombre_producto"
              color="#3B82F6"
              formatter={(v) => formatCurrency(v)}
              tooltipLabel="Revenue"
            />
          </div>

          <DataTable columns={TABLE_COLUMNS} data={tableData} />
        </div>
      )}
    </>
  );
}
