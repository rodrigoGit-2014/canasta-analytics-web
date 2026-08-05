import { BarChart3, ShoppingCart, Store, Building2 } from "lucide-react";
import useScrollReveal from "../../hooks/useScrollReveal";

const METRICS = [
  { value: "+500K", label: "Transacciones analizadas" },
  { value: "150+", label: "Reglas descubiertas" },
  { value: "3", label: "Tipos de reporte" },
  { value: "<30s", label: "Tiempo de analisis" },
];

export default function SocialProofBar() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="reveal-section border-y border-[#1e2433] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-medium text-slate-600 uppercase tracking-wider mb-8">
          Plataforma de inteligencia comercial para retail
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {METRICS.map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{m.value}</p>
              <p className="text-xs text-slate-500 mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
