import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 21h6" /><path d="M14.5 4.5 19.5 9.5" />
      <path d="M12 7 5 14v5h5l7-7a1.8 1.8 0 0 0 0-2.5l-2.5-2.5A1.8 1.8 0 0 0 12 7Z" />
    </svg>
  );
}

function TrashIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 6h18" /><path d="M8 6V4.8A1.8 1.8 0 0 1 9.8 3h4.4A1.8 1.8 0 0 1 16 4.8V6" />
      <path d="m8.5 10 .5 8m6-8-.5 8M6.5 6l1 14a2 2 0 0 0 2 1.8h5a2 2 0 0 0 2-1.8l1-14" />
    </svg>
  );
}

function MembershipsPage({ membershipsLoading, membershipsError, memberships, membershipMessage, onDeleteMembership }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleDelete = async (membership) => {
    const confirmed = window.confirm(`Delete "${membership.planName}"?`);
    if (!confirmed) return;
    await onDeleteMembership(membership._id);
  };

  const filtered = memberships.filter((m) =>
    m.planName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="grid gap-5">
      <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="m-0 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-300">Management</p>
            <h3 className="mt-1 text-2xl font-bold text-white">Memberships</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">Manage all membership plans.</p>
          </div>
         
        </div>
      </div>

      {membershipMessage ? (
        <p className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200">{membershipMessage}</p>
      ) : null}

      {membershipsLoading ? (
        <p className="text-sm text-slate-300">Loading memberships...</p>
      ) : membershipsError ? (
        <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200">{membershipsError}. Check backend server and API URL.</p>
      ) : memberships.length === 0 ? (
        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-7">
          <h4 className="m-0 text-lg font-semibold text-white">No memberships found</h4>
          <p className="mt-2 text-sm text-slate-300">Start adding memberships to fill this section.</p>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search by plan name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-[#F0B429]/30 bg-[#0d214d] px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20"
          />
          <div className="overflow-x-auto rounded-[18px] border border-[#F0B429]/30 bg-[#0d214d]">
            <div className="min-w-[700px]">
              <div className="grid grid-cols-[180px_80px_100px_130px_1fr_160px] border-b border-[#F0B429]/30 bg-[#142e62] px-3.5 py-3">
                <span className="text-xs font-extrabold uppercase text-[#F0B429]">Plan Name</span>
                <span className="text-xs font-extrabold uppercase text-[#F0B429]">Price</span>
                <span className="text-xs font-extrabold uppercase text-[#F0B429]">Discounted</span>
                <span className="text-xs font-extrabold uppercase text-[#F0B429]">Renewal</span>
                <span className="text-xs font-extrabold uppercase text-[#F0B429]">Features</span>
                <span className="text-center text-xs font-extrabold uppercase text-[#F0B429]">Actions</span>
              </div>
              {filtered.map((membership) => (
                <div key={membership._id} className="grid grid-cols-[180px_80px_100px_130px_1fr_160px] border-b border-[#F0B429]/20 px-3.5 py-3 last:border-b-0">
                  <span className="self-center text-sm font-medium text-slate-100">{membership.planName}</span>
                  <span className="self-center text-sm text-slate-300">{membership.price}</span>
                  <span className="self-center text-sm text-slate-300">{membership.disccountedPrice}</span>
                  <span className="self-center text-sm text-slate-300">{membership.renewal}</span>
                  <span className="self-center text-sm text-slate-300">{Array.isArray(membership.features) ? membership.features.join(", ") : ""}</span>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      aria-label={`Edit ${membership.planName}`}
                      onClick={() => navigate("/admin/memberships/add-membership", { state: { membership } })}
                      className="flex items-center gap-1.5 rounded-xl border border-sky-400/30 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-300 transition hover:bg-sky-500/20"
                    >
                      <EditIcon className="h-3.5 w-3.5" />Edit
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${membership.planName}`}
                      onClick={() => handleDelete(membership)}
                      className="flex items-center gap-1.5 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
                    >
                      <TrashIcon className="h-3.5 w-3.5" />Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default MembershipsPage;
