import { useNavigate } from "react-router-dom";
import { getInquiryStatusBadgeClass } from "../utils/dashboardData";

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
        <p className="m-0 inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Services Inquiry
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">User service inquiries</h1>
        <p className="mt-2 text-sm text-slate-600">All submitted service form responses from users.</p>
      </div>

      {serviceInquiriesLoading ? (
        <p className="text-sm text-slate-600">Loading service inquiries...</p>
      ) : serviceInquiriesError ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {serviceInquiriesError}. Check backend server and API URL.
        </p>
      ) : serviceInquiries.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-7">
          <h4 className="m-0 text-lg font-semibold text-slate-900">No service inquiries yet</h4>
          <p className="mt-2 text-sm text-slate-600">User submissions for service forms will appear here.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100 text-[11px] font-bold uppercase tracking-wide text-slate-900">
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Progress</th>
                </tr>
              </thead>
              <tbody className="text-slate-900">
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
                      className={`border-b border-slate-200 last:border-0 focus:outline-none ${
                        canOpen ? "cursor-pointer hover:bg-slate-100 focus:bg-white" : "cursor-default"
                      }`}
                    >
                        <td className="max-w-[180px] truncate px-4 py-3 font-semibold text-slate-900" title={inquiry.serviceName || "Unknown service"}>
                          {inquiry.serviceName || "Unknown service"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">{inquiry.userName || "Unknown user"}</td>
                        <td className="max-w-[220px] truncate px-4 py-3 text-slate-600" title={inquiry.userEmail || "—"}>
                          {inquiry.userEmail || "—"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <span className="inline-flex rounded-full border border-slate-200 bg-[#F0B429]/10 px-2.5 py-1 text-[11px] font-semibold text-[#E8621A]">
                            {inquiry.userPlan || "—"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-slate-600">{formatDate(inquiry.submittedAt)}</td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${getInquiryStatusBadgeClass(inquiry.progressStatus || "Pending")}`}>
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
