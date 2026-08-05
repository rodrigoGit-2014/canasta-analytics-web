import { Brain, CheckCircle2, Sparkles, ShoppingCart } from "lucide-react";
import useScrollReveal from "../../hooks/useScrollReveal";

const AI_FEATURES = [
  "Insights de cross-selling automaticos",
  "Recomendaciones de merchandising",
  "Reportes ejecutivos en PDF, Word y PowerPoint",
  "Chat conversacional con tus datos",
];

export default function AIShowcase() {
  const ref = useScrollReveal();

  return (
    <section id="ai-showcase" ref={ref} className="reveal-section py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_#7c3aed08_0%,_transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Brain size={12} className="text-purple-400" />
            <span className="text-xs font-medium text-purple-400">Powered by Claude AI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
            Inteligencia artificial que entiende tu negocio
          </h2>

          <p className="text-slate-400 leading-relaxed mb-8">
            No solo mostramos datos. Claude AI interpreta tus reglas de asociacion,
            genera insights estrategicos y te dice exactamente que hacer para
            aumentar tus ventas.
          </p>

          <div className="space-y-3">
            {AI_FEATURES.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
                <span className="text-sm text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Visual */}
        <div className="space-y-4">
          {/* Insight Card mockup */}
          <div className="bg-[#12131a] rounded-xl border border-purple-500/20 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center">
                  <ShoppingCart size={14} className="text-blue-400" />
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400">Cross-selling</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-red-500" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">Oportunidad de alto impacto detectada</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Los clientes que compran Leche Entera tienen un 72% de probabilidad de tambien comprar Pan Blanco.
              Esta asociacion es 2.3x mas fuerte que el promedio. Recomendacion: crear combo "Desayuno Completo".
            </p>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#1e2433]">
              <span className="text-[10px] text-slate-500">Confidence: <span className="text-blue-400">72%</span></span>
              <span className="text-[10px] text-slate-500">Lift: <span className="text-emerald-400">2.3x</span></span>
              <span className="text-[10px] text-slate-500">Support: <span className="text-amber-400">8.5%</span></span>
            </div>
          </div>

          {/* Chat mockup */}
          <div className="bg-[#12131a] rounded-xl border border-[#1e2433] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Brain size={14} className="text-purple-400" />
              <span className="text-xs font-medium text-slate-400">Consulta AI</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-end">
                <div className="bg-purple-600/20 border border-purple-500/20 rounded-xl rounded-br-sm px-3 py-2">
                  <span className="text-xs text-white">Que bundles recomiendas?</span>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-[#1a1b25] border border-[#2a3347] rounded-xl rounded-bl-sm px-3 py-2 max-w-[85%]">
                  <span className="text-xs text-slate-300">Basandome en tus datos, recomiendo 3 bundles: "Desayuno Completo" (Leche + Pan), "Snack Saludable" (Yogurt + Frutas), y...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
