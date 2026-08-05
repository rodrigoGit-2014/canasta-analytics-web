import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, FileSpreadsheet, Table2, Code2, CheckCircle2, AlertTriangle, Lightbulb, Columns3 } from "lucide-react";

function ColumnCard({ name, description, example, type, required = true }) {
  return (
    <div className="bg-[#0f1117] rounded-lg p-3 border border-[#1e2433]">
      <div className="flex items-center justify-between mb-1.5">
        <code className="text-xs font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">{name}</code>
        <div className="flex items-center gap-1.5">
          {required && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-400 font-medium">Requerido</span>
          )}
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#1e2433] text-slate-500">{type}</span>
        </div>
      </div>
      <p className="text-xs text-slate-400 mb-1">{description}</p>
      <p className="text-[11px] text-slate-600">Ej: <span className="text-slate-400 font-mono">{example}</span></p>
    </div>
  );
}

function ChecklistItem({ children, variant = "check" }) {
  const Icon = variant === "check" ? CheckCircle2 : variant === "warn" ? AlertTriangle : Lightbulb;
  const color = variant === "check" ? "text-emerald-400" : variant === "warn" ? "text-amber-400" : "text-blue-400";
  return (
    <div className="flex items-start gap-2">
      <Icon size={14} className={`${color} mt-0.5 shrink-0`} />
      <span className="text-xs text-slate-400">{children}</span>
    </div>
  );
}

export default function CsvFormatGuide({
  title = "Formato del archivo",
  description,
  columns = [],
  csvExample = "",
  tableExample = { headers: [], rows: [] },
  checklist = [],
  warnings = [],
  tips = [],
  defaultOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] overflow-hidden">
      {/* Toggle Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#1a1f2e] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/15 flex items-center justify-center">
            <HelpCircle size={16} className="text-blue-400" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-white">{title}</p>
            {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
            {isOpen ? "Ocultar" : "Ver ayuda"}
          </span>
          {isOpen ? (
            <ChevronUp size={16} className="text-slate-500" />
          ) : (
            <ChevronDown size={16} className="text-slate-500" />
          )}
        </div>
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="px-5 pb-5 space-y-5 border-t border-[#1e2433] pt-5 animate-fade-in-up">

          {/* Columns Description */}
          {columns.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Columns3 size={14} className="text-slate-500" />
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Columnas del archivo</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {columns.map((col) => (
                  <ColumnCard key={col.name} {...col} />
                ))}
              </div>
            </div>
          )}

          {/* Table Example */}
          {tableExample.headers.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Table2 size={14} className="text-slate-500" />
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ejemplo visual</h4>
              </div>
              <div className="overflow-x-auto rounded-lg border border-[#1e2433]">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-blue-600/10">
                      {tableExample.headers.map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-blue-400 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableExample.rows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-[#0f1117]" : "bg-[#12131a]"}>
                        {row.map((cell, j) => (
                          <td key={j} className="px-3 py-2 text-slate-300 font-mono">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CSV Code Block */}
          {csvExample && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code2 size={14} className="text-slate-500" />
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Formato CSV</h4>
              </div>
              <div className="relative">
                <div className="bg-[#0a0b10] rounded-lg border border-[#1e2433] p-4 overflow-x-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <FileSpreadsheet size={12} className="text-slate-600" />
                    <span className="text-[10px] text-slate-600 font-medium">archivo.csv</span>
                  </div>
                  <pre className="text-xs text-emerald-400 font-mono leading-relaxed">{csvExample}</pre>
                </div>
              </div>
            </div>
          )}

          {/* Checklist + Warnings + Tips */}
          {(checklist.length > 0 || warnings.length > 0 || tips.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {checklist.length > 0 && (
                <div className="bg-emerald-500/5 rounded-lg border border-emerald-500/10 p-3">
                  <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">Checklist antes de subir</p>
                  <div className="space-y-2">
                    {checklist.map((item, i) => (
                      <ChecklistItem key={i} variant="check">{item}</ChecklistItem>
                    ))}
                  </div>
                </div>
              )}

              {warnings.length > 0 && (
                <div className="bg-amber-500/5 rounded-lg border border-amber-500/10 p-3">
                  <p className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider mb-2">Errores comunes</p>
                  <div className="space-y-2">
                    {warnings.map((item, i) => (
                      <ChecklistItem key={i} variant="warn">{item}</ChecklistItem>
                    ))}
                  </div>
                </div>
              )}

              {tips.length > 0 && (
                <div className="bg-blue-500/5 rounded-lg border border-blue-500/10 p-3">
                  <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider mb-2">Recomendaciones</p>
                  <div className="space-y-2">
                    {tips.map((item, i) => (
                      <ChecklistItem key={i} variant="tip">{item}</ChecklistItem>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
