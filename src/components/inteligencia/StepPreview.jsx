import { Sparkles } from "lucide-react";
import AnalysisFilterPanel from "./AnalysisFilterPanel";
import TransactionPreviewTable from "./TransactionPreviewTable";
import DatasetSummaryRow from "./DatasetSummaryRow";

export default function StepPreview({ filters, onFiltersChange, preview }) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Filters */}
      <AnalysisFilterPanel
        filters={filters}
        onFiltersChange={onFiltersChange}
        hideButton
      />

      {/* Preview loading */}
      {preview.isLoading && (
        <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-8">
          <div className="flex items-center justify-center gap-3">
            <span className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
            <p className="text-sm text-slate-400">Cargando vista previa del dataset...</p>
          </div>
        </div>
      )}

      {/* Preview error */}
      {preview.error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-400">
          {preview.error}
        </div>
      )}

      {/* Dataset preview: table + summary */}
      {preview.hasPreview && (
        <>
          <TransactionPreviewTable
            baskets={preview.baskets}
            total={preview.totalBaskets}
            page={preview.page}
            totalPages={preview.totalPages}
            pageSize={preview.pageSize}
            onPageChange={preview.goToPage}
            isPageLoading={preview.isPageLoading}
          />
          <DatasetSummaryRow summary={preview.summary} rulesCount={null} />
        </>
      )}

      {/* Empty state */}
      {!preview.hasPreview && !preview.isLoading && !preview.error && (
        <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles size={32} className="text-blue-400/60" />
          </div>
          <p className="text-sm font-medium text-slate-400 mb-1">
            Selecciona un rango de fechas para comenzar
          </p>
          <p className="text-xs text-slate-600">
            Analizaremos tus transacciones para descubrir patrones de compra
          </p>
        </div>
      )}
    </div>
  );
}
