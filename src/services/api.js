const BASE_URL = "/api/v1";

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
  const response = await fetch(`${BASE_URL}/jobs/${jobId}`);

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.detail || body?.message || `Error ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
}
