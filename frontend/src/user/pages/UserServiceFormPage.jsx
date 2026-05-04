import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_URL
const MAX_FILE_SIZE = 2 * 1024 * 1024

const labelUi = 'mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-[#F8D27A]'

const inputUi =
  'w-full rounded-xl border border-[#F0B429]/45 bg-[#0B1D3A]/90 px-4 py-2.5 text-sm font-medium text-[#F6F8FF] placeholder:text-[#CBD6FF]/65 focus:border-[#E8621A] focus:ring-2 focus:ring-[#E8621A]/35 focus:outline-none'

function buildInitialFormValues(fields) {
  const next = {}
  ;(fields || []).forEach((field, index) => {
    next[`f-${index}`] = ''
  })
  return next
}

function sortFields(fields) {
  return [...(fields || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

function normalizeDocMatchPart(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function findUserDocEntryForLink(userDocEntries, doc) {
  const wantParent = normalizeDocMatchPart(doc.documentTypeName)
  const wantType = normalizeDocMatchPart(doc.documentItemName)
  if (!wantParent || !wantType) return null
  return (
    userDocEntries.find((e) => {
      const p = normalizeDocMatchPart(e.parentCategory)
      const t = normalizeDocMatchPart(e.documentType)
      return p === wantParent && t === wantType
    }) || null
  )
}

function docRowKey(doc, i) {
  return `${doc.documentType}-${doc.documentItem}-${i}`
}

async function persistUploadedUserDocument(authUserId, parentCategoryRaw, documentItemNameRaw, file) {
  const formData = new FormData()
  formData.append('document', file)
  formData.append('folder', 'meraaki/user-documents')

  const uploadResponse = await fetch(`${API_BASE_URL}/uploads/user-document`, {
    method: 'POST',
    body: formData,
  })
  const uploadData = await uploadResponse.json()
  if (!uploadResponse.ok) {
    throw new Error(uploadData?.message || `Failed to upload: ${file.name}`)
  }

  const uploadedDocument = {
    url: uploadData.url,
    fileName: file.name,
    fileSizeBytes: file.size,
  }

  const normalizedType = String(documentItemNameRaw || '').trim().toLowerCase()
  const parentCategory = String(parentCategoryRaw || '').trim()

  const appendResponse = await fetch(
    `${API_BASE_URL}/append-user-documents/${authUserId}/${encodeURIComponent(normalizedType)}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parentCategory,
        documents: [uploadedDocument],
      }),
    },
  )

  if (appendResponse.ok) return

  const appendData = await appendResponse.json()
  if (appendResponse.status !== 404) {
    throw new Error(appendData?.message || 'Failed to save document.')
  }

  const createResponse = await fetch(`${API_BASE_URL}/add-user-document`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: authUserId,
      parentCategory,
      documentType: normalizedType,
      documents: [uploadedDocument],
    }),
  })
  const createData = await createResponse.json()
  if (!createResponse.ok) {
    throw new Error(createData?.message || 'Failed to save document.')
  }
}

function UserServiceFormPage() {
  const { authUser } = useOutletContext()
  const { serviceId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const passedService = location.state?.service
  const stateMatchesUrl = passedService && String(passedService._id) === String(serviceId)

  const [service, setService] = useState(() => (stateMatchesUrl ? passedService : null))
  const [serviceLoading, setServiceLoading] = useState(() => !stateMatchesUrl)
  const [serviceError, setServiceError] = useState('')

  const [serviceFormConfig, setServiceFormConfig] = useState(null)
  const [configLoading, setConfigLoading] = useState(true)
  const [formValues, setFormValues] = useState({})

  const [userDocEntries, setUserDocEntries] = useState([])
  const [userDocsLoading, setUserDocsLoading] = useState(false)
  const [pendingDocFiles, setPendingDocFiles] = useState({})

  const [saveError, setSaveError] = useState('')
  const [saving, setSaving] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [intakeSaved, setIntakeSaved] = useState(false)
  /** 'form' = editable intake; 'summary' = read-only submitted details (no second Save until Edit). */
  const [submissionView, setSubmissionView] = useState('form')
  const [savedSubmission, setSavedSubmission] = useState(null)

  const loadUserDocuments = useCallback(async () => {
    if (!authUser?._id) {
      setUserDocEntries([])
      return []
    }
    setUserDocsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/user-documents/${authUser._id}`)
      const data = await response.json()
      if (!response.ok) {
        setUserDocEntries([])
        return []
      }
      const list = Array.isArray(data) ? data : []
      setUserDocEntries(list)
      return list
    } catch {
      setUserDocEntries([])
      return []
    } finally {
      setUserDocsLoading(false)
    }
  }, [authUser?._id])

  useEffect(() => {
    loadUserDocuments()
  }, [loadUserDocuments])

  useEffect(() => {
    const fromState = location.state?.service
    if (fromState && String(fromState._id) === String(serviceId)) {
      setService(fromState)
      setServiceLoading(false)
      setServiceError('')
      return
    }

    const controller = new AbortController()

    const load = async () => {
      setServiceLoading(true)
      setServiceError('')
      try {
        const response = await fetch(`${API_BASE_URL}/services`, { signal: controller.signal })
        const data = await response.json()
        if (!response.ok) {
          setServiceError(data?.message || 'Failed to load service.')
          setService(null)
          return
        }
        const list = Array.isArray(data) ? data : []
        const found = list.find((s) => String(s._id) === String(serviceId))
        if (!found) {
          setServiceError('Service not found.')
          setService(null)
          return
        }
        setService(found)
      } catch (e) {
        if (e.name === 'AbortError') return
        setServiceError('Unable to load service.')
        setService(null)
      } finally {
        if (!controller.signal.aborted) setServiceLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [serviceId, location.state])

  const loadServiceDetails = useCallback(async (id, signal) => {
    const response = await fetch(`${API_BASE_URL}/service-details/service/${id}`, { signal })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new Error(data?.message || 'Failed to load service form.')
    }
    return data
  }, [])

  useEffect(() => {
    if (!serviceId) return

    const controller = new AbortController()
    setConfigLoading(true)
    setServiceFormConfig(null)

    loadServiceDetails(serviceId, controller.signal)
      .then((data) => {
        setServiceFormConfig(data)
        setFormValues(buildInitialFormValues(sortFields(data?.formFields)))
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setServiceFormConfig({
          formFields: [],
          linkedDocuments: [],
          fetchError: err.message || 'Could not load this service form.',
        })
        setFormValues({})
      })
      .finally(() => {
        if (!controller.signal.aborted) setConfigLoading(false)
      })

    return () => controller.abort()
  }, [serviceId, loadServiceDetails])

  useEffect(() => {
    if (!serviceId || !authUser?._id) return
    const fields = serviceFormConfig?.formFields
    if (!Array.isArray(fields) || fields.length === 0) return

    let cancelled = false

    const loadIntake = async () => {
      try {
        const r = await fetch(`${API_BASE_URL}/service-details/service/${serviceId}/user-intake/${authUser._id}`)
        if (!r.ok || cancelled) return
        const data = await r.json()
        if (cancelled) return

        const sortedTemplate = sortFields(fields)

        if (!data.fieldValues?.length) {
          if (!cancelled) {
            setSavedSubmission(null)
            setSubmissionView('form')
            setIntakeSaved(false)
          }
          return
        }

        const vals = [...data.fieldValues].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        const next = buildInitialFormValues(sortedTemplate)
        sortedTemplate.forEach((field, index) => {
          const v =
            vals.find((x) => String(x.label || '').trim() === String(field.label || '').trim()) || vals[index]
          next[`f-${index}`] = v?.value ?? ''
        })
        if (!cancelled) {
          setFormValues(next)
          setSavedSubmission({
            fieldValues: data.fieldValues,
            submittedAt: data.submittedAt,
          })
          setSubmissionView('summary')
          setIntakeSaved(true)
        }
      } catch {
        /* ignore */
      }
    }

    loadIntake()
    return () => {
      cancelled = true
    }
  }, [serviceId, authUser?._id, serviceFormConfig?.formFields])

  const handleFormChange = (key, value) => {
    setIntakeSaved(false)
    setFormValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleEditSubmission = () => {
    setSubmissionView('form')
    setIntakeSaved(false)
    setSaveError('')
    setSuccessModalOpen(false)
  }

  const handlePendingDocFile = (rowKey, doc, event) => {
    setIntakeSaved(false)
    setSaveError('')
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) {
      setPendingDocFiles((prev) => {
        const next = { ...prev }
        delete next[rowKey]
        return next
      })
      return
    }

    if (!doc.documentTypeName || !doc.documentItemName) {
      setSaveError('This checklist row is missing category or document name.')
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setSaveError(`"${file.name}" must be under 2MB.`)
      return
    }

    setPendingDocFiles((prev) => ({ ...prev, [rowKey]: file }))
  }

  const buildFieldValuesPayload = (fields) => {
    const sorted = sortFields(fields)
    return sorted.map((field, index) => ({
      label: field.label,
      fieldType: field.fieldType,
      order: field.order ?? index,
      value: String(formValues[`f-${index}`] ?? '').trim(),
    }))
  }

  const handleSaveAll = async () => {
    setSaveError('')
    setSuccessModalOpen(false)

    if (!authUser?._id) {
      setSaveError('Please log in to save.')
      return
    }

    const formFields = serviceFormConfig?.formFields || []
    const linkedDocuments = serviceFormConfig?.linkedDocuments || []

    const sortedFields = sortFields(formFields)
    for (let i = 0; i < sortedFields.length; i += 1) {
      const field = sortedFields[i]
      if (field.required && !String(formValues[`f-${i}`] ?? '').trim()) {
        setSaveError(`Please fill required field: ${field.label}`)
        return
      }
    }

    setSaving(true)
    try {
      const freshEntries = await loadUserDocuments()

      for (let i = 0; i < linkedDocuments.length; i += 1) {
        const doc = linkedDocuments[i]
        const key = docRowKey(doc, i)
        const existing = findUserDocEntryForLink(freshEntries, doc)
        const pending = pendingDocFiles[key]
        const hasFile = Boolean(existing?.documents?.length) || Boolean(pending)
        if (!hasFile) {
          setSaveError(`Please upload required document: ${doc.documentItemName || 'document'}`)
          return
        }
      }

      for (let i = 0; i < linkedDocuments.length; i += 1) {
        const doc = linkedDocuments[i]
        const key = docRowKey(doc, i)
        const file = pendingDocFiles[key]
        if (file) {
          await persistUploadedUserDocument(authUser._id, doc.documentTypeName, doc.documentItemName, file)
        }
      }

      const intakeResponse = await fetch(`${API_BASE_URL}/service-details/service/${serviceId}/user-intake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: String(authUser._id),
          fieldValues: buildFieldValuesPayload(formFields),
        }),
      })
      const intakeData = await intakeResponse.json().catch(() => ({}))
      if (!intakeResponse.ok) {
        throw new Error(intakeData?.message || 'Failed to save your details.')
      }

      setPendingDocFiles({})
      await loadUserDocuments()
      setSavedSubmission({
        fieldValues: intakeData.fieldValues || buildFieldValuesPayload(formFields),
        submittedAt: intakeData.submittedAt,
      })
      setSubmissionView('summary')
      setIntakeSaved(true)
      setSuccessModalOpen(true)
    } catch (e) {
      setSaveError(e.message || 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  if (serviceLoading) {
    return (
      <section className="py-8 text-sm text-white/70">Loading service…</section>
    )
  }

  if (serviceError || !service) {
    return (
      <div className="grid w-full gap-4">
        <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-6 text-sm text-red-200">
          {serviceError || 'Service not found.'}
        </div>
        <Link
          to="/user/services"
          className="inline-flex w-fit rounded-xl border border-white/15 bg-[#0B1D3A]/70 px-4 py-2.5 text-sm font-semibold text-white hover:border-[#E8621A]/50"
        >
          ← Back to services
        </Link>
      </div>
    )
  }

  const formFields = serviceFormConfig?.formFields || []
  const linkedDocuments = serviceFormConfig?.linkedDocuments || []
  const fetchError = serviceFormConfig?.fetchError
  const sortedFieldsForRender = sortFields(formFields)
  const showSubmittedSummary =
    submissionView === 'summary' && savedSubmission?.fieldValues?.length > 0
  const sortedSavedFieldRows = showSubmittedSummary
    ? [...savedSubmission.fieldValues].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : []

  return (
    <div className="w-full max-w-[1200px] pb-10 text-[#EEF3FF]">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <nav className="mb-1 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#BFD1FF]">
            <Link to="/user/services" className="text-[#F0B429] hover:text-[#F0B429]/90">
              Services
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#E9EEFF]">Intake</span>
          </nav>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#F9FBFF]">{service.name}</h1>
          <p className="mt-1 text-sm text-[#C8D6FF]">
            {showSubmittedSummary
              ? 'Your submission for this service is below. Use Edit submission to change it.'
              : ''}
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/user/services')}
          className="shrink-0 rounded-xl border border-[#F0B429]/45 bg-[#0B1D3A] px-4 py-2.5 text-sm font-semibold text-[#F9FBFF] hover:border-[#E8621A]"
        >
          ← All services
        </button>
      </div>

      {configLoading ? (
        <p className="py-6 text-sm text-white/60">Loading form…</p>
      ) : (
        <div className="flex w-full flex-col gap-10">
          {fetchError ? (
            <div className="rounded-xl border border-red-400/35 bg-red-500/10 px-4 py-3 text-sm text-red-200">{fetchError}</div>
          ) : null}

          {showSubmittedSummary ? (
            <>
              <div className="w-full rounded-xl border border-emerald-300/55 bg-emerald-500/10 p-4 sm:p-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <label className={labelUi}>Submitted details</label>
                    {savedSubmission.submittedAt ? (
                      <p className="text-xs text-[#D6FFE7]">
                        Last saved:{' '}
                        {new Date(savedSubmission.submittedAt).toLocaleString(undefined, {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </p>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={handleEditSubmission}
                    className="rounded-xl border border-[#F0B429]/45 bg-[#0B1D3A]/70 px-4 py-2 text-sm font-semibold text-[#F8FBFF] hover:border-[#E8621A]"
                  >
                    Edit submission
                  </button>
                </div>
                <div className="overflow-x-auto rounded-lg border border-[#F0B429]/35">
                  <table className="w-full min-w-[280px] text-left text-sm">
                    <thead className="bg-[#152B57] text-[11px] uppercase tracking-[0.08em] text-[#F0B429]">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Field</th>
                        <th className="px-4 py-3 font-semibold">Your answer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedSavedFieldRows.map((row, idx) => (
                        <tr key={`${row.label}-${idx}`} className="border-t border-[#F0B429]/20">
                          <td className="px-4 py-3 font-semibold text-[#F6F9FF]">{row.label}</td>
                          <td className="px-4 py-3 text-[#DEE8FF]">
                            {row.value ? (
                              <span className="whitespace-pre-wrap break-words">{row.value}</span>
                            ) : (
                              <span className="text-white/40">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="w-full rounded-xl border border-[#F0B429]/35 bg-[#0D214D]/70 p-4 sm:p-5">
                <label className={labelUi}>Documents on file</label>
                <p className="mb-3 text-xs text-[#C8D6FF]">Files stored in your account for this checklist.</p>
                {linkedDocuments.length === 0 ? (
                  <p className="text-sm text-white/55">No documents were required for this service.</p>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-[#F0B429]/35">
                    <table className="w-full min-w-[300px] text-left text-sm">
                      <thead className="bg-[#152B57] text-[11px] uppercase tracking-[0.08em] text-[#F0B429]">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Document</th>
                          <th className="px-4 py-3 font-semibold">Category</th>
                          <th className="px-4 py-3 font-semibold">Files</th>
                        </tr>
                      </thead>
                      <tbody>
                        {linkedDocuments.map((doc, i) => {
                          const rowKey = docRowKey(doc, i)
                          const existing = findUserDocEntryForLink(userDocEntries, doc)
                          return (
                            <tr key={rowKey} className="border-t border-[#F0B429]/20 align-top">
                              <td className="px-4 py-3 font-semibold text-[#F8FBFF]">
                                {doc.documentItemName || 'Document'}
                              </td>
                              <td className="px-4 py-3">
                                <span className="inline-flex rounded-full border border-[#E8621A]/30 bg-[#E8621A]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#E8621A]">
                                  {doc.documentTypeName || '—'}
                                </span>
                              </td>
                              <td className="max-w-[280px] px-4 py-3 text-xs text-[#DEE8FF]">
                                {existing?.documents?.length ? (
                                  <ul className="m-0 list-none space-y-1 p-0">
                                    {existing.documents.map((d) => (
                                      <li key={`${d.url}-${d.uploadedAt}`}>
                                        <a
                                          href={d.url}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="break-all text-[#9EC5FF] hover:underline"
                                        >
                                          {d.fileName || 'View file'}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <span className="text-white/45">—</span>
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          ) : null}

          {!showSubmittedSummary ? (
            <>
          <div className="w-full">
            <label className={labelUi}>Your details</label>
            {formFields.length === 0 ? (
              <p className="text-sm text-white/55">
                There is no custom intake form for this service yet. Contact the team if you need help getting started.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {sortedFieldsForRender.map((field, index) => {
                  const key = `f-${index}`
                  const id = `svc-field-${service._id}-${index}`
                  const label = (
                    <label htmlFor={id} className={labelUi}>
                      {field.label}
                      {field.required ? <span className="text-red-400"> *</span> : null}
                    </label>
                  )

                  if (field.fieldType === 'textarea') {
                    return (
                      <div key={key} className="grid gap-1.5 sm:col-span-2">
                        {label}
                        <textarea
                          id={id}
                          rows={4}
                          value={formValues[key] ?? ''}
                          onChange={(e) => handleFormChange(key, e.target.value)}
                          className={inputUi}
                          placeholder={field.label}
                        />
                      </div>
                    )
                  }

                  return (
                    <div key={key} className="grid gap-1.5">
                      {label}
                      <input
                        id={id}
                        type={
                          field.fieldType === 'number'
                            ? 'number'
                            : field.fieldType === 'email'
                              ? 'email'
                              : field.fieldType === 'tel'
                                ? 'tel'
                                : 'text'
                        }
                        value={formValues[key] ?? ''}
                        onChange={(e) => handleFormChange(key, e.target.value)}
                        className={inputUi}
                        placeholder={field.label}
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="w-full rounded-xl border border-[#F0B429]/30 bg-[#0D214D]/60 p-5">
            <label className={labelUi}>Documents you may need</label>
           

            {saveError ? <p className="mb-3 text-sm text-red-300">{saveError}</p> : null}

            <div className="overflow-x-auto rounded-lg border border-[#F0B429]/30">
              {linkedDocuments.length === 0 ? (
                <p className="text-sm text-white/55">No document checklist linked for this service yet.</p>
              ) : (
                <table className="w-full min-w-[320px] text-left">
                  <thead className="border-b border-[#F0B429]/35 bg-[#152B57] text-[11px] uppercase tracking-[0.1em] text-[#F0B429]">
                    <tr>
                      <th className="px-2 py-3 font-semibold sm:px-4"> </th>
                      <th className="px-2 py-3 font-semibold sm:px-4">Document</th>
                      <th className="px-2 py-3 font-semibold sm:px-4">Category</th>
                      <th className="px-2 py-3 font-semibold sm:px-4">Your files</th>
                      <th className="px-2 py-3 font-semibold sm:px-4">
                        File{linkedDocuments.length ? ' *' : ''}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {linkedDocuments.map((doc, i) => {
                      const rowKey = docRowKey(doc, i)
                      const existing = findUserDocEntryForLink(userDocEntries, doc)
                      const pending = pendingDocFiles[rowKey]

                      return (
                        <tr key={rowKey} className="border-t border-[#F0B429]/20 align-top">
                          <td className="px-2 py-3 sm:px-4">
                            {doc.documentItemImage ? (
                              <img
                                src={doc.documentItemImage}
                                alt=""
                                className="h-10 w-10 rounded-lg object-cover ring-1 ring-white/10"
                              />
                            ) : (
                              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-base" aria-hidden>
                                📄
                              </span>
                            )}
                          </td>
                          <td className="px-2 py-3 sm:px-4">
                            <p className="text-sm font-semibold text-[#F8FBFF]">{doc.documentItemName || 'Document'}</p>
                          </td>
                          <td className="px-2 py-3 sm:px-4">
                            <span className="inline-flex rounded-full border border-[#E8621A]/30 bg-[#E8621A]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#E8621A]">
                              {doc.documentTypeName || '—'}
                            </span>
                          </td>
                          <td className="max-w-[220px] px-2 py-3 sm:px-4">
                            {userDocsLoading ? (
                              <span className="text-xs text-white/45">…</span>
                            ) : (
                              <div className="space-y-1 text-xs text-white/80">
                                {existing?.documents?.length ? (
                                  <ul className="m-0 list-none space-y-1 p-0">
                                    {existing.documents.map((d) => (
                                      <li key={`${d.url}-${d.uploadedAt}`}>
                                        <a
                                          href={d.url}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="break-all text-[#9EC5FF] hover:underline"
                                        >
                                          {d.fileName || 'View file'}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                ) : null}
                                {pending ? (
                                  <p className="text-[#F0B429]">Pending: {pending.name}</p>
                                ) : !existing?.documents?.length ? (
                                  <span className="text-white/45">—</span>
                                ) : null}
                              </div>
                            )}
                          </td>
                          <td className="px-2 py-3 sm:px-4">
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,image/*"
                              disabled={saving || !authUser?._id}
                              onChange={(e) => handlePendingDocFile(rowKey, doc, e)}
                              className="max-w-[200px] text-xs text-[#E4ECFF] file:mr-2 file:rounded-lg file:border-0 file:bg-[#E8621A] file:px-2 file:py-1.5 file:text-white disabled:opacity-50"
                            />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="w-full rounded-xl border border-[#F0B429]/30 bg-[#0D214D]/60 p-5">
            <button
              type="button"
              disabled={saving || !authUser?._id || intakeSaved}
              onClick={handleSaveAll}
              className={`rounded-xl px-8 py-3 text-sm font-bold shadow-lg ${
                intakeSaved && !saving
                  ? 'cursor-default bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-emerald-900/30 disabled:opacity-100'
                  : 'bg-gradient-to-r from-[#E8621A] to-amber-500 text-white shadow-[#E8621A]/20 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50'
              }`}
            >
              {saving ? 'Saving…' : intakeSaved ? 'Saved' : 'Save'}
            </button>
            {!authUser?._id ? <p className="mt-2 text-xs text-[#C8D6FF]">Log in to save.</p> : null}
          </div>
            </>
          ) : null}
        </div>
      )}

      {successModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="intake-success-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#F0B429]/45 bg-[#0B1D3A] p-6 shadow-xl">
            <h2 id="intake-success-title" className="text-lg font-bold text-[#F8FBFF]">
              Document added successfully
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#D9E4FF]">
              Your submission is saved. You can review it in the summary below.
            </p>
            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#E8621A] to-amber-500 py-3 text-sm font-bold text-white hover:opacity-95"
              onClick={() => setSuccessModalOpen(false)}
            >
              OK
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default UserServiceFormPage
