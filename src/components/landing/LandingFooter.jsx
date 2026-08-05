import { BarChart3 } from "lucide-react";

const COLUMNS = [
  {
    title: "Producto",
    links: ["Dashboard", "Patrones de Compra", "Simulador", "Inteligencia AI", "Reportes"],
  },
  {
    title: "Empresa",
    links: ["Sobre Nosotros", "Contacto", "Blog"],
  },
  {
    title: "Legal",
    links: ["Terminos de Servicio", "Politica de Privacidad"],
  },
];

export default function LandingFooter() {
  return (
    <footer className="bg-[#080910] border-t border-[#1e2433] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <BarChart3 size={16} className="text-white" />
              </div>
              <span className="text-sm font-bold text-white">Descubre Patrones</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Plataforma de inteligencia comercial para retail. Transforma tus datos de ventas en decisiones estrategicas.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <span className="text-xs text-slate-600 hover:text-slate-400 cursor-pointer transition">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[#1e2433] pt-6">
          <p className="text-xs text-slate-700 text-center">
            &copy; 2026 Descubre Patrones de Compra. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
