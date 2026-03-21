import {
  LineChart,
  Line,
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

export default function TrendLineChart({
  data,
  lines,
  xKey = "label",
  xFormatter,
  tooltipFormatter,
  title,
}) {
  return (
    <ChartCard title={title}>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis
            dataKey={xKey}
            tickFormatter={xFormatter}
            tick={{ fontSize: 11, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={formatCompact}
            tick={{ fontSize: 11, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
            width={45}
          />
          <Tooltip
            formatter={tooltipFormatter}
            contentStyle={TOOLTIP_STYLE}
            itemStyle={{ color: "#e2e8f0" }}
          />
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color}
              name={line.name}
              strokeWidth={2}
              dot={{ r: 3, fill: line.color, stroke: "#151721", strokeWidth: 2 }}
              activeDot={{ r: 5, stroke: line.color, strokeWidth: 2, fill: "#151721" }}
              animationDuration={800}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
