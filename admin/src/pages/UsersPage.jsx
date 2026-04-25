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

function formatPlan(user = {}) {
  const rawPlan = user.plan || user.membershipPlan || user.membership?.plan;
  if (!rawPlan) return "—";
  return String(rawPlan);
}

function UsersPage({ usersLoading, usersError, usersList, userMessage, onDeleteUser }) {
  const handleDeleteClick = async (user) => {
    const confirmed = window.confirm(`Delete "${user.username}" (${user.email})? This cannot be undone.`);
    if (!confirmed) return;
    await onDeleteUser(user._id);
  };

  return (
    <section className="grid gap-5">
      <div>
        <p className="m-0 inline-flex rounded-full bg-[#1c3b79] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-200">
          Users
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#F0B429] md:text-3xl">Registered users</h1>
        <p className="mt-2 text-sm text-slate-300">Everyone who signed up via the main site. Remove accounts you no longer need.</p>
      </div>

      {userMessage ? (
        <p className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200">{userMessage}</p>
      ) : null}

      {usersLoading ? (
        <p className="text-sm text-slate-300">Loading users...</p>
      ) : usersError ? (
        <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200">{usersError}. Check backend server and API URL.</p>
      ) : usersList.length === 0 ? (
        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-7">
          <h4 className="m-0 text-lg font-semibold text-white">No users yet</h4>
          <p className="mt-2 text-sm text-slate-300">Sign-ups from the app will appear here.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-[#F0B429]/30 bg-[#0d214d]">
          <div className="overflow-x-auto">
            <table className="min-w-[640px] w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#F0B429]/30 bg-[#142e62] text-[11px] font-bold uppercase tracking-wide text-[#F0B429]">
                  <th className="whitespace-nowrap px-5 py-3.5">Name</th>
                  <th className="whitespace-nowrap px-5 py-3.5">Email</th>
                  <th className="whitespace-nowrap px-5 py-3.5">Phone</th>
                  <th className="whitespace-nowrap px-5 py-3.5">Plan</th>
                  <th className="whitespace-nowrap px-5 py-3.5">Joined</th>
                  <th className="whitespace-nowrap px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-slate-100">
                {usersList.map((user) => (
                  <tr key={user._id} className="border-b border-[#F0B429]/20 last:border-0 hover:bg-white/5">
                    <td className="px-5 py-3.5 font-semibold">{user.username || "—"}</td>
                    <td className="max-w-[220px] truncate px-5 py-3.5 text-slate-300">{user.email || "—"}</td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-slate-300">{user.phone || "—"}</td>
                    <td className="whitespace-nowrap px-5 py-3.5">
                      <span className="inline-flex rounded-full border border-[#F0B429]/30 bg-[#F0B429]/10 px-2.5 py-1 text-[11px] font-semibold text-[#F0B429]">
                        {formatPlan(user)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-slate-400">{formatDate(user.createdAt)}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(user)}
                        className="rounded-xl border border-red-300/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </td>
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

export default UsersPage;
