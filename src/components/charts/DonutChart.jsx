import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../../utils/formatters";
import ChartCard from "./ChartCard";

const TOOLTIP_STYLE = {
  borderRadius: "8px",
  border: "1px solid #1e2433",
  backgroundColor: "#1a1f2e",
  color: "#e2e8f0",
  boxShadow: "0 4px 12px rgb(0 0 0 / 0.4)",
  fontSize: "12px",
};

const COLORS = [
  "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6",
  "#EF4444", "#EC4899", "#14B8A6", "#F97316",
];

export default function DonutChart({ data, title }) {
  const chartData = data.map((d, i) => ({
    ...d,
    color: d.color || COLORS[i % COLORS.length],
  }));

  return (
    <ChartCard title={title}>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius="55%"
            outerRadius="80%"
            dataKey="value"
            nameKey="name"
            animationDuration={800}
            stroke="#151721"
            strokeWidth={2}
          >
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(val) => formatCurrency(val)}
            contentStyle={TOOLTIP_STYLE}
            itemStyle={{ color: "#e2e8f0" }}
          />
          <Legend
            wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
