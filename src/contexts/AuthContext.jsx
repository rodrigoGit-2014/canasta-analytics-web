import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  signupUser,
  refreshAccessToken,
  logoutUser,
} from "../services/authApi";

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("auth_access_token");
    const storedUser = localStorage.getItem("auth_user");
    const storedCompany = localStorage.getItem("auth_company");

    if (token && storedUser && storedCompany) {
      try {
        setUser(JSON.parse(storedUser));
        setCompany(JSON.parse(storedCompany));
      } catch {
        clearStorage();
      }
    }
    setIsLoading(false);
  }, []);

  function clearStorage() {
    localStorage.removeItem("auth_access_token");
    localStorage.removeItem("auth_refresh_token");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_company");
  }

  function persistAuth(data) {
    localStorage.setItem("auth_access_token", data.access_token);
    localStorage.setItem("auth_refresh_token", data.refresh_token);
    localStorage.setItem("auth_user", JSON.stringify(data.user));
    localStorage.setItem("auth_company", JSON.stringify(data.company));
    setUser(data.user);
    setCompany(data.company);
  }

  const login = useCallback(async (email, password) => {
    const data = await loginUser(email, password);
    persistAuth(data);
    navigate("/analytics-overview", { replace: true });
  }, [navigate]);

  const signup = useCallback(async ({ companyName, email, password, fullName }) => {
    const data = await signupUser({ companyName, email, password, fullName });
    persistAuth(data);
    navigate("/analytics-overview", { replace: true });
  }, [navigate]);

  const logout = useCallback(() => {
    const refreshToken = localStorage.getItem("auth_refresh_token");
    if (refreshToken) logoutUser(refreshToken);
    clearStorage();
    setUser(null);
    setCompany(null);
    navigate("/", { replace: true });
  }, [navigate]);

  const refresh = useCallback(async () => {
    const refreshToken = localStorage.getItem("auth_refresh_token");
    if (!refreshToken) {
      logout();
      return null;
    }
    try {
      const data = await refreshAccessToken(refreshToken);
      localStorage.setItem("auth_access_token", data.access_token);
      localStorage.setItem("auth_refresh_token", data.refresh_token);
      return data.access_token;
    } catch {
      logout();
      return null;
    }
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{ user, company, isAuthenticated, isLoading, login, signup, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}
