import { useLocation, useNavigate } from "react-router-dom";

function DocumentTypeDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const doc = location.state?.doc;

  if (!doc) {
    return (
      <section className="grid gap-5">
        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-7">
          <h4 className="text-lg font-semibold text-white">Document type not found</h4>
          <button type="button" onClick={() => navigate("/admin/documents")} className="mt-4 rounded-2xl border border-[#F0B429]/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10">
            Back to Documents
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-5">
      <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="m-0 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-300">Document Type</p>
            <h3 className="mt-1 text-2xl font-bold text-white">{doc.categoryName}</h3>
          </div>
          <button type="button" onClick={() => navigate("/admin/documents")} className="shrink-0 rounded-2xl border border-[#F0B429]/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10">
            ← Back
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-6">
        <div className="grid gap-0">
          {[
            ["Category Name", doc.categoryName],
            ["Category Order", doc.categoryOrder],
            ["Active", doc.isActive ? "Yes" : "No"],
            ["Total Items", Array.isArray(doc.documents) ? doc.documents.length : 0],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-[180px_1fr] gap-3 border-b border-[#F0B429]/10 py-3 last:border-0">
              <span className="text-xs font-bold uppercase tracking-wide text-[#F0B429]">{label}</span>
              <span className="text-sm text-slate-200">{String(value)}</span>
            </div>
          ))}
        </div>
      </div>

      {Array.isArray(doc.documents) && doc.documents.length > 0 && (
        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-6">
          <h4 className="mb-4 text-base font-semibold text-white">Document Items</h4>
          <div className="overflow-x-auto rounded-[14px] border border-[#F0B429]/20">
            <div className="min-w-[400px]">
              <div className="grid grid-cols-[1fr_80px_80px] border-b border-[#F0B429]/20 bg-[#142e62] px-3.5 py-2.5">
                <span className="text-xs font-extrabold uppercase text-[#F0B429]">Name</span>
                <span className="text-xs font-extrabold uppercase text-[#F0B429]">Order</span>
                <span className="text-xs font-extrabold uppercase text-[#F0B429]">Active</span>
              </div>
              {doc.documents.map((item) => (
                <div key={item._id} className="grid grid-cols-[1fr_80px_80px] border-b border-[#F0B429]/10 px-3.5 py-2.5 last:border-0">
                  <span className="text-sm text-slate-200">{item.name}</span>
                  <span className="text-sm text-slate-300">{item.order}</span>
                  <span className="text-sm text-slate-300">{item.isActive ? "Yes" : "No"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default DocumentTypeDetailsPage;
