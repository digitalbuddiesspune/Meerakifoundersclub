import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ADMIN_AUTH_STORAGE_KEY = "mfc_admin_auth_user";

function AdminLoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const normalizedIdentifier = String(identifier || "").trim().toLowerCase();
    if (!normalizedIdentifier) {
      setErrorMessage("Enter email or phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: normalizedIdentifier }),
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
    <div className="flex min-h-screen items-center justify-center bg-[#070f26] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#F0B429]/30 bg-[#0b1b43] p-6 shadow-2xl">
        <h1 className="mb-2 text-2xl font-bold text-white">Admin Login</h1>
        <p className="mb-5 text-sm text-slate-300">Login using the same user API (admin role required).</p>

        {errorMessage ? (
          <p className="mb-4 rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {errorMessage}
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder="Email or Phone Number"
            className="w-full rounded-lg border border-[#F0B429]/30 bg-[#102a60] px-3 py-2 text-sm text-white placeholder:text-slate-300 focus:border-[#F0B429]/70 focus:outline-none"
            required
          />
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
