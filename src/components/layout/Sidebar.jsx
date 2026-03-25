import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChart3,
  Network,
  Upload,
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Building2,
  LayoutList,
  Sparkles,
  Lightbulb,
  Brain,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const NAV_SECTIONS = [
  {
    label: "Mis Ventas",
    items: [
      { path: "/analytics-overview", label: "Resumen General", icon: LayoutDashboard },
      { path: "/products-insights", label: "Productos", icon: Package },
      { path: "/customers-insights", label: "Clientes", icon: Users },
      { path: "/orders-insights", label: "Pedidos", icon: ShoppingCart },
    ],
  },
  {
    label: "Descubrir",
    items: [
      { path: "/inteligencia/patrones", label: "Patrones de Compra", icon: Sparkles },
      { path: "/inteligencia/relaciones", label: "Explorar Relaciones", icon: Network },
      { path: "/inteligencia/recomendaciones", label: "Simulador de Combos", icon: Lightbulb },
    ],
  },
  {
    label: "Inteligencia AI",
    items: [
      { path: "/inteligencia/ai", label: "Insights Estrategicos", icon: Brain },
    ],
  },
  {
    label: "Configuracion",
    items: [
      { path: "/upload-transactions", label: "Cargar Datos", icon: Upload },
      { path: "/configuracion/departamentos", label: "Departamentos", icon: Building2 },
      { path: "/configuracion/secciones", label: "Secciones", icon: LayoutList },
    ],
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { company, user, logout } = useAuth();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-[#1e2433]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <BarChart3 size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-tight">
              {company?.name || "Retail Analytics"}
            </h1>
            <p className="text-xs text-slate-500">Inteligencia Comercial</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-3 pt-3 overflow-y-auto flex-1 custom-scrollbar">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="mb-3">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600/15 text-blue-400 border border-blue-500/20"
                        : "text-slate-400 hover:bg-[#1e2433] hover:text-slate-200 border border-transparent"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User profile */}
      <div className="p-4 border-t border-[#1e2433]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user?.full_name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">{user?.full_name || "Usuario"}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email || ""}</p>
          </div>
          <button
            onClick={logout}
            title="Cerrar sesion"
            className="p-1.5 rounded-lg hover:bg-[#1e2433] transition text-slate-500 hover:text-slate-300"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
