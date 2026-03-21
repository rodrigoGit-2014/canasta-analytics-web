import { useState, useEffect, useCallback } from "react";
import { Upload, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import FileUploader from "../upload/FileUploader";
import CsvPreviewTable from "./CsvPreviewTable";
import LucideIcon from "./LucideIcon";

function parseCsv(text) {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return { headers: [], rows: [] };
  const headers = lines[0].split(",").map((h) => h.trim());
  const rows = lines.slice(1).map((line) => line.split(",").map((c) => c.trim()));
  return { headers, rows };
}

export default function ConfigUploadPage({
  title,
  expectedHeaders,
  uploadFn,
  fetchFn,
  idField,
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [error, setError] = useState(null);

  const loadItems = useCallback(async () => {
    setLoadingItems(true);
    try {
      const data = await fetchFn();
      setItems(data);
    } catch {
      // no items loaded yet
    } finally {
      setLoadingItems(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleFileSelect = (f) => {
    setFile(f);
    setUploadResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const { headers, rows } = parseCsv(e.target.result);
      const lower = headers.map((h) => h.toLowerCase());
      const expected = expectedHeaders.map((h) => h.toLowerCase());
      if (!expected.every((h) => lower.includes(h))) {
        setPreview(null);
        setError(`El CSV debe contener las columnas: ${expectedHeaders.join(", ")}`);
        return;
      }
      setPreview({ headers, rows });
    };
    reader.readAsText(f);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setUploadResult(null);
    setError(null);
    try {
      const data = await uploadFn(file);
      setUploadResult({
        success: true,
        message: `Archivo procesado correctamente (${data.count} registros)`,
      });
      setFile(null);
      setPreview(null);
      if (data.items) {
        setItems(data.items);
      } else {
        loadItems();
      }
    } catch (err) {
      setUploadResult({ success: false, message: err.message });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-xl font-bold text-white">{title}</h1>
      </div>

      {/* Upload Card */}
      <div className="mb-6">
        <FileUploader
          onFileSelect={handleFileSelect}
          currentFile={file}
          disabled={uploading}
        />
      </div>

      {/* Validation error */}
      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6 animate-fade-in-up">
          <AlertCircle size={16} className="text-red-400 shrink-0" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* CSV Preview + Process button */}
      {preview && (
        <div className="mb-6">
          <CsvPreviewTable headers={preview.headers} rows={preview.rows} />
          <div className="mt-4">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Upload size={16} />
              )}
              {uploading ? "Procesando..." : "Procesar archivo"}
            </button>
          </div>
        </div>
      )}

      {/* Upload result feedback */}
      {uploadResult && (
        <div
          className={`flex items-center gap-2 rounded-xl px-4 py-3 mb-6 animate-fade-in-up ${
            uploadResult.success
              ? "bg-emerald-500/10 border border-emerald-500/20"
              : "bg-red-500/10 border border-red-500/20"
          }`}
        >
          {uploadResult.success ? (
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle size={16} className="text-red-400 shrink-0" />
          )}
          <p
            className={`text-sm ${
              uploadResult.success ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {uploadResult.message}
          </p>
        </div>
      )}

      {/* Loaded items table */}
      <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-6 animate-fade-in-up">
        <h3 className="text-sm font-semibold text-white mb-4">
          Registros cargados en DB
        </h3>
        {loadingItems ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-10 bg-[#1a1f2e] rounded-lg animate-shimmer"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-8">
            No hay registros cargados aún.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1a1f2e]">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider w-16">
                    Icono
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {idField}
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    nombre
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr
                    key={item[idField] ?? i}
                    className="border-t border-[#1e2433] hover:bg-[#1a1f2e] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1e2433] flex items-center justify-center">
                        <LucideIcon
                          name={item.icono_name || "help-circle"}
                          size={16}
                          className="text-blue-400"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300 font-mono">
                      {item[idField]}
                    </td>
                    <td className="px-4 py-3 text-white font-medium">
                      {item.nombre}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
