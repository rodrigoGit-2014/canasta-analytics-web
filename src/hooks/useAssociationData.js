import { useState, useEffect, useMemo, useCallback } from "react";
import { getAssociationRules } from "../services/api";
import { SECTION_CATEGORIES } from "../data/categories";

export function useAssociationData(runId, selectedProduct, minLift, minConfidence) {
  const [rawRules, setRawRules] = useState([]);
  const [kpisFromApi, setKpisFromApi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRules = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const target = runId || "latest";
      const data = await getAssociationRules(target, { page_size: 1000 });
      setRawRules(data.rules || []);
      setKpisFromApi(data.kpis || null);
    } catch (err) {
      setError(err.message);
      setRawRules([]);
      setKpisFromApi(null);
    } finally {
      setLoading(false);
    }
  }, [runId]);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  const filteredRules = useMemo(() => {
    return rawRules.filter((rule) => {
      if (rule.lift < minLift) return false;
      if (rule.confidence * 100 < minConfidence) return false;
      return true;
    });
  }, [rawRules, minLift, minConfidence]);

  const productFilteredRules = useMemo(() => {
    if (!selectedProduct) return filteredRules;
    return filteredRules.filter(
      (r) => r.antecedent === selectedProduct || r.consequent === selectedProduct
    );
  }, [filteredRules, selectedProduct]);

  const kpis = useMemo(() => {
    if (kpisFromApi && !selectedProduct && minLift <= 0 && minConfidence <= 0) {
      return {
        totalRules: kpisFromApi.total_rules,
        avgConfidence: kpisFromApi.avg_confidence * 100,
        avgLift: kpisFromApi.avg_lift,
        strongCount: kpisFromApi.strong_count,
        mediumCount: kpisFromApi.medium_count,
        weakCount: kpisFromApi.weak_count,
      };
    }
    const rules = productFilteredRules;
    const count = rules.length;
    const avgConfidence = count > 0 ? rules.reduce((s, r) => s + r.confidence * 100, 0) / count : 0;
    const avgLift = count > 0 ? rules.reduce((s, r) => s + r.lift, 0) / count : 0;
    return {
      totalRules: count,
      avgConfidence: parseFloat(avgConfidence.toFixed(2)),
      avgLift: parseFloat(avgLift.toFixed(2)),
      strongCount: rules.filter((r) => r.strength === "strong").length,
      mediumCount: rules.filter((r) => r.strength === "medium").length,
      weakCount: rules.filter((r) => r.strength === "weak").length,
    };
  }, [kpisFromApi, productFilteredRules, selectedProduct, minLift, minConfidence]);

  const graphData = useMemo(() => {
    const rules = productFilteredRules;
    const nodesMap = new Map();
    const links = [];

    rules.forEach((rule) => {
      [rule.antecedent, rule.consequent].forEach((name) => {
        if (!nodesMap.has(name)) {
          const section = rule.antecedent === name
            ? rule.antecedent_section
            : rule.consequent_section;
          nodesMap.set(name, {
            id: name,
            color: SECTION_CATEGORIES[section]?.color || "#6B7280",
            category: SECTION_CATEGORIES[section]?.label || "Otro",
          });
        }
      });

      links.push({
        source: rule.antecedent,
        target: rule.consequent,
        lift: rule.lift,
        confidence: rule.confidence * 100,
        support: rule.support * 100,
      });
    });

    return { nodes: [...nodesMap.values()], links };
  }, [productFilteredRules]);

  const allProducts = useMemo(() => {
    const products = new Set();
    rawRules.forEach((r) => {
      products.add(r.antecedent);
      products.add(r.consequent);
    });
    return [...products].sort();
  }, [rawRules]);

  const tableRules = useMemo(() => {
    return [...productFilteredRules]
      .sort((a, b) => b.lift - a.lift)
      .map((r) => ({
        ...r,
        support: r.support * 100,
        confidence: r.confidence * 100,
      }));
  }, [productFilteredRules]);

  return { kpis, graphData, allProducts, tableRules, loading, error, refetch: fetchRules };
}
