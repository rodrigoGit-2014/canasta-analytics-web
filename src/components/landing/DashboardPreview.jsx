import useScrollReveal from "../../hooks/useScrollReveal";

export default function DashboardPreview() {
  const ref = useScrollReveal();

  return (
    <section id="dashboard-preview" ref={ref} className="reveal-section py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">Tu centro de inteligencia comercial</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Dashboards interactivos que convierten tus datos de ventas en decisiones informadas</p>
        </div>

        <div className="bg-[#12131a] rounded-2xl border border-[#1e2433] overflow-hidden shadow-2xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-shadow duration-500">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-5 py-3 bg-[#0d0e14] border-b border-[#1e2433]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
            </div>
            <div className="flex-1 mx-4 px-4 py-1.5 bg-[#1a1b25] rounded-lg text-xs text-slate-600 text-center">descubre-patrones-compra.app/analytics-overview</div>
          </div>
          {/* Dashboard content simulation */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Ventas Totales", value: "$15.2M", change: "+12.3%", color: "text-blue-400" },
                { label: "Total Clientes", value: "8,921", change: "+8.1%", color: "text-emerald-400" },
                { label: "Ticket Promedio", value: "$337", change: "+5.7%", color: "text-purple-400" },
                { label: "Productos Activos", value: "142", change: "+3", color: "text-amber-400" },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-[#0d0e14] rounded-xl p-4">
                  <p className="text-[10px] text-slate-600 mb-2">{kpi.label}</p>
                  <p className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</p>
                  <p className="text-[10px] text-emerald-500 mt-1">{kpi.change}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {/* Chart area */}
              <div className="col-span-2 bg-[#0d0e14] rounded-xl p-4">
                <p className="text-[10px] text-slate-600 mb-3">Tendencia de Ventas Mensuales</p>
                <div className="h-40 flex items-end gap-1.5">
                  {[35, 42, 38, 55, 48, 62, 58, 72, 65, 80, 75, 88].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end gap-0.5">
                      <div className="bg-gradient-to-t from-blue-600/80 to-blue-400/80 rounded-t" style={{ height: `${h}%` }} />
                    </div>
                  ))}
                </div>
              </div>
              {/* Side chart */}
              <div className="bg-[#0d0e14] rounded-xl p-4">
                <p className="text-[10px] text-slate-600 mb-3">Top Departamentos</p>
                <div className="space-y-3">
                  {[
                    { name: "Lacteos", pct: 32, color: "bg-blue-500" },
                    { name: "Frutas", pct: 24, color: "bg-emerald-500" },
                    { name: "Bebidas", pct: 19, color: "bg-purple-500" },
                    { name: "Verduras", pct: 15, color: "bg-amber-500" },
                    { name: "Organico", pct: 10, color: "bg-cyan-500" },
                  ].map((d) => (
                    <div key={d.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[10px] text-slate-400">{d.name}</span>
                        <span className="text-[10px] text-slate-500">{d.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-[#1a1b25] rounded-full overflow-hidden">
                        <div className={`h-full ${d.color} rounded-full`} style={{ width: `${d.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
