import { useRef, useState } from "react";
import { Upload, FileText } from "lucide-react";

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileUploader({ onFileSelect, disabled = false, currentFile = null }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState(null);

  const validateAndSelect = (file) => {
    setFileError(null);
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setFileError("Solo se permiten archivos CSV");
      return;
    }
    onFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file) validateAndSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) validateAndSelect(file);
    e.target.value = "";
  };

  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-6 animate-fade-in-up">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200 ${
          disabled
            ? "border-[#1e2433] bg-[#0f1117] opacity-60 pointer-events-none"
            : dragActive
            ? "border-blue-500 bg-blue-500/10"
            : "border-[#2a3347] hover:border-[#3a4a66]"
        }`}
      >
        {currentFile ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center">
              <FileText size={24} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{currentFile.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {formatFileSize(currentFile.size)}
              </p>
            </div>
            <button
              onClick={() => inputRef.current?.click()}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium"
            >
              Cambiar archivo
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#1e2433] flex items-center justify-center">
              <Upload size={24} className="text-slate-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-300">
                Arrastra tu archivo CSV aquí
              </p>
              <p className="text-xs text-slate-500 mt-1">
                o haz clic para seleccionar
              </p>
            </div>
            <button
              onClick={() => inputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Seleccionar archivo
            </button>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {fileError && (
        <p className="text-sm text-red-400 mt-3">{fileError}</p>
      )}
    </div>
  );
}
