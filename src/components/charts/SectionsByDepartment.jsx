import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { formatCurrency, formatNumber, formatCompact } from "../../utils/formatters";
import ChartCard from "./ChartCard";

const COLOR_PALETTE = [
  "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6",
  "#EF4444", "#EC4899", "#14B8A6", "#F97316",
  "#06B6D4", "#A855F7", "#84CC16", "#FB923C",
];

const TOOLTIP_STYLE = {
  borderRadius: "8px",
  border: "1px solid #1e2433",
  backgroundColor: "#1a1f2e",
  color: "#e2e8f0",
  boxShadow: "0 4px 12px rgb(0 0 0 / 0.4)",
  fontSize: "12px",
  padding: "12px",
};

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={TOOLTIP_STYLE}>
      <p className="font-semibold text-white text-sm mb-1">{d.secName}</p>
      <p className="text-slate-400 text-xs mb-2">{d.deptLabel}</p>
      <div className="space-y-1">
        <p className="text-slate-300 text-xs">Ventas: {formatCurrency(d.total_sales)}</p>
        <p className="text-slate-300 text-xs">Pedidos: {formatNumber(d.order_count)}</p>
        <p className="text-slate-300 text-xs">Participacion: {Number(d.percentage_of_total).toFixed(1)}%</p>
      </div>
    </div>
  );
}

export default function SectionsByDepartment({ data, deptNameMap = {}, secNameMap = {} }) {
  const { chartData, grouped } = useMemo(() => {
    // Build a color map per department
    const uniqueDepts = [...new Set(data.map((d) => String(d.id_departamento)))];
    const deptColorMap = {};
    uniqueDepts.forEach((id, i) => {
      deptColorMap[id] = COLOR_PALETTE[i % COLOR_PALETTE.length];
    });

    const sorted = [...data].sort((a, b) => b.total_sales - a.total_sales);
    const enriched = sorted.map((d) => {
      const deptId = String(d.id_departamento);
      const secId = String(d.id_seccion);
      const deptName = deptNameMap[deptId] || `Depto ${deptId}`;
      const secName = secNameMap[secId] || `Seccion ${secId}`;
      return {
        ...d,
        label: secName,
        secName,
        color: deptColorMap[deptId] || "#64748b",
        deptLabel: deptName,
      };
    });

    const groups = {};
    for (const s of enriched) {
      const key = String(s.id_departamento);
      if (!groups[key]) {
        groups[key] = {
          id: key,
          name: deptNameMap[key] || `Depto ${key}`,
          color: deptColorMap[key] || "#64748b",
          sections: [],
          totalSales: 0,
          totalOrders: 0,
        };
      }
      groups[key].sections.push(s);
      groups[key].totalSales += s.total_sales;
      groups[key].totalOrders += s.order_count;
    }

    const groupedArr = Object.values(groups).sort((a, b) => b.totalSales - a.totalSales);
    return { chartData: enriched, grouped: groupedArr };
  }, [data, deptNameMap, secNameMap]);

  const maxSales = chartData.length > 0 ? chartData[0].total_sales : 1;

  return (
    <ChartCard title="Ventas por Sección">
      {/* Bar chart */}
      <ResponsiveContainer width="100%" height={Math.max(120, chartData.length * 28)}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1e293b" />
          <XAxis
            type="number"
            tickFormatter={formatCompact}
            tick={{ fontSize: 11, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="label"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="total_sales" radius={[0, 4, 4, 0]} animationDuration={800} fillOpacity={0.85}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Department groups summary */}
      <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-2">
        {grouped.map((dept) => (
          <div
            key={dept.id}
            className="bg-[#1a1f2e] rounded-lg p-2.5 border border-[#1e2433]"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: dept.color }}
              />
              <span className="text-xs font-semibold text-white">{dept.name}</span>
            </div>
            <p className="text-sm font-bold text-white">
              $ {formatCompact(dept.totalSales)}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {formatNumber(dept.totalOrders)} pedidos · {dept.sections.length} {dept.sections.length === 1 ? "sección" : "secciones"}
            </p>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
