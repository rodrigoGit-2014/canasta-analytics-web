import { useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const [form, setForm] = useState({
    companyName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Las contrasenas no coinciden");
      return;
    }
    if (form.password.length < 8) {
      setError("La contrasena debe tener al menos 8 caracteres");
      return;
    }

    setLoading(true);
    try {
      await signup({
        companyName: form.companyName,
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full px-3 py-2.5 bg-[#0f1117] border border-[#1e2433] rounded-lg text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition";

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <BarChart3 size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">Retail Analytics</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#151721] border border-[#1e2433] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-1">Crear Cuenta</h2>
          <p className="text-sm text-slate-500 mb-6">Registra tu empresa para comenzar</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">
                Nombre de la Empresa
              </label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
                required
                className={inputClass}
                placeholder="Mi Supermercado"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">
                Tu Nombre Completo
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                required
                className={inputClass}
                placeholder="Juan Perez"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
                className={inputClass}
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">
                Contrasena
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  required
                  minLength={8}
                  className={`${inputClass} pr-10`}
                  placeholder="Minimo 8 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">
                Confirmar Contrasena
              </label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                required
                className={inputClass}
                placeholder="Repite tu contrasena"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition"
            >
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-4">
          Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
            Inicia sesion
          </Link>
        </p>
      </div>
    </div>
  );
}
