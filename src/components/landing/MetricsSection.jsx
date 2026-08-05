import { useEffect, useState, useRef } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";

const METRICS = [
  { value: 500000, suffix: "+", label: "Transacciones analizadas", prefix: "" },
  { value: 150, suffix: "+", label: "Reglas descubiertas", prefix: "" },
  { value: 3, suffix: "", label: "Tipos de reporte", prefix: "" },
  { value: 30, suffix: "s", label: "Tiempo de analisis", prefix: "<" },
];

function AnimatedNumber({ target, prefix, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1500;
        const steps = 40;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const formatted = target >= 1000 ? `${Math.floor(count / 1000)}K` : count.toString();

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tabular-nums">
      {prefix}{target >= 1000 ? `${count >= target ? Math.floor(target / 1000) : Math.floor(count / 1000)}K` : count}{suffix}
    </span>
  );
}

export default function MetricsSection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="reveal-section py-24 sm:py-32 bg-[#0d0e14]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {METRICS.map((m) => (
            <div key={m.label} className="text-center">
              <AnimatedNumber target={m.value} prefix={m.prefix} suffix={m.suffix} />
              <p className="text-sm text-slate-500 mt-2">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
