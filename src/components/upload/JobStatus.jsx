import { Clock, Loader, CheckCircle2, AlertCircle } from "lucide-react";
import ProgressBar from "./ProgressBar";

const STATUS_CONFIG = {
  pending: {
    icon: Clock,
    label: "En cola",
    badgeClass: "bg-amber-100 text-amber-700",
    iconClass: "text-amber-500",
  },
  processing: {
    icon: Loader,
    label: "Procesando",
    badgeClass: "bg-blue-100 text-blue-700",
    iconClass: "text-blue-500",
    spin: true,
  },
  completed: {
    icon: CheckCircle2,
    label: "Completado",
    badgeClass: "bg-green-100 text-green-700",
    iconClass: "text-green-500",
  },
  failed: {
    icon: AlertCircle,
    label: "Error",
    badgeClass: "bg-red-100 text-red-700",
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

  // Error without job data
  if (error && !job) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-red-200 p-5 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <AlertCircle size={20} className="text-red-500" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  const config = STATUS_CONFIG[job.status] || STATUS_CONFIG.pending;
  const Icon = config.icon;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon
            size={20}
            className={`${config.iconClass} ${config.spin ? "animate-spin" : ""}`}
          />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {job.filename || "Archivo"}
            </p>
            <p className="text-xs text-gray-400">ID: {job.id}</p>
          </div>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.badgeClass}`}
        >
          {config.label}
        </span>
      </div>

      {/* Processing: progress bar + rows */}
      {job.status === "processing" && (
        <div className="space-y-2">
          <ProgressBar percentage={job.progress_percentage || 0} status="processing" />
          {job.total_rows > 0 && (
            <p className="text-xs text-gray-500">
              {(job.processed_rows || 0).toLocaleString()} / {job.total_rows.toLocaleString()} filas procesadas
            </p>
          )}
        </div>
      )}

      {/* Pending message */}
      {job.status === "pending" && (
        <p className="text-sm text-gray-500">
          El archivo está en cola de procesamiento...
        </p>
      )}

      {/* Completed */}
      {job.status === "completed" && (
        <div className="space-y-2">
          <ProgressBar percentage={100} status="completed" />
          <div className="text-sm text-green-700 bg-green-50 rounded-lg p-3">
            <p className="font-medium">Procesamiento completado</p>
            {job.total_rows > 0 && (
              <p className="text-xs mt-1">
                {job.total_rows.toLocaleString()} filas procesadas
              </p>
            )}
            {job.completed_at && (
              <p className="text-xs mt-1 text-green-600">
                Finalizado: {formatTimestamp(job.completed_at)}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Failed */}
      {job.status === "failed" && (
        <div className="text-sm text-red-700 bg-red-50 rounded-lg p-3">
          <p className="font-medium">El procesamiento falló</p>
          <p className="text-xs mt-1">
            {job.error_message || error || "Error desconocido"}
          </p>
        </div>
      )}
    </div>
  );
}
