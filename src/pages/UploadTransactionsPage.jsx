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
            { name: "id_pedido", description: "Identificador unico del pedido o ticket", example: "PED-001", type: "texto", required: true },
            { name: "id_cliente", description: "Identificador del cliente que realizo la compra", example: "CLI-120", type: "texto", required: true },
            { name: "fecha", description: "Fecha de la transaccion", example: "2024-01-15", type: "fecha", required: true },
            { name: "hora", description: "Hora de la transaccion", example: "14:30:00", type: "hora", required: true },
            { name: "id_departamento", description: "Codigo del departamento del producto", example: "BEB", type: "texto", required: true },
            { name: "id_seccion", description: "Codigo de la seccion dentro del departamento", example: "GAS", type: "texto", required: true },
            { name: "id_producto", description: "Codigo unico del producto", example: "PRD-045", type: "texto", required: true },
            { name: "nombre_producto", description: "Nombre legible del producto vendido", example: "Coca Cola 500ml", type: "texto", required: true },
            { name: "precio_unitario", description: "Precio por unidad del producto", example: "1290.00", type: "numero", required: true },
            { name: "cantidad", description: "Cantidad de unidades vendidas", example: "2", type: "numero", required: true },
            { name: "precio_total", description: "Precio total de la linea (precio_unitario x cantidad)", example: "2580.00", type: "numero", required: true },
          ]}
          tableExample={{
            headers: ["id_pedido", "id_cliente", "fecha", "hora", "id_departamento", "id_seccion", "id_producto", "nombre_producto", "precio_unitario", "cantidad", "precio_total"],
            rows: [
              ["PED-001", "CLI-120", "2024-01-01", "10:30:00", "BEB", "GAS", "PRD-045", "Coca Cola 500ml", "1290", "2", "2580"],
              ["PED-001", "CLI-120", "2024-01-01", "10:30:00", "PAN", "PNB", "PRD-012", "Hallulla", "150", "6", "900"],
              ["PED-002", "CLI-085", "2024-01-01", "10:35:00", "LAC", "LEC", "PRD-078", "Leche Entera 1L", "990", "1", "990"],
              ["PED-002", "CLI-085", "2024-01-01", "10:35:00", "ABA", "CON", "PRD-102", "Atun en Lata", "1590", "3", "4770"],
            ],
          }}
          csvExample={`id_pedido,id_cliente,fecha,hora,id_departamento,id_seccion,id_producto,nombre_producto,precio_unitario,cantidad,precio_total\nPED-001,CLI-120,2024-01-01,10:30:00,BEB,GAS,PRD-045,Coca Cola 500ml,1290,2,2580\nPED-001,CLI-120,2024-01-01,10:30:00,PAN,PNB,PRD-012,Hallulla,150,6,900\nPED-002,CLI-085,2024-01-01,10:35:00,LAC,LEC,PRD-078,Leche Entera 1L,990,1,990\nPED-002,CLI-085,2024-01-01,10:35:00,ABA,CON,PRD-102,Atun en Lata,1590,3,4770`}
          checklist={[
            "El archivo es formato CSV (.csv)",
            "La primera fila contiene los nombres de las 11 columnas",
            "Los campos estan separados por comas",
            "Las fechas estan en formato YYYY-MM-DD",
            "Las horas estan en formato HH:MM o HH:MM:SS",
            "Los precios son valores numericos (sin simbolo de moneda)",
            "La cantidad es un numero entero positivo",
            "precio_total = precio_unitario x cantidad",
          ]}
          warnings={[
            "No usar punto y coma (;) como separador",
            "No incluir filas vacias en el archivo",
            "No incluir simbolos de moneda ($) en los precios",
            "No mezclar formatos de fecha (DD/MM y MM/DD)",
            "Cada fila es una linea de producto, no un pedido completo",
          ]}
          tips={[
            "Un pedido con 3 productos genera 3 filas con el mismo id_pedido",
            "Exporta desde tu sistema POS directamente a CSV",
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
