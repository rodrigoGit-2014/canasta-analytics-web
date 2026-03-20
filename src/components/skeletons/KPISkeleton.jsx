export default function KPISkeleton({ count = 4 }) {
  const colsClass = count <= 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <div className={`grid grid-cols-2 ${colsClass} gap-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-pulse"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-7 w-28 bg-gray-200 rounded" />
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
