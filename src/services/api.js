const BASE_URL = "/api/v1";

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

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.detail || body?.message || `Error ${response.status}: ${response.statusText}`
    );
  }
  const data = await response.json();
  return parseNumericStrings(data);
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

  const response = await fetch(`${BASE_URL}/upload-transactions`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.detail || body?.message || `Error ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
}

export async function getJobStatus(jobId) {
  return fetchJSON(`${BASE_URL}/jobs/${jobId}`);
}

// Sales endpoints
export async function getSalesTotal(fechaInicio, fechaFin) {
  const params = buildParams({ fecha_inicio: fechaInicio, fecha_fin: fechaFin });
  return fetchJSON(`${BASE_URL}/sales/total${params}`);
}

export async function getMonthlyTrend(fechaInicio, fechaFin) {
  const params = buildParams({ fecha_inicio: fechaInicio, fecha_fin: fechaFin });
  return fetchJSON(`${BASE_URL}/sales/monthly-trend${params}`);
}

// Analytics endpoints
export async function getDepartments(fechaInicio, fechaFin) {
  const params = buildParams({ fecha_inicio: fechaInicio, fecha_fin: fechaFin });
  return fetchJSON(`${BASE_URL}/analytics/departments${params}`);
}

export async function getSections(fechaInicio, fechaFin) {
  const params = buildParams({ fecha_inicio: fechaInicio, fecha_fin: fechaFin });
  return fetchJSON(`${BASE_URL}/analytics/sections${params}`);
}

export async function getTopProductsByQuantity(limit, fechaInicio, fechaFin) {
  const params = buildParams({ limit, fecha_inicio: fechaInicio, fecha_fin: fechaFin });
  return fetchJSON(`${BASE_URL}/analytics/products/top-quantity${params}`);
}

export async function getTopProductsByRevenue(limit, fechaInicio, fechaFin) {
  const params = buildParams({ limit, fecha_inicio: fechaInicio, fecha_fin: fechaFin });
  return fetchJSON(`${BASE_URL}/analytics/products/top-revenue${params}`);
}

export async function getTopCustomers(limit, fechaInicio, fechaFin) {
  const params = buildParams({ limit, fecha_inicio: fechaInicio, fecha_fin: fechaFin });
  return fetchJSON(`${BASE_URL}/analytics/customers/top${params}`);
}

export async function getCustomerAverageSpend(fechaInicio, fechaFin) {
  const params = buildParams({ fecha_inicio: fechaInicio, fecha_fin: fechaFin });
  return fetchJSON(`${BASE_URL}/analytics/customers/average-spend${params}`);
}

export async function getOrdersCount(fechaInicio, fechaFin) {
  const params = buildParams({ fecha_inicio: fechaInicio, fecha_fin: fechaFin });
  return fetchJSON(`${BASE_URL}/analytics/orders/count${params}`);
}

export async function getOrdersAverageValue() {
  return fetchJSON(`${BASE_URL}/analytics/orders/average-value`);
}

// Config endpoints
export async function uploadDepartamentos(file) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${BASE_URL}/config/departamentos/upload`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.detail || body?.message || `Error ${response.status}`);
  }
  return response.json();
}

export async function fetchDepartamentos() {
  return fetchJSON(`${BASE_URL}/config/departamentos`);
}

export async function uploadSecciones(file) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${BASE_URL}/config/secciones/upload`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.detail || body?.message || `Error ${response.status}`);
  }
  return response.json();
}

export async function fetchSecciones() {
  return fetchJSON(`${BASE_URL}/config/secciones`);
}

// Apriori Analysis endpoints
export async function runAprioriAnalysis({ startDate, endDate, departmentId, sectionId }) {
  const response = await fetch(`${BASE_URL}/analysis/apriori`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      start_date: startDate,
      end_date: endDate,
      department_id: departmentId || undefined,
      section_id: sectionId || undefined,
      min_support: 0.01,
      min_confidence: 0.05,
      min_lift: 1.0,
    }),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.detail || body?.message || `Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

export async function getAprioriResult(runId) {
  return fetchJSON(`${BASE_URL}/analysis/apriori/${runId}`);
}

export async function getRecommendations(product, startDate, endDate) {
  const params = buildParams({ product, start_date: startDate, end_date: endDate });
  return fetchJSON(`${BASE_URL}/recommendations${params}`);
}

export async function getTransactionSummary(startDate, endDate, departmentId, sectionId) {
  const params = buildParams({
    start_date: startDate,
    end_date: endDate,
    department_id: departmentId,
    section_id: sectionId,
  });
  return fetchJSON(`${BASE_URL}/transactions/summary${params}`);
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
  return fetchJSON(`${BASE_URL}/transactions/baskets${params}`);
}
