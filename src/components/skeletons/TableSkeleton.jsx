export default function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] overflow-hidden animate-pulse">
      <div className="bg-[#1a1f2e] px-4 py-3 flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-3 bg-[#252d3d] rounded flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="px-4 py-3 flex gap-4 border-t border-[#1e2433]">
          {Array.from({ length: columns }).map((_, j) => (
            <div key={j} className="h-4 bg-[#1e2433] rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
