import { Upload, BarChart3, Network, Brain } from "lucide-react";
import useScrollReveal from "../../hooks/useScrollReveal";

const STEPS = [
  { icon: Upload, title: "Sube tus transacciones", desc: "Carga un CSV con tus ventas. Compatible con cualquier formato de punto de venta.", color: "from-blue-500 to-blue-600" },
  { icon: BarChart3, title: "Analiza el comportamiento", desc: "La plataforma procesa tus datos y genera dashboards automaticamente.", color: "from-emerald-500 to-emerald-600" },
  { icon: Network, title: "Descubre patrones ocultos", desc: "El algoritmo Apriori detecta que productos se compran juntos.", color: "from-purple-500 to-purple-600" },
  { icon: Brain, title: "Actua con inteligencia", desc: "La IA genera insights, recomendaciones y reportes listos para compartir.", color: "from-cyan-500 to-cyan-600" },
];

export default function HowItWorks() {
  const ref = useScrollReveal();

  return (
    <section id="how-it-works" ref={ref} className="reveal-section py-24 sm:py-32 bg-[#0d0e14]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            De datos a decisiones en 4 pasos
          </h2>
          <p className="text-slate-400">Simple, rapido y poderoso</p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-cyan-500/50 hidden sm:block" />

          <div className="space-y-12">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <div key={step.title} className="relative flex items-start gap-6 sm:gap-0">
                  {/* Desktop layout */}
                  <div className={`hidden sm:grid sm:grid-cols-[1fr_48px_1fr] gap-6 w-full items-center`}>
                    <div className={isLeft ? "text-right" : "order-3 text-left"}>
                      <h3 className="text-base font-semibold text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-slate-400">{step.desc}</p>
                    </div>
                    <div className="flex justify-center">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg relative z-10`}>
                        <Icon size={20} className="text-white" />
                      </div>
                    </div>
                    <div className={isLeft ? "order-3" : ""} />
                  </div>

                  {/* Mobile layout */}
                  <div className="sm:hidden flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shrink-0`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-slate-400">{step.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
