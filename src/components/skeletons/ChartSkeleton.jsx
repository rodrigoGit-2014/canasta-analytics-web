export default function ChartSkeleton({ height = 280 }) {
  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-5 animate-pulse">
      <div className="h-4 w-32 bg-[#1e2433] rounded mb-4" />
      <div className="bg-[#1a1f2e] rounded-lg" style={{ height }} />
    </div>
  );
}
