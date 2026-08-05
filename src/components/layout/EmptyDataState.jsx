import { Database, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmptyDataState({ error }) {
  const navigate = useNavigate();
  const is502 = error && (error.includes("502") || error.includes("Bad Gateway"));
  const isConnectionError = error && (error.includes("Failed to fetch") || error.includes("NetworkError"));
  const isNoData = is502 || isConnectionError;

  if (!isNoData) return null;

  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-12 text-center animate-fade-in-up">
      <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mx-auto mb-4">
        <Database size={28} className="text-blue-400/60" />
      </div>
      <p className="text-sm font-semibold text-slate-300 mb-1">
        No hay datos disponibles
      </p>
      <p className="text-xs text-slate-500 mb-5 max-w-sm mx-auto">
        {is502
          ? "El servicio de datos no esta disponible o aun no se han cargado transacciones."
          : "No se pudo conectar con el servidor. Verifica que el servicio este corriendo."}
      </p>
      <button
        onClick={() => navigate("/upload-transactions")}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Upload size={16} />
        Cargar Transacciones
      </button>
    </div>
  );
}
