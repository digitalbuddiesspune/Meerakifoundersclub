import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteActionButton, EditActionButton } from "../components/AdminActionButtons";

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
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="m-0 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600">Management</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-900">Memberships</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">Manage all membership plans.</p>
          </div>
         
        </div>
      </div>

      {membershipMessage ? (
        <p className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700">{membershipMessage}</p>
      ) : null}

      {membershipsLoading ? (
        <p className="text-sm text-slate-600">Loading memberships...</p>
      ) : membershipsError ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{membershipsError}. Check backend server and API URL.</p>
      ) : memberships.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-7">
          <h4 className="m-0 text-lg font-semibold text-slate-900">No memberships found</h4>
          <p className="mt-2 text-sm text-slate-600">Start adding memberships to fill this section.</p>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search by plan name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20"
          />
          <div className="overflow-x-auto rounded-[18px] border border-slate-200 bg-white">
            <div className="min-w-[700px]">
              <div className="grid grid-cols-[180px_80px_100px_130px_1fr_160px] border-b border-slate-200 bg-slate-100 px-3.5 py-3">
                <span className="text-xs font-extrabold uppercase text-slate-900">Plan Name</span>
                <span className="text-xs font-extrabold uppercase text-slate-900">Price</span>
                <span className="text-xs font-extrabold uppercase text-slate-900">Discounted</span>
                <span className="text-xs font-extrabold uppercase text-slate-900">Renewal</span>
                <span className="text-xs font-extrabold uppercase text-slate-900">Features</span>
                <span className="text-center text-xs font-extrabold uppercase text-slate-900">Actions</span>
              </div>
              {filtered.map((membership) => (
                <div key={membership._id} className="grid grid-cols-[180px_80px_100px_130px_1fr_160px] border-b border-slate-200 px-3.5 py-3 last:border-b-0">
                  <span className="self-center text-sm font-medium text-slate-900">{membership.planName}</span>
                  <span className="self-center text-sm text-slate-600">{membership.price}</span>
                  <span className="self-center text-sm text-slate-600">{membership.disccountedPrice}</span>
                  <span className="self-center text-sm text-slate-600">{membership.renewal}</span>
                  <span className="self-center text-sm text-slate-600">{Array.isArray(membership.features) ? membership.features.join(", ") : ""}</span>
                  <div className="flex items-center justify-center gap-2">
                    <EditActionButton
                      aria-label={`Edit ${membership.planName}`}
                      onClick={() => navigate("/admin/memberships/add-membership", { state: { membership } })}
                    />
                    <DeleteActionButton
                      aria-label={`Delete ${membership.planName}`}
                      onClick={() => handleDelete(membership)}
                    />
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
