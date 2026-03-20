export default function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="bg-gray-50 px-4 py-3 flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-3 bg-gray-200 rounded flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="px-4 py-3 flex gap-4 border-t border-gray-50">
          {Array.from({ length: columns }).map((_, j) => (
            <div key={j} className="h-4 bg-gray-100 rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
