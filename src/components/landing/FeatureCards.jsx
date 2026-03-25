import { BarChart3, Network, Brain } from "lucide-react";
import useScrollReveal from "../../hooks/useScrollReveal";

const FEATURES = [
  {
    icon: BarChart3,
    title: "Dashboards de Ventas",
    description: "Visualiza tus metricas de ventas en dashboards interactivos. Tendencias, productos top, comportamiento de clientes.",
    gradient: "from-blue-500 to-blue-600",
    border: "hover:border-blue-500/30",
  },
  {
    icon: Network,
    title: "Patrones de Compra",
    description: "Descubre que productos se compran juntos con el algoritmo Apriori. Detecta asociaciones que no se ven a simple vista.",
    gradient: "from-purple-500 to-purple-600",
    border: "hover:border-purple-500/30",
  },
  {
    icon: Brain,
    title: "Inteligencia AI",
    description: "Claude AI analiza tus reglas y genera insights estrategicos, recomendaciones de cross-selling y reportes ejecutivos.",
    gradient: "from-emerald-500 to-emerald-600",
    border: "hover:border-emerald-500/30",
  },
];

export default function FeatureCards() {
  const ref = useScrollReveal();

  return (
    <section id="features" ref={ref} className="reveal-section py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Todo lo que necesitas para entender tus ventas
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Desde dashboards interactivos hasta inteligencia artificial, cada herramienta esta disenada para ayudarte a tomar mejores decisiones.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`bg-[#12131a] border border-[#1e2433] ${f.border} rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
