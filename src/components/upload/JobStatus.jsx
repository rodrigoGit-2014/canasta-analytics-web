import { Clock, Loader, CheckCircle2, AlertCircle } from "lucide-react";
import ProgressBar from "./ProgressBar";

const STATUS_CONFIG = {
  pending: {
    icon: Clock,
    label: "En cola",
    badgeClass: "bg-amber-500/15 text-amber-400",
    iconClass: "text-amber-500",
  },
  processing: {
    icon: Loader,
    label: "Procesando",
    badgeClass: "bg-blue-500/15 text-blue-400",
    iconClass: "text-blue-500",
    spin: true,
  },
  completed: {
    icon: CheckCircle2,
    label: "Completado",
    badgeClass: "bg-green-500/15 text-green-400",
    iconClass: "text-green-500",
  },
  failed: {
    icon: AlertCircle,
    label: "Error",
    badgeClass: "bg-red-500/15 text-red-400",
    iconClass: "text-red-500",
  },
};

function formatTimestamp(ts) {
  if (!ts) return "";
  const date = new Date(ts);
  return date.toLocaleString("es-CL", {
    dateStyle: "short",
    timeStyle: "medium",
  });
}

export default function JobStatus({ job, error }) {
  if (!job && !error) return null;

  if (error && !job) {
    return (
      <div className="bg-[#151721] rounded-xl border border-red-500/20 p-5 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <AlertCircle size={20} className="text-red-400" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  const config = STATUS_CONFIG[job.status] || STATUS_CONFIG.pending;
  const Icon = config.icon;

  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-5 space-y-4 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon
            size={20}
            className={`${config.iconClass} ${config.spin ? "animate-spin" : ""}`}
          />
          <div>
            <p className="text-sm font-medium text-white">
              {job.filename || "Archivo"}
            </p>
            <p className="text-xs text-slate-500">ID: {job.id}</p>
          </div>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.badgeClass}`}
        >
          {config.label}
        </span>
      </div>

      {job.status === "processing" && (
        <div className="space-y-2">
          <ProgressBar percentage={job.progress_percentage || 0} status="processing" />
          {job.total_rows > 0 && (
            <p className="text-xs text-slate-500">
              {(job.processed_rows || 0).toLocaleString()} / {job.total_rows.toLocaleString()} filas procesadas
            </p>
          )}
        </div>
      )}

      {job.status === "pending" && (
        <p className="text-sm text-slate-500">
          El archivo está en cola de procesamiento...
        </p>
      )}

      {job.status === "completed" && (
        <div className="space-y-2">
          <ProgressBar percentage={100} status="completed" />
          <div className="text-sm text-green-400 bg-green-500/10 rounded-lg p-3 border border-green-500/20">
            <p className="font-medium">Procesamiento completado</p>
            {job.total_rows > 0 && (
              <p className="text-xs mt-1">
                {job.total_rows.toLocaleString()} filas procesadas
              </p>
            )}
            {job.completed_at && (
              <p className="text-xs mt-1 text-green-500">
                Finalizado: {formatTimestamp(job.completed_at)}
              </p>
            )}
          </div>
        </div>
      )}

      {job.status === "failed" && (
        <div className="text-sm text-red-400 bg-red-500/10 rounded-lg p-3 border border-red-500/20">
          <p className="font-medium">El procesamiento falló</p>
          <p className="text-xs mt-1">
            {job.error_message || error || "Error desconocido"}
          </p>
        </div>
      )}
    </div>
  );
}
