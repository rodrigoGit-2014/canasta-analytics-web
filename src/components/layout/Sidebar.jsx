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
      { path: "/upload-transactions", label: "Cargar Datos", icon: Upload },
    ],
  },
];

export default function Sidebar({ selectedCategory, onSelectCategory }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <BarChart3 size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 leading-tight">
              Sano Fresco
            </h1>
            <p className="text-xs text-gray-400">Analytics Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-3 pt-3 overflow-y-auto flex-1 custom-scrollbar">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="mb-3">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
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
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
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
                        ? "bg-blue-50 text-blue-700 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                        isActive ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      <Icon
                        size={16}
                        style={{ color: isActive ? cat.color : "#9CA3AF" }}
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
