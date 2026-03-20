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
  border: "1px solid #E2E8F0",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
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
          >
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(val) => formatCurrency(val)}
            contentStyle={TOOLTIP_STYLE}
          />
          <Legend
            wrapperStyle={{ fontSize: "11px" }}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
