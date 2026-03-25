const CURRENCY_CONFIG = {
  CLP: { locale: "es-CL", currency: "CLP", decimals: 0 },
  USD: { locale: "en-US", currency: "USD", decimals: 2 },
};

function getStoredCurrency() {
  try {
    const stored = localStorage.getItem("auth_company");
    if (stored) {
      const company = JSON.parse(stored);
      if (company.currency) return company.currency;
    }
  } catch {}
  return "CLP";
}

export function formatCurrency(n, currencyOverride) {
  const code = currencyOverride || getStoredCurrency();
  const config = CURRENCY_CONFIG[code] || CURRENCY_CONFIG.CLP;
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  }).format(n);
}

export function formatNumber(n, decimals = 0) {
  return new Intl.NumberFormat("es-CL", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

export function formatCompact(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toFixed(0);
}
