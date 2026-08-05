import { useState, useEffect, useCallback } from "react";
import { Upload, AlertCircle, CheckCircle2, Loader2, Trash2 } from "lucide-react";
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
  deleteFn,
  idField,
  helpGuide,
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [error, setError] = useState(null);

  // Selection state
  const [selected, setSelected] = useState(new Set());
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(null); // null | "selected" | "all"

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

  // Clear selection when items change
  useEffect(() => {
    setSelected(new Set());
  }, [items]);

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

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === items.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(items.map((item) => item[idField])));
    }
  };

  const handleDelete = async (mode) => {
    setDeleting(true);
    setShowConfirm(null);
    try {
      const ids = mode === "selected" ? [...selected] : null;
      await deleteFn(ids);
      setUploadResult({
        success: true,
        message: mode === "selected"
          ? `${selected.size} registro(s) eliminado(s)`
          : "Todos los registros eliminados",
      });
      setSelected(new Set());
      loadItems();
    } catch (err) {
      setUploadResult({ success: false, message: err.message });
    } finally {
      setDeleting(false);
    }
  };

  const allSelected = items.length > 0 && selected.size === items.length;
  const someSelected = selected.size > 0;

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-xl font-bold text-white">{title}</h1>
      </div>

      {/* Help Guide */}
      {helpGuide && <div className="mb-6">{helpGuide}</div>}

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

      {/* Upload/delete result feedback */}
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

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#151721] border border-[#1e2433] rounded-xl p-6 max-w-sm w-full animate-fade-in-up">
            <h3 className="text-base font-semibold text-white mb-2">Confirmar eliminacion</h3>
            <p className="text-sm text-slate-400 mb-5">
              {showConfirm === "all"
                ? `Se eliminaran todos los ${items.length} registros. Esta accion no se puede deshacer.`
                : `Se eliminaran ${selected.size} registro(s) seleccionado(s). Esta accion no se puede deshacer.`}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white bg-[#1e2433] rounded-lg transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(showConfirm)}
                disabled={deleting}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition disabled:opacity-50"
              >
                {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loaded items table */}
      <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-6 animate-fade-in-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">
            Registros cargados en DB
            {items.length > 0 && (
              <span className="ml-2 text-slate-500 font-normal">({items.length})</span>
            )}
          </h3>

          {/* Delete actions */}
          {deleteFn && items.length > 0 && (
            <div className="flex items-center gap-2">
              {someSelected && (
                <button
                  onClick={() => setShowConfirm("selected")}
                  disabled={deleting}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition disabled:opacity-50"
                >
                  <Trash2 size={13} />
                  Eliminar ({selected.size})
                </button>
              )}
              <button
                onClick={() => setShowConfirm("all")}
                disabled={deleting}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 bg-[#1e2433] rounded-lg hover:text-red-400 hover:bg-red-500/10 transition disabled:opacity-50"
              >
                <Trash2 size={13} />
                Eliminar todos
              </button>
            </div>
          )}
        </div>

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
            No hay registros cargados aun.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1a1f2e]">
                  {deleteFn && (
                    <th className="px-4 py-2.5 text-left w-10">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleSelectAll}
                        className="w-3.5 h-3.5 rounded border-slate-600 bg-[#0f1117] text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                      />
                    </th>
                  )}
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
                {items.map((item, i) => {
                  const id = item[idField];
                  const isSelected = selected.has(id);
                  return (
                    <tr
                      key={id ?? i}
                      className={`border-t border-[#1e2433] transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-blue-600/5"
                          : "hover:bg-[#1a1f2e]"
                      }`}
                      onClick={() => deleteFn && toggleSelect(id)}
                    >
                      {deleteFn && (
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(id)}
                            className="w-3.5 h-3.5 rounded border-slate-600 bg-[#0f1117] text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                          />
                        </td>
                      )}
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
                        {id}
                      </td>
                      <td className="px-4 py-3 text-white font-medium">
                        {item.nombre}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
