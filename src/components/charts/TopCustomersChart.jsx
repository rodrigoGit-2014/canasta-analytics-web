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
import { formatCurrency, formatCompact } from "../../utils/formatters";
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
  "#6B8DD6", "#7BA7C9", "#8E9CC3", "#A3A1D6", "#7BBFB5",
  "#7DC4A5", "#C9AD7C", "#C49AB5", "#C49090", "#C4A07A",
  "#7BC5D6", "#B49DD6", "#8DD0DB", "#A8C47E", "#D4B088",
  "#CDA3D6", "#8DD4C4", "#D6CC7E", "#D6A0A0", "#A3A8D6",
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={TOOLTIP_STYLE}>
      <p className="font-semibold text-white text-sm mb-1">Cliente {d.id_cliente}</p>
      <p className="text-slate-300 text-xs">Gasto: {formatCurrency(d.total_spent)}</p>
    </div>
  );
}

function renderInsideLabel({ x, y, width, height, value }) {
  if (width < 55) return null;
  return (
    <text
      x={x + width - 12}
      y={y + height / 2}
      fill="#fff"
      textAnchor="end"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={700}
      style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
    >
      ${formatCompact(value)}
    </text>
  );
}

export default function TopCustomersChart({ data }) {
  const height = Math.max(180, Math.min(data.length * 34, 500));

  return (
    <ChartCard title="Top Clientes por Gasto">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 10, right: 10 }}
          barCategoryGap="18%"
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="id_cliente"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            width={80}
            tickFormatter={(v) => `#${v}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar
            dataKey="total_spent"
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
              dataKey="total_spent"
              content={renderInsideLabel}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
