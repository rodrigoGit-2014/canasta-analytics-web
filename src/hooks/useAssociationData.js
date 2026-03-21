import { useMemo } from "react";
import { rulesData } from "../data/rulesData";
import { PRODUCT_SECTION_MAP, SECTION_CATEGORIES } from "../data/categories";

export function useAssociationData(
  selectedProduct,
  minLift,
  minConfidence
) {
  const filteredRules = useMemo(() => {
    return rulesData.filter((rule) => {
      if (rule.lift < minLift || rule.confidence < minConfidence) return false;
      return true;
    });
  }, [minLift, minConfidence]);

  const productFilteredRules = useMemo(() => {
    if (!selectedProduct) return filteredRules;
    return filteredRules.filter(
      (r) => r.antecedent === selectedProduct || r.consequent === selectedProduct
    );
  }, [filteredRules, selectedProduct]);

  const kpis = useMemo(() => {
    const rules = productFilteredRules;
    const count = rules.length;
    const avgConfidence =
      count > 0 ? rules.reduce((s, r) => s + r.confidence, 0) / count : 0;
    const avgLift =
      count > 0 ? rules.reduce((s, r) => s + r.lift, 0) / count : 0;
    return {
      totalRules: count,
      avgConfidence: parseFloat(avgConfidence.toFixed(2)),
      avgLift: parseFloat(avgLift.toFixed(2)),
    };
  }, [productFilteredRules]);

  const graphData = useMemo(() => {
    const rules = productFilteredRules;
    const nodesMap = new Map();
    const links = [];

    rules.forEach((rule) => {
      [rule.antecedent, rule.consequent].forEach((name) => {
        if (!nodesMap.has(name)) {
          const section = PRODUCT_SECTION_MAP[name];
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
        confidence: rule.confidence,
        support: rule.support,
      });
    });

    return {
      nodes: [...nodesMap.values()],
      links,
    };
  }, [productFilteredRules]);

  const allProducts = useMemo(() => {
    const products = new Set();
    rulesData.forEach((r) => {
      products.add(r.antecedent);
      products.add(r.consequent);
    });
    return [...products].sort();
  }, []);

  const tableRules = useMemo(() => {
    return [...productFilteredRules].sort((a, b) => b.lift - a.lift);
  }, [productFilteredRules]);

  return { kpis, graphData, allProducts, tableRules };
}
