import { ShoppingCart, TrendingUp, Settings, AlertTriangle, CheckCircle2 } from "lucide-react";

const CATEGORY_ICONS = {
  cross_selling: { icon: ShoppingCart, bg: "bg-blue-500/15", text: "text-blue-400" },
  tendencia: { icon: TrendingUp, bg: "bg-emerald-500/15", text: "text-emerald-400" },
  optimizacion: { icon: Settings, bg: "bg-amber-500/15", text: "text-amber-400" },
  alerta: { icon: AlertTriangle, bg: "bg-red-500/15", text: "text-red-400" },
  default: { icon: TrendingUp, bg: "bg-purple-500/15", text: "text-purple-400" },
};

const PRIORITY_COLORS = { alta: "bg-red-500", media: "bg-amber-500", baja: "bg-slate-500" };

export default function InsightCard({ title, description, impact, actions = [], type }) {
  const category = CATEGORY_ICONS[type] || CATEGORY_ICONS.default;
  const Icon = category.icon;
  const priorityColor = PRIORITY_COLORS[impact] || PRIORITY_COLORS.baja;

  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-5 hover:border-purple-500/20 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-lg ${category.bg} flex items-center justify-center`}>
            <Icon size={14} className={category.text} />
          </div>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${category.bg} ${category.text}`}>
            {type || "insight"}
          </span>
        </div>
        <div className={`w-2 h-2 rounded-full ${priorityColor}`} title={`Impacto: ${impact}`} />
      </div>

      <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-3">{description}</p>

      {actions.length > 0 && (
        <>
          <div className="border-t border-[#1e2433] my-3" />
          <p className="text-xs font-medium text-slate-500 uppercase mb-2">Acciones Recomendadas</p>
          <div className="space-y-1.5">
            {actions.map((action, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 size={12} className="text-purple-400 mt-0.5 shrink-0" />
                <span className="text-xs text-slate-400">{action}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
