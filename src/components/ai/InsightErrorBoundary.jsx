import { Component } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default class InsightErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("InsightErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
          <AlertTriangle size={24} className="text-red-400 mx-auto mb-3" />
          <p className="text-sm text-red-400 mb-2">
            Error al renderizar los resultados del analisis.
          </p>
          <p className="text-xs text-slate-500 mb-4">
            La respuesta del modelo AI tiene un formato inesperado.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              this.props.onReset?.();
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs text-slate-300 bg-[#1e2433] rounded-lg transition hover:bg-[#252b3b] mx-auto"
          >
            <RefreshCw size={13} /> Intentar de nuevo
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
