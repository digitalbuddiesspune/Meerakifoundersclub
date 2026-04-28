import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const initialForm = { planName: "", price: "", disccountedPrice: "", renewal: "", features: [""] };

const inputCls = "w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20";

function AddMembershipPage({ membershipMessage, onAddMembership, onUpdateMembership }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const m = location.state?.membership;
    if (m?._id) {
      setEditingId(m._id);
      setForm({
        planName: m.planName || "",
        price: m.price ?? "",
        disccountedPrice: m.disccountedPrice ?? "",
        renewal: m.renewal || "",
        features: Array.isArray(m.features) && m.features.length ? [...m.features] : [""],
      });
    } else {
      setEditingId("");
      setForm(initialForm);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addFeature = () => setForm((prev) => ({ ...prev, features: [...prev.features, ""] }));
  const updateFeature = (i, val) => setForm((prev) => { const arr = [...prev.features]; arr[i] = val; return { ...prev, features: arr }; });
  const removeFeature = (i) => setForm((prev) => ({ ...prev, features: prev.features.filter((_, idx) => idx !== i) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      planName: form.planName.trim(),
      price: Number(form.price),
      disccountedPrice: Number(form.disccountedPrice),
      renewal: form.renewal.trim(),
      features: form.features.filter(Boolean),
    };
    if (editingId) {
      await onUpdateMembership(editingId, payload);
      navigate("/admin/memberships");
    } else {
      await onAddMembership(payload);
      setForm(initialForm);
      setEditingId("");
    }
    setIsSubmitting(false);
  };

  return (
    <section className="grid gap-5">
      <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="m-0 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-300">Management</p>
            <h3 className="mt-1 text-2xl font-bold text-white">{editingId ? "Edit Membership" : "Add Membership"}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{editingId ? "Update membership plan details." : "Create a new membership plan."}</p>
          </div>
        </div>
      </div>

      {membershipMessage ? (
        <p className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200">{membershipMessage}</p>
      ) : null}

      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-[22px]">
          <h4 className="mb-4 text-base font-semibold text-white">Plan Details</h4>
          <div className="grid gap-3.5 md:grid-cols-2">
            <input className={inputCls} name="planName" placeholder="Plan Name *" value={form.planName} onChange={handleChange} required />
            <input className={inputCls} name="renewal" placeholder="Renewal (e.g. Monthly, Yearly) *" value={form.renewal} onChange={handleChange} required />
            <input className={inputCls} name="price" type="number" min="0" placeholder="Price *" value={form.price} onChange={handleChange} required />
            <input className={inputCls} name="disccountedPrice" type="number" min="0" placeholder="Discounted Price *" value={form.disccountedPrice} onChange={handleChange} required />
          </div>
        </div>

        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-[22px]">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-base font-semibold text-white">Features</h4>
            <button type="button" onClick={addFeature} className="rounded-xl border border-[#F0B429]/30 bg-[#F0B429]/10 px-3 py-1.5 text-xs font-bold text-[#F0B429] hover:bg-[#F0B429]/20">+ Add Feature</button>
          </div>
          <div className="grid gap-2.5">
            {form.features.map((feature, i) => (
              <div key={i} className="flex gap-2">
                <input className={`${inputCls} flex-1`} placeholder={`Feature ${i + 1}`} value={feature} onChange={(e) => updateFeature(i, e.target.value)} />
                {form.features.length > 1 && (
                  <button type="button" onClick={() => removeFeature(i)} className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 text-xs font-semibold text-red-300 hover:bg-red-500/20">Remove</button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={isSubmitting} className="rounded-2xl bg-[#F0B429] px-6 py-2.5 text-sm font-bold text-[#070f26] transition hover:bg-[#e0a820] disabled:opacity-60">
            {isSubmitting ? "Saving..." : editingId ? "Update Membership" : "Add Membership"}
          </button>
          <button type="button" onClick={() => navigate("/admin/memberships")} className="rounded-2xl border border-[#F0B429]/30 bg-white/5 px-6 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddMembershipPage;
