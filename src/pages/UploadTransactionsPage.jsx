import { useState, useEffect } from "react";
import { Upload, Loader, RotateCcw } from "lucide-react";
import { uploadTransactions } from "../services/api";
import useJobPolling from "../hooks/useJobPolling";
import FileUploader from "../components/upload/FileUploader";
import JobStatus from "../components/upload/JobStatus";
import CsvFormatGuide from "../components/help/CsvFormatGuide";

const STORAGE_KEY = "upload_job_id";

export default function UploadTransactionsPage() {
  const [file, setFile] = useState(null);
  const [jobId, setJobId] = useState(() => localStorage.getItem(STORAGE_KEY));
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [uploadError, setUploadError] = useState(null);

  const pollingEnabled = uploadStatus === "polling" || (jobId !== null && uploadStatus === "idle");
  const { job, error: pollError, isPolling } = useJobPolling(jobId, { enabled: pollingEnabled });

  useEffect(() => {
    if (job?.status === "completed" || job?.status === "failed") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [job?.status]);

  useEffect(() => {
    if (jobId && !isPolling && uploadStatus === "idle") {
      setUploadStatus("polling");
    }
  }, [jobId, isPolling, uploadStatus]);

  const handleUpload = async () => {
    if (!file) return;
    setUploadStatus("uploading");
    setUploadError(null);
    try {
      const data = await uploadTransactions(file);
      localStorage.setItem(STORAGE_KEY, data.job_id);
      setJobId(data.job_id);
      setUploadStatus("polling");
    } catch (err) {
      setUploadError(err.message);
      setUploadStatus("idle");
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFile(null);
    setJobId(null);
    setUploadStatus("idle");
    setUploadError(null);
  };

  const isProcessing = uploadStatus === "uploading" || isPolling;
  const isTerminal = job?.status === "completed" || job?.status === "failed";

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Cargar Transacciones</h1>
          <p className="text-sm text-slate-500">
            Sube archivos CSV con datos de transacciones para procesamiento
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-5">
        <CsvFormatGuide
          title="Formato del archivo de transacciones"
          description="Aprende como preparar tu archivo CSV correctamente"
          columns={[
            { name: "day", description: "Fecha de la transaccion", example: "2024-01-15", type: "fecha", required: true },
            { name: "hour", description: "Hora de la transaccion", example: "14:30", type: "hora", required: true },
            { name: "department", description: "Departamento del producto", example: "Bebidas", type: "texto", required: true },
            { name: "section", description: "Seccion dentro del departamento", example: "Gaseosas", type: "texto", required: true },
            { name: "product", description: "Nombre del producto vendido", example: "Coca Cola", type: "texto", required: true },
            { name: "quantity", description: "Cantidad vendida", example: "2", type: "numero", required: true },
          ]}
          tableExample={{
            headers: ["day", "hour", "department", "section", "product", "quantity"],
            rows: [
              ["2024-01-01", "10:30", "Bebidas", "Gaseosas", "Coca Cola", "2"],
              ["2024-01-01", "10:32", "Panaderia", "Pan", "Hallulla", "6"],
              ["2024-01-01", "10:35", "Lacteos", "Leche", "Leche Entera", "1"],
              ["2024-01-01", "11:15", "Abarrotes", "Conservas", "Atun en Lata", "3"],
            ],
          }}
          csvExample={`day,hour,department,section,product,quantity\n2024-01-01,10:30,Bebidas,Gaseosas,Coca Cola,2\n2024-01-01,10:32,Panaderia,Pan,Hallulla,6\n2024-01-01,10:35,Lacteos,Leche,Leche Entera,1\n2024-01-01,11:15,Abarrotes,Conservas,Atun en Lata,3`}
          checklist={[
            "El archivo es formato CSV (.csv)",
            "La primera fila contiene los nombres de las columnas",
            "Los campos estan separados por comas",
            "Las fechas estan en formato YYYY-MM-DD",
            "Las horas estan en formato HH:MM o HH:MM:SS",
            "La cantidad es un numero entero positivo",
          ]}
          warnings={[
            "No usar punto y coma (;) como separador",
            "No incluir filas vacias en el archivo",
            "Evitar caracteres especiales en nombres de productos",
            "No mezclar formatos de fecha (DD/MM y MM/DD)",
          ]}
          tips={[
            "Exporta desde tu sistema POS directamente a CSV",
            "Puedes subir multiples archivos para diferentes periodos",
            "Los datos se procesan de forma asincrona, no cierres la pagina",
            "Archivos grandes (>100MB) pueden tomar unos minutos",
          ]}
        />

        <FileUploader
          onFileSelect={setFile}
          disabled={isProcessing}
          currentFile={file}
        />

        {file && !jobId && (
          <button
            onClick={handleUpload}
            disabled={uploadStatus === "uploading"}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {uploadStatus === "uploading" ? (
              <>
                <Loader className="animate-spin" size={16} />
                Subiendo archivo...
              </>
            ) : (
              <>
                <Upload size={16} />
                Subir archivo
              </>
            )}
          </button>
        )}

        {uploadError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-400">
            {uploadError}
          </div>
        )}

        {jobId && <JobStatus job={job} error={pollError} />}

        {isTerminal && (
          <button
            onClick={handleReset}
            className="w-full py-3 bg-[#151721] text-slate-300 border border-[#1e2433] rounded-xl font-medium hover:bg-[#1e2433] transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            Cargar otro archivo
          </button>
        )}
      </div>
    </>
  );
}
