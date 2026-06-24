import { useMemo } from "react";
import { STATUS_BADGE_PENDING, STATUS_BADGE_SUCCESS } from "../utils/dashboardData";

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "—";
  }
}

function getPlan(user = {}) {
  return String(user.plan || user.membershipPlan || user.membership?.plan || "").trim();
}

function getPaymentStatus(user = {}) {
  const status = String(user.status || "").trim().toLowerCase();
  if (status === "active") return "paid";
  if (status === "inactive" && getPlan(user)) return "pending";
  return "unpaid";
}

function PaymentsPage({ usersLoading, usersError, usersList }) {
  const paymentRows = useMemo(() => {
    return usersList
      .map((user) => {
        const plan = getPlan(user);
        return {
          ...user,
          plan,
          paymentStatus: getPaymentStatus(user),
          paidAt: user.updatedAt || user.createdAt,
        };
      })
      .filter((user) => user.plan || user.paymentStatus !== "unpaid")
      .sort((a, b) => new Date(b.paidAt || 0).getTime() - new Date(a.paidAt || 0).getTime());
  }, [usersList]);

  const stats = useMemo(() => {
    const total = paymentRows.length;
    const paid = paymentRows.filter((row) => row.paymentStatus === "paid").length;
    const pending = paymentRows.filter((row) => row.paymentStatus === "pending").length;
    return { total, paid, pending };
  }, [paymentRows]);

  return (
    <section className="grid gap-5">
      <div>
        <p className="m-0 inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Payments
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Payment overview</h1>
        <p className="mt-2 text-sm text-slate-600">
          Membership payment status from user plan and account status.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">📋</div>
          <p className="mt-4 text-sm font-medium text-slate-500">Total records</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{stats.total}</p>
        </article>
        <article className="rounded-2xl bg-emerald-600 p-5 text-white shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg">✓</div>
          <p className="mt-4 text-sm font-medium text-white/90">Paid</p>
          <p className="mt-1 text-3xl font-bold">{stats.paid}</p>
        </article>
        <article className="rounded-2xl bg-orange-500 p-5 text-white shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg">⏱</div>
          <p className="mt-4 text-sm font-medium text-white/90">Pending</p>
          <p className="mt-1 text-3xl font-bold">{stats.pending}</p>
        </article>
      </div>

      {usersLoading ? (
        <p className="text-sm text-slate-600">Loading payment info...</p>
      ) : usersError ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {usersError}. Check backend server and API URL.
        </p>
      ) : paymentRows.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-7">
          <h4 className="m-0 text-lg font-semibold text-slate-900">No payment records yet</h4>
          <p className="mt-2 text-sm text-slate-600">Payment related user data will appear here.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-[860px] w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100 text-[11px] font-bold uppercase tracking-wide text-slate-900">
                  <th className="whitespace-nowrap px-5 py-3.5">User</th>
                  <th className="whitespace-nowrap px-5 py-3.5">Email</th>
                  <th className="whitespace-nowrap px-5 py-3.5">Phone</th>
                  <th className="whitespace-nowrap px-5 py-3.5">Plan</th>
                  <th className="whitespace-nowrap px-5 py-3.5">Payment Status</th>
                  <th className="whitespace-nowrap px-5 py-3.5">Updated</th>
                </tr>
              </thead>
              <tbody className="text-slate-900">
                {paymentRows.map((row) => (
                  <tr key={row._id} className="border-b border-slate-200 last:border-0 hover:bg-slate-100">
                    <td className="whitespace-nowrap px-5 py-3.5 font-semibold">{row.username || "—"}</td>
                    <td className="max-w-[220px] truncate px-5 py-3.5 text-slate-600">{row.email || "—"}</td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-slate-600">{row.phone || "—"}</td>
                    <td className="whitespace-nowrap px-5 py-3.5">
                      <span className="inline-flex rounded-full border border-slate-200 bg-[#F0B429]/10 px-2.5 py-1 text-[11px] font-semibold text-slate-900">
                        {row.plan || "—"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                          row.paymentStatus === "paid"
                            ? STATUS_BADGE_SUCCESS
                            : row.paymentStatus === "pending"
                              ? STATUS_BADGE_PENDING
                              : "border-slate-300 bg-slate-100 text-slate-700"
                        }`}
                      >
                        {row.paymentStatus}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-slate-500">{formatDate(row.paidAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default PaymentsPage;
