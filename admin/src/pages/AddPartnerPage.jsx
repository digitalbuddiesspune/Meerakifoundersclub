import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const initialService = { name: "", category: "", startingPrice: "", deliveryTimeline: "", technologies: [""] };

const initialForm = {
  name: "", businessName: "", slug: "", email: "", phone: "", whatsapp: "",
  website: "", logo: "", coverImage: "", description: "",
  specializations: [], services: [], portfolioLinks: [],
  city: "", state: "", country: "India", experienceYears: "", completedProjects: "",
  rating: "", responseTime: "24h", isVerified: false,
  status: "pending", notes: "",
};

function mapPartnerToForm(p = {}) {
  return {
    name: p.name || "",
    businessName: p.businessName || "",
    slug: p.slug || "",
    email: p.email || "",
    phone: p.phone || "",
    whatsapp: p.whatsapp || "",
    website: p.website || "",
    logo: p.logo || "",
    coverImage: p.coverImage || "",
    description: p.description || "",
    specializations: Array.isArray(p.specializations) ? [...p.specializations] : [],
    services: Array.isArray(p.services)
      ? p.services.map((s) => ({
          name: s.name || "",
          category: s.category || "",
          startingPrice: s.startingPrice ?? "",
          deliveryTimeline: s.deliveryTimeline || "",
          technologies: Array.isArray(s.technologies) && s.technologies.length ? [...s.technologies] : [""],
        }))
      : [],
    portfolioLinks: Array.isArray(p.portfolioLinks) ? [...p.portfolioLinks] : [],
    city: p.city || "",
    state: p.state || "",
    country: p.country || "India",
    experienceYears: p.experienceYears ?? "",
    completedProjects: p.completedProjects ?? "",
    rating: p.rating ?? "",
    responseTime: p.responseTime || "24h",
    isVerified: p.isVerified || false,
    status: p.status || "pending",
    notes: p.notes || "",
  };
}

const inputCls = "w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20";
const selectCls = "w-full rounded-2xl border border-[#F0B429]/30 bg-[#0d214d] px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20";

function AddPartnerPage({ partnersMessage, onAddPartner, onUpdatePartner, partnerList }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const partnerListOptions = Array.isArray(partnerList)
    ? partnerList.map((p) => p.technology).filter(Boolean)
    : [];

  useEffect(() => {
    const partnerToEdit = location.state?.partner;
    if (partnerToEdit?._id) {
      setEditingId(partnerToEdit._id);
      setForm(mapPartnerToForm(partnerToEdit));
    } else {
      setEditingId("");
      setForm(initialForm);
    }
  }, [location.state]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const toggleSpecialization = (tech) => {
    setForm((prev) => {
      const exists = prev.specializations.includes(tech);
      return {
        ...prev,
        specializations: exists
          ? prev.specializations.filter((s) => s !== tech)
          : [...prev.specializations, tech],
      };
    });
  };

  const addPortfolioLink = () => setForm((prev) => ({ ...prev, portfolioLinks: [...prev.portfolioLinks, ""] }));
  const updatePortfolioLink = (i, val) => setForm((prev) => { const arr = [...prev.portfolioLinks]; arr[i] = val; return { ...prev, portfolioLinks: arr }; });
  const removePortfolioLink = (i) => setForm((prev) => ({ ...prev, portfolioLinks: prev.portfolioLinks.filter((_, idx) => idx !== i) }));

  const addService = () => setForm((prev) => ({ ...prev, services: [...prev.services, { ...initialService }] }));
  const removeService = (i) => setForm((prev) => ({ ...prev, services: prev.services.filter((_, idx) => idx !== i) }));
  const updateService = (i, field, val) => setForm((prev) => { const arr = [...prev.services]; arr[i] = { ...arr[i], [field]: val }; return { ...prev, services: arr }; });
  const addServiceTech = (i) => setForm((prev) => { const arr = [...prev.services]; arr[i] = { ...arr[i], technologies: [...arr[i].technologies, ""] }; return { ...prev, services: arr }; });
  const updateServiceTech = (si, ti, val) => setForm((prev) => { const arr = [...prev.services]; const techs = [...arr[si].technologies]; techs[ti] = val; arr[si] = { ...arr[si], technologies: techs }; return { ...prev, services: arr }; });
  const removeServiceTech = (si, ti) => setForm((prev) => { const arr = [...prev.services]; arr[si] = { ...arr[si], technologies: arr[si].technologies.filter((_, idx) => idx !== ti) }; return { ...prev, services: arr }; });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      ...form,
      slug: form.slug || form.name,
      experienceYears: Number(form.experienceYears) || 0,
      completedProjects: Number(form.completedProjects) || 0,
      rating: Number(form.rating) || 0,
      services: form.services.map((s) => ({
        ...s,
        startingPrice: Number(s.startingPrice) || 0,
        technologies: s.technologies.filter(Boolean),
      })),
      portfolioLinks: form.portfolioLinks.filter(Boolean),
      specializations: form.specializations.filter(Boolean),
    };
    if (editingId) {
      await onUpdatePartner(editingId, payload);
    } else {
      await onAddPartner(payload);
    }
    setIsSubmitting(false);
    if (editingId) {
      navigate("/admin/partners");
    } else {
      setForm(initialForm);
      setEditingId("");
    }
  };

  const handleCancel = () => {
    navigate("/admin/partners");
  };

  return (
    <section className="grid gap-5">
      <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="m-0 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-300">Management</p>
            <h3 className="mt-1 text-2xl font-bold text-white">{editingId ? "Edit Partner" : "Add Partner"}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{editingId ? "Update partner information." : "Add a new partner to the system."}</p>
          </div>
        </div>
      </div>

      {partnersMessage ? (
        <p className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200">{partnersMessage}</p>
      ) : null}

      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-[22px]">
          <h4 className="mb-4 text-base font-semibold text-white">Basic Info</h4>
          <div className="grid gap-3.5 md:grid-cols-2">
            <input className={inputCls} name="name" placeholder="Name *" value={form.name} onChange={handleChange} required />
            <input className={inputCls} name="businessName" placeholder="Business Name" value={form.businessName} onChange={handleChange} />
            <input className={inputCls} name="slug" placeholder="Slug (auto from name if empty)" value={form.slug} onChange={handleChange} />
            <input className={inputCls} name="email" type="email" placeholder="Email *" value={form.email} onChange={handleChange} required />
            <input className={inputCls} name="phone" placeholder="Phone *" value={form.phone} onChange={handleChange} required />
            <input className={inputCls} name="whatsapp" placeholder="WhatsApp" value={form.whatsapp} onChange={handleChange} />
            <input className={inputCls} name="website" placeholder="Website" value={form.website} onChange={handleChange} />
            <input className={inputCls} name="logo" placeholder="Logo URL" value={form.logo} onChange={handleChange} />
            <input className={inputCls} name="coverImage" placeholder="Cover Image URL" value={form.coverImage} onChange={handleChange} />
          </div>
          <textarea className={`${inputCls} mt-3.5`} name="description" placeholder="Description *" value={form.description} onChange={handleChange} rows={3} required />
        </div>

        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-[22px]">
          <h4 className="mb-4 text-base font-semibold text-white">Location & Stats</h4>
          <div className="grid gap-3.5 md:grid-cols-3">
            <input className={inputCls} name="city" placeholder="City" value={form.city} onChange={handleChange} />
            <input className={inputCls} name="state" placeholder="State" value={form.state} onChange={handleChange} />
            <input className={inputCls} name="country" placeholder="Country" value={form.country} onChange={handleChange} />
            <input className={inputCls} name="experienceYears" type="number" min="0" placeholder="Experience (years)" value={form.experienceYears} onChange={handleChange} />
            <input className={inputCls} name="completedProjects" type="number" min="0" placeholder="Completed Projects" value={form.completedProjects} onChange={handleChange} />
            <input className={inputCls} name="rating" type="number" min="0" max="5" step="0.1" placeholder="Rating (0-5)" value={form.rating} onChange={handleChange} />
            <input className={inputCls} name="responseTime" placeholder="Response Time (e.g. 24h)" value={form.responseTime} onChange={handleChange} />
            <select className={selectCls} name="status" value={form.status} onChange={handleChange}>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="suspended">Suspended</option>
            </select>
            <label className="flex items-center gap-2 self-center text-sm text-slate-300">
              <input type="checkbox" name="isVerified" checked={form.isVerified} onChange={handleChange} className="h-4 w-4 accent-[#F0B429]" />
              Verified
            </label>
          </div>
          <textarea className={`${inputCls} mt-3.5`} name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} rows={2} />
        </div>

        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-[22px]">
          <h4 className="mb-3 text-base font-semibold text-white">Specializations</h4>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20"
            >
              <span className={form.specializations.length === 0 ? "text-slate-400" : "text-slate-100"}>
                {form.specializations.length === 0
                  ? "Select specializations"
                  : `${form.specializations.length} selected`}
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
            </button>
            {dropdownOpen && (
              <div className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-2xl border border-[#F0B429]/30 bg-[#0d214d] shadow-xl">
                {partnerListOptions.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-slate-400">No options available.</p>
                ) : (
                  partnerListOptions.map((opt) => {
                    const selected = form.specializations.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleSpecialization(opt)}
                        className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition hover:bg-white/5 ${selected ? "text-[#F0B429]" : "text-slate-200"}`}
                      >
                        <span>{opt}</span>
                        {selected && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 shrink-0 text-[#F0B429]"><path d="m5 13 4 4L19 7" /></svg>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>
          {form.specializations.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {form.specializations.map((s) => (
                <span key={s} className="flex items-center gap-1 rounded-xl border border-[#F0B429]/30 bg-[#F0B429]/10 px-2.5 py-1 text-xs font-semibold text-[#F0B429]">
                  {s}
                  <button type="button" onClick={() => toggleSpecialization(s)} className="leading-none text-[#F0B429]/60 hover:text-[#F0B429]">×</button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-[22px]">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-base font-semibold text-white">Portfolio Links</h4>
            <button type="button" onClick={addPortfolioLink} className="rounded-xl border border-[#F0B429]/30 bg-[#F0B429]/10 px-3 py-1.5 text-xs font-bold text-[#F0B429] hover:bg-[#F0B429]/20">+ Add Link</button>
          </div>
          <div className="grid gap-2.5">
            {form.portfolioLinks.map((link, i) => (
              <div key={i} className="flex gap-2">
                <input className={`${inputCls} flex-1`} placeholder={`Portfolio link ${i + 1}`} value={link} onChange={(e) => updatePortfolioLink(i, e.target.value)} />
                <button type="button" onClick={() => removePortfolioLink(i)} className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 text-xs font-semibold text-red-300 hover:bg-red-500/20">Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-[22px]">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-base font-semibold text-white">Services</h4>
            <button type="button" onClick={addService} className="rounded-xl border border-[#F0B429]/30 bg-[#F0B429]/10 px-3 py-1.5 text-xs font-bold text-[#F0B429] hover:bg-[#F0B429]/20">+ Add Service</button>
          </div>
          <div className="grid gap-4">
            {form.services.map((svc, si) => (
              <div key={si} className="rounded-2xl border border-[#F0B429]/20 bg-white/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-400">Service {si + 1}</span>
                  <button type="button" onClick={() => removeService(si)} className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300 hover:bg-red-500/20">Remove</button>
                </div>
                <div className="grid gap-2.5 md:grid-cols-2">
                  <input className={inputCls} placeholder="Service name *" value={svc.name} onChange={(e) => updateService(si, "name", e.target.value)} required />
                  <input className={inputCls} placeholder="Category" value={svc.category} onChange={(e) => updateService(si, "category", e.target.value)} />
                  <input className={inputCls} type="number" min="0" placeholder="Starting Price" value={svc.startingPrice} onChange={(e) => updateService(si, "startingPrice", e.target.value)} />
                  <input className={inputCls} placeholder="Delivery Timeline" value={svc.deliveryTimeline} onChange={(e) => updateService(si, "deliveryTimeline", e.target.value)} />
                </div>
                <div className="mt-2.5">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">Technologies</span>
                    <button type="button" onClick={() => addServiceTech(si)} className="rounded-lg border border-[#F0B429]/20 bg-[#F0B429]/10 px-2 py-1 text-xs text-[#F0B429] hover:bg-[#F0B429]/20">+ Add</button>
                  </div>
                  <div className="grid gap-2">
                    {svc.technologies.map((tech, ti) => (
                      <div key={ti} className="flex gap-2">
                        <input className={`${inputCls} flex-1`} placeholder={`Technology ${ti + 1}`} value={tech} onChange={(e) => updateServiceTech(si, ti, e.target.value)} />
                        {svc.technologies.length > 1 && (
                          <button type="button" onClick={() => removeServiceTech(si, ti)} className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 text-xs font-semibold text-red-300 hover:bg-red-500/20">Remove</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={isSubmitting} className="rounded-2xl bg-[#F0B429] px-6 py-2.5 text-sm font-bold text-[#070f26] transition hover:bg-[#e0a820] disabled:opacity-60">
            {isSubmitting ? "Saving..." : editingId ? "Update Partner" : "Add Partner"}
          </button>
          <button type="button" onClick={handleCancel} className="rounded-2xl border border-[#F0B429]/30 bg-white/5 px-6 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddPartnerPage;
