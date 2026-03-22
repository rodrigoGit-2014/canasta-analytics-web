import { useState, useCallback, useMemo, useRef } from "react";
import { runAprioriAnalysis, getAprioriResult, getTransactionSummary } from "../services/api";
import { translateRules, buildGraphData } from "../utils/ruleTranslator";
import { PRODUCT_SECTION_MAP, SECTION_CATEGORIES } from "../data/categories";

const POLL_INTERVAL = 3000;

export default function useAprioriAnalysis() {
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    departmentId: null,
    sectionId: null,
  });

  const [rawRules, setRawRules] = useState([]);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState(null);
  const [hasResults, setHasResults] = useState(false);
  const pollingRef = useRef(false);

  const fetchSummary = useCallback(async (filtersSnapshot) => {
    try {
      const data = await getTransactionSummary(
        filtersSnapshot.startDate,
        filtersSnapshot.endDate,
        filtersSnapshot.departmentId,
        filtersSnapshot.sectionId
      );
      setSummary({
        totalTransactions: data.total_transactions || 0,
        totalProducts: data.total_products || 0,
        avgProductsPerPurchase: data.avg_products_per_purchase || 0,
        topProducts: data.top_products || [],
      });
    } catch {
      // Summary is non-critical — still show rules even if summary fails
      setSummary({
        totalTransactions: 0,
        totalProducts: 0,
        avgProductsPerPurchase: 0,
        topProducts: [],
      });
    }
  }, []);

  const pollForResults = useCallback(async (runId, filtersSnapshot) => {
    setIsPolling(true);
    pollingRef.current = true;

    const poll = async () => {
      try {
        const data = await getAprioriResult(runId);

        // Completed: 200 with rules
        if (data.rules) {
          setRawRules(data.rules);
          await fetchSummary(filtersSnapshot);
          setIsPolling(false);
          setIsLoading(false);
          setHasResults(true);
          pollingRef.current = false;
          return true;
        }

        // Failed
        if (data.status === "failed") {
          setError(data.error || "El analisis fallo");
          setIsPolling(false);
          setIsLoading(false);
          pollingRef.current = false;
          return true;
        }

        // Still processing
        return false;
      } catch (err) {
        setError(err.message);
        setIsPolling(false);
        setIsLoading(false);
        pollingRef.current = false;
        return true;
      }
    };

    if (await poll()) return;
    const interval = setInterval(async () => {
      if (await poll()) clearInterval(interval);
    }, POLL_INTERVAL);
  }, [fetchSummary]);

  const runAnalysis = useCallback(async () => {
    if (!filters.startDate || !filters.endDate) return;
    setIsLoading(true);
    setError(null);
    setHasResults(false);
    setRawRules([]);
    setSummary(null);

    const filtersSnapshot = { ...filters };

    try {
      const data = await runAprioriAnalysis(filtersSnapshot);

      // Async response — has run_id with status processing/pending
      if (data.run_id && (data.status === "processing" || data.status === "pending")) {
        await pollForResults(data.run_id, filtersSnapshot);
        return;
      }

      // Sync response — rules directly in the response
      setRawRules(data.rules || []);
      await fetchSummary(filtersSnapshot);
      setHasResults(true);
    } catch (err) {
      setError(err.message);
    } finally {
      if (!pollingRef.current) setIsLoading(false);
    }
  }, [filters, pollForResults, fetchSummary]);

  const translatedRules = useMemo(() => translateRules(rawRules), [rawRules]);

  const graphData = useMemo(
    () => buildGraphData(translatedRules, PRODUCT_SECTION_MAP, SECTION_CATEGORIES),
    [translatedRules]
  );

  const allProducts = useMemo(() => {
    const products = new Set();
    translatedRules.forEach((r) => {
      products.add(r.antecedent);
      products.add(r.consequent);
    });
    return [...products].sort();
  }, [translatedRules]);

  return {
    filters,
    setFilters,
    runAnalysis,
    rules: translatedRules,
    graphData,
    allProducts,
    summary,
    isLoading,
    isPolling,
    error,
    hasResults,
  };
}
