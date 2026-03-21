import { useNavigate, useLocation } from "react-router-dom";
import { CATEGORY_LIST } from "../../data/categories";
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
} from "lucide-react";

const NAV_SECTIONS = [
  {
    label: "Dashboards",
    items: [
      { path: "/sales-dashboard", label: "Ventas", icon: BarChart3 },
      { path: "/association-rules", label: "Asociaciones", icon: Network },
    ],
  },
  {
    label: "Analíticas",
    items: [
      { path: "/analytics-overview", label: "Resumen", icon: LayoutDashboard },
      { path: "/products-insights", label: "Productos", icon: Package },
      { path: "/customers-insights", label: "Clientes", icon: Users },
      { path: "/orders-insights", label: "Pedidos", icon: ShoppingCart },
    ],
  },
  {
    label: "Datos",
    items: [
      { path: "/upload-transactions", label: "Cargar Transacciones", icon: Upload },
    ],
  },
  {
    label: "Configuración",
    items: [
      { path: "/configuracion/departamentos", label: "Departamentos", icon: Building2 },
      { path: "/configuracion/secciones", label: "Secciones", icon: LayoutList },
    ],
  },
];

export default function Sidebar({ selectedCategory, onSelectCategory }) {
  const navigate = useNavigate();
  const location = useLocation();

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
              Sano Fresco
            </h1>
            <p className="text-xs text-slate-500">Analytics Dashboard</p>
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

        {/* Categories */}
        <div className="mb-3">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Categorias
          </p>
          <ul className="space-y-0.5">
            {CATEGORY_LIST.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#1e2433] text-white"
                        : "text-slate-400 hover:bg-[#1e2433] hover:text-slate-200"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                        isActive ? "bg-[#252d3d]" : "bg-[#1a1f2e]"
                      }`}
                    >
                      <Icon
                        size={16}
                        style={{ color: isActive ? cat.color : "#64748b" }}
                      />
                    </div>
                    <span>{cat.label}</span>
                    {isActive && (
                      <div
                        className="ml-auto w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
