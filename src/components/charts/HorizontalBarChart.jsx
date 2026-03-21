import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCompact } from "../../utils/formatters";
import ChartCard from "./ChartCard";

const TOOLTIP_STYLE = {
  borderRadius: "8px",
  border: "1px solid #1e2433",
  backgroundColor: "#1a1f2e",
  color: "#e2e8f0",
  boxShadow: "0 4px 12px rgb(0 0 0 / 0.4)",
  fontSize: "12px",
};

export default function HorizontalBarChart({
  data,
  dataKey,
  nameKey,
  color = "#3B82F6",
  formatter = formatCompact,
  title,
  tooltipLabel,
}) {
  const height = Math.max(200, Math.min(data.length * 36, 500));

  return (
    <ChartCard title={title}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1e293b" />
          <XAxis
            type="number"
            tickFormatter={formatter}
            tick={{ fontSize: 11, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey={nameKey}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            width={120}
          />
          <Tooltip
            formatter={(val) => [formatter(val), tooltipLabel || dataKey]}
            contentStyle={TOOLTIP_STYLE}
            itemStyle={{ color: "#e2e8f0" }}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <Bar
            dataKey={dataKey}
            fill={color}
            radius={[0, 4, 4, 0]}
            animationDuration={800}
            fillOpacity={0.85}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
