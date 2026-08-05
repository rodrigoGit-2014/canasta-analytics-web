import { Quote } from "lucide-react";
import useScrollReveal from "../../hooks/useScrollReveal";

const TESTIMONIALS = [
  {
    quote: "Descubrimos que el 68% de quienes compran frutas organicas tambien compran yogurt natural. Creamos un combo y aumentamos el ticket promedio en un 23%.",
    name: "Maria Gonzalez",
    role: "Gerente Comercial",
    company: "SuperFresh",
  },
  {
    quote: "La plataforma nos mostro patrones que llevabamos anos sin detectar. Ahora tomamos decisiones de inventario basadas en datos reales, no en intuicion.",
    name: "Carlos Mendoza",
    role: "Director de Operaciones",
    company: "MercadoPlus",
  },
];

export default function TestimonialsSection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="reveal-section py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-center mb-12">
          Lo que dicen nuestros usuarios
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-[#12131a] border border-[#1e2433] rounded-2xl p-8 hover:border-blue-500/20 transition-colors duration-300">
              <Quote size={24} className="text-blue-500/30 mb-4" />
              <p className="text-sm text-slate-300 leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
