import { useState, useEffect, useRef, useCallback } from "react";
import { getJobStatus } from "../services/api";

const TERMINAL_STATUSES = ["completed", "failed"];

export default function useJobPolling(jobId, { intervalMs = 3000, enabled = true } = {}) {
  const [job, setJob] = useState(null);
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
    if (!jobId || !enabled) {
      stopPolling();
      return;
    }

    let cancelled = false;

    const poll = async () => {
      if (inFlightRef.current) return;
      inFlightRef.current = true;

      try {
        const data = await getJobStatus(jobId);
        if (cancelled) return;

        setJob(data);
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

    // Initial fetch immediately
    setIsPolling(true);
    setError(null);
    poll();

    intervalRef.current = setInterval(poll, intervalMs);

    return () => {
      cancelled = true;
      stopPolling();
    };
  }, [jobId, enabled, intervalMs, stopPolling]);

  return { job, error, isPolling };
}
