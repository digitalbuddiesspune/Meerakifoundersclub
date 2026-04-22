import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Handshake,
  Sparkles,
  Rocket,
  TrendingUp,
  Target,
  Zap,
  Phone,
  Map,
  Play,
  BarChart3,
} from 'lucide-react'

const toSlug = (value) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/* ─── Floating orbs background ─────────────────────────────────── */
function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute rounded-full"
        style={{
          width: 420,
          height: 420,
          top: '-120px',
          right: '-80px',
          background: 'radial-gradient(circle, rgba(103,232,249,0.18) 0%, transparent 70%)',
          animation: 'floatOrb1 9s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 320,
          height: 320,
          bottom: '-60px',
          left: '-60px',
          background: 'radial-gradient(circle, rgba(217,70,239,0.13) 0%, transparent 70%)',
          animation: 'floatOrb2 11s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 200,
          height: 200,
          top: '45%',
          left: '38%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
          animation: 'floatOrb3 13s ease-in-out infinite',
        }}
      />
    </div>
  )
}

/* ─── Decorative SVG grid lines ─────────────────────────────────── */
function GridLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#0e7490" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )
}

/* ─── Decorative SVG dot pattern ────────────────────────────────── */
function DotPattern({ className = '' }) {
  return (
    <svg
      className={`pointer-events-none absolute opacity-[0.12] ${className}`}
      width="240"
      height="240"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#0e7490" />
        </pattern>
      </defs>
      <rect width="240" height="240" fill="url(#dots)" />
    </svg>
  )
}

/* ─── Animated wave SVG divider ─────────────────────────────────── */
function WaveDivider({ flip = false, color = '#f1f5f9' }) {
  return (
    <div
      className="pointer-events-none absolute bottom-0 left-0 right-0 z-10"
      style={{ transform: flip ? 'scaleY(-1)' : 'none', lineHeight: 0 }}
    >
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
          d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}

/* ─── Step icon map ─────────────────────────────────────────────── */
const stepIcons = [Phone, Map, Play, BarChart3]

function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [hasStartedCount, setHasStartedCount] = useState(false)
  const [countValues, setCountValues] = useState({
    happyClients: 0,
    projects: 0,
    funding: 0,
    successRate: 0,
  })
  const impactRef = useRef(null)
  const API_BASE_URL = import.meta.env.VITE_API_URL
  const heroImageUrl =
    'https://res.cloudinary.com/dd0imqx3p/image/upload/q_auto/f_auto/v1776245645/ChatGPT_Image_Apr_15_2026_03_02_37_PM_lqev0c.png'

  const impactTargets = useMemo(
    () => ({
      happyClients: 100,
      projects: 250,
      funding: 120,
      successRate: 96,
    }),
    [],
  )

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services`)
        const data = await response.json()
        if (!response.ok) {
          setError(data.message || 'Failed to fetch services.')
          setLoading(false)
          return
        }
        setServices(Array.isArray(data) ? data : [])
      } catch {
        setError('Cannot reach server.')
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [API_BASE_URL])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0]
        if (firstEntry.isIntersecting) {
          setHasStartedCount(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    if (impactRef.current) observer.observe(impactRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStartedCount) return
    const duration = 1500
    const startTime = performance.now()
    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCountValues({
        happyClients: Math.floor(impactTargets.happyClients * progress),
        projects: Math.floor(impactTargets.projects * progress),
        funding: Math.floor(impactTargets.funding * progress),
        successRate: Math.floor(impactTargets.successRate * progress),
      })
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [hasStartedCount, impactTargets])

  const scrollToExpertServices = () => {
    const section = document.getElementById('expert-services')
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  const servicesToRender = services.slice(0, 9)

  return (
    <>
      {/* ── Global animation keyframes injected once ─────────────── */}
      <style>{`
        @keyframes floatOrb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-30px, 25px) scale(1.08); }
        }
        @keyframes floatOrb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(25px,-20px) scale(1.06); }
        }
        @keyframes floatOrb3 {
          0%,100% { transform: translate(0,0); }
          50%      { transform: translate(-15px, 20px); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes badgePulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(103,232,249,0.45); }
          50%      { box-shadow: 0 0 0 8px rgba(103,232,249,0); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes tickerBar {
          0%   { width: 0%; }
          100% { width: var(--bar-w, 96%); }
        }

        /* Hero text stagger */
        .hero-badge  { animation: fadeSlideUp .6s ease both; animation-delay: .05s; }
        .hero-h1     { animation: fadeSlideUp .7s ease both; animation-delay: .18s; }
        .hero-p      { animation: fadeSlideUp .7s ease both; animation-delay: .30s; }
        .hero-btns   { animation: fadeSlideUp .7s ease both; animation-delay: .42s; }
        .hero-img    { animation: fadeSlideUp .8s ease both; animation-delay: .22s; }

        /* Shimmer tag */
        .shimmer-tag {
          background: linear-gradient(90deg, rgba(103,232,249,0.18) 25%, rgba(103,232,249,0.38) 50%, rgba(103,232,249,0.18) 75%);
          background-size: 400px 100%;
          animation: shimmer 2.4s linear infinite;
        }

        /* Badge pulse */
        .badge-pulse { animation: badgePulse 2.2s ease-in-out infinite; }

        /* Spinning ring */
        .spin-slow { animation: spinSlow 18s linear infinite; }

        /* Service card flip */
        .service-card { perspective: 1000px; }
        .service-card-inner {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.55s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .service-card:hover .service-card-inner { transform: rotateY(180deg); }
        .service-card-front,
        .service-card-back  { position: absolute; inset: 0; backface-visibility: hidden; }
        .service-card-back  { transform: rotateY(180deg); }

        /* Step card hover lift */
        .step-card {
          transition: transform 0.28s ease, box-shadow 0.28s ease;
        }
        .step-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(14,116,144,0.12);
        }

        /* Stat card hover */
        .stat-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .stat-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 16px 36px rgba(14,116,144,0.14);
        }

        /* CTA button shine */
        .btn-shine {
          position: relative;
          overflow: hidden;
        }
        .btn-shine::after {
          content: '';
          position: absolute;
          top: 0; left: -75%;
          width: 50%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: skewX(-20deg);
          transition: left 0.45s ease;
        }
        .btn-shine:hover::after { left: 130%; }

        /* Step icon remains fixed on hover */
        .step-card:hover .step-icon {
          animation: none;
        }
      `}</style>

      <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
        <main className="relative">

          {/* ══════════════════════════════════════════════════════════
              HERO SECTION
          ══════════════════════════════════════════════════════════ */}
          <section className="relative z-10 flex min-h-screen items-start overflow-hidden bg-white px-4 pt-8 pb-16 md:sticky md:top-0 md:px-8 md:pt-12 md:pb-20">
            <FloatingOrbs />
            <GridLines />
            <DotPattern className="right-10 top-24" />

            {/* Decorative spinning ring */}
            <div className="pointer-events-none absolute right-0 top-0 hidden md:block"
              style={{ width: 340, height: 340, opacity: 0.15 }}>
              <svg className="spin-slow h-full w-full" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="170" cy="170" r="160" stroke="url(#ringGrad)" strokeWidth="1.5" strokeDasharray="14 8" />
                <circle cx="170" cy="170" r="120" stroke="url(#ringGrad)" strokeWidth="1" strokeDasharray="8 12" />
                <defs>
                  <linearGradient id="ringGrad" x1="0" y1="0" x2="340" y2="340" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#06b6d4" />
                    <stop offset="1" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Wavy lines SVG accent */}
            <svg
              className="pointer-events-none absolute right-0 top-10 hidden h-64 w-72 opacity-20 md:block"
              viewBox="0 0 200 200" fill="none"
            >
              {[50, 90, 130, 170].map((y, i) => (
                <path
                  key={y}
                  d={`M0 ${y} Q100 ${y - 50} 200 ${y}`}
                  stroke={['#c4b5fd', '#93c5fd', '#67e8f9', '#a5f3fc'][i]}
                  strokeWidth="2"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </svg>

            <div className="mx-auto grid w-full max-w-7xl items-center gap-8 md:gap-10 md:grid-cols-2">
              {/* Left copy */}
              <div>
                <p className="hero-badge shimmer-tag badge-pulse inline-flex items-center rounded-full border border-cyan-300/40 bg-cyan-300/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-800">
                  <Sparkles size={13} className="mr-2 text-cyan-500" />
                  Premium Startup Services
                </p>

                <h1 className="hero-h1 mt-5 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-[2.75rem]">
                  Build, Fund and{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-transparent bg-clip-text"
                      style={{ backgroundImage: 'linear-gradient(135deg,#06b6d4,#818cf8)' }}>
                      Scale Your Startup
                    </span>
                    <span className="absolute bottom-1 left-0 right-0 h-3 -z-10 rounded"
                      style={{ background: 'linear-gradient(90deg,rgba(6,182,212,0.14),rgba(129,140,248,0.14))' }} />
                  </span>{' '}
                  With Confidence
                </h1>

                <p className="hero-p mt-5 max-w-xl text-base leading-relaxed text-slate-500">
                  From launch strategy to investor readiness and growth execution, our experts partner with you at every
                  stage of your business journey.
                </p>

                {/* Mini icon stats row */}
                <div className="hero-p mt-6 flex flex-wrap gap-5">
                  {[
                    { icon: Rocket, label: '100+ Clients' },
                    { icon: TrendingUp, label: '96% Success' },
                    { icon: Target, label: '250+ Projects' },
                  ].map((item) => {
                    const ServiceIcon = item.icon
                    return (
                      <div key={item.label} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                          <ServiceIcon size={13} />
                        </span>
                        {item.label}
                      </div>
                    )
                  })}
                </div>

                <div className="hero-btns mt-9 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={scrollToExpertServices}
                    className="btn-shine inline-flex items-center rounded-full px-7 py-3.5 text-sm font-bold text-slate-950 shadow-lg transition-all hover:scale-105 hover:shadow-cyan-300/40"
                    style={{ background: 'linear-gradient(135deg,#22d3ee,#818cf8)' }}
                  >
                    Explore Services
                    <ArrowRight size={15} className="ml-2" />
                  </button>
                  <a
                    href="mailto:info@meraakifoundersclub.com"
                    className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition-all hover:border-cyan-400 hover:bg-cyan-50 hover:scale-105"
                  >
                    <Handshake size={15} className="mr-2 text-cyan-600" />
                    Free Consultation
                  </a>
                </div>
              </div>

              {/* Right image */}
              <div className="hero-img relative">
                {/* Glow halo */}
                <div className="absolute -inset-3 rounded-3xl blur-2xl"
                  style={{ background: 'linear-gradient(135deg,rgba(6,182,212,0.28),rgba(129,140,248,0.22))' }} />
                {/* Floating badge */}
                <div className="absolute -bottom-5 -left-5 z-20 flex items-center gap-2 rounded-2xl border border-white/60 bg-white/90 px-4 py-2.5 shadow-xl backdrop-blur">
                  <Zap size={14} className="text-amber-500" />
                  <span className="text-xs font-bold text-slate-800">Trusted by 100+ Founders</span>
                </div>
                <img
                  src={heroImageUrl}
                  alt="Service strategy discussion"
                  className="relative h-[260px] w-full rounded-3xl border border-white/60 object-cover shadow-2xl sm:h-[320px] md:h-[420px]"
                />
              </div>
            </div>

            <WaveDivider color="#f1f5f9" />
          </section>

          {/* ══════════════════════════════════════════════════════════
              SERVICES SECTION
          ══════════════════════════════════════════════════════════ */}
          <section
            id="expert-services"
            className="relative z-20 bg-white px-4 py-16 text-slate-900 md:-mt-8 md:rounded-t-[2.5rem] md:sticky md:top-0 md:min-h-screen md:px-8"
          >
            {/* Section header */}
            <div className="relative text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">
                <BadgeCheck size={12} />
                Our Expert Services
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">
                Solutions Designed For{' '}
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg,#06b6d4,#6366f1)' }}>
                  Real Startup Growth
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-500 leading-relaxed">
                Hover each card to reveal service details, pricing snapshot, and your next step.
              </p>

              {/* Decorative underline */}
              <div className="mx-auto mt-4 h-1 w-20 rounded-full"
                style={{ background: 'linear-gradient(90deg,#06b6d4,#818cf8)' }} />
            </div>

            {loading ? (
              <div className="mt-12 flex justify-center">
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-2.5 w-2.5 rounded-full bg-cyan-400"
                      style={{ animation: `floatOrb3 0.9s ease-in-out ${i * 0.18}s infinite` }} />
                  ))}
                </div>
              </div>
            ) : null}
            {error ? <p className="mt-8 text-center text-red-600">{error}</p> : null}

            {!loading && !error ? (
              <div className="mt-10 flex flex-wrap justify-center gap-5 sm:gap-6">
                {servicesToRender.map((service, idx) => (
                  <article
                    key={service._id}
                    className="service-card h-80 w-full max-w-full sm:max-w-[250px]"
                    style={{ animationDelay: `${idx * 0.07}s` }}
                  >
                    <div className="service-card-inner h-full w-full">
                      {/* Front */}
                      <div className="service-card-front relative h-full overflow-hidden rounded-2xl border border-white/40 shadow-lg">
                        <img src={service.image} alt={service.name} className="h-full w-full object-cover" />
                        <div className="absolute inset-0"
                          style={{ background: 'linear-gradient(160deg,rgba(15,23,42,0.28) 0%,rgba(15,23,42,0.62) 100%)' }} />

                        {/* Top badge */}
                        <div className="absolute left-3 top-3 flex items-center rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-cyan-700 shadow">
                          <BadgeCheck size={11} className="mr-1 text-cyan-500" />
                          Expert Service
                        </div>

                        {/* Hover hint */}
                        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-[10px] font-medium text-white backdrop-blur">
                          <span>Hover to explore</span>
                          <ArrowRight size={9} />
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <Link
                            to={`/services/${toSlug(service.name)}`}
                            className="text-center text-2xl font-bold leading-tight text-white drop-shadow-lg"
                          >
                            {service.name}
                          </Link>
                        </div>
                      </div>

                      {/* Back */}
                      <div className="service-card-back flex h-full flex-col rounded-2xl border border-cyan-200/60 shadow-xl"
                        style={{ background: 'linear-gradient(160deg,#ecfeff,#e0e7ff)' }}>
                        <img src={service.image} alt={service.name} className="h-28 w-full rounded-xl object-cover" />
                        <div className="flex flex-1 flex-col p-3">
                          <h3 className="mt-1 text-base font-bold text-slate-900">{service.name}</h3>
                          <p className="mt-1.5 text-[12px] leading-relaxed text-slate-600 line-clamp-3">{service.information}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-base font-extrabold text-cyan-700">Rs. {service.discountedPrice}</span>
                            <span className="text-sm text-slate-400 line-through">Rs. {service.price}</span>
                          </div>
                          <Link
                            to={`/services/${toSlug(service.name)}`}
                            className="btn-shine mt-auto inline-flex w-fit items-center rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white shadow transition hover:scale-105"
                            style={{ background: 'linear-gradient(135deg,#06b6d4,#6366f1)' }}
                          >
                            Learn More
                            <ArrowRight size={12} className="ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}

            {!loading && !error && servicesToRender.length === 0 ? (
              <p className="mt-8 text-center text-slate-500">No services found.</p>
            ) : null}

            <WaveDivider color="#ffffff" />
          </section>

          {/* ══════════════════════════════════════════════════════════
              IMPACT + PROCESS SECTION
          ══════════════════════════════════════════════════════════ */}
          <section
            ref={impactRef}
            className="relative z-30 min-h-screen bg-white px-4 py-20 text-slate-900 md:-mt-8 md:rounded-t-[2.5rem] md:sticky md:top-0 md:px-8"
          >
            <DotPattern className="right-0 bottom-10" />

            {/* ── Stats header ── */}
            <div className="relative text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">
                <ChartNoAxesCombined size={12} />
                Our Impact
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">
                Numbers That Prove The{' '}
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg,#06b6d4,#6366f1)' }}>
                  Momentum
                </span>
              </h2>
              <div className="mx-auto mt-4 h-1 w-20 rounded-full"
                style={{ background: 'linear-gradient(90deg,#06b6d4,#818cf8)' }} />
            </div>

            {/* ── Stat cards ── */}
            <div className="mt-12 -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 md:mx-0 md:grid md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:snap-none md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: ChartNoAxesCombined,
                  value: `${countValues.happyClients}+`,
                  label: 'Happy Clients',
                  gradient: 'from-cyan-50 to-sky-50',
                  iconColor: 'text-cyan-600',
                  iconBg: 'bg-cyan-100',
                },
                {
                  icon: BriefcaseBusiness,
                  value: `${countValues.projects}+`,
                  label: 'Projects Delivered',
                  gradient: 'from-indigo-50 to-violet-50',
                  iconColor: 'text-indigo-600',
                  iconBg: 'bg-indigo-100',
                },
                {
                  icon: TrendingUp,
                  value: `Rs. ${countValues.funding}Cr+`,
                  label: 'Funding Assisted',
                  gradient: 'from-fuchsia-50 to-pink-50',
                  iconColor: 'text-fuchsia-600',
                  iconBg: 'bg-fuchsia-100',
                },
                {
                  icon: Zap,
                  value: `${countValues.successRate}%`,
                  label: 'Client Success Rate',
                  gradient: 'from-amber-50 to-orange-50',
                  iconColor: 'text-amber-600',
                  iconBg: 'bg-amber-100',
                },
              ].map((item) => {
                const StatIcon = item.icon
                return (
                  <article
                    key={item.label}
                    className={`stat-card min-w-[84vw] snap-start rounded-2xl border border-slate-100 bg-gradient-to-br ${item.gradient} p-7 text-center shadow-sm sm:min-w-[260px] md:min-w-0`}
                  >
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor} mb-3`}>
                      <StatIcon size={20} />
                    </span>
                    <p className="text-3xl font-extrabold tracking-tight text-slate-900">{item.value}</p>
                    <p className="mt-2 text-sm font-medium text-slate-500">{item.label}</p>
                  </article>
                )
              })}
            </div>

            {/* ── Process header ── */}
            <div className="mt-20 relative text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">
                <Rocket size={12} />
                How We Work
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">
                A Proven Roadmap From{' '}
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg,#06b6d4,#6366f1)' }}>
                  Idea To Scale
                </span>
              </h2>
              <div className="mx-auto mt-4 h-1 w-20 rounded-full"
                style={{ background: 'linear-gradient(90deg,#06b6d4,#818cf8)' }} />
            </div>

            {/* ── Step cards ── */}
            <div className="mt-12 -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 md:mx-0 md:grid md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:snap-none md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Discovery Call', detail: 'We understand your vision, challenges, and growth goals.' },
                { title: 'Growth Blueprint', detail: 'We craft your custom action plan, timeline, and milestones.' },
                { title: 'Execution Sprint', detail: 'Our experts execute each phase with focused implementation.' },
                { title: 'Scale & Optimize', detail: 'We improve systems, measure KPIs, and scale sustainably.' },
              ].map((step, index) => {
                const StepIcon = stepIcons[index]
                const stepGradients = [
                  'linear-gradient(135deg,#06b6d4,#3b82f6)',
                  'linear-gradient(135deg,#818cf8,#6366f1)',
                  'linear-gradient(135deg,#f472b6,#a855f7)',
                  'linear-gradient(135deg,#fb923c,#f59e0b)',
                ]
                return (
                  <article
                    key={step.title}
                    className="step-card min-w-[84vw] snap-start rounded-2xl border border-slate-100 bg-slate-50 p-6 sm:min-w-[260px] md:min-w-0"
                  >
                    {/* Step number badge */}
                    <div className="flex items-center gap-3">
                      <span
                        className="step-icon flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md"
                        style={{ background: stepGradients[index] }}
                      >
                        <StepIcon size={18} />
                      </span>
                      <span
                        className="text-[11px] font-bold uppercase tracking-widest"
                        style={{ color: ['#06b6d4','#6366f1','#a855f7','#f59e0b'][index] }}
                      >
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-500">{step.detail}</p>

                    {/* Progress bar accent */}
                    <div className="mt-5 h-1 w-full rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-1 rounded-full"
                        style={{
                          background: stepGradients[index],
                          width: `${[55, 70, 85, 100][index]}%`,
                          transition: 'width 1.2s ease',
                        }}
                      />
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default Services