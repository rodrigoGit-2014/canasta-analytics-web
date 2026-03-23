import { useState, useCallback } from "react";
import { Sparkles } from "lucide-react";
import { useInteligencia } from "../contexts/InteligenciaContext";
import useDatasetPreview from "../hooks/useDatasetPreview";
import StepperHeader from "../components/inteligencia/StepperHeader";
import StepNavigation from "../components/inteligencia/StepNavigation";
import StepPreview from "../components/inteligencia/StepPreview";
import StepAnalysis from "../components/inteligencia/StepAnalysis";
import StepRules from "../components/inteligencia/StepRules";

export default function PurchasePatternsPage() {
  const {
    filters,
    setFilters,
    runAnalysis,
    rules,
    summary: analysisSummary,
    isLoading,
    isPolling,
    error,
    hasResults,
  } = useInteligencia();

  const preview = useDatasetPreview(filters);
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisRan, setAnalysisRan] = useState(false);

  const canAdvance =
    currentStep === 0
      ? preview.hasPreview
      : currentStep === 1
        ? analysisRan && hasResults
        : false;

  const handleNext = useCallback(() => {
    if (currentStep < 2 && canAdvance) {
      setCurrentStep((s) => s + 1);
    }
  }, [currentStep, canAdvance]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  const handleStepClick = useCallback((step) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  }, [currentStep]);

  const handleRunAnalysis = useCallback(() => {
    setAnalysisRan(true);
    runAnalysis();
  }, [runAnalysis]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setAnalysisRan(false);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={20} className="text-blue-400" />
          <h1 className="text-xl font-bold text-white">Patrones de Compra</h1>
        </div>
        <p className="text-sm text-slate-500">
          Descubre que productos se compran juntos con mayor frecuencia
        </p>
      </div>

      {/* Stepper */}
      <StepperHeader currentStep={currentStep} onStepClick={handleStepClick} />

      {/* Active step content */}
      {currentStep === 0 && (
        <StepPreview
          filters={filters}
          onFiltersChange={setFilters}
          preview={preview}
        />
      )}

      {currentStep === 1 && (
        <StepAnalysis
          filters={filters}
          runAnalysis={handleRunAnalysis}
          isLoading={isLoading}
          isPolling={isPolling}
          error={error}
          hasResults={analysisRan && hasResults}
          summary={preview.summary}
          rulesCount={analysisRan && hasResults && rules.length > 0 ? rules.length : null}
        />
      )}

      {currentStep === 2 && (
        <StepRules rules={rules} summary={preview.summary} />
      )}

      {/* Navigation */}
      <StepNavigation
        currentStep={currentStep}
        onBack={handleBack}
        onNext={handleNext}
        onReset={handleReset}
        canAdvance={canAdvance}
      />
    </div>
  );
}
