export default function ChartSkeleton({ height = 280 }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-pulse">
      <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
      <div className="bg-gray-100 rounded-lg" style={{ height }} />
    </div>
  );
}
