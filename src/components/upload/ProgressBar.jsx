export default function ProgressBar({ percentage = 0, status = "processing" }) {
  const isComplete = status === "completed";
  const fillColor = isComplete ? "bg-green-500" : "bg-blue-500";

  return (
    <div className="w-full">
      <div className="h-3 bg-[#1e293b] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out relative ${fillColor}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        >
          {!isComplete && percentage > 0 && (
            <div className="absolute inset-0 animate-shimmer rounded-full" />
          )}
        </div>
      </div>
      <p className="text-sm text-slate-500 mt-2">
        {percentage}% completado
      </p>
    </div>
  );
}
