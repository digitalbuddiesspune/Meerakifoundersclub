import { useRef, useState } from "react";

function EditIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 21h6" />
      <path d="M14.5 4.5 19.5 9.5" />
      <path d="M12 7 5 14v5h5l7-7a1.8 1.8 0 0 0 0-2.5l-2.5-2.5A1.8 1.8 0 0 0 12 7Z" />
    </svg>
  );
}

function TrashIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 6h18" />
      <path d="M8 6V4.8A1.8 1.8 0 0 1 9.8 3h4.4A1.8 1.8 0 0 1 16 4.8V6" />
      <path d="m8.5 10 .5 8m6-8-.5 8M6.5 6l1 14a2 2 0 0 0 2 1.8h5a2 2 0 0 0 2-1.8l1-14" />
    </svg>
  );
}

const initialForm = { technology: "", order: "" };

function PartnerListPage({
  partnerListLoading,
  partnerListError,
  partnerList,
  partnerListMessage,
  onAddPartner,
  onUpdatePartner,
  onDeletePartner,
}) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenAdd = () => {
    setForm(initialForm);
    setEditingId("");
    setShowForm(true);
  };

  const handleEdit = (partner) => {
    setForm({ technology: partner.technology, order: String(partner.order) });
    setEditingId(partner._id);
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleCancel = () => {
    setShowForm(false);
    setForm(initialForm);
    setEditingId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (editingId) {
      await onUpdatePartner(editingId, form);
    } else {
      await onAddPartner(form);
    }
    setIsSubmitting(false);
    setShowForm(false);
    setForm(initialForm);
    setEditingId("");
  };

  const handleDelete = async (partner) => {
    const confirmed = window.confirm(`Delete "${partner.technology}"?`);
    if (!confirmed) return;
    await onDeletePartner(partner._id);
  };

  return (
    <section className="grid gap-5">
      <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="m-0 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-300">Management</p>
            <h3 className="mt-1 text-2xl font-bold text-white">Partner List</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">Manage the technologies shown in the partner list section.</p>
          </div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="shrink-0 rounded-2xl border border-[#F0B429]/40 bg-[#F0B429]/10 px-5 py-2.5 text-sm font-bold text-[#F0B429] transition hover:bg-[#F0B429]/20"
          >
            + Add New Partner
          </button>
        </div>
      </div>

      {partnerListMessage ? (
        <p className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200">{partnerListMessage}</p>
      ) : null}

      {showForm && (
        <div ref={formRef} className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-[22px]">
          <h4 className="mb-4 text-lg font-semibold text-white">{editingId ? "Edit Partner" : "Add New Partner"}</h4>
          <form className="grid gap-3.5 md:grid-cols-2" onSubmit={handleSubmit}>
            <input
              className="w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20"
              name="technology"
              placeholder="Technology name"
              value={form.technology}
              onChange={handleChange}
              required
            />
            <input
              className="w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20"
              name="order"
              type="number"
              min="0"
              placeholder="Order (e.g. 1)"
              value={form.order}
              onChange={handleChange}
              required
            />
            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-2xl bg-[#F0B429] px-6 py-2.5 text-sm font-bold text-[#070f26] transition hover:bg-[#e0a820] disabled:opacity-60"
              >
                {isSubmitting ? "Saving..." : editingId ? "Update Partner" : "Add Partner"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-2xl border border-[#F0B429]/30 bg-white/5 px-6 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {partnerListLoading ? (
        <p className="text-sm text-slate-300">Loading partner list...</p>
      ) : partnerListError ? (
        <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200">{partnerListError}. Check backend server and API URL.</p>
      ) : partnerList.length === 0 ? (
        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-7">
          <h4 className="m-0 text-lg font-semibold text-white">No partners found</h4>
          <p className="mt-2 text-sm text-slate-300">Start adding partners to fill this section.</p>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search by technology name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-[#F0B429]/30 bg-[#0d214d] px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20"
          />
          <div className="overflow-x-auto rounded-[18px] border border-[#F0B429]/30 bg-[#0d214d]">
            <div className="min-w-[500px]">
              <div className="grid grid-cols-[1fr_80px_160px] border-b border-[#F0B429]/30 bg-[#142e62] px-3.5 py-3">
                <span className="text-xs font-extrabold uppercase text-[#F0B429]">Technology</span>
                <span className="text-xs font-extrabold uppercase text-[#F0B429]">Order</span>
                <span className="text-center text-xs font-extrabold uppercase text-[#F0B429]">Actions</span>
              </div>
              {partnerList
                .filter((partner) => partner.technology.toLowerCase().includes(search.toLowerCase()))
                .map((partner) => (
                  <div
                    key={partner._id}
                    className="grid grid-cols-[1fr_80px_160px] border-b border-[#F0B429]/20 px-3.5 py-3 last:border-b-0"
                  >
                    <span className="self-center text-sm font-medium text-slate-100">{partner.technology}</span>
                    <span className="self-center text-sm text-slate-300">{partner.order}</span>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        aria-label={`Edit ${partner.technology}`}
                        onClick={() => handleEdit(partner)}
                        className="flex items-center gap-1.5 rounded-xl border border-sky-400/30 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-300 transition hover:bg-sky-500/20"
                      >
                        <EditIcon className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${partner.technology}`}
                        onClick={() => handleDelete(partner)}
                        className="flex items-center gap-1.5 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
                      >
                        <TrashIcon className="h-3.5 w-3.5" />
                        Delete
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

export default PartnerListPage;
