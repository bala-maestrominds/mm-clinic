import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../utils/auth";

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setIsSubmitting(true);

    // Simulated network delay so the button state feels real rather than instant.
    setTimeout(() => {
      const success = loginAdmin(username.trim(), password);
      setIsSubmitting(false);

      if (success) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError("Invalid username or password. Please try again.");
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-sans flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient background accents, consistent with the dashboard's teal palette */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      {/* Explicitly fixed width structure avoiding core configuration conflicts */}
      <div className="relative z-10 w-full max-w-[440px]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-on-primary shadow-[0px_8px_20px_rgba(15,118,110,0.25)] mb-4">
            <span className="material-symbols-outlined text-[28px]">medical_services</span>
          </div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">PureDent Admin</h1>
          <p className="text-on-surface-variant mt-1.5">Sign in to manage your clinic</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-primary/5 shadow-[0px_10px_30px_rgba(15,118,110,0.08)] rounded-3xl p-8">
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="space-y-1.5">
              <label htmlFor="username" className="block text-sm font-semibold text-on-surface-variant">
                Username
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                  person
                </span>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-semibold text-on-surface-variant">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="w-full h-12 pl-10 pr-10 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-error-container/20 border border-error/10 text-error rounded-xl px-4 py-3 text-sm">
                <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold shadow-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:active:scale-100 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-on-primary/40 border-t-on-primary rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-on-surface-variant text-sm mt-6">
          © 2026 PureDent Clinic Management. Authorized personnel only.
        </p>
      </div>
    </div>
  );
}