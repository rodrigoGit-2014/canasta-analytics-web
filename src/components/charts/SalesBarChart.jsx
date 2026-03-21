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

const TOOLTIP_STYLE = {
  borderRadius: "8px",
  border: "1px solid #1e2433",
  backgroundColor: "#1a1f2e",
  color: "#e2e8f0",
  boxShadow: "0 4px 12px rgb(0 0 0 / 0.4)",
  fontSize: "12px",
};

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
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-5 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">
          Evolucion de Ventas
        </h3>
        <div className="flex bg-[#1a1f2e] rounded-lg p-0.5 border border-[#1e2433]">
          {GRANULARITY_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => onGranularityChange(opt.key)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                granularity === opt.key
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
            interval={granularity === "daily" ? Math.floor(chartData.length / 8) : 0}
            angle={granularity === "daily" ? -45 : 0}
            textAnchor={granularity === "daily" ? "end" : "middle"}
            height={granularity === "daily" ? 60 : 30}
          />
          <YAxis
            tickFormatter={formatCompact}
            tick={{ fontSize: 11, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
            width={45}
          />
          <Tooltip
            formatter={(val) => [formatCurrency(val), "Ventas"]}
            contentStyle={TOOLTIP_STYLE}
            itemStyle={{ color: "#e2e8f0" }}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <Bar
            dataKey="total"
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
            animationDuration={800}
            fillOpacity={0.85}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
