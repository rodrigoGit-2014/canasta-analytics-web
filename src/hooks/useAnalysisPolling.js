import { useState, useEffect, useRef, useCallback } from "react";
import { getAnalysisRunStatus } from "../services/api";

const TERMINAL_STATUSES = ["completed", "failed"];

export default function useAnalysisPolling(runId, { intervalMs = 3000, enabled = true } = {}) {
  const [run, setRun] = useState(null);
  const [error, setError] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const inFlightRef = useRef(false);
  const intervalRef = useRef(null);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPolling(false);
  }, []);

  useEffect(() => {
    if (!runId || !enabled) {
      stopPolling();
      return;
    }

    let cancelled = false;

    const poll = async () => {
      if (inFlightRef.current) return;
      inFlightRef.current = true;

      try {
        const data = await getAnalysisRunStatus(runId);
        if (cancelled) return;

        setRun(data);
        setError(null);

        if (TERMINAL_STATUSES.includes(data.status)) {
          stopPolling();
        }
      } catch (err) {
        if (cancelled) return;
        setError(err.message);
        stopPolling();
      } finally {
        inFlightRef.current = false;
      }
    };

    setIsPolling(true);
    setError(null);
    poll();

    intervalRef.current = setInterval(poll, intervalMs);

    return () => {
      cancelled = true;
      stopPolling();
    };
  }, [runId, enabled, intervalMs, stopPolling]);

  return { run, error, isPolling };
}
