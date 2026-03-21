import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency, formatNumber, formatCompact } from "../../utils/formatters";
import ChartCard from "./ChartCard";

const TOOLTIP_STYLE = {
  borderRadius: "8px",
  border: "1px solid #1e2433",
  backgroundColor: "#1a1f2e",
  color: "#e2e8f0",
  boxShadow: "0 4px 12px rgb(0 0 0 / 0.4)",
  fontSize: "12px",
  padding: "12px",
};

const COLORS = [
  "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6",
  "#EF4444", "#EC4899", "#14B8A6", "#F97316",
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={TOOLTIP_STYLE}>
      <p className="font-semibold text-white text-sm mb-1">{d.name}</p>
      <p className="text-slate-300 text-xs">Ventas: {formatCurrency(d.value)}</p>
      {d.order_count != null && (
        <p className="text-slate-300 text-xs">Pedidos: {formatNumber(d.order_count)}</p>
      )}
      {d.percentage != null && (
        <p className="text-slate-300 text-xs">Participación: {Number(d.percentage).toFixed(1)}%</p>
      )}
    </div>
  );
}

function renderOuterLabel({ cx, cy, midAngle, outerRadius, value }) {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 18;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#94a3b8"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      ${formatCompact(value)}
    </text>
  );
}

export default function DonutChart({ data, title }) {
  const chartData = data.map((d, i) => ({
    ...d,
    color: d.color || COLORS[i % COLORS.length],
  }));

  const totalValue = chartData.reduce((sum, d) => sum + (d.value || 0), 0);

  return (
    <ChartCard title={title}>
      {/* Donut with center label */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="75%"
              dataKey="value"
              nameKey="name"
              animationDuration={800}
              stroke="#151721"
              strokeWidth={2}
              label={renderOuterLabel}
            >
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.color} fillOpacity={0.85} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center: department count */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-2xl font-bold text-white">{chartData.length}</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider">Deptos</p>
        </div>
      </div>

      {/* Department breakdown table */}
      <div className="mt-2 max-h-24 overflow-y-auto custom-scrollbar space-y-0.5">
        {chartData.map((d) => (
          <div
            key={d.name}
            className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-[#1a1f2e] transition-colors"
          >
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: d.color }}
            />
            <span className="text-xs text-slate-300 flex-1 truncate">{d.name}</span>
            <span className="text-xs text-slate-500">
              {formatNumber(d.order_count)} ped.
            </span>
            <span className="text-xs font-medium text-white min-w-[50px] text-right">
              {Number(d.percentage).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
