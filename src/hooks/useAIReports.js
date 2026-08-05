import { useState, useCallback, useRef } from "react";

const INSIGHTS_API_URL = import.meta.env.VITE_INSIGHTS_API_URL || "/api/v1";

export default function useAIReports() {
  const [job, setJob] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const pollRef = useRef(null);

  const requestReport = useCallback(async (params) => {
    setIsGenerating(true);
    setError(null);
    setJob(null);
    const token = localStorage.getItem("auth_access_token");

    try {
      const response = await fetch(`${INSIGHTS_API_URL}/reports/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      setJob(data);

      // Start polling
      pollRef.current = setInterval(async () => {
        try {
          const statusRes = await fetch(
            `${INSIGHTS_API_URL}/reports/${data.job_id}/status`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const statusData = await statusRes.json();
          setJob(statusData);
          if (statusData.status === "completed" || statusData.status === "failed") {
            clearInterval(pollRef.current);
            setIsGenerating(false);
            if (statusData.status === "completed") {
              // Auto-download
              const downloadUrl = `${INSIGHTS_API_URL}/reports/${data.job_id}/download`;
              const dlRes = await fetch(downloadUrl, {
                headers: { Authorization: `Bearer ${token}` },
              });
              const blob = await dlRes.blob();
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `reporte.${params.format || "pdf"}`;
              a.click();
              URL.revokeObjectURL(url);
            }
          }
        } catch {
          // continue polling
        }
      }, 3000);
    } catch (err) {
      setError(err.message);
      setIsGenerating(false);
    }
  }, []);

  const reset = useCallback(() => {
    if (pollRef.current) clearInterval(pollRef.current);
    setJob(null);
    setError(null);
    setIsGenerating(false);
  }, []);

  return { job, isGenerating, error, requestReport, reset };
}
