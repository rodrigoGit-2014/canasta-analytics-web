import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function GaugeChart({ value, maxValue, title, color }) {
  const clampedValue = Math.min(value, maxValue);
  const data = [
    { value: clampedValue },
    { value: maxValue - clampedValue },
  ];

  return (
    <div className="text-center">
      <h4 className="text-xs font-medium text-slate-500 mb-1">{title}</h4>
      <div className="relative">
        <ResponsiveContainer width="100%" height={130}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="85%"
              startAngle={180}
              endAngle={0}
              innerRadius="65%"
              outerRadius="95%"
              dataKey="value"
              stroke="none"
              animationDuration={800}
            >
              <Cell fill={color} fillOpacity={0.85} />
              <Cell fill="#1e293b" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-end justify-center pb-4">
          <span
            key={value}
            className="text-xl font-bold text-white animate-count-up"
          >
            {value.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
