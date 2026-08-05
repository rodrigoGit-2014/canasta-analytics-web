import { createContext, useContext } from "react";
import useAprioriAnalysis from "../hooks/useAprioriAnalysis";

const InteligenciaContext = createContext(null);

export function InteligenciaProvider({ children }) {
  const analysis = useAprioriAnalysis();
  return (
    <InteligenciaContext.Provider value={analysis}>
      {children}
    </InteligenciaContext.Provider>
  );
}

export function useInteligencia() {
  const ctx = useContext(InteligenciaContext);
  if (!ctx) throw new Error("useInteligencia must be used within InteligenciaProvider");
  return ctx;
}
