import { useState } from "react";
import { AlertCircle } from "lucide-react";
import useCustomerInsights from "../hooks/useCustomerInsights";
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
  { key: "id_cliente", label: "Cliente" },
  { key: "total_spent", label: "Gasto Total", align: "right", format: (v) => formatCurrency(v) },
  { key: "order_count", label: "Pedidos", align: "right", format: (v) => formatNumber(v) },
  { key: "average_order_value", label: "Valor Medio", align: "right", format: (v) => formatCurrency(v) },
  { key: "first_purchase", label: "Primera Compra" },
  { key: "last_purchase", label: "Última Compra" },
];

export default function CustomerInsights() {
  const [limit, setLimit] = useState(20);
  const { kpis, topCustomers, loading, error } = useCustomerInsights(limit);

  const tableData = topCustomers.map((c, i) => ({ ...c, _rank: i + 1 }));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Insights de Clientes</h1>
          <p className="text-sm text-slate-500">Análisis de comportamiento de clientes</p>
        </div>
        <LimitSelector value={limit} onChange={setLimit} />
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
          <ChartSkeleton height={400} />
          <TableSkeleton rows={5} columns={7} />
        </div>
      ) : (
        <div className="space-y-6">
          <GenericKPIRow items={kpis} />

          <HorizontalBarChart
            title="Top Clientes por Gasto"
            data={topCustomers}
            dataKey="total_spent"
            nameKey="id_cliente"
            color="#3B82F6"
            formatter={(v) => formatCurrency(v)}
            tooltipLabel="Gasto Total"
          />

          <DataTable columns={TABLE_COLUMNS} data={tableData} />
        </div>
      )}
    </>
  );
}
