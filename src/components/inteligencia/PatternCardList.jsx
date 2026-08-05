import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PatternCard from "./PatternCard";

const PAGE_SIZE = 12;

export default function PatternCardList({ patterns, onPatternClick }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? patterns : patterns.slice(0, PAGE_SIZE);
  const hasMore = patterns.length > PAGE_SIZE;

  return (
    <div>
      <p className="text-xs text-slate-500 mb-3">
        Mostrando {visible.length} de {patterns.length} patrones
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {visible.map((pattern, i) => (
          <PatternCard
            key={`${pattern.antecedent}-${pattern.consequent}-${i}`}
            pattern={pattern}
            onClick={() => onPatternClick?.(pattern)}
          />
        ))}
      </div>
      {hasMore && !showAll && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-400 bg-[#1a1f2e] rounded-lg hover:bg-[#252d3d] hover:text-slate-200 transition-colors border border-[#1e2433]"
          >
            <ChevronDown size={14} />
            Ver todos los patrones
          </button>
        </div>
      )}
    </div>
  );
}
