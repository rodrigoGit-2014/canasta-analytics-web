import { useState, useEffect } from "react";
import { X, Eye, EyeOff, BarChart3, ArrowLeft, Sparkles } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthSlidePanel({ isOpen, onClose, initialMode = "login" }) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup state
  const [signupForm, setSignupForm] = useState({
    companyName: "",
    currency: "CLP",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setMode(initialMode);
    setError("");
  }, [initialMode, isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  function updateSignup(field, value) {
    setSignupForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Las contrasenas no coinciden");
      return;
    }
    if (signupForm.password.length < 8) {
      setError("La contrasena debe tener al menos 8 caracteres");
      return;
    }
    setLoading(true);
    try {
      await signup({
        companyName: signupForm.companyName,
        currency: signupForm.currency,
        fullName: signupForm.fullName,
        email: signupForm.email,
        password: signupForm.password,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function switchMode(newMode) {
    setMode(newMode);
    setError("");
    setShowPassword(false);
  }

  const inputClass =
    "w-full px-3.5 py-2.5 bg-[#0a0b0f] border border-[#1e2433] rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200";

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 ${
          isOpen
            ? "bg-black/50 backdrop-blur-sm pointer-events-auto"
            : "bg-transparent backdrop-blur-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Slide panel */}
      <div
        className={`fixed top-0 right-0 h-full z-[70] w-full sm:w-[440px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full bg-[#0d0e14] border-l border-[#1e2433] flex flex-col overflow-y-auto">
          {/* Panel header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e2433]/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <BarChart3 size={14} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-white">Descubre Patrones</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#1e2433] transition"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center px-8 py-10">
            {mode === "login" ? (
              /* ─── LOGIN ─── */
              <div className="animate-fade-in-up">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Bienvenido de vuelta</h2>
                  <p className="text-sm text-slate-500">Ingresa tus credenciales para acceder a tu cuenta</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={inputClass}
                      placeholder="tu@email.com"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Contrasena</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={`${inputClass} pr-10`}
                        placeholder="Tu contrasena"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 text-sm text-red-400 bg-red-500/8 border border-red-500/15 rounded-xl px-3.5 py-2.5">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 mt-2"
                  >
                    {loading ? "Ingresando..." : "Iniciar Sesion"}
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-[#1e2433]/50 text-center">
                  <p className="text-sm text-slate-600">
                    No tienes cuenta?{" "}
                    <button
                      onClick={() => switchMode("signup")}
                      className="text-blue-400 hover:text-blue-300 font-medium transition"
                    >
                      Crea una gratis
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              /* ─── SIGNUP ─── */
              <div className="animate-fade-in-up">
                <div className="mb-6">
                  <button
                    onClick={() => switchMode("login")}
                    className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition mb-4"
                  >
                    <ArrowLeft size={12} /> Volver a login
                  </button>
                  <h2 className="text-2xl font-bold text-white mb-2">Crea tu cuenta</h2>
                  <p className="text-sm text-slate-500">Registra tu empresa y comienza a descubrir patrones</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Nombre de la Empresa</label>
                    <input
                      type="text"
                      value={signupForm.companyName}
                      onChange={(e) => updateSignup("companyName", e.target.value)}
                      required
                      className={inputClass}
                      placeholder="Mi Supermercado"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Moneda</label>
                    <div className="flex gap-2">
                      {[
                        { value: "CLP", label: "CLP", flag: "🇨🇱", desc: "Peso Chileno" },
                        { value: "USD", label: "USD", flag: "🇺🇸", desc: "Dolar US" },
                      ].map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => updateSignup("currency", c.value)}
                          className={`flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-sm transition-all duration-200 ${
                            signupForm.currency === c.value
                              ? "border-blue-500/40 bg-blue-500/10 text-white"
                              : "border-[#1e2433] bg-[#0a0b0f] text-slate-500 hover:border-slate-600"
                          }`}
                        >
                          <span className="text-base">{c.flag}</span>
                          <div className="text-left">
                            <span className="block text-xs font-semibold">{c.label}</span>
                            <span className="block text-[10px] text-slate-600">{c.desc}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Tu Nombre</label>
                    <input
                      type="text"
                      value={signupForm.fullName}
                      onChange={(e) => updateSignup("fullName", e.target.value)}
                      required
                      className={inputClass}
                      placeholder="Juan Perez"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      value={signupForm.email}
                      onChange={(e) => updateSignup("email", e.target.value)}
                      required
                      className={inputClass}
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Contrasena</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={signupForm.password}
                        onChange={(e) => updateSignup("password", e.target.value)}
                        required
                        minLength={8}
                        className={`${inputClass} pr-10`}
                        placeholder="Minimo 8 caracteres"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Confirmar Contrasena</label>
                    <input
                      type="password"
                      value={signupForm.confirmPassword}
                      onChange={(e) => updateSignup("confirmPassword", e.target.value)}
                      required
                      className={inputClass}
                      placeholder="Repite tu contrasena"
                    />
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 text-sm text-red-400 bg-red-500/8 border border-red-500/15 rounded-xl px-3.5 py-2.5">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 mt-1"
                  >
                    {loading ? "Creando cuenta..." : "Crear Cuenta Gratis"}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-xs text-slate-600">
                    Al registrarte aceptas nuestros terminos de servicio
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom accent */}
          <div className="px-8 pb-6">
            <div className="flex items-center gap-2 justify-center text-slate-700">
              <Sparkles size={12} />
              <span className="text-[10px]">Potenciado por Inteligencia Artificial</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
