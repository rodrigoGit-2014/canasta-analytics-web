import { Sparkles, TrendingUp, Lightbulb, ArrowRight } from "lucide-react";
import useScrollReveal from "../../hooks/useScrollReveal";

const FLOATING_CARDS = [
  { icon: Sparkles, text: "Pan → Leche | 72% probabilidad", color: "border-blue-500/30 bg-blue-500/5", delay: "0ms" },
  { icon: TrendingUp, text: "+15% ticket promedio", color: "border-emerald-500/30 bg-emerald-500/5", delay: "400ms" },
  { icon: Lightbulb, text: "3 oportunidades detectadas", color: "border-purple-500/30 bg-purple-500/5", delay: "800ms" },
];

export default function HeroSection({ onSignup }) {
  const ref = useScrollReveal(0.1);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1e3a5f15_0%,_transparent_70%)]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, #3B82F6 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div ref={ref} className="reveal-section max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Text side */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Sparkles size={12} className="text-blue-400" />
            <span className="text-xs font-medium text-blue-400">Potenciado por Inteligencia Artificial</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            Descubre los{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              patrones ocultos
            </span>{" "}
            en tus ventas
          </h1>

          <p className="text-lg text-slate-400 max-w-xl leading-relaxed mb-8">
            Sube tus transacciones de venta y nuestra plataforma detecta automaticamente
            que productos se compran juntos, genera insights estrategicos y te ayuda a
            aumentar tus ingresos.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onSignup}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
            >
              Comenzar Gratis <ArrowRight size={16} />
            </button>
            <button
              onClick={() => document.getElementById("dashboard-preview")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-300 border border-[#1e2433] hover:border-slate-600 rounded-xl transition-all duration-300"
            >
              Ver Demo
            </button>
          </div>
        </div>

        {/* Visual side */}
        <div className="relative hidden lg:block">
          {/* Dashboard mockup with 3D perspective */}
          <div className="relative" style={{ transform: "perspective(1200px) rotateY(-8deg) rotateX(4deg)", transformStyle: "preserve-3d" }}>
            <div className="bg-[#12131a] rounded-2xl border border-[#1e2433] overflow-hidden shadow-2xl shadow-blue-500/10">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#0d0e14] border-b border-[#1e2433]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                </div>
                <div className="flex-1 mx-3 px-3 py-1 bg-[#1a1b25] rounded text-[10px] text-slate-600 text-center">descubre-patrones-compra.store</div>
              </div>
              {/* Simulated dashboard content */}
              <div className="p-4 space-y-3">
                {/* KPI row */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Ventas Totales", value: "$12.4M", color: "text-blue-400" },
                    { label: "Pedidos", value: "45,231", color: "text-emerald-400" },
                    { label: "Ticket Promedio", value: "$274", color: "text-purple-400" },
                  ].map((kpi) => (
                    <div key={kpi.label} className="bg-[#0d0e14] rounded-lg p-3">
                      <p className="text-[9px] text-slate-600 mb-1">{kpi.label}</p>
                      <p className={`text-sm font-bold ${kpi.color}`}>{kpi.value}</p>
                    </div>
                  ))}
                </div>
                {/* Chart placeholder */}
                <div className="bg-[#0d0e14] rounded-lg p-3 h-32 flex items-end gap-1">
                  {[40, 55, 35, 65, 50, 80, 60, 75, 45, 90, 70, 85].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t opacity-80"
                      style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                {/* Products list */}
                <div className="bg-[#0d0e14] rounded-lg p-3 space-y-2">
                  {["Leche Entera", "Pan Blanco", "Yogurt Natural"].map((p, i) => (
                    <div key={p} className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">{p}</span>
                      <div className="w-16 h-1.5 bg-[#1a1b25] rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${90 - i * 20}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating insight cards */}
          {FLOATING_CARDS.map((card, i) => {
            const Icon = card.icon;
            const positions = [
              "top-4 -left-8",
              "top-1/2 -right-12",
              "bottom-8 -left-4",
            ];
            return (
              <div
                key={i}
                className={`absolute ${positions[i]} animate-fade-in-up`}
                style={{ animationDelay: card.delay, animationFillMode: "both" }}
              >
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${card.color} backdrop-blur-lg shadow-lg`}>
                  <Icon size={14} className="text-white shrink-0" />
                  <span className="text-xs font-medium text-white whitespace-nowrap">{card.text}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
