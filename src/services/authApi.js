const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || "/api/v1";

export async function loginUser(email, password) {
  const response = await fetch(`${AUTH_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.detail || "Error al iniciar sesion");
  }

  return response.json();
}

export async function signupUser({ companyName, email, password, fullName }) {
  const response = await fetch(`${AUTH_API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      company_name: companyName,
      email,
      password,
      full_name: fullName,
    }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.detail || "Error al registrar la cuenta");
  }

  return response.json();
}

export async function refreshAccessToken(refreshToken) {
  const response = await fetch(`${AUTH_API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error("No se pudo renovar la sesion");
  }

  return response.json();
}

export async function logoutUser(refreshToken) {
  const token = localStorage.getItem("auth_access_token");
  try {
    await fetch(`${AUTH_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  } catch {
    // Fire-and-forget
  }
}

export async function fetchMe(token) {
  const response = await fetch(`${AUTH_API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Token invalido");
  }

  return response.json();
}
