import { ArrowRight, Sparkles } from "lucide-react";
import useScrollReveal from "../../hooks/useScrollReveal";

export default function FinalCTA({ onSignup }) {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="reveal-section py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/15 to-blue-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#3b82f610_0%,_transparent_60%)]" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
          <Sparkles size={12} className="text-blue-400" />
          <span className="text-xs font-medium text-blue-400">Comienza gratis hoy</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
          Empieza a descubrir patrones en tus ventas
        </h2>

        <p className="text-lg text-slate-400 mb-8">
          Gratis. Sin tarjeta de credito. Resultados en minutos.
        </p>

        <button
          onClick={onSignup}
          className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
        >
          Crear Cuenta Gratis <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
