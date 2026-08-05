import { Table2, BarChart3, Sparkles, Check } from "lucide-react";

const STEPS = [
  { label: "Vista Previa", icon: Table2 },
  { label: "Analizar Compras", icon: BarChart3 },
  { label: "Reglas de Asociacion", icon: Sparkles },
];

export default function StepperHeader({ currentStep, onStepClick }) {
  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-5 animate-fade-in-up">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isPending = index > currentStep;
          const Icon = step.icon;

          return (
            <div key={step.label} className="flex items-center flex-1 last:flex-initial">
              {/* Step circle + label */}
              <button
                onClick={() => isCompleted && onStepClick(index)}
                disabled={isPending}
                className={`flex flex-col items-center gap-2 group ${
                  isCompleted ? "cursor-pointer" : isPending ? "cursor-default" : "cursor-default"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? "bg-emerald-500/15 border-2 border-emerald-500/40 group-hover:border-emerald-400"
                      : isActive
                        ? "bg-blue-600/20 border-2 border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                        : "bg-[#1a1f2e] border-2 border-[#2a3347]"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={18} className="text-emerald-400" />
                  ) : (
                    <Icon
                      size={18}
                      className={isActive ? "text-blue-400" : "text-slate-600"}
                    />
                  )}
                </div>
                <div className="text-center">
                  <p
                    className={`text-xs font-semibold transition-colors ${
                      isCompleted
                        ? "text-emerald-400 group-hover:text-emerald-300"
                        : isActive
                          ? "text-white"
                          : "text-slate-600"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p
                    className={`text-[10px] mt-0.5 ${
                      isCompleted
                        ? "text-emerald-500/60"
                        : isActive
                          ? "text-blue-400/60"
                          : "text-slate-700"
                    }`}
                  >
                    Paso {index + 1}
                  </p>
                </div>
              </button>

              {/* Connector line */}
              {index < STEPS.length - 1 && (
                <div className="flex-1 mx-4 h-0.5 rounded-full transition-colors duration-300">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      index < currentStep
                        ? "bg-emerald-500/40"
                        : index === currentStep
                          ? "bg-gradient-to-r from-blue-500/40 to-[#2a3347]"
                          : "bg-[#1e2433]"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
