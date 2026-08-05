import { useNavigate } from "react-router-dom";
import { Brain, ArrowRight } from "lucide-react";

export default function AIRequiresAnalysis() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-purple-600/10 flex items-center justify-center mb-4">
        <Brain size={28} className="text-purple-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">Primero ejecuta un analisis</h3>
      <p className="text-sm text-slate-500 max-w-md mb-6">
        Ve a Patrones de Compra para analizar tus transacciones. Los insights AI se generaran a partir de esos resultados.
      </p>
      <button
        onClick={() => navigate("/inteligencia/patrones")}
        className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition"
      >
        Ir a Patrones de Compra <ArrowRight size={16} />
      </button>
    </div>
  );
}
