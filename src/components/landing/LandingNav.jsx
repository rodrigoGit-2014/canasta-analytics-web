import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Menu, X } from "lucide-react";

export default function LandingNav({ onLogin, onSignup }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0b0f]/90 backdrop-blur-xl border-b border-[#1e2433]/50" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <BarChart3 size={16} className="text-white" />
          </div>
          <span className="text-sm font-bold text-white hidden sm:block">Descubre Patrones</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("features")} className="text-sm text-slate-400 hover:text-white transition">Producto</button>
          <button onClick={() => scrollTo("how-it-works")} className="text-sm text-slate-400 hover:text-white transition">Como Funciona</button>
          <button onClick={() => scrollTo("ai-showcase")} className="text-sm text-slate-400 hover:text-white transition">IA</button>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={onLogin} className="px-4 py-2 text-sm text-slate-300 hover:text-white transition">
            Iniciar Sesion
          </button>
          <button onClick={onSignup} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">
            Comenzar Gratis
          </button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-slate-400">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0a0b0f] border-t border-[#1e2433] px-6 py-4 space-y-3">
          <button onClick={() => scrollTo("features")} className="block w-full text-left text-sm text-slate-400 py-2">Producto</button>
          <button onClick={() => scrollTo("how-it-works")} className="block w-full text-left text-sm text-slate-400 py-2">Como Funciona</button>
          <button onClick={() => scrollTo("ai-showcase")} className="block w-full text-left text-sm text-slate-400 py-2">IA</button>
          <div className="pt-2 border-t border-[#1e2433] flex gap-3">
            <button onClick={() => { setMobileOpen(false); onLogin(); }} className="flex-1 text-center px-4 py-2.5 text-sm text-slate-300 border border-[#1e2433] rounded-lg">
              Iniciar Sesion
            </button>
            <button onClick={() => { setMobileOpen(false); onSignup(); }} className="flex-1 text-center px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg">
              Comenzar Gratis
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
