import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_URL

const formatCurrency = (value) => {
  const amount = Number(value || 0)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function UserServicesPage() {
  const navigate = useNavigate()
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadServices = async () => {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(`${API_BASE_URL}/services`, { signal: controller.signal })
        const data = await response.json()

        if (!response.ok) {
          setError(data?.message || 'Failed to load services.')
          return
        }

        setServices(Array.isArray(data) ? data : [])
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') return
        setError('Unable to fetch services. Please check backend/API URL.')
      } finally {
        setIsLoading(false)
      }
    }

    loadServices()

    return () => controller.abort()
  }, [])

  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return services

    return services.filter((service) =>
      [service.name, service.category, service.information, service.support]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    )
  }, [services, searchQuery])

  const openService = (service) => {
    if (!service._id) return
    navigate(`/user/services/${service._id}`, { state: { service } })
  }

  const handleRowKeyDown = (event, service) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openService(service)
    }
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight">Services</h1>
        <p className="mt-1 text-sm text-slate-500">Select a service to open its full form and document checklist.</p>
      </div>

      <section className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <label htmlFor="service-search" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
          Search Services
        </label>
        <input
          id="service-search"
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search by name, category, info or support..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#E8621A]/60 focus:outline-none"
        />
      </section>

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">Loading services...</div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-sm text-red-200">{error}</div>
      ) : null}

      {!isLoading && !error ? (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full text-left">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-[0.1em] text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Image</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Info</th>
                  <th className="px-4 py-3 font-semibold">Original Price</th>
                  <th className="px-4 py-3 font-semibold">Discount Price</th>
                  <th className="px-4 py-3 font-semibold">Projects</th>
                  <th className="px-4 py-3 font-semibold">Support</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service) => (
                  <tr
                    key={service._id || service.name}
                    role="button"
                    tabIndex={0}
                    onClick={() => openService(service)}
                    onKeyDown={(e) => handleRowKeyDown(e, service)}
                    className="cursor-pointer border-t border-slate-200 align-top transition-colors hover:bg-[#E8621A]/10 focus:bg-[#E8621A]/15 focus:outline-none"
                  >
                    <td className="px-4 py-3">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="h-14 w-20 rounded-lg object-cover"
                        loading="lazy"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900">{service.name}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-[#E8621A]/30 bg-[#E8621A]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#E8621A]">
                        {service.category || 'General'}
                      </span>
                    </td>
                    <td className="max-w-[320px] px-4 py-3 text-xs text-slate-600">
                      <p className="line-clamp-3">{service.information}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{formatCurrency(service.price)}</td>
                    <td className="px-4 py-3 text-sm font-extrabold text-[#F0B429]">
                      {formatCurrency(service.discountedPrice)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-blue-200 bg-blue-400/10 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                        {service.projectsCount || 0}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{service.support || '-'}</td>
                  </tr>
                ))}
                {!filteredServices.length ? (
                  <tr className="border-t border-slate-200">
                    <td colSpan={8} className="px-4 py-6 text-center text-sm text-slate-500">
                      No services found for this search.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </>
  )
}

export default UserServicesPage
