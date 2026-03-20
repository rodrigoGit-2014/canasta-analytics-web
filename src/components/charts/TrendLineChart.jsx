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
  border: "1px solid #E2E8F0",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
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
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis
            dataKey={xKey}
            tickFormatter={xFormatter}
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={formatCompact}
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            tickLine={false}
            axisLine={false}
            width={45}
          />
          <Tooltip
            formatter={tooltipFormatter}
            contentStyle={TOOLTIP_STYLE}
          />
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color}
              name={line.name}
              strokeWidth={2}
              dot={{ r: 3, fill: line.color }}
              activeDot={{ r: 5 }}
              animationDuration={800}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
