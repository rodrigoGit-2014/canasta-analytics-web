import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

export default function StepNavigation({ currentStep, onBack, onNext, onReset, canAdvance }) {
  const isLastStep = currentStep === 2;

  return (
    <div className="flex items-center justify-between pt-2">
      {/* Back button */}
      <div>
        {currentStep > 0 && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-400 bg-[#151721] rounded-lg border border-[#1e2433] hover:bg-[#1a1f2e] hover:text-slate-200 hover:border-[#2a3347] transition-all duration-200"
          >
            <ArrowLeft size={16} />
            Atras
          </button>
        )}
      </div>

      {/* Next / Reset button */}
      <div>
        {isLastStep ? (
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#151721] rounded-lg border border-[#1e2433] hover:bg-[#1a1f2e] hover:border-blue-500/30 transition-all duration-200"
          >
            <RotateCcw size={16} />
            Nuevo Analisis
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={!canAdvance}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-600/20"
          >
            Continuar
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
