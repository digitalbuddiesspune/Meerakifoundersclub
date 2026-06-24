import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/apiBaseUrl.js";

const ADMIN_AUTH_STORAGE_KEY = "mfc_admin_auth_user";

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const normalizedEmail = String(email || "").trim().toLowerCase();
    if (!normalizedEmail || !password) {
      setErrorMessage("Enter email and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      const user = result?.user || {};
      if (user.role !== "admin") {
        setErrorMessage("Only admin users can access admin panel.");
        return;
      }

      localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, JSON.stringify(user));
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      setErrorMessage(error.message || "Cannot reach login API.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Admin Login</h1>
        <p className="mb-5 text-sm text-slate-600">Sign in with your admin email and password.</p>

        {errorMessage ? (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {errorMessage}
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-600 focus:border-[#F0B429]/70 focus:outline-none"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pr-16 text-sm text-slate-900 placeholder:text-slate-600 focus:border-[#F0B429]/70 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#F0B429] px-4 py-2 text-sm font-semibold text-[#07112a] transition hover:bg-[#f7c14b] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;
