const SALES_API_URL = import.meta.env.VITE_SALES_API_URL || "/api/v1";
const APRIORI_API_URL = import.meta.env.VITE_APRIORI_API_URL || "/api/v1";

function getAuthHeaders() {
  const token = localStorage.getItem("auth_access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function parseNumericStrings(obj) {
  if (Array.isArray(obj)) return obj.map(parseNumericStrings);
  if (obj && typeof obj === "object") {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === "string" && v !== "" && !isNaN(v) && !k.toLowerCase().includes("id") && !k.includes("fecha") && !k.includes("date") && !k.includes("purchase") && !k.includes("nombre")) {
        result[k] = Number(v);
      } else if (typeof v === "object" && v !== null) {
        result[k] = parseNumericStrings(v);
      } else {
        result[k] = v;
      }
    }
    return result;
  }
  return obj;
}

// Token refresh lock to prevent concurrent refresh attempts
let refreshPromise = null;

async function tryRefreshToken() {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const { refreshAccessToken } = await import("./authApi.js");
      const refreshToken = localStorage.getItem("auth_refresh_token");
      if (!refreshToken) return null;

      const data = await refreshAccessToken(refreshToken);
      localStorage.setItem("auth_access_token", data.access_token);
      localStorage.setItem("auth_refresh_token", data.refresh_token);
      return data.access_token;
    } catch {
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

async function fetchJSON(url) {
  const response = await fetch(url, { headers: getAuthHeaders() });

  if (response.status === 401) {
    const newToken = await tryRefreshToken();
    if (newToken) {
      const retryResponse = await fetch(url, {
        headers: { Authorization: `Bearer ${newToken}` },
      });
      if (retryResponse.ok) {
        const data = await retryResponse.json();
        return parseNumericStrings(data);
      }
    }
    // Refresh failed — clear auth and redirect
    localStorage.removeItem("auth_access_token");
    localStorage.removeItem("auth_refresh_token");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_company");
    window.location.href = "/login";
    throw new Error("Sesion expirada");
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.detail || body?.message || `Error ${response.status}: ${response.statusText}`
    );
  }
  const data = await response.json();
  return parseNumericStrings(data);
}

async function fetchWithAuth(url, options = {}) {
  const headers = { ...getAuthHeaders(), ...(options.headers || {}) };
  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    const newToken = await tryRefreshToken();
    if (newToken) {
      const retryHeaders = { ...options.headers, Authorization: `Bearer ${newToken}` };
      const retryResponse = await fetch(url, { ...options, headers: retryHeaders });
      if (!retryResponse.ok) {
        const body = await retryResponse.json().catch(() => null);
        throw new Error(body?.detail || body?.message || `Error ${retryResponse.status}`);
      }
      return retryResponse.json();
    }
    localStorage.removeItem("auth_access_token");
    localStorage.removeItem("auth_refresh_token");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_company");
    window.location.href = "/login";
    throw new Error("Sesion expirada");
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.detail || body?.message || `Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

function buildParams(params) {
  const entries = Object.entries(params).filter(([, v]) => v != null);
  if (entries.length === 0) return "";
  return "?" + new URLSearchParams(entries).toString();
}

// Upload endpoints
export async function uploadTransactions(file) {
  const formData = new FormData();
  formData.append("file", file);

  return fetchWithAuth(`${SALES_API_URL}/upload-transactions`, {
    method: "POST",
    body: formData,
  });
}

export async function getJobStatus(jobId) {
  return fetchJSON(`${SALES_API_URL}/jobs/${jobId}`);
}

// Sales endpoints
export async function getSalesTotal(fechaInicio, fechaFin) {
  const params = buildParams({ fecha_inicio: fechaInicio, fecha_fin: fechaFin });
  return fetchJSON(`${SALES_API_URL}/sales/total${params}`);
}

export async function getMonthlyTrend(fechaInicio, fechaFin) {
  const params = buildParams({ fecha_inicio: fechaInicio, fecha_fin: fechaFin });
  return fetchJSON(`${SALES_API_URL}/sales/monthly-trend${params}`);
}

// Analytics endpoints
export async function getDepartments(fechaInicio, fechaFin) {
  const params = buildParams({ fecha_inicio: fechaInicio, fecha_fin: fechaFin });
  return fetchJSON(`${SALES_API_URL}/analytics/departments${params}`);
}

export async function getSections(fechaInicio, fechaFin) {
  const params = buildParams({ fecha_inicio: fechaInicio, fecha_fin: fechaFin });
  return fetchJSON(`${SALES_API_URL}/analytics/sections${params}`);
}

export async function getTopProductsByQuantity(limit, fechaInicio, fechaFin) {
  const params = buildParams({ limit, fecha_inicio: fechaInicio, fecha_fin: fechaFin });
  return fetchJSON(`${SALES_API_URL}/analytics/products/top-quantity${params}`);
}

export async function getTopProductsByRevenue(limit, fechaInicio, fechaFin) {
  const params = buildParams({ limit, fecha_inicio: fechaInicio, fecha_fin: fechaFin });
  return fetchJSON(`${SALES_API_URL}/analytics/products/top-revenue${params}`);
}

export async function getTopCustomers(limit, fechaInicio, fechaFin) {
  const params = buildParams({ limit, fecha_inicio: fechaInicio, fecha_fin: fechaFin });
  return fetchJSON(`${SALES_API_URL}/analytics/customers/top${params}`);
}

export async function getCustomerAverageSpend(fechaInicio, fechaFin) {
  const params = buildParams({ fecha_inicio: fechaInicio, fecha_fin: fechaFin });
  return fetchJSON(`${SALES_API_URL}/analytics/customers/average-spend${params}`);
}

export async function getOrdersCount(fechaInicio, fechaFin) {
  const params = buildParams({ fecha_inicio: fechaInicio, fecha_fin: fechaFin });
  return fetchJSON(`${SALES_API_URL}/analytics/orders/count${params}`);
}

export async function getOrdersAverageValue() {
  return fetchJSON(`${SALES_API_URL}/analytics/orders/average-value`);
}

// Config endpoints
export async function uploadDepartamentos(file) {
  const formData = new FormData();
  formData.append("file", file);
  return fetchWithAuth(`${SALES_API_URL}/config/departamentos/upload`, {
    method: "POST",
    body: formData,
  });
}

export async function fetchDepartamentos() {
  return fetchJSON(`${SALES_API_URL}/config/departamentos`);
}

export async function deleteDepartamentos(ids = null) {
  return fetchWithAuth(`${SALES_API_URL}/config/departamentos`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
}

export async function uploadSecciones(file) {
  const formData = new FormData();
  formData.append("file", file);
  return fetchWithAuth(`${SALES_API_URL}/config/secciones/upload`, {
    method: "POST",
    body: formData,
  });
}

export async function fetchSecciones() {
  return fetchJSON(`${SALES_API_URL}/config/secciones`);
}

export async function deleteSecciones(ids = null) {
  return fetchWithAuth(`${SALES_API_URL}/config/secciones`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
}

// Apriori Analysis endpoints
export async function runAprioriAnalysis({ startDate, endDate, departmentId, sectionId, minSupport, minConfidence, minLift }) {
  return fetchWithAuth(`${APRIORI_API_URL}/analysis/apriori`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      start_date: startDate,
      end_date: endDate,
      department_id: departmentId || undefined,
      section_id: sectionId || undefined,
      min_support: minSupport ?? 0.02,
      min_confidence: minConfidence ?? 0.6,
      min_lift: minLift ?? 1.5,
    }),
  });
}

export async function getAprioriResult(runId) {
  return fetchJSON(`${APRIORI_API_URL}/analysis/apriori/${runId}`);
}

export async function getRecommendations(product, startDate, endDate) {
  const params = buildParams({ product, start_date: startDate, end_date: endDate });
  return fetchJSON(`${APRIORI_API_URL}/recommendations${params}`);
}

export async function getTransactionSummary(startDate, endDate, departmentId, sectionId) {
  const params = buildParams({
    start_date: startDate,
    end_date: endDate,
    department_id: departmentId,
    section_id: sectionId,
  });
  return fetchJSON(`${APRIORI_API_URL}/transactions/summary${params}`);
}

export async function getTransactionBaskets(startDate, endDate, departmentId, sectionId, limit = 100, offset = 0) {
  const params = buildParams({
    start_date: startDate,
    end_date: endDate,
    department_id: departmentId,
    section_id: sectionId,
    limit,
    offset,
  });
  return fetchJSON(`${APRIORI_API_URL}/transactions/baskets${params}`);
}
