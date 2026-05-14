import { useEffect, useState } from "react";

import { API_BASE_URL } from "../config/apiBaseUrl.js";
const ADMIN_AUTH_STORAGE_KEY = "mfc_admin_auth_user";

const initialForm = {
  username: "",
  email: "",
  phone: "",
  plan: "",
  status: "",
  role: "",
};

function AdminAccountPage() {
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [savedProfile, setSavedProfile] = useState(initialForm);

  const adminUser = (() => {
    try {
      return JSON.parse(localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) || "null");
    } catch {
      return null;
    }
  })();

  const adminId = adminUser?._id || "";

  useEffect(() => {
    const loadAdminProfile = async () => {
      if (!adminId) {
        setMessage("Admin session not found.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setMessage("");
      try {
        const response = await fetch(`${API_BASE_URL}/get-user/${adminId}`);
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(result.message || "Failed to load admin profile.");
        }

        setForm({
          username: result?.username || "",
          email: result?.email || "",
          phone: result?.phone || "",
          plan: result?.plan || "",
          status: result?.status || "inactive",
          role: result?.role || "user",
        });
        setSavedProfile({
          username: result?.username || "",
          email: result?.email || "",
          phone: result?.phone || "",
          plan: result?.plan || "",
          status: result?.status || "inactive",
          role: result?.role || "user",
        });
      } catch (error) {
        setMessage(error.message || "Failed to load admin profile.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAdminProfile();
  }, [adminId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!adminId) {
      setMessage("Admin session not found.");
      return;
    }

    setIsSaving(true);
    setMessage("");
    try {
      const payload = {
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
      };

      const response = await fetch(`${API_BASE_URL}/update-user/${adminId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.message || "Failed to update profile.");
      }

      const updatedUser = result?.user || {};
      const mergedAuthUser = {
        ...adminUser,
        username: updatedUser.username || payload.username,
        email: updatedUser.email || payload.email,
        phone: updatedUser.phone || payload.phone,
      };
      localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, JSON.stringify(mergedAuthUser));

      setForm((prev) => ({
        ...prev,
        username: updatedUser.username || payload.username,
        email: updatedUser.email || payload.email,
        phone: updatedUser.phone || payload.phone,
      }));
      setSavedProfile((prev) => ({
        ...prev,
        username: updatedUser.username || payload.username,
        email: updatedUser.email || payload.email,
        phone: updatedUser.phone || payload.phone,
      }));
      setIsEditing(false);
      setMessage("Admin profile updated successfully.");
    } catch (error) {
      setMessage(error.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-3xl rounded-2xl border border-[#F0B429]/25 bg-[#0d1f4d] p-5 shadow-xl md:p-7">
      <h1 className="text-2xl font-bold text-white">Admin Account Settings</h1>
      <p className="mt-2 text-sm text-slate-300">
        Update your admin profile details here.
      </p>

      {message ? (
        <p className="mt-4 rounded-lg border border-[#F0B429]/30 bg-[#142e62] px-3 py-2 text-sm text-slate-100">
          {message}
        </p>
      ) : null}

      {isLoading ? (
        <p className="mt-5 text-sm text-slate-300">Loading profile...</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="grid gap-1 text-sm text-slate-300">
            Name
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleInputChange}
              className={`rounded-lg border px-3 py-2 text-white outline-none ${
                isEditing
                  ? "border-[#F0B429]/25 bg-[#102a60] focus:border-[#F0B429]/60"
                  : "border-[#F0B429]/15 bg-[#0f234f] text-slate-300"
              }`}
              disabled={!isEditing}
              required
            />
          </label>

          <label className="grid gap-1 text-sm text-slate-300">
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className={`rounded-lg border px-3 py-2 text-white outline-none ${
                isEditing
                  ? "border-[#F0B429]/25 bg-[#102a60] focus:border-[#F0B429]/60"
                  : "border-[#F0B429]/15 bg-[#0f234f] text-slate-300"
              }`}
              disabled={!isEditing}
              required
            />
          </label>

          <label className="grid gap-1 text-sm text-slate-300">
            Phone
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              className={`rounded-lg border px-3 py-2 text-white outline-none ${
                isEditing
                  ? "border-[#F0B429]/25 bg-[#102a60] focus:border-[#F0B429]/60"
                  : "border-[#F0B429]/15 bg-[#0f234f] text-slate-300"
              }`}
              disabled={!isEditing}
              required
            />
          </label>

          <label className="grid gap-1 text-sm text-slate-300">
            Role
            <input
              type="text"
              value={form.role || "admin"}
              className="rounded-lg border border-[#F0B429]/15 bg-[#0f234f] px-3 py-2 text-slate-300 outline-none"
              disabled
            />
          </label>

          <label className="grid gap-1 text-sm text-slate-300">
            Status
            <input
              type="text"
              value={form.status || "inactive"}
              className="rounded-lg border border-[#F0B429]/15 bg-[#0f234f] px-3 py-2 text-slate-300 outline-none"
              disabled
            />
          </label>

          <label className="grid gap-1 text-sm text-slate-300">
            Plan
            <input
              type="text"
              value={form.plan || "-"}
              className="rounded-lg border border-[#F0B429]/15 bg-[#0f234f] px-3 py-2 text-slate-300 outline-none"
              disabled
            />
          </label>

          <div className="md:col-span-2">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => {
                  setMessage("");
                  setIsEditing(true);
                }}
                className="rounded-lg bg-[#F0B429] px-5 py-2 text-sm font-semibold text-[#081a3f] transition hover:bg-[#f7c14b]"
              >
                Edit
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-lg bg-[#F0B429] px-5 py-2 text-sm font-semibold text-[#081a3f] transition hover:bg-[#f7c14b] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSaving ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm(savedProfile);
                    setIsEditing(false);
                    setMessage("");
                  }}
                  className="rounded-lg border border-slate-400/40 bg-slate-500/10 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-500/20"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      )}
    </section>
  );
}

export default AdminAccountPage;
