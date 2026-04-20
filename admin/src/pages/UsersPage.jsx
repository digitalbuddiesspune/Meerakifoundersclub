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

function UsersPage({ usersLoading, usersError, usersList, userMessage, onDeleteUser }) {
  const handleDeleteClick = async (user) => {
    const confirmed = window.confirm(`Delete "${user.username}" (${user.email})? This cannot be undone.`);
    if (!confirmed) return;
    await onDeleteUser(user._id);
  };

  return (
    <section className="grid gap-5">
      <div>
        <p className="m-0 inline-flex rounded-full bg-cyan-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-800">
          Users
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Registered users</h1>
        <p className="mt-2 text-sm text-slate-600">Everyone who signed up via the main site. Remove accounts you no longer need.</p>
      </div>

      {userMessage ? (
        <p className="rounded-2xl bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700">{userMessage}</p>
      ) : null}

      {usersLoading ? (
        <p className="text-sm text-slate-500">Loading users...</p>
      ) : usersError ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{usersError}. Check backend server and API URL.</p>
      ) : usersList.length === 0 ? (
        <div className="rounded-3xl border border-slate-200/50 bg-white/90 p-7 shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
          <h4 className="m-0 text-lg font-semibold text-slate-900">No users yet</h4>
          <p className="mt-2 text-sm text-slate-500">Sign-ups from the app will appear here.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200/50 bg-white/95 shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
          <div className="overflow-x-auto">
            <table className="min-w-[640px] w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  <th className="whitespace-nowrap px-5 py-3.5">Name</th>
                  <th className="whitespace-nowrap px-5 py-3.5">Email</th>
                  <th className="whitespace-nowrap px-5 py-3.5">Phone</th>
                  <th className="whitespace-nowrap px-5 py-3.5">Joined</th>
                  <th className="whitespace-nowrap px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-slate-800">
                {usersList.map((user) => (
                  <tr key={user._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/80">
                    <td className="px-5 py-3.5 font-semibold">{user.username || "—"}</td>
                    <td className="max-w-[220px] truncate px-5 py-3.5 text-slate-600">{user.email || "—"}</td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-slate-600">{user.phone || "—"}</td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-slate-500">{formatDate(user.createdAt)}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(user)}
                        className="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
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
