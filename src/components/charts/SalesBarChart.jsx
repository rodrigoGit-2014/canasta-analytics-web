import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency, formatCompact } from "../../utils/formatters";
import { formatDateLabel } from "../../utils/aggregations";

const GRANULARITY_OPTIONS = [
  { key: "daily", label: "D" },
  { key: "weekly", label: "S" },
  { key: "monthly", label: "M" },
];

export default function SalesBarChart({
  data,
  granularity,
  onGranularityChange,
}) {
  const chartData = data.map((d) => ({
    ...d,
    label: formatDateLabel(d.period, granularity),
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">
          Evolucion de Ventas
        </h3>
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          {GRANULARITY_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => onGranularityChange(opt.key)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                granularity === opt.key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            tickLine={false}
            axisLine={false}
            interval={granularity === "daily" ? Math.floor(chartData.length / 8) : 0}
            angle={granularity === "daily" ? -45 : 0}
            textAnchor={granularity === "daily" ? "end" : "middle"}
            height={granularity === "daily" ? 60 : 30}
          />
          <YAxis
            tickFormatter={formatCompact}
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            tickLine={false}
            axisLine={false}
            width={45}
          />
          <Tooltip
            formatter={(val) => [formatCurrency(val), "Ventas"]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              fontSize: "12px",
            }}
          />
          <Bar
            dataKey="total"
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
