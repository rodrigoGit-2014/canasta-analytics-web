import { useState, useCallback, useRef } from "react";

const INSIGHTS_API_URL = import.meta.env.VITE_INSIGHTS_API_URL || "/api/v1";
const REQUEST_TIMEOUT_MS = 120_000; // 2 minutes — LLM generation can be slow

export default function useAIInsights() {
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const generateInsights = useCallback(async (params) => {
    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();

    const controller = new AbortController();
    abortRef.current = controller;
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

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
        signal: controller.signal,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.detail || `Error ${response.status}`);
      }

      const data = await response.json();
      // Normalize data to prevent render crashes
      if (data?.data) {
        const d = data.data;
        if (!Array.isArray(d.hallazgos_clave)) d.hallazgos_clave = [];
        if (!Array.isArray(d.oportunidades_cross_selling)) d.oportunidades_cross_selling = [];
        if (!Array.isArray(d.recomendaciones_estrategicas)) d.recomendaciones_estrategicas = [];
        if (!Array.isArray(d.tendencias_detectadas)) d.tendencias_detectadas = [];
        // Sanitize cross-selling entries
        d.oportunidades_cross_selling = d.oportunidades_cross_selling.map((opp) => ({
          ...opp,
          combinacion: Array.isArray(opp.combinacion) ? opp.combinacion : [],
          confidence: typeof opp.confidence === "number" ? opp.confidence : null,
          lift: typeof opp.lift === "number" ? opp.lift : null,
          recomendacion_accion: opp.recomendacion_accion || "",
        }));
      }
      setInsights(data);
      return data;
    } catch (err) {
      if (err.name === "AbortError") {
        setError("La solicitud tardo demasiado. Intenta con un rango de fechas mas corto o menos datos.");
      } else {
        setError(err.message || "Error al generar insights");
      }
      return null;
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setInsights(null);
    setError(null);
  }, []);

  return { insights, isLoading, error, generateInsights, reset };
}
