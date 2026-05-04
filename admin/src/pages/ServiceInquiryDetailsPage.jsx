import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PROGRESS_OPTIONS = ["Pending", "In Progress", "Applied", "Issued", "Closed"];

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

function normalizeDocMatchPart(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[-_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function findUserDocEntryForLink(userDocEntries, doc) {
  const wantParent = normalizeDocMatchPart(doc.documentTypeName);
  const wantType = normalizeDocMatchPart(doc.documentItemName);
  if (!wantParent || !wantType) return null;
  return (
    userDocEntries.find((e) => {
      const p = normalizeDocMatchPart(e.parentCategory);
      const t = normalizeDocMatchPart(e.documentType);
      return p === wantParent && t === wantType;
    }) || null
  );
}

function ServiceInquiryDetailsPage({ onLoadServiceInquiry, onUpdateProgressStatus }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [documentsError, setDocumentsError] = useState("");
  const [userDocEntries, setUserDocEntries] = useState([]);
  const [serviceLinkedDocuments, setServiceLinkedDocuments] = useState([]);
  const [progressStatus, setProgressStatus] = useState("Pending");
  const [statusSaving, setStatusSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!id || !onLoadServiceInquiry) {
        setError("Inquiry not found");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      setStatusMessage("");
      try {
        const result = await onLoadServiceInquiry(id);
        if (!cancelled) {
          setInquiry(result || null);
          setProgressStatus(result?.progressStatus || "Pending");
        }
      } catch (err) {
        if (!cancelled) {
          setInquiry(null);
          setError(err.message || "Failed to load inquiry");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [id, onLoadServiceInquiry]);

  const handleUpdateProgress = async () => {
    if (!id || !onUpdateProgressStatus) return;
    setStatusSaving(true);
    setStatusMessage("");
    try {
      const updated = await onUpdateProgressStatus(id, progressStatus);
      if (updated) {
        setInquiry(updated);
        setProgressStatus(updated.progressStatus || progressStatus);
      }
      setStatusMessage("Progress updated successfully.");
    } catch (err) {
      setStatusMessage(err.message || "Failed to update progress.");
    } finally {
      setStatusSaving(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadDocuments = async () => {
      if (!inquiry?.userId || !inquiry?.serviceId) {
        setUserDocEntries([]);
        setServiceLinkedDocuments([]);
        return;
      }

      setDocumentsLoading(true);
      setDocumentsError("");
      try {
        const [userDocsResponse, serviceDetailsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/user-documents/${inquiry.userId}`),
          fetch(`${API_BASE_URL}/service-details/service/${inquiry.serviceId}`),
        ]);

        const userDocsData = await userDocsResponse.json().catch(() => []);
        const serviceDetailsData = await serviceDetailsResponse.json().catch(() => ({}));

        if (!userDocsResponse.ok) {
          throw new Error(userDocsData?.message || "Failed to load user documents");
        }
        if (!serviceDetailsResponse.ok) {
          throw new Error(serviceDetailsData?.message || "Failed to load linked service documents");
        }

        if (!cancelled) {
          setUserDocEntries(Array.isArray(userDocsData) ? userDocsData : []);
          setServiceLinkedDocuments(Array.isArray(serviceDetailsData?.linkedDocuments) ? serviceDetailsData.linkedDocuments : []);
        }
      } catch (err) {
        if (!cancelled) {
          setUserDocEntries([]);
          setServiceLinkedDocuments([]);
          setDocumentsError(err.message || "Failed to load submitted documents");
        }
      } finally {
        if (!cancelled) {
          setDocumentsLoading(false);
        }
      }
    };

    loadDocuments();

    return () => {
      cancelled = true;
    };
  }, [inquiry?.userId, inquiry?.serviceId]);

  if (loading) {
    return (
      <section className="grid gap-5">
        <p className="text-sm text-slate-300">Loading inquiry details...</p>
      </section>
    );
  }

  if (!inquiry || error) {
    return (
      <section className="grid gap-5">
        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-7">
          <h4 className="m-0 text-lg font-semibold text-white">Inquiry not found</h4>
          <p className="mt-2 text-sm text-slate-300">{error || "This inquiry could not be loaded."}</p>
          <button
            type="button"
            className="mt-4 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100"
            onClick={() => navigate("/admin/services/inquiry")}
          >
            Back to inquiries
          </button>
        </div>
      </section>
    );
  }

  const fields = Array.isArray(inquiry.fieldValues) ? inquiry.fieldValues : [];

  return (
    <section className="grid gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="m-0 inline-flex rounded-full bg-[#1c3b79] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-200">
            Services Inquiry
          </p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#F0B429] md:text-3xl">{inquiry.serviceName || "Unknown service"}</h1>
          <p className="mt-2 text-sm text-slate-300">Submitted on {formatDate(inquiry.submittedAt)}</p>
        </div>
        <button
          type="button"
          className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100"
          onClick={() => navigate("/admin/services/inquiry")}
        >
          Back
        </button>
      </div>

      <div className="rounded-2xl border border-[#F0B429]/30 bg-[#0d214d] p-4">
        <p className="m-0 text-xs font-semibold uppercase tracking-wide text-slate-400">User details</p>
        <div className="mt-3 grid gap-2 text-sm text-slate-200 md:grid-cols-3">
          <p className="m-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
            <span className="text-slate-400">Name:</span> {inquiry.userName || "Unknown user"}
          </p>
          <p className="m-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
            <span className="text-slate-400">Email:</span> {inquiry.userEmail || "—"}
          </p>
          <p className="m-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
            <span className="text-slate-400">Phone:</span> {inquiry.userPhone || "—"}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#F0B429]/30 bg-[#0d214d] p-4">
        <p className="m-0 text-xs font-semibold uppercase tracking-wide text-slate-400">Actions & Progress</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <select
            value={progressStatus}
            onChange={(event) => setProgressStatus(event.target.value)}
            className="min-w-[190px] rounded-xl border border-white/20 bg-[#142e62] px-3 py-2 text-sm font-semibold text-white outline-none focus:border-cyan-400/40"
            disabled={statusSaving}
          >
            {PROGRESS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleUpdateProgress}
            disabled={statusSaving}
            className="rounded-xl border border-cyan-300/35 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/20 disabled:opacity-60"
          >
            {statusSaving ? "Updating..." : "Update progress"}
          </button>
        </div>
        {statusMessage ? <p className="mt-2 text-xs text-slate-300">{statusMessage}</p> : null}
      </div>

      <div className="grid gap-3 rounded-2xl border border-[#F0B429]/30 bg-[#0d214d] p-4">
        <p className="m-0 text-xs font-semibold uppercase tracking-wide text-slate-400">Submitted fields</p>
        {fields.length ? (
          fields.map((field, index) => (
            <div key={`${field.label || "field"}-${index}`} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <p className="m-0 text-xs font-semibold uppercase tracking-wide text-slate-400">{field.label || "Field"}</p>
              <p className="mt-1 text-sm text-slate-100 break-words">{field.value || "—"}</p>
            </div>
          ))
        ) : (
          <p className="m-0 text-sm text-slate-400">No field values submitted.</p>
        )}
      </div>

      <div className="grid gap-3 rounded-2xl border border-[#F0B429]/30 bg-[#0d214d] p-4">
        <p className="m-0 text-xs font-semibold uppercase tracking-wide text-slate-400">Submitted documents</p>

        {documentsLoading ? <p className="m-0 text-sm text-slate-300">Loading documents...</p> : null}
        {!documentsLoading && documentsError ? <p className="m-0 text-sm text-red-200">{documentsError}</p> : null}

        {!documentsLoading && !documentsError ? (
          serviceLinkedDocuments.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-3 py-2.5">Document</th>
                    <th className="px-3 py-2.5">Category</th>
                    <th className="px-3 py-2.5">Uploaded files</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceLinkedDocuments.map((doc, index) => {
                    const existing = findUserDocEntryForLink(userDocEntries, doc);
                    return (
                      <tr key={`${doc.documentType}-${doc.documentItem}-${index}`} className="border-t border-white/10 align-top">
                        <td className="px-3 py-2.5 text-slate-100">{doc.documentItemName || "Document"}</td>
                        <td className="px-3 py-2.5 text-slate-300">{doc.documentTypeName || "—"}</td>
                        <td className="px-3 py-2.5 text-xs">
                          {existing?.documents?.length ? (
                            <ul className="m-0 list-none space-y-1 p-0">
                              {existing.documents.map((file) => (
                                <li key={`${file.url}-${file.uploadedAt || file.fileName}`}>
                                  <a href={file.url} target="_blank" rel="noreferrer" className="break-all text-cyan-200 hover:underline">
                                    {file.fileName || "View file"}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-slate-500">Not uploaded</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : userDocEntries.length > 0 ? (
            <div className="grid gap-2">
              {userDocEntries.map((entry) => (
                <div key={entry._id} className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <p className="m-0 text-sm font-semibold text-white">{entry.documentType || "Document"}</p>
                  <p className="m-0 mt-0.5 text-xs text-slate-400">{entry.parentCategory || "—"}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="m-0 text-sm text-slate-400">No documents uploaded by this user yet.</p>
          )
        ) : null}
      </div>
    </section>
  );
}

export default ServiceInquiryDetailsPage;
