import { useRef, useState } from "react";
import { DeleteActionButton, EditActionButton } from "../components/AdminActionButtons";

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
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="m-0 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600">Management</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-900">Partner List</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">Manage the technologies shown in the partner list section.</p>
          </div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="shrink-0 rounded-2xl border border-slate-200 bg-[#F0B429]/10 px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-[#F0B429]/20"
          >
            + Add New Partner
          </button>
        </div>
      </div>

      {partnerListMessage ? (
        <p className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700">{partnerListMessage}</p>
      ) : null}

      {showForm && (
        <div ref={formRef} className="rounded-3xl border border-slate-200 bg-white p-[22px]">
          <h4 className="mb-4 text-lg font-semibold text-slate-900">{editingId ? "Edit Partner" : "Add New Partner"}</h4>
          <form className="grid gap-3.5 md:grid-cols-2" onSubmit={handleSubmit}>
            <input
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20"
              name="technology"
              placeholder="Technology name"
              value={form.technology}
              onChange={handleChange}
              required
            />
            <input
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20"
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
                className="rounded-2xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {partnerListLoading ? (
        <p className="text-sm text-slate-600">Loading partner list...</p>
      ) : partnerListError ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{partnerListError}. Check backend server and API URL.</p>
      ) : partnerList.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-7">
          <h4 className="m-0 text-lg font-semibold text-slate-900">No partners found</h4>
          <p className="mt-2 text-sm text-slate-600">Start adding partners to fill this section.</p>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search by technology name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20"
          />
          <div className="overflow-x-auto rounded-[18px] border border-slate-200 bg-white">
            <div className="min-w-[500px]">
              <div className="grid grid-cols-[1fr_80px_160px] border-b border-slate-200 bg-slate-100 px-3.5 py-3">
                <span className="text-xs font-extrabold uppercase text-slate-900">Technology</span>
                <span className="text-xs font-extrabold uppercase text-slate-900">Order</span>
                <span className="text-center text-xs font-extrabold uppercase text-slate-900">Actions</span>
              </div>
              {partnerList
                .filter((partner) => partner.technology.toLowerCase().includes(search.toLowerCase()))
                .map((partner) => (
                  <div
                    key={partner._id}
                    className="grid grid-cols-[1fr_80px_160px] border-b border-slate-200 px-3.5 py-3 last:border-b-0"
                  >
                    <span className="self-center text-sm font-medium text-slate-900">{partner.technology}</span>
                    <span className="self-center text-sm text-slate-600">{partner.order}</span>
                    <div className="flex items-center justify-center gap-2">
                      <EditActionButton
                        aria-label={`Edit ${partner.technology}`}
                        onClick={() => handleEdit(partner)}
                      />
                      <DeleteActionButton
                        aria-label={`Delete ${partner.technology}`}
                        onClick={() => handleDelete(partner)}
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

export default PartnerListPage;
