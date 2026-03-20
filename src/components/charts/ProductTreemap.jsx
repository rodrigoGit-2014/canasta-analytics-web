import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import { formatNumber } from "../../utils/formatters";

function CustomContent({ x, y, width, height, name, size, color }) {
  if (width < 4 || height < 4) return null;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={4}
        fill={color || "#3B82F6"}
        fillOpacity={0.85}
        stroke="#fff"
        strokeWidth={2}
      />
      {width > 55 && height > 30 && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 - 6}
            textAnchor="middle"
            fill="#fff"
            fontSize={width > 100 ? 11 : 9}
            fontWeight={600}
          >
            {name && name.length > Math.floor(width / 7)
              ? name.slice(0, Math.floor(width / 7)) + "..."
              : name}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + 10}
            textAnchor="middle"
            fill="rgba(255,255,255,0.8)"
            fontSize={10}
          >
            {formatNumber(size)} uds
          </text>
        </>
      )}
    </g>
  );
}

export default function ProductTreemap({ data }) {
  const treemapData = data.map((d) => ({
    name: d.name,
    size: d.size,
    color: d.color,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-fade-in-up">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Unidades Vendidas por Producto
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <Treemap
          data={treemapData}
          dataKey="size"
          nameKey="name"
          content={<CustomContent />}
          animationDuration={600}
        >
          <Tooltip
            formatter={(val) => [`${formatNumber(val)} unidades`, "Cantidad"]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              fontSize: "12px",
            }}
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}
