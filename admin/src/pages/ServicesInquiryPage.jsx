import { useNavigate } from "react-router-dom";

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

function statusBadgeClass(status) {
  if (status === "Closed") return "border-emerald-300/35 bg-emerald-500/15 text-emerald-100";
  if (status === "Issued") return "border-violet-300/35 bg-violet-500/15 text-violet-100";
  if (status === "Applied") return "border-cyan-300/35 bg-cyan-500/15 text-cyan-100";
  if (status === "In Progress") return "border-amber-300/40 bg-amber-500/15 text-amber-100";
  return "border-slate-300/30 bg-slate-500/15 text-slate-100";
}

function ServicesInquiryPage({ serviceInquiriesLoading, serviceInquiriesError, serviceInquiries }) {
  const navigate = useNavigate();

  const openInquiryDetails = (inquiry) => {
    if (!inquiry?.submissionId) {
      return;
    }
    navigate(`/admin/services/inquiry/${inquiry.submissionId}`);
  };

  const handleRowKeyDown = (event, inquiry) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openInquiryDetails(inquiry);
    }
  };

  return (
    <section className="grid gap-5">
      <div>
        <p className="m-0 inline-flex rounded-full bg-[#1c3b79] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-200">
          Services Inquiry
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#F0B429] md:text-3xl">User service inquiries</h1>
        <p className="mt-2 text-sm text-slate-300">All submitted service form responses from users.</p>
      </div>

      {serviceInquiriesLoading ? (
        <p className="text-sm text-slate-300">Loading service inquiries...</p>
      ) : serviceInquiriesError ? (
        <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200">
          {serviceInquiriesError}. Check backend server and API URL.
        </p>
      ) : serviceInquiries.length === 0 ? (
        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-7">
          <h4 className="m-0 text-lg font-semibold text-white">No service inquiries yet</h4>
          <p className="mt-2 text-sm text-slate-300">User submissions for service forms will appear here.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#F0B429]/30 bg-[#0d214d]">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#F0B429]/30 bg-[#142e62] text-[11px] font-bold uppercase tracking-wide text-[#F0B429]">
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Progress</th>
                </tr>
              </thead>
              <tbody className="text-slate-100">
                {serviceInquiries.map((inquiry) => {
                  const id = inquiry.submissionId || `${inquiry.serviceId}-${inquiry.userId}`;
                  const canOpen = Boolean(inquiry?.submissionId);
                  return (
                    <tr
                      key={id}
                      role="button"
                      tabIndex={canOpen ? 0 : -1}
                      onClick={() => openInquiryDetails(inquiry)}
                      onKeyDown={(event) => handleRowKeyDown(event, inquiry)}
                      className={`border-b border-[#F0B429]/20 last:border-0 focus:outline-none ${
                        canOpen ? "cursor-pointer hover:bg-white/5 focus:bg-white/5" : "cursor-default"
                      }`}
                    >
                        <td className="max-w-[180px] truncate px-4 py-3 font-semibold text-white" title={inquiry.serviceName || "Unknown service"}>
                          {inquiry.serviceName || "Unknown service"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">{inquiry.userName || "Unknown user"}</td>
                        <td className="max-w-[220px] truncate px-4 py-3 text-slate-300" title={inquiry.userEmail || "—"}>
                          {inquiry.userEmail || "—"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <span className="inline-flex rounded-full border border-[#F0B429]/35 bg-[#F0B429]/10 px-2.5 py-1 text-[11px] font-semibold text-[#F7CE63]">
                            {inquiry.userPlan || "—"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-slate-300">{formatDate(inquiry.submittedAt)}</td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusBadgeClass(inquiry.progressStatus || "Pending")}`}>
                            {inquiry.progressStatus || "Pending"}
                          </span>
                        </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default ServicesInquiryPage;
