import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import heroMembershipsImg from '../assets/hero-memberships.jpg'
import { useNavigate, useOutletContext } from 'react-router-dom'

function Memberships() {
  const [memberships, setMemberships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isAuthenticated, onOpenAuth } = useOutletContext()
  const navigate = useNavigate()
  const API_BASE_URL = import.meta.env.VITE_API_URL

  const handleSubscribe = (plan) => {
    if (!isAuthenticated) {
      onOpenAuth()
      return
    }
    navigate('/checkout', { state: { plan } })
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
    <main className="min-h-screen">
      {/* ── Dark hero header ── */}
      <section className="relative overflow-hidden bg-[#070D1A] px-4 py-20 text-white md:py-28">
        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(242,101,39,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(242,101,39,0.06) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        {/* Orbs */}
        <div
          className="pointer-events-none absolute -top-32 right-[8%] h-[460px] w-[460px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(242,101,39,0.2) 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-20 h-[360px] w-[360px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,140,66,0.12) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-2">
          {/* Left: text */}
          <div>
            <p className="mb-5 inline-flex items-center rounded-full border border-[#F26527]/40 bg-[#F26527]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FF9C73]">
              ✦ &nbsp; Membership Plans
            </p>
            <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight">
              Choose Your{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg,#F26527,#FFB382)' }}
              >
                Plan
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/55 md:text-lg">
              Access founder-first benefits, exclusive events, and practical support with a plan that fits your startup stage.
            </p>

            {/* Value highlights */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: '🤝', label: 'Expert Mentors' },
                { icon: '📅', label: 'Exclusive Events' },
                { icon: '⚡', label: 'Priority Support' },
                { icon: '🌐', label: 'Partner Network' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/65"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: hero image */}
          <div className="relative mt-8 md:mt-0">
            {/* Glow halo */}
            <div
              className="absolute -inset-3 rounded-3xl blur-2xl"
              style={{ background: 'linear-gradient(135deg,rgba(242,101,39,0.28),rgba(255,140,66,0.2))' }}
            />
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 z-20 flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 shadow-xl backdrop-blur">
              <span className="text-sm">🚀</span>
              <span className="text-xs font-bold text-white">Plans Starting at ₹999</span>
            </div>
            <img
              src={heroMembershipsImg}
              alt="Startup growth and success"
              className="relative h-[300px] w-full rounded-3xl border border-white/20 object-cover shadow-2xl md:h-[400px]"
            />
          </div>
        </div>

        {/* Wave divider */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
            <path d="M0,28 C360,56 1080,0 1440,28 L1440,56 L0,56 Z" fill="#FAFAF8" />
          </svg>
        </div>
      </section>

      {/* ── Membership cards ── */}
      <section className="bg-[#FAFAF8] px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <div>

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
                  onClick={() => handleSubscribe(plan)}
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
        </div>
      </div>
      </section>
    </main>
  )
}

export default Memberships
