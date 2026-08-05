/**
 * Translates technical Apriori metrics into business-friendly language (Spanish).
 */

export function getStrengthLabel(lift) {
  if (lift >= 2.5) return { label: "Muy fuerte", color: "emerald", bg: "bg-emerald-500/15", text: "text-emerald-400" };
  if (lift >= 1.5) return { label: "Fuerte", color: "blue", bg: "bg-blue-500/15", text: "text-blue-400" };
  if (lift >= 1.0) return { label: "Moderada", color: "amber", bg: "bg-amber-500/15", text: "text-amber-400" };
  return { label: "Debil", color: "slate", bg: "bg-slate-500/15", text: "text-slate-400" };
}

export function generateInsightText(antecedent, consequent) {
  return `Los clientes que compran ${antecedent} tambien suelen comprar ${consequent}`;
}

export function translateRule(rule) {
  const strength = getStrengthLabel(rule.lift);
  const antecedent = Array.isArray(rule.antecedent) ? rule.antecedent.join(", ") : rule.antecedent;
  const consequent = Array.isArray(rule.consequent) ? rule.consequent.join(", ") : rule.consequent;

  return {
    antecedent,
    consequent,
    probability: +(rule.confidence * 100).toFixed(1),
    frequency: +(rule.support * 100).toFixed(1),
    strengthValue: rule.lift,
    strengthLabel: strength.label,
    strengthBg: strength.bg,
    strengthText: strength.text,
    insightText: generateInsightText(antecedent, consequent),
  };
}

export function translateRules(rules) {
  return rules.map(translateRule).sort((a, b) => b.strengthValue - a.strengthValue);
}

// Palette for dynamic color assignment when products aren't in the section map
const GRAPH_PALETTE = [
  "#3B82F6", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6",
  "#14B8A6", "#F97316", "#6366F1", "#22C55E", "#EF4444",
  "#06B6D4", "#A855F7", "#84CC16", "#E11D48", "#0EA5E9",
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function buildGraphData(translatedRules, sectionMap, sectionCategories) {
  const nodesMap = new Map();
  const links = [];

  translatedRules.forEach((rule) => {
    [rule.antecedent, rule.consequent].forEach((name) => {
      if (!nodesMap.has(name)) {
        const section = sectionMap[name];
        const knownCategory = sectionCategories[section];
        nodesMap.set(name, {
          id: name,
          color: knownCategory?.color || GRAPH_PALETTE[hashString(name) % GRAPH_PALETTE.length],
          category: knownCategory?.label || "Producto",
        });
      }
    });

    links.push({
      source: rule.antecedent,
      target: rule.consequent,
      lift: rule.strengthValue,
      confidence: rule.probability,
      support: rule.frequency,
    });
  });

  return { nodes: [...nodesMap.values()], links };
}

export function getRecommendationsForProduct(product, translatedRules) {
  return translatedRules
    .filter((r) => r.antecedent === product)
    .map((r) => ({
      product: r.consequent,
      probability: r.probability,
      strengthValue: r.strengthValue,
      strengthLabel: r.strengthLabel,
      strengthBg: r.strengthBg,
      strengthText: r.strengthText,
    }))
    .sort((a, b) => b.probability - a.probability);
}
