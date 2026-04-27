import { useMemo } from "react";

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
        <p className="m-0 inline-flex rounded-full bg-[#1c3b79] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-200">
          Payments
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#F0B429] md:text-3xl">Payment overview</h1>
        <p className="mt-2 text-sm text-slate-300">
          Membership payment status from user plan and account status.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <article className="rounded-2xl border border-[#F0B429]/30 bg-[#0d214d] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total records</p>
          <p className="mt-2 text-2xl font-extrabold text-white">{stats.total}</p>
        </article>
        <article className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-200">Paid</p>
          <p className="mt-2 text-2xl font-extrabold text-emerald-100">{stats.paid}</p>
        </article>
        <article className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-200">Pending</p>
          <p className="mt-2 text-2xl font-extrabold text-amber-100">{stats.pending}</p>
        </article>
      </div>

      {usersLoading ? (
        <p className="text-sm text-slate-300">Loading payment info...</p>
      ) : usersError ? (
        <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200">
          {usersError}. Check backend server and API URL.
        </p>
      ) : paymentRows.length === 0 ? (
        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-7">
          <h4 className="m-0 text-lg font-semibold text-white">No payment records yet</h4>
          <p className="mt-2 text-sm text-slate-300">Payment related user data will appear here.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-[#F0B429]/30 bg-[#0d214d]">
          <div className="overflow-x-auto">
            <table className="min-w-[860px] w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#F0B429]/30 bg-[#142e62] text-[11px] font-bold uppercase tracking-wide text-[#F0B429]">
                  <th className="whitespace-nowrap px-5 py-3.5">User</th>
                  <th className="whitespace-nowrap px-5 py-3.5">Email</th>
                  <th className="whitespace-nowrap px-5 py-3.5">Phone</th>
                  <th className="whitespace-nowrap px-5 py-3.5">Plan</th>
                  <th className="whitespace-nowrap px-5 py-3.5">Payment Status</th>
                  <th className="whitespace-nowrap px-5 py-3.5">Updated</th>
                </tr>
              </thead>
              <tbody className="text-slate-100">
                {paymentRows.map((row) => (
                  <tr key={row._id} className="border-b border-[#F0B429]/20 last:border-0 hover:bg-white/5">
                    <td className="whitespace-nowrap px-5 py-3.5 font-semibold">{row.username || "—"}</td>
                    <td className="max-w-[220px] truncate px-5 py-3.5 text-slate-300">{row.email || "—"}</td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-slate-300">{row.phone || "—"}</td>
                    <td className="whitespace-nowrap px-5 py-3.5">
                      <span className="inline-flex rounded-full border border-[#F0B429]/30 bg-[#F0B429]/10 px-2.5 py-1 text-[11px] font-semibold text-[#F0B429]">
                        {row.plan || "—"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                          row.paymentStatus === "paid"
                            ? "border-emerald-300/40 bg-emerald-500/15 text-emerald-200"
                            : row.paymentStatus === "pending"
                              ? "border-amber-300/40 bg-amber-500/15 text-amber-200"
                              : "border-slate-300/30 bg-slate-400/10 text-slate-300"
                        }`}
                      >
                        {row.paymentStatus}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-slate-400">{formatDate(row.paidAt)}</td>
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
