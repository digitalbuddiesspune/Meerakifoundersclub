import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const FIELD_TYPE_OPTIONS = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "number", label: "Number" },
  { value: "tel", label: "Phone" },
  { value: "textarea", label: "Long text" },
];

const newCategoryItemInitial = { name: "", order: "", isActive: true, image: "" };
const newCategoryFormInitial = {
  categoryName: "",
  categoryOrder: "",
  isActive: true,
  documents: [],
};

const inputCls =
  "rounded-xl border border-white/15 bg-[#0d214d] px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/40";

const iconBtn =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-300 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-100";

function IconPencil({ className = "h-4 w-4" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  );
}

function IconTrash({ className = "h-4 w-4" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

function ServiceDetailsPage({
  servicesList,
  serviceMessage,
  documentTypes = [],
  documentTypeMessage,
  serviceDetailsMessage,
  setServiceDetailsMessage,
  onLoadServiceDetails,
  onSaveServiceDetails,
  onDeleteServiceDetailsConfig,
  onAddDocumentType,
  uploadAdminImage,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId } = useParams();

  const service = useMemo(() => {
    const stateService = location.state?.service;

    if (stateService?._id === serviceId) {
      return stateService;
    }

    return servicesList.find((item) => item._id === serviceId) || null;
  }, [location.state, serviceId, servicesList]);

  const [configLoading, setConfigLoading] = useState(false);
  const [configSaving, setConfigSaving] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [linkedDocuments, setLinkedDocuments] = useState([]);
  const [draftLabel, setDraftLabel] = useState("");
  const [draftFieldType, setDraftFieldType] = useState("text");
  const [draftRequired, setDraftRequired] = useState(false);
  const [draftDocTypeId, setDraftDocTypeId] = useState("");
  const [draftDocItemId, setDraftDocItemId] = useState("");
  const [newCategoryForm, setNewCategoryForm] = useState(newCategoryFormInitial);
  const [savingNewCategory, setSavingNewCategory] = useState(false);
  const [uploadingDocItemIndex, setUploadingDocItemIndex] = useState(null);
  const [editingFieldIndex, setEditingFieldIndex] = useState(null);

  const sortedDocumentTypes = useMemo(
    () =>
      [...documentTypes].sort((a, b) => {
        const orderA = a.categoryOrder ?? 0;
        const orderB = b.categoryOrder ?? 0;
        if (orderA !== orderB) return orderA - orderB;
        return String(a.categoryName || "").localeCompare(String(b.categoryName || ""));
      }),
    [documentTypes]
  );

  const draftCategory = useMemo(
    () => sortedDocumentTypes.find((dt) => String(dt._id) === String(draftDocTypeId)),
    [sortedDocumentTypes, draftDocTypeId]
  );

  const draftItemOptions = useMemo(
    () => (draftCategory?.documents || []).filter((doc) => doc.isActive !== false),
    [draftCategory]
  );

  useEffect(() => {
    if (!serviceId || !service) {
      return;
    }

    let cancelled = false;

    (async () => {
      setConfigLoading(true);
      setServiceDetailsMessage("");
      try {
        const data = await onLoadServiceDetails(serviceId);
        if (cancelled) return;
        setFormFields(
          (data.formFields || []).map((field, index) => ({
            label: field.label || "",
            fieldType: FIELD_TYPE_OPTIONS.some((o) => o.value === field.fieldType) ? field.fieldType : "text",
            required: Boolean(field.required),
            order: Number.isFinite(Number(field.order)) ? Number(field.order) : index,
          }))
        );
        setLinkedDocuments(
          (data.linkedDocuments || []).map((row) => ({
            _id: row._id,
            documentType: row.documentType,
            documentItem: row.documentItem,
            documentTypeName: row.documentTypeName,
            documentItemName: row.documentItemName,
          }))
        );
        setEditingFieldIndex(null);
        setDraftLabel("");
        setDraftFieldType("text");
        setDraftRequired(false);
      } catch (error) {
        if (!cancelled) {
          setServiceDetailsMessage(error.message || "Failed to load service form configuration.");
        }
      } finally {
        if (!cancelled) {
          setConfigLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [serviceId, service, onLoadServiceDetails, setServiceDetailsMessage]);

  useEffect(() => {
    setDraftDocItemId("");
  }, [draftDocTypeId]);

  const applySavedConfig = (saved) => {
    setLinkedDocuments(
      (saved.linkedDocuments || []).map((row) => ({
        _id: row._id,
        documentType: row.documentType,
        documentItem: row.documentItem,
        documentTypeName: row.documentTypeName,
        documentItemName: row.documentItemName,
      }))
    );
    setFormFields(
      (saved.formFields || []).map((field, index) => ({
        label: field.label || "",
        fieldType: FIELD_TYPE_OPTIONS.some((o) => o.value === field.fieldType) ? field.fieldType : "text",
        required: Boolean(field.required),
        order: Number.isFinite(Number(field.order)) ? Number(field.order) : index,
      }))
    );
  };

  const persistServiceConfigToServer = async (fields, docs) => {
    const payloadFields = fields
      .map((field, index) => ({
        label: field.label.trim(),
        fieldType: field.fieldType,
        required: field.required,
        order: index,
      }))
      .filter((f) => f.label);

    const payloadDocs = docs.map((row) => ({
      documentType: row.documentType,
      documentItem: row.documentItem,
    }));

    const saved = await onSaveServiceDetails(serviceId, {
      formFields: payloadFields,
      linkedDocuments: payloadDocs,
    });
    applySavedConfig(saved);
    return saved;
  };

  const handleAddOrUpdateFormField = async () => {
    const label = draftLabel.trim();
    if (!label) {
      return;
    }

    if (editingFieldIndex !== null) {
      const nextFields = formFields.map((f, i) =>
        i === editingFieldIndex ? { ...f, label, fieldType: draftFieldType, required: draftRequired, order: i } : f
      );
      setConfigSaving(true);
      setServiceDetailsMessage("");
      try {
        await persistServiceConfigToServer(nextFields, linkedDocuments);
        setEditingFieldIndex(null);
        setDraftLabel("");
        setDraftFieldType("text");
        setDraftRequired(false);
      } catch (error) {
        setServiceDetailsMessage(error.message || "Failed to save.");
      } finally {
        setConfigSaving(false);
      }
      return;
    }

    setFormFields((prev) => [
      ...prev,
      {
        label,
        fieldType: draftFieldType,
        required: draftRequired,
        order: prev.length,
      },
    ]);
    setDraftLabel("");
    setDraftFieldType("text");
    setDraftRequired(false);
  };

  const handleStartEditField = (index) => {
    const field = formFields[index];
    if (!field) return;
    setEditingFieldIndex(index);
    setDraftLabel(field.label || "");
    setDraftFieldType(FIELD_TYPE_OPTIONS.some((o) => o.value === field.fieldType) ? field.fieldType : "text");
    setDraftRequired(Boolean(field.required));
    setServiceDetailsMessage("");
  };

  const handleCancelEditField = () => {
    setEditingFieldIndex(null);
    setDraftLabel("");
    setDraftFieldType("text");
    setDraftRequired(false);
  };

  const handleDeleteFormFieldPersist = async (index) => {
    if (!serviceId || !service) return;
    const field = formFields[index];
    if (!field) return;
    if (!window.confirm("Are you sure you want to delete this field?")) {
      return;
    }

    const nextFields = formFields.filter((_, i) => i !== index);

    setConfigSaving(true);
    setServiceDetailsMessage("");
    try {
      await persistServiceConfigToServer(nextFields, linkedDocuments);
      setEditingFieldIndex((ei) => {
        if (ei === null) return null;
        if (ei === index) return null;
        if (ei > index) return ei - 1;
        return ei;
      });
    } catch (error) {
      setServiceDetailsMessage(error.message || "Failed to save.");
    } finally {
      setConfigSaving(false);
    }
  };

  const handleDeleteLinkedDocumentPersist = async (index) => {
    if (!serviceId || !service) return;
    const row = linkedDocuments[index];
    if (!row) return;
    if (!window.confirm(`Unlink "${row.documentItemName || "document"}" from this service?`)) {
      return;
    }

    const nextDocs = linkedDocuments.filter((_, i) => i !== index);

    setConfigSaving(true);
    setServiceDetailsMessage("");
    try {
      await persistServiceConfigToServer(formFields, nextDocs);
    } catch (error) {
      setServiceDetailsMessage(error.message || "Failed to save.");
    } finally {
      setConfigSaving(false);
    }
  };

  const handleAddLinkedDocument = () => {
    if (!draftDocTypeId || !draftDocItemId) {
      return;
    }

    const duplicate = linkedDocuments.some(
      (row) => String(row.documentType) === String(draftDocTypeId) && String(row.documentItem) === String(draftDocItemId)
    );

    if (duplicate) {
      setServiceDetailsMessage("That document is already linked.");
      return;
    }

    const typeName = draftCategory?.categoryName;
    const itemName = draftItemOptions.find((d) => String(d._id) === String(draftDocItemId))?.name;

    setLinkedDocuments((prev) => [
      ...prev,
      {
        documentType: draftDocTypeId,
        documentItem: draftDocItemId,
        documentTypeName: typeName,
        documentItemName: itemName,
      },
    ]);
    setDraftDocTypeId("");
    setDraftDocItemId("");
    setServiceDetailsMessage("");
  };

  const addNewCategoryItem = () =>
    setNewCategoryForm((prev) => ({ ...prev, documents: [...prev.documents, { ...newCategoryItemInitial }] }));

  const removeNewCategoryItem = (i) =>
    setNewCategoryForm((prev) => ({ ...prev, documents: prev.documents.filter((_, idx) => idx !== i) }));

  const updateNewCategoryField = (field, value) => setNewCategoryForm((prev) => ({ ...prev, [field]: value }));

  const updateNewCategoryItem = (i, field, value) =>
    setNewCategoryForm((prev) => {
      const documents = [...prev.documents];
      documents[i] = { ...documents[i], [field]: value };
      return { ...prev, documents };
    });

  const handleNewCategoryItemImageUpload = async (index, file) => {
    if (!file || !uploadAdminImage) return;
    setUploadingDocItemIndex(index);
    setServiceDetailsMessage("");
    try {
      const url = await uploadAdminImage(file, "documents/types");
      if (url) updateNewCategoryItem(index, "image", url);
    } catch (err) {
      setServiceDetailsMessage(err.message || "Image upload failed.");
    } finally {
      setUploadingDocItemIndex(null);
    }
  };

  const handleSaveNewDocumentCategory = async () => {
    if (!onAddDocumentType) return;
    const categoryName = newCategoryForm.categoryName.trim();
    if (!categoryName) {
      setServiceDetailsMessage("Enter a category name before saving the new document category.");
      return;
    }

    setSavingNewCategory(true);
    setServiceDetailsMessage("");
    try {
      const payload = {
        categoryName,
        categoryOrder: Number(newCategoryForm.categoryOrder) || 0,
        isActive: newCategoryForm.isActive,
        documents: newCategoryForm.documents
          .filter((d) => d.name.trim())
          .map((d) => ({
            name: d.name.trim(),
            order: Number(d.order) || 0,
            isActive: d.isActive !== false,
            image: String(d.image || "").trim(),
          })),
      };
      const ok = await onAddDocumentType(payload);
      if (ok) {
        setNewCategoryForm(newCategoryFormInitial);
      }
    } finally {
      setSavingNewCategory(false);
    }
  };

  const handleSaveServiceFormConfig = async () => {
    if (!serviceId || !service) {
      return;
    }

    setConfigSaving(true);
    setServiceDetailsMessage("");
    try {
      await persistServiceConfigToServer(formFields, linkedDocuments);
      setEditingFieldIndex(null);
      setDraftLabel("");
      setDraftFieldType("text");
      setDraftRequired(false);
    } catch (error) {
      setServiceDetailsMessage(error.message || "Failed to save.");
    } finally {
      setConfigSaving(false);
    }
  };

  const handleDeleteServiceFormConfig = async () => {
    if (!serviceId || !service) {
      return;
    }

    if (!window.confirm("Remove all saved form fields and document links for this service?")) {
      return;
    }

    setConfigSaving(true);
    setServiceDetailsMessage("");
    try {
      await onDeleteServiceDetailsConfig(serviceId);
      setFormFields([]);
      setLinkedDocuments([]);
      setEditingFieldIndex(null);
    } catch (error) {
      setServiceDetailsMessage(error.message || "Failed to delete configuration.");
    } finally {
      setConfigSaving(false);
    }
  };

  if (!service) {
    return (
      <section className="grid gap-5">
        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-7">
          <h4 className="m-0 text-lg font-semibold text-white">Service not found</h4>
          <p className="mt-2 text-sm text-slate-300">This service could not be loaded.</p>
          <button
            type="button"
            className="mt-4 rounded-2xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100"
            onClick={() => navigate("/admin/services/my-services")}
          >
            Back to Services
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-4">
      {serviceMessage ? <p className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200">{serviceMessage}</p> : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="m-0 text-lg font-bold text-white">{service.name}</h2>
        <button
          type="button"
          className="rounded-2xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100"
          onClick={() => navigate("/admin/services/my-services")}
        >
          Back
        </button>
      </div>

      {serviceDetailsMessage ? (
        <p className="max-w-6xl rounded-xl border border-amber-400/25 bg-amber-500/10 px-3 py-2 text-sm font-semibold text-amber-100">{serviceDetailsMessage}</p>
      ) : null}
      {documentTypeMessage ? (
        <p className="max-w-6xl rounded-xl border border-cyan-400/25 bg-cyan-500/10 px-3 py-2 text-sm font-semibold text-cyan-100">{documentTypeMessage}</p>
      ) : null}

      <div className="grid w-full max-w-6xl gap-4 lg:grid-cols-[1fr_min(100%,380px)] lg:items-start lg:gap-5">
        <div className="rounded-2xl border border-white/10 bg-[#0d214d]/80 p-4 shadow-sm md:p-5">
          <p className="mb-4 border-b border-white/10 pb-3 text-xs font-medium text-slate-400">Add fields &amp; documents</p>
          {configLoading ? (
            <p className="text-sm text-slate-400">Loading configuration…</p>
          ) : (
            <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-end gap-2">
                    <label className="grid min-w-[140px] flex-1 gap-1 text-xs text-slate-400">
                      Label
                      <input
                        type="text"
                        value={draftLabel}
                        onChange={(event) => setDraftLabel(event.target.value)}
                        placeholder="e.g. Director email"
                        className={inputCls}
                      />
                    </label>
                    <label className="grid min-w-[100px] gap-1 text-xs text-slate-400">
                      Type
                      <select
                        value={draftFieldType}
                        onChange={(event) => setDraftFieldType(event.target.value)}
                        className={inputCls}
                      >
                        {FIELD_TYPE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 pb-2 text-xs text-slate-400">
                      <input type="checkbox" checked={draftRequired} onChange={(event) => setDraftRequired(event.target.checked)} className="rounded border-white/30" />
                      Required
                    </label>
                    <button
                      type="button"
                      disabled={configSaving}
                      className="rounded-xl border border-cyan-300/40 bg-cyan-500/20 px-4 py-2 text-xs font-bold text-cyan-100 disabled:opacity-50"
                      onClick={handleAddOrUpdateFormField}
                    >
                      {editingFieldIndex !== null ? (configSaving ? "Updating…" : "Update") : "Add"}
                    </button>
                    {editingFieldIndex !== null ? (
                      <button
                        type="button"
                        disabled={configSaving}
                        className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 disabled:opacity-50"
                        onClick={handleCancelEditField}
                      >
                        Cancel
                      </button>
                    ) : null}
                  </div>
                  {editingFieldIndex !== null ? (
                    <p className="text-[11px] text-slate-500">Editing a field — save changes with Update, or Cancel to add new fields.</p>
                  ) : null}
                </div>

                <div className="space-y-2 border-t border-white/10 pt-4">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
                    <label className="grid min-w-0 gap-1 text-xs text-slate-400">
                      Category
                      <select
                        value={draftDocTypeId}
                        onChange={(event) => setDraftDocTypeId(event.target.value)}
                        className={`${inputCls} w-full min-w-0 max-w-full`}
                      >
                        <option value="">—</option>
                        {sortedDocumentTypes.map((dt) => (
                          <option key={dt._id} value={dt._id}>
                            {dt.categoryName}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid min-w-0 gap-1 text-xs text-slate-400">
                      Document
                      <select
                        value={draftDocItemId}
                        onChange={(event) => setDraftDocItemId(event.target.value)}
                        disabled={!draftDocTypeId}
                        className={`${inputCls} w-full min-w-0 max-w-full disabled:opacity-50`}
                      >
                        <option value="">{draftDocTypeId ? "—" : "Pick category"}</option>
                        {draftItemOptions.map((doc) => (
                          <option key={doc._id} value={doc._id}>
                            {doc.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      type="button"
                      className="shrink-0 justify-self-start sm:justify-self-end rounded-xl border border-cyan-300/40 bg-cyan-500/20 px-4 py-2 text-xs font-bold text-cyan-100"
                      onClick={handleAddLinkedDocument}
                    >
                      Add
                    </button>
                  </div>
                </div>

                {onAddDocumentType ? (
                  <div className="space-y-3 border-t border-white/10 pt-4">
                    <p className="text-xs text-slate-500">New library category (optional — same as Add document type page)</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <input
                        type="text"
                        value={newCategoryForm.categoryName}
                        onChange={(e) => updateNewCategoryField("categoryName", e.target.value)}
                        placeholder="Category name"
                        className={inputCls}
                      />
                      <input
                        type="number"
                        min="0"
                        value={newCategoryForm.categoryOrder}
                        onChange={(e) => updateNewCategoryField("categoryOrder", e.target.value)}
                        placeholder="Order"
                        className={inputCls}
                      />
                    </div>
                    <label className="flex items-center gap-2 text-xs text-slate-400">
                      <input
                        type="checkbox"
                        checked={newCategoryForm.isActive}
                        onChange={(e) => updateNewCategoryField("isActive", e.target.checked)}
                        className="rounded border-white/30"
                      />
                      Active
                    </label>

                    <div className="flex justify-end">
                      <button type="button" className="text-xs font-bold text-cyan-200 hover:text-cyan-100" onClick={addNewCategoryItem}>
                        + Item
                      </button>
                    </div>

                    <div className="grid gap-3">
                      {newCategoryForm.documents.map((item, i) => (
                        <div key={i} className="grid gap-2 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                          <div className="grid gap-2 sm:grid-cols-2">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => updateNewCategoryItem(i, "name", e.target.value)}
                              placeholder="Item name"
                              className={inputCls}
                            />
                            <input
                              type="number"
                              min="0"
                              value={item.order}
                              onChange={(e) => updateNewCategoryItem(i, "order", e.target.value)}
                              placeholder="Order"
                              className={inputCls}
                            />
                          </div>
                          <input
                            type="url"
                            value={item.image}
                            onChange={(e) => updateNewCategoryItem(i, "image", e.target.value)}
                            placeholder="Image URL (optional)"
                            className={inputCls}
                          />
                          <div className="flex flex-wrap items-center gap-2">
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploadingDocItemIndex === i || !uploadAdminImage}
                              className="max-w-[200px] text-xs text-slate-400 file:mr-2 file:rounded-lg file:border-0 file:bg-white/10 file:px-2 file:py-1 file:text-slate-200"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                e.target.value = "";
                                if (file) handleNewCategoryItemImageUpload(i, file);
                              }}
                            />
                            {uploadingDocItemIndex === i ? <span className="text-xs text-slate-500">…</span> : null}
                            <label className="ml-auto flex items-center gap-2 text-xs text-slate-400">
                              <input
                                type="checkbox"
                                checked={item.isActive}
                                onChange={(e) => updateNewCategoryItem(i, "isActive", e.target.checked)}
                                className="rounded border-white/30"
                              />
                              Active
                            </label>
                            <button
                              type="button"
                              className="rounded-lg border border-red-300/30 bg-red-500/10 px-2 py-1 text-xs font-semibold text-red-200"
                              onClick={() => removeNewCategoryItem(i)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      disabled={savingNewCategory}
                      className="rounded-xl border border-cyan-400/40 bg-cyan-500/20 px-4 py-2 text-sm font-bold text-cyan-100 disabled:opacity-50"
                      onClick={handleSaveNewDocumentCategory}
                    >
                      {savingNewCategory ? "Saving…" : "Save category to library"}
                    </button>
                  </div>
                ) : null}

                <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4">
                  <button
                    type="button"
                    disabled={configSaving}
                    className="rounded-xl border border-cyan-400/45 bg-cyan-500/15 px-4 py-2 text-sm font-bold text-cyan-100 disabled:opacity-50"
                    onClick={handleSaveServiceFormConfig}
                  >
                    {configSaving ? "Saving…" : "Save"}
                  </button>
                  <button
                    type="button"
                    disabled={configSaving}
                    className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 disabled:opacity-50"
                    onClick={handleDeleteServiceFormConfig}
                  >
                    Clear all
                  </button>
                </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d214d]/80 p-4 shadow-sm md:p-5">
          <p className="mb-4 border-b border-white/10 pb-3 text-xs font-medium text-slate-400">On this service</p>
          {configLoading ? (
            <p className="text-sm text-slate-400">Loading…</p>
          ) : (
            <div className="space-y-5">
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-wide text-slate-500">Fields</p>
                {formFields.length ? (
                  <ul className="m-0 list-none space-y-2 p-0">
                    {formFields.map((field, index) => (
                      <li
                        key={`${field.label}-${index}`}
                        className={`flex items-start justify-between gap-2 rounded-lg border bg-white/5 px-3 py-2 text-sm text-slate-200 ${
                          editingFieldIndex === index ? "border-cyan-400/35 ring-1 ring-cyan-400/25" : "border-white/5"
                        }`}
                      >
                        <span className="min-w-0">
                          <span className="font-medium text-white">{field.label}</span>
                          <span className="mt-0.5 block text-[11px] text-slate-500">
                            {FIELD_TYPE_OPTIONS.find((o) => o.value === field.fieldType)?.label || field.fieldType}
                            {field.required ? " · required" : ""}
                          </span>
                        </span>
                        <span className="flex shrink-0 items-center gap-1">
                          <button
                            type="button"
                            className={iconBtn}
                            title="Edit field"
                            aria-label="Edit field"
                            disabled={configSaving}
                            onClick={() => handleStartEditField(index)}
                          >
                            <IconPencil />
                          </button>
                          <button
                            type="button"
                            className={`${iconBtn} hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-100`}
                            title="Remove field"
                            aria-label="Remove field"
                            disabled={configSaving}
                            onClick={() => handleDeleteFormFieldPersist(index)}
                          >
                            <IconTrash />
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="m-0 text-xs text-slate-500">None yet</p>
                )}
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="mb-2 text-[11px] uppercase tracking-wide text-slate-500">Documents</p>
                {linkedDocuments.length ? (
                  <ul className="m-0 list-none space-y-2 p-0">
                    {linkedDocuments.map((row, index) => (
                      <li
                        key={`${row.documentType}-${row.documentItem}-${index}`}
                        className="flex items-start justify-between gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-sm text-slate-200"
                      >
                        <span className="min-w-0">
                          <span className="font-medium text-white">{row.documentItemName || "Document"}</span>
                          <span className="mt-0.5 block text-[11px] text-slate-500">{row.documentTypeName || "—"}</span>
                        </span>
                        <button
                          type="button"
                          className={`${iconBtn} hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-100`}
                          title="Unlink document"
                          aria-label="Unlink document"
                          disabled={configSaving}
                          onClick={() => handleDeleteLinkedDocumentPersist(index)}
                        >
                          <IconTrash />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="m-0 text-xs text-slate-500">None yet</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ServiceDetailsPage;
