import { Sparkles } from "lucide-react";

export default function AnalyzeButton({ onClick, isLoading, disabled }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        disabled={isLoading || disabled}
        className="flex items-center justify-center gap-2 px-8 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-600/20"
      >
        {isLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Analizando...
          </>
        ) : (
          <>
            <Sparkles size={16} />
            Analizar Compras
          </>
        )}
      </button>
    </div>
  );
}
