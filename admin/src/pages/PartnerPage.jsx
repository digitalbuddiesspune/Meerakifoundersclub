import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteActionButton, EditActionButton, ViewActionButton } from "../components/AdminActionButtons";

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

const inputCls = "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20";
const selectCls = "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20";

function DetailModal({ partner, onClose }) {
  if (!partner) return null;
  const rows = [
    ["Name", partner.name],
    ["Business Name", partner.businessName],
    ["Slug", partner.slug],
    ["Email", partner.email],
    ["Phone", partner.phone],
    ["WhatsApp", partner.whatsapp],
    ["Website", partner.website],
    ["Description", partner.description],
    ["City", partner.city],
    ["State", partner.state],
    ["Country", partner.country],
    ["Experience (yrs)", partner.experienceYears],
    ["Completed Projects", partner.completedProjects],
    ["Rating", partner.rating],
    ["Response Time", partner.responseTime],
    ["Verified", partner.isVerified ? "Yes" : "No"],
    ["Status", partner.status],
    ["Notes", partner.notes],
    ["Specializations", Array.isArray(partner.specializations) ? partner.specializations.join(", ") : ""],
    ["Portfolio Links", Array.isArray(partner.portfolioLinks) ? partner.portfolioLinks.join(", ") : ""],
    ["Logo", partner.logo],
    ["Cover Image", partner.coverImage],
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-lg font-bold text-slate-900">Partner Details</h4>
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 hover:bg-white/10">Close</button>
        </div>
        <div className="grid gap-2">
          {rows.map(([label, value]) =>
            value !== "" && value !== undefined && value !== null ? (
              <div key={label} className="grid grid-cols-[160px_1fr] gap-2 border-b border-[#F0B429]/10 py-2 last:border-0">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-900">{label}</span>
                <span className="break-all text-sm text-slate-200">{String(value)}</span>
              </div>
            ) : null
          )}
          {Array.isArray(partner.services) && partner.services.length > 0 && (
            <div className="border-b border-[#F0B429]/10 py-2">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-900">Services</span>
              <div className="mt-2 grid gap-2">
                {partner.services.map((s, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-200">
                    <p><span className="font-semibold text-slate-900">Name:</span> {s.name}</p>
                    {s.category && <p><span className="font-semibold text-slate-900">Category:</span> {s.category}</p>}
                    {s.startingPrice !== undefined && <p><span className="font-semibold text-slate-900">Starting Price:</span> {s.startingPrice}</p>}
                    {s.deliveryTimeline && <p><span className="font-semibold text-slate-900">Timeline:</span> {s.deliveryTimeline}</p>}
                    {Array.isArray(s.technologies) && s.technologies.length > 0 && (
                      <p><span className="font-semibold text-slate-900">Technologies:</span> {s.technologies.join(", ")}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PartnerForm({ form, setForm, onSubmit, onCancel, isSubmitting, isEditing, partnerListOptions }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  // specializations
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

  // portfolioLinks
  const addPortfolioLink = () => setForm((prev) => ({ ...prev, portfolioLinks: [...prev.portfolioLinks, ""] }));
  const updatePortfolioLink = (i, val) => setForm((prev) => { const arr = [...prev.portfolioLinks]; arr[i] = val; return { ...prev, portfolioLinks: arr }; });
  const removePortfolioLink = (i) => setForm((prev) => ({ ...prev, portfolioLinks: prev.portfolioLinks.filter((_, idx) => idx !== i) }));

  // services
  const addService = () => setForm((prev) => ({ ...prev, services: [...prev.services, { ...initialService }] }));
  const removeService = (i) => setForm((prev) => ({ ...prev, services: prev.services.filter((_, idx) => idx !== i) }));
  const updateService = (i, field, val) => setForm((prev) => { const arr = [...prev.services]; arr[i] = { ...arr[i], [field]: val }; return { ...prev, services: arr }; });
  const addServiceTech = (i) => setForm((prev) => { const arr = [...prev.services]; arr[i] = { ...arr[i], technologies: [...arr[i].technologies, ""] }; return { ...prev, services: arr }; });
  const updateServiceTech = (si, ti, val) => setForm((prev) => { const arr = [...prev.services]; const techs = [...arr[si].technologies]; techs[ti] = val; arr[si] = { ...arr[si], technologies: techs }; return { ...prev, services: arr }; });
  const removeServiceTech = (si, ti) => setForm((prev) => { const arr = [...prev.services]; arr[si] = { ...arr[si], technologies: arr[si].technologies.filter((_, idx) => idx !== ti) }; return { ...prev, services: arr }; });

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      {/* Basic Info */}
      <div className="rounded-3xl border border-slate-200 bg-white p-[22px]">
        <h4 className="mb-4 text-base font-semibold text-slate-900">Basic Info</h4>
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

      {/* Location & Stats */}
      <div className="rounded-3xl border border-slate-200 bg-white p-[22px]">
        <h4 className="mb-4 text-base font-semibold text-slate-900">Location & Stats</h4>
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
          <label className="flex items-center gap-2 self-center text-sm text-slate-600">
            <input type="checkbox" name="isVerified" checked={form.isVerified} onChange={handleChange} className="h-4 w-4 accent-[#F0B429]" />
            Verified
          </label>
        </div>
        <textarea className={`${inputCls} mt-3.5`} name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} rows={2} />
      </div>

      {/* Specializations */}
      <div className="rounded-3xl border border-slate-200 bg-white p-[22px]">
        <h4 className="mb-3 text-base font-semibold text-slate-900">Specializations</h4>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20"
          >
            <span className={form.specializations.length === 0 ? "text-slate-500" : "text-slate-900"}>
              {form.specializations.length === 0
                ? "Select specializations"
                : `${form.specializations.length} selected`}
            </span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
          </button>
          {dropdownOpen && (
            <div className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
              {partnerListOptions.length === 0 ? (
                <p className="px-4 py-3 text-sm text-slate-500">No options available.</p>
              ) : (
                partnerListOptions.map((opt) => {
                  const selected = form.specializations.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleSpecialization(opt)}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition hover:bg-slate-100 ${selected ? "text-slate-900" : "text-slate-200"}`}
                    >
                      <span>{opt}</span>
                      {selected && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 shrink-0 text-slate-900"><path d="m5 13 4 4L19 7" /></svg>
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
              <span key={s} className="flex items-center gap-1 rounded-xl border border-slate-200 bg-[#F0B429]/10 px-2.5 py-1 text-xs font-semibold text-slate-900">
                {s}
                <button type="button" onClick={() => toggleSpecialization(s)} className="leading-none text-slate-900/60 hover:text-slate-900">×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Portfolio Links */}
      <div className="rounded-3xl border border-slate-200 bg-white p-[22px]">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-base font-semibold text-slate-900">Portfolio Links</h4>
          <button type="button" onClick={addPortfolioLink} className="rounded-xl border border-slate-200 bg-[#F0B429]/10 px-3 py-1.5 text-xs font-bold text-slate-900 hover:bg-[#F0B429]/20">+ Add Link</button>
        </div>
        <div className="grid gap-2.5">
          {form.portfolioLinks.map((link, i) => (
            <div key={i} className="flex gap-2">
              <input className={`${inputCls} flex-1`} placeholder={`Portfolio link ${i + 1}`} value={link} onChange={(e) => updatePortfolioLink(i, e.target.value)} />
              <button type="button" onClick={() => removePortfolioLink(i)} className="rounded-xl border border-red-400/30 bg-red-50 px-3 text-xs font-semibold text-red-600 hover:bg-red-100">Remove</button>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="rounded-3xl border border-slate-200 bg-white p-[22px]">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-base font-semibold text-slate-900">Services</h4>
          <button type="button" onClick={addService} className="rounded-xl border border-slate-200 bg-[#F0B429]/10 px-3 py-1.5 text-xs font-bold text-slate-900 hover:bg-[#F0B429]/20">+ Add Service</button>
        </div>
        <div className="grid gap-4">
          {form.services.map((svc, si) => (
            <div key={si} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500">Service {si + 1}</span>
                <button type="button" onClick={() => removeService(si)} className="rounded-xl border border-red-400/30 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-100">Remove</button>
              </div>
              <div className="grid gap-2.5 md:grid-cols-2">
                <input className={inputCls} placeholder="Service name *" value={svc.name} onChange={(e) => updateService(si, "name", e.target.value)} required />
                <input className={inputCls} placeholder="Category" value={svc.category} onChange={(e) => updateService(si, "category", e.target.value)} />
                <input className={inputCls} type="number" min="0" placeholder="Starting Price" value={svc.startingPrice} onChange={(e) => updateService(si, "startingPrice", e.target.value)} />
                <input className={inputCls} placeholder="Delivery Timeline" value={svc.deliveryTimeline} onChange={(e) => updateService(si, "deliveryTimeline", e.target.value)} />
              </div>
              <div className="mt-2.5">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Technologies</span>
                  <button type="button" onClick={() => addServiceTech(si)} className="rounded-lg border border-slate-200 bg-[#F0B429]/10 px-2 py-1 text-xs text-slate-900 hover:bg-[#F0B429]/20">+ Add</button>
                </div>
                <div className="grid gap-2">
                  {svc.technologies.map((tech, ti) => (
                    <div key={ti} className="flex gap-2">
                      <input className={`${inputCls} flex-1`} placeholder={`Technology ${ti + 1}`} value={tech} onChange={(e) => updateServiceTech(si, ti, e.target.value)} />
                      {svc.technologies.length > 1 && (
                        <button type="button" onClick={() => removeServiceTech(si, ti)} className="rounded-xl border border-red-400/30 bg-red-50 px-3 text-xs font-semibold text-red-600 hover:bg-red-100">Remove</button>
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
          {isSubmitting ? "Saving..." : isEditing ? "Update Partner" : "Add Partner"}
        </button>
        <button type="button" onClick={onCancel} className="rounded-2xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-white/10">
          Cancel
        </button>
      </div>
    </form>
  );
}

function PartnerPage({
  partnersLoading, partnersError, partners, partnersMessage,
  onDeletePartner,
}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleView = (partner) => {
    navigate(`/admin/partners/details/${partner._id}`, { state: { partner } });
  };

  const handleEdit = (partner) => {
    navigate("/admin/partners/add-partner", { state: { partner } });
  };

  const handleDelete = async (partner) => {
    const confirmed = window.confirm(`Delete "${partner.name}"?`);
    if (!confirmed) return;
    await onDeletePartner(partner._id);
  };

  const filtered = partners.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="grid gap-5">
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="m-0 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600">Management</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-900">Partners</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">Manage all registered partners.</p>
          </div>

        </div>
      </div>

      {partnersMessage ? (
        <p className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700">{partnersMessage}</p>
      ) : null}

      {partnersLoading ? (
        <p className="text-sm text-slate-600">Loading partners...</p>
      ) : partnersError ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{partnersError}. Check backend server and API URL.</p>
      ) : partners.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-7">
          <h4 className="m-0 text-lg font-semibold text-slate-900">No partners found</h4>
          <p className="mt-2 text-sm text-slate-600">Start adding partners to fill this section.</p>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20"
          />
          <div className="overflow-x-auto rounded-[18px] border border-slate-200 bg-white">
            <div className="min-w-[700px]">
              <div className="grid grid-cols-[1fr_1fr_120px_100px_200px] border-b border-slate-200 bg-slate-100 px-3.5 py-3">
                <span className="text-xs font-extrabold uppercase text-slate-900">Name</span>
                <span className="text-xs font-extrabold uppercase text-slate-900">Email</span>
                <span className="text-xs font-extrabold uppercase text-slate-900">Status</span>
                <span className="text-xs font-extrabold uppercase text-slate-900">Verified</span>
                <span className="text-center text-xs font-extrabold uppercase text-slate-900">Actions</span>
              </div>
              {filtered.map((partner) => (
                <div key={partner._id} className="grid grid-cols-[1fr_1fr_120px_100px_200px] border-b border-slate-200 px-3.5 py-3 last:border-b-0">
                  <span className="self-center text-sm font-medium text-slate-900">{partner.name}</span>
                  <span className="self-center text-sm text-slate-600">{partner.email}</span>
                  <span className="self-center text-sm text-slate-600 capitalize">{partner.status}</span>
                  <span className="self-center text-sm text-slate-600">{partner.isVerified ? "Yes" : "No"}</span>
                  <div className="flex items-center justify-center gap-1.5">
                    <ViewActionButton aria-label={`View ${partner.name}`} onClick={() => handleView(partner)} />
                    <EditActionButton aria-label={`Edit ${partner.name}`} onClick={() => handleEdit(partner)} />
                    <DeleteActionButton aria-label={`Delete ${partner.name}`} onClick={() => handleDelete(partner)} />
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

export default PartnerPage;
