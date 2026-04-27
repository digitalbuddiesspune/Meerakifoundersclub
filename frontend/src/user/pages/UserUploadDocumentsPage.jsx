import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_URL
const MAX_FILE_SIZE = 2 * 1024 * 1024

function UserUploadDocumentsPage() {
  const { authUser } = useOutletContext()
  const [parentCategory, setParentCategory] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [documentTypeOptions, setDocumentTypeOptions] = useState([])
  const [selectedFilesByDocument, setSelectedFilesByDocument] = useState({})
  const [previewUrlsByDocument, setPreviewUrlsByDocument] = useState({})
  const [isLoadingDocumentTypes, setIsLoadingDocumentTypes] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [existingDocuments, setExistingDocuments] = useState([])
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(true)

  const loadExistingDocuments = async () => {
    if (!authUser?._id) return
    setIsLoadingDocuments(true)
    try {
      const response = await fetch(`${API_BASE_URL}/user-documents/${authUser._id}`)
      const data = await response.json()
      if (!response.ok) {
        setError(data?.message || 'Failed to fetch uploaded documents.')
        return
      }
      setExistingDocuments(Array.isArray(data) ? data : [])
    } catch {
      setError('Unable to fetch uploaded documents.')
    } finally {
      setIsLoadingDocuments(false)
    }
  }

  useEffect(() => {
    loadExistingDocuments()
  }, [authUser?._id])

  useEffect(() => {
    const loadDocumentTypes = async () => {
      setIsLoadingDocumentTypes(true)
      try {
        const response = await fetch(`${API_BASE_URL}/document-types`)
        const data = await response.json()
        if (!response.ok) {
          setError(data?.message || 'Failed to fetch document types.')
          return
        }
        setDocumentTypeOptions(Array.isArray(data) ? data : [])
      } catch {
        setError('Unable to fetch document types.')
      } finally {
        setIsLoadingDocumentTypes(false)
      }
    }

    loadDocumentTypes()
  }, [])

  useEffect(() => {
    return () => {
      Object.values(previewUrlsByDocument).forEach((url) => URL.revokeObjectURL(url))
    }
  }, [previewUrlsByDocument])

  const handleDocumentFileChange = (documentName, event) => {
    setError('')
    setMessage('')
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    if (selectedFile.size > MAX_FILE_SIZE) {
      event.target.value = ''
      setSelectedFilesByDocument((prev) => {
        const next = { ...prev }
        delete next[documentName]
        return next
      })
      setPreviewUrlsByDocument((prev) => {
        const next = { ...prev }
        if (next[documentName]) {
          URL.revokeObjectURL(next[documentName])
          delete next[documentName]
        }
        return next
      })
      setError(`"${selectedFile.name}" is invalid. Each document must be less than 2MB.`)
      return
    }

    const nextPreviewUrl = selectedFile.type?.startsWith('image/') ? URL.createObjectURL(selectedFile) : ''
    setSelectedFilesByDocument((prev) => ({
      ...prev,
      [documentName]: selectedFile,
    }))
    setPreviewUrlsByDocument((prev) => {
      const next = { ...prev }
      if (next[documentName]) {
        URL.revokeObjectURL(next[documentName])
      }
      if (nextPreviewUrl) next[documentName] = nextPreviewUrl
      else delete next[documentName]
      return next
    })
  }

  const selectedCategory = documentTypeOptions.find(
    (category) => String(category._id || '') === selectedCategoryId,
  )
  const requiredDocuments = (selectedCategory?.documents || [])
    .filter((item) => item?.isActive !== false)
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')

    if (!authUser?._id) {
      setError('User not found. Please login again.')
      return
    }
    if (!parentCategory.trim()) {
      setError('Parent category is required.')
      return
    }
    if (!requiredDocuments.length) {
      setError('No active document types found for selected category.')
      return
    }

    const missingDocument = requiredDocuments.find(
      (item) => !selectedFilesByDocument[String(item.name || '').trim()],
    )
    if (missingDocument) {
      setError(`Please upload required document: ${missingDocument.name}`)
      return
    }

    setIsSubmitting(true)
    try {
      for (const item of requiredDocuments) {
        const documentName = String(item.name || '').trim()
        const file = selectedFilesByDocument[documentName]
        if (!file) continue

        const formData = new FormData()
        formData.append('document', file)
        formData.append('folder', 'meraaki/user-documents')

        const uploadResponse = await fetch(`${API_BASE_URL}/uploads/user-document`, {
          method: 'POST',
          body: formData,
        })
        const uploadData = await uploadResponse.json()
        if (!uploadResponse.ok) {
          throw new Error(uploadData?.message || `Failed to upload file: ${file.name}`)
        }

        const uploadedDocument = {
          url: uploadData.url,
          fileName: file.name,
          fileSizeBytes: file.size,
        }

        const normalizedType = documentName.toLowerCase()
        const appendResponse = await fetch(
          `${API_BASE_URL}/append-user-documents/${authUser._id}/${encodeURIComponent(normalizedType)}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              parentCategory,
              documents: [uploadedDocument],
            }),
          },
        )

        if (appendResponse.ok) continue

        const appendData = await appendResponse.json()
        if (appendResponse.status !== 404) {
          throw new Error(appendData?.message || `Failed to append documents for ${documentName}.`)
        }

        const createResponse = await fetch(`${API_BASE_URL}/add-user-document`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: authUser._id,
            parentCategory,
            documentType: normalizedType,
            documents: [uploadedDocument],
          }),
        })
        const createData = await createResponse.json()
        if (!createResponse.ok) {
          throw new Error(createData?.message || `Failed to save uploaded document for ${documentName}.`)
        }
      }

      setMessage('All required documents uploaded successfully.')
      setParentCategory('')
      setSelectedCategoryId('')
      setSelectedFilesByDocument({})
      setPreviewUrlsByDocument((prev) => {
        Object.values(prev).forEach((url) => URL.revokeObjectURL(url))
        return {}
      })
      event.target.reset()
      await loadExistingDocuments()
    } catch (submitError) {
      setError(submitError.message || 'Failed to upload documents.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight">Upload Documents</h1>
        <p className="mt-1 text-sm text-white/65">Each document must be less than 2MB.</p>
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="parentCategory" className="mb-1 block text-sm font-medium text-white/85">
              Parent Category
            </label>
            <select
              id="parentCategory"
              value={selectedCategoryId}
              onChange={(event) => {
                const nextCategoryId = event.target.value
                const nextCategory = documentTypeOptions.find(
                  (category) => String(category._id || '') === nextCategoryId,
                )
                setSelectedCategoryId(nextCategoryId)
                setParentCategory(String(nextCategory?.categoryName || '').trim())
                setSelectedFilesByDocument({})
                setPreviewUrlsByDocument((prev) => {
                  Object.values(prev).forEach((url) => URL.revokeObjectURL(url))
                  return {}
                })
              }}
              className="w-full rounded-xl border border-white/15 bg-[#0B1D3A]/70 px-4 py-2.5 text-sm text-white focus:border-[#E8621A]/60 focus:outline-none"
              required
              disabled={isLoadingDocumentTypes}
            >
              <option value="" disabled>
                {isLoadingDocumentTypes ? 'Loading categories...' : 'Select parent category'}
              </option>
              {documentTypeOptions.map((category) => (
                <option key={category._id || category.categoryName} value={String(category._id || '')}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          {selectedCategoryId ? (
            <div className="space-y-3 rounded-xl border border-white/10 bg-[#0B1D3A]/45 p-3">
              <p className="text-sm font-semibold text-white/90">Upload all required documents</p>
              {requiredDocuments.length ? (
                requiredDocuments.map((item) => {
                  const documentName = String(item.name || '').trim()
                  const selectedFile = selectedFilesByDocument[documentName]
                  const previewUrl = previewUrlsByDocument[documentName]
                  return (
                    <div key={item._id || documentName}>
                      <label htmlFor={`doc-${documentName}`} className="mb-1 block text-sm font-medium text-white/85">
                        {documentName}
                      </label>
                      <input
                        id={`doc-${documentName}`}
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,image/*"
                        onChange={(event) => handleDocumentFileChange(documentName, event)}
                        className="w-full rounded-xl border border-white/15 bg-[#0B1D3A]/70 px-4 py-2.5 text-sm text-white file:mr-3 file:rounded-lg file:border-0 file:bg-[#E8621A] file:px-3 file:py-1.5 file:text-white"
                        required
                      />
                      {selectedFile ? (
                        <div className="mt-2 rounded-lg border border-white/10 bg-white/5 p-2.5">
                          <p className="text-xs text-white/80">
                            Selected: <span className="font-semibold">{selectedFile.name}</span>
                          </p>
                          <p className="mt-0.5 text-[11px] text-white/60">
                            Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          {previewUrl ? (
                            <img
                              src={previewUrl}
                              alt={`${documentName} preview`}
                              className="mt-2 h-24 w-24 rounded-lg border border-white/10 object-cover"
                            />
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  )
                })
              ) : (
                <p className="text-sm text-white/65">No document types found in this category.</p>
              )}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting || !selectedCategoryId}
            className="inline-flex items-center justify-center rounded-xl bg-[#E8621A] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Uploading...' : 'Upload Documents'}
          </button>
        </form>

        {message ? <p className="mt-3 text-sm text-emerald-300">{message}</p> : null}
        {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
      </section>

      <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
        <h2 className="text-lg font-bold">My Documents</h2>
        {isLoadingDocuments ? <p className="mt-2 text-sm text-white/65">Loading documents...</p> : null}
        {!isLoadingDocuments && !existingDocuments.length ? (
          <p className="mt-2 text-sm text-white/65">No documents uploaded yet.</p>
        ) : null}
        {!isLoadingDocuments && existingDocuments.length ? (
          <div className="mt-3 space-y-3">
            {existingDocuments.map((entry) => (
              <div key={entry._id} className="rounded-xl border border-white/10 bg-[#0B1D3A]/60 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F0B429]">
                  {entry.parentCategory ? `${entry.parentCategory} - ` : ''}
                  {entry.documentType}
                </p>
                <ul className="mt-2 space-y-1 text-sm text-white/80">
                  {(entry.documents || []).map((doc) => (
                    <li key={`${doc.url}-${doc.uploadedAt}`}>
                      <a href={doc.url} target="_blank" rel="noreferrer" className="text-[#9EC5FF] hover:underline">
                        {doc.fileName || 'View document'}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </>
  )
}

export default UserUploadDocumentsPage
