import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteActionButton, EditActionButton, ViewActionButton } from "../components/AdminActionButtons";

function DocumentTypesPage({ documentTypesLoading, documentTypesError, documentTypes, documentTypeMessage, onDeleteDocumentType }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleDelete = async (doc) => {
    const confirmed = window.confirm(`Delete "${doc.categoryName}"?`);
    if (!confirmed) return;
    await onDeleteDocumentType(doc._id);
  };

  const filtered = documentTypes.filter((d) =>
    d.categoryName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="grid gap-4">
      {documentTypeMessage ? (
        <p className="rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700">{documentTypeMessage}</p>
      ) : null}

      {documentTypesLoading ? (
        <p className="text-sm text-slate-600">Loading document types...</p>
      ) : documentTypesError ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{documentTypesError}. Check backend server and API URL.</p>
      ) : documentTypes.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h4 className="m-0 text-lg font-semibold text-slate-900">No document types found</h4>
          <p className="mt-2 text-sm text-slate-600">Start adding document categories to fill this section.</p>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search by category name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
          />
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[640px]">
                <div className="grid grid-cols-[minmax(0,2.2fr)_0.7fr_0.7fr_minmax(0,1.6fr)] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Category Name</span>
                  <span className="text-left text-xs font-bold uppercase tracking-wide text-slate-500">Order</span>
                  <span className="text-left text-xs font-bold uppercase tracking-wide text-slate-500">Items</span>
                  <span className="text-center text-xs font-bold uppercase tracking-wide text-slate-500">Actions</span>
                </div>
                {filtered.map((doc) => (
                  <div key={doc._id} className="grid grid-cols-[minmax(0,2.2fr)_0.7fr_0.7fr_minmax(0,1.6fr)] gap-3 border-b border-slate-100 px-4 py-3.5 last:border-b-0 hover:bg-slate-50/60">
                    <span className="self-center text-sm font-medium text-slate-900">{doc.categoryName}</span>
                    <span className="self-center text-left text-sm text-slate-600">{doc.categoryOrder}</span>
                    <span className="self-center text-left text-sm text-slate-600">{Array.isArray(doc.documents) ? doc.documents.length : 0}</span>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <ViewActionButton
                        aria-label={`View ${doc.categoryName}`}
                        onClick={() => navigate(`/admin/documents/details/${doc._id}`, { state: { doc } })}
                      />
                      <EditActionButton
                        aria-label={`Edit ${doc.categoryName}`}
                        onClick={() => navigate("/admin/documents/add-document", { state: { doc } })}
                      />
                      <DeleteActionButton
                        aria-label={`Delete ${doc.categoryName}`}
                        onClick={() => handleDelete(doc)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default DocumentTypesPage;
