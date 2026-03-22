import { useState, useEffect, useRef, useCallback } from "react";
import { getTransactionBaskets, getTransactionSummary } from "../services/api";

const PAGE_SIZE = 100;

export default function useDatasetPreview(filters) {
  const [baskets, setBaskets] = useState([]);
  const [totalBaskets, setTotalBaskets] = useState(0);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const timerRef = useRef(null);

  const hasFilters = Boolean(filters.startDate && filters.endDate);
  const totalPages = Math.ceil(totalBaskets / PAGE_SIZE);

  // Initial load when filters change
  useEffect(() => {
    if (!hasFilters) {
      setBaskets([]);
      setTotalBaskets(0);
      setSummary(null);
      setError(null);
      setPage(0);
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      setPage(0);

      try {
        const [basketsData, summaryData] = await Promise.all([
          getTransactionBaskets(
            filters.startDate, filters.endDate,
            filters.departmentId, filters.sectionId,
            PAGE_SIZE, 0
          ),
          getTransactionSummary(
            filters.startDate, filters.endDate,
            filters.departmentId, filters.sectionId
          ),
        ]);

        setBaskets(basketsData.baskets || []);
        setTotalBaskets(basketsData.total || 0);
        setSummary({
          totalTransactions: summaryData.total_transactions || 0,
          totalProducts: summaryData.total_products || 0,
          avgProductsPerPurchase: summaryData.avg_products_per_purchase || 0,
          topProducts: summaryData.top_products || [],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [filters.startDate, filters.endDate, filters.departmentId, filters.sectionId, hasFilters]);

  // Page change handler
  const goToPage = useCallback(async (newPage) => {
    if (newPage < 0 || newPage >= totalPages || newPage === page) return;
    setIsPageLoading(true);

    try {
      const data = await getTransactionBaskets(
        filters.startDate, filters.endDate,
        filters.departmentId, filters.sectionId,
        PAGE_SIZE, newPage * PAGE_SIZE
      );
      setBaskets(data.baskets || []);
      setTotalBaskets(data.total || totalBaskets);
      setPage(newPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPageLoading(false);
    }
  }, [filters, page, totalPages, totalBaskets]);

  return {
    baskets,
    totalBaskets,
    summary,
    isLoading,
    isPageLoading,
    error,
    hasPreview: hasFilters && summary !== null && !isLoading,
    page,
    totalPages,
    pageSize: PAGE_SIZE,
    goToPage,
  };
}
