import { useLocation, useNavigate } from "react-router-dom";

function PartnerDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const partner = location.state?.partner;

  if (!partner) {
    return (
      <section className="grid gap-5">
        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-7">
          <h4 className="text-lg font-semibold text-white">Partner not found</h4>
          <button type="button" onClick={() => navigate("/admin/partners")} className="mt-4 rounded-2xl border border-[#F0B429]/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10">
            Back to Partners
          </button>
        </div>
      </section>
    );
  }

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
    <section className="grid gap-5">
      <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="m-0 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-300">Partner</p>
            <h3 className="mt-1 text-2xl font-bold text-white">{partner.name}</h3>
            {partner.businessName ? <p className="mt-1 text-sm text-slate-300">{partner.businessName}</p> : null}
          </div>
          <button type="button" onClick={() => navigate("/admin/partners")} className="shrink-0 rounded-2xl border border-[#F0B429]/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10">
            ← Back
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-6">
        <div className="grid gap-0">
          {rows.map(([label, value]) =>
            value !== "" && value !== undefined && value !== null ? (
              <div key={label} className="grid grid-cols-[180px_1fr] gap-3 border-b border-[#F0B429]/10 py-3 last:border-0">
                <span className="text-xs font-bold uppercase tracking-wide text-[#F0B429]">{label}</span>
                <span className="break-all text-sm text-slate-200">{String(value)}</span>
              </div>
            ) : null
          )}
        </div>
      </div>

      {Array.isArray(partner.services) && partner.services.length > 0 && (
        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-6">
          <h4 className="mb-4 text-base font-semibold text-white">Services</h4>
          <div className="grid gap-3">
            {partner.services.map((s, i) => (
              <div key={i} className="rounded-2xl border border-[#F0B429]/20 bg-white/5 p-4 text-sm text-slate-200">
                <p><span className="font-semibold text-white">Name:</span> {s.name}</p>
                {s.category ? <p className="mt-1"><span className="font-semibold text-white">Category:</span> {s.category}</p> : null}
                {s.startingPrice !== undefined && s.startingPrice !== "" ? <p className="mt-1"><span className="font-semibold text-white">Starting Price:</span> {s.startingPrice}</p> : null}
                {s.deliveryTimeline ? <p className="mt-1"><span className="font-semibold text-white">Timeline:</span> {s.deliveryTimeline}</p> : null}
                {Array.isArray(s.technologies) && s.technologies.length > 0 ? (
                  <p className="mt-1"><span className="font-semibold text-white">Technologies:</span> {s.technologies.join(", ")}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default PartnerDetailsPage;
