import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const initialItem = { name: "", order: "", isActive: true, image: "" };
const initialForm = { categoryName: "", categoryOrder: "", isActive: true, documents: [] };

const inputCls = "w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20";

function AddDocumentTypePage({ documentTypeMessage, onAddDocumentType, onUpdateDocumentType, uploadAdminImage }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingItemIndex, setUploadingItemIndex] = useState(null);
  const [itemUploadError, setItemUploadError] = useState("");

  useEffect(() => {
    const d = location.state?.doc;
    if (d?._id) {
      setEditingId(d._id);
      setForm({
        categoryName: d.categoryName || "",
        categoryOrder: d.categoryOrder ?? "",
        isActive: d.isActive !== undefined ? d.isActive : true,
        documents: Array.isArray(d.documents)
          ? d.documents.map((item) => ({
              name: item.name || "",
              order: item.order ?? "",
              isActive: item.isActive !== undefined ? item.isActive : true,
              image: item.image || "",
            }))
          : [],
      });
    } else {
      setEditingId("");
      setForm(initialForm);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const addItem = () => setForm((prev) => ({ ...prev, documents: [...prev.documents, { ...initialItem }] }));
  const removeItem = (i) => setForm((prev) => ({ ...prev, documents: prev.documents.filter((_, idx) => idx !== i) }));
  const updateItem = (i, field, val) => setForm((prev) => {
    const arr = [...prev.documents];
    arr[i] = { ...arr[i], [field]: field === "isActive" ? val : val };
    return { ...prev, documents: arr };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      categoryName: form.categoryName.trim(),
      categoryOrder: Number(form.categoryOrder) || 0,
      isActive: form.isActive,
      documents: form.documents
        .filter((d) => d.name.trim())
        .map((d) => ({
          name: d.name.trim(),
          order: Number(d.order) || 0,
          isActive: d.isActive,
          image: String(d.image || "").trim(),
        })),
    };
    if (editingId) {
      await onUpdateDocumentType(editingId, payload);
      navigate("/admin/documents");
    } else {
      await onAddDocumentType(payload);
      setForm(initialForm);
    }
    setIsSubmitting(false);
  };

  return (
    <section className="grid gap-5">
      <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="m-0 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-300">Management</p>
            <h3 className="mt-1 text-2xl font-bold text-white">{editingId ? "Edit Document Type" : "Add Document Type"}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{editingId ? "Update document category details." : "Create a new document category."}</p>
          </div>
        </div>
      </div>

      {documentTypeMessage ? (
        <p className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200">{documentTypeMessage}</p>
      ) : null}
      {itemUploadError ? (
        <p className="rounded-2xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm font-semibold text-amber-100">{itemUploadError}</p>
      ) : null}

      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-[22px]">
          <h4 className="mb-4 text-base font-semibold text-white">Category Details</h4>
          <div className="grid gap-3.5 md:grid-cols-2">
            <input className={inputCls} name="categoryName" placeholder="Category Name *" value={form.categoryName} onChange={handleChange} required />
            <input className={inputCls} name="categoryOrder" type="number" min="0" placeholder="Category Order *" value={form.categoryOrder} onChange={handleChange} required />
          </div>
          <label className="mt-3.5 flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} className="h-4 w-4 accent-[#F0B429]" />
            Active
          </label>
        </div>

        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-[22px]">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-base font-semibold text-white">Document Items</h4>
            <button type="button" onClick={addItem} className="rounded-xl border border-[#F0B429]/30 bg-[#F0B429]/10 px-3 py-1.5 text-xs font-bold text-[#F0B429] hover:bg-[#F0B429]/20">+ Add Item</button>
          </div>
          <div className="grid gap-3">
            {form.documents.map((item, i) => (
              <div key={i} className="rounded-2xl border border-[#F0B429]/20 bg-white/5 p-3">
                <div className="grid gap-2.5 md:grid-cols-2">
                  <input className={inputCls} placeholder="Item name *" value={item.name} onChange={(e) => updateItem(i, "name", e.target.value)} />
                  <input className={inputCls} type="number" min="0" placeholder="Order" value={item.order} onChange={(e) => updateItem(i, "order", e.target.value)} />
                </div>
                <input
                  className={`${inputCls} mt-2`}
                  placeholder="Image URL (optional)"
                  value={item.image || ""}
                  onChange={(e) => updateItem(i, "image", e.target.value)}
                />
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <label className="text-xs text-slate-400">
                    <span className="mr-2 font-semibold text-slate-300">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingItemIndex === i || !uploadAdminImage}
                      className="max-w-[220px] text-xs file:mr-2 file:rounded-lg file:border-0 file:bg-white/10 file:px-2 file:py-1"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        e.target.value = "";
                        if (!file || !uploadAdminImage) return;
                        setItemUploadError("");
                        setUploadingItemIndex(i);
                        try {
                          const url = await uploadAdminImage(file, "documents/types");
                          if (url) updateItem(i, "image", url);
                        } catch (err) {
                          setItemUploadError(err.message || "Image upload failed.");
                        } finally {
                          setUploadingItemIndex(null);
                        }
                      }}
                    />
                  </label>
                  {uploadingItemIndex === i ? <span className="text-xs text-slate-500">Uploading…</span> : null}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-300">
                    <input type="checkbox" checked={item.isActive} onChange={(e) => updateItem(i, "isActive", e.target.checked)} className="h-4 w-4 accent-[#F0B429]" />
                    Active
                  </label>
                  <button type="button" onClick={() => removeItem(i)} className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300 hover:bg-red-500/20">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={isSubmitting} className="rounded-2xl bg-[#F0B429] px-6 py-2.5 text-sm font-bold text-[#070f26] transition hover:bg-[#e0a820] disabled:opacity-60">
            {isSubmitting ? "Saving..." : editingId ? "Update Document Type" : "Add Document Type"}
          </button>
          <button type="button" onClick={() => navigate("/admin/documents")} className="rounded-2xl border border-[#F0B429]/30 bg-white/5 px-6 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddDocumentTypePage;
