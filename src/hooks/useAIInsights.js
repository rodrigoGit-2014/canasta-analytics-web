import { useState, useCallback } from "react";

const INSIGHTS_API_URL = import.meta.env.VITE_INSIGHTS_API_URL || "/api/v1";

export default function useAIInsights() {
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateInsights = useCallback(async (params) => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("auth_access_token");

    try {
      const response = await fetch(`${INSIGHTS_API_URL}/insights/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.detail || `Error ${response.status}`);
      }

      const data = await response.json();
      setInsights(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setInsights(null);
    setError(null);
  }, []);

  return { insights, isLoading, error, generateInsights, reset };
}
