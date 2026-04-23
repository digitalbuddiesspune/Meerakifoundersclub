import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useNavigate, useOutletContext } from 'react-router-dom'

function Memberships() {
  const [memberships, setMemberships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isAuthenticated, onOpenAuth } = useOutletContext()
  const navigate = useNavigate()
  const API_BASE_URL = import.meta.env.VITE_API_URL

  const handleSubscribe = () => {
    if (!isAuthenticated) {
      onOpenAuth()
      return
    }
    navigate('/checkout')
  }

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/memberships`)
        const data = await response.json()
        if (!response.ok) {
          setError(data.message || 'Failed to fetch membership plans.')
          setLoading(false)
          return
        }
        setMemberships(Array.isArray(data) ? data : [])
      } catch {
        setError('Cannot reach server.')
      } finally {
        setLoading(false)
      }
    }

    fetchMemberships()
  }, [API_BASE_URL])

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-14 md:px-8 md:py-20">
      <section className="mx-auto w-full max-w-7xl">
        <div className="text-center">
          <p className="inline-flex items-center rounded-full border border-[#F26527]/30 bg-[#F26527]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F26527]">
            Membership
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0F0F0D] md:text-5xl">
            Choose Your Plan
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            Access founder-first benefits, exclusive events, and practical support with a plan that fits your startup stage.
          </p>
        </div>

        {loading ? (
          <div className="mt-12 text-center text-slate-500">Loading membership plans...</div>
        ) : null}

        {error ? (
          <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 px-4 py-5 text-center text-red-600">
            {error}
          </div>
        ) : null}

        {!loading && !error ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {memberships.map((plan) => (
              <article
                key={plan._id}
                className="flex h-full flex-col rounded-2xl border border-[#EBEBEA] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <h2 className="text-2xl font-extrabold text-[#0F0F0D]">{plan.planName}</h2>
                <p className="mt-1 text-sm font-medium text-[#F26527]">{plan.renewal}</p>

                <div className="mt-5 flex items-end gap-2">
                  <span className="text-3xl font-extrabold text-[#0F0F0D]">Rs. {plan.disccountedPrice}</span>
                  {plan.price !== plan.disccountedPrice ? (
                    <span className="pb-1 text-sm text-slate-400 line-through">Rs. {plan.price}</span>
                  ) : null}
                </div>

                <ul className="mt-5 h-[170px] space-y-2.5 overflow-y-auto pr-1">
                  {(plan.features || []).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#F26527]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={handleSubscribe}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#F26527] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 hover:cursor-pointer"
                >
                  Subscribe Plan
                </button>
              </article>
            ))}
          </div>
        ) : null}

        {!loading && !error && memberships.length === 0 ? (
          <p className="mt-12 text-center text-slate-500">No membership plans found.</p>
        ) : null}
      </section>
    </main>
  )
}

export default Memberships
