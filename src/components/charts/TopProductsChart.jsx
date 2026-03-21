import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { formatNumber } from "../../utils/formatters";
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

const BAR_COLORS = [
  "#10B981", "#0EA5E9", "#8B5CF6", "#F59E0B", "#EF4444",
  "#14B8A6", "#6366F1", "#EC4899", "#F97316", "#06B6D4",
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={TOOLTIP_STYLE}>
      <p className="font-semibold text-white text-sm mb-1">{d.nombre_producto}</p>
      <p className="text-slate-300 text-xs">Cantidad: {formatNumber(d.total_quantity)} uds</p>
    </div>
  );
}

function renderInsideLabel({ x, y, width, height, value }) {
  if (width < 50) return null;
  return (
    <text
      x={x + width - 10}
      y={y + height / 2}
      fill="#fff"
      textAnchor="end"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
    >
      {formatNumber(value)}
    </text>
  );
}

export default function TopProductsChart({ data }) {
  const height = Math.max(180, Math.min(data.length * 34, 340));
  const maxValue = data.length > 0 ? Math.max(...data.map((d) => d.total_quantity)) : 1;

  return (
    <ChartCard title="Productos más vendidos">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 10, right: 10 }}
          barCategoryGap="20%"
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="nombre_producto"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            width={130}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar
            dataKey="total_quantity"
            radius={[0, 8, 8, 0]}
            animationDuration={800}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={BAR_COLORS[i % BAR_COLORS.length]}
                fillOpacity={0.8}
              />
            ))}
            <LabelList
              dataKey="total_quantity"
              content={renderInsideLabel}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
