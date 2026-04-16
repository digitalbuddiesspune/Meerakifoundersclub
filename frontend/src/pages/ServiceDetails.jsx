import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  ChartNoAxesCombined,
  Clock3,
  Handshake,
  Layers,
  Monitor,
  Wrench,
  Zap,
  Star,
  ExternalLink,
} from 'lucide-react'
import Footer from '../components/Footer'
import Header from '../components/Header'

/* ─── Floating orbs ─────────────────────────────────────────────── */
function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute rounded-full"
        style={{ width: 380, height: 380, top: '-100px', left: '-80px',
          background: 'radial-gradient(circle,rgba(103,232,249,0.18) 0%,transparent 70%)',
          animation: 'floatA 10s ease-in-out infinite' }} />
      <div className="absolute rounded-full"
        style={{ width: 300, height: 300, bottom: '-60px', right: '-50px',
          background: 'radial-gradient(circle,rgba(139,92,246,0.15) 0%,transparent 70%)',
          animation: 'floatB 12s ease-in-out infinite' }} />
      <div className="absolute rounded-full"
        style={{ width: 180, height: 180, top: '40%', right: '25%',
          background: 'radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 70%)',
          animation: 'floatC 8s ease-in-out infinite' }} />
    </div>
  )
}

/* ─── SVG grid overlay ──────────────────────────────────────────── */
function GridLines() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.055]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="sdgrid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#0e7490" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sdgrid)" />
    </svg>
  )
}

/* ─── Dot pattern ───────────────────────────────────────────────── */
function DotPattern({ className = '' }) {
  return (
    <svg className={`pointer-events-none absolute opacity-[0.1] ${className}`} width="220" height="220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="sddots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="#0e7490" />
        </pattern>
      </defs>
      <rect width="220" height="220" fill="url(#sddots)" />
    </svg>
  )
}

/* ─── Wave divider ──────────────────────────────────────────────── */
function WaveDivider({ color = '#f1f5f9' }) {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10" style={{ lineHeight: 0 }}>
      <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,28 C480,56 960,0 1440,28 L1440,56 L0,56 Z" fill={color} />
      </svg>
    </div>
  )
}

function ServiceDetails({ isAuthenticated, authUser, onOpenAuth, onLogout }) {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const API_BASE_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services/${slug}`)
        const data = await response.json()
        if (!response.ok) {
          setError(data.message || 'Service not found.')
          setLoading(false)
          return
        }
        setService(data)
      } catch {
        setError('Cannot reach server.')
      } finally {
        setLoading(false)
      }
    }
    fetchService()
  }, [API_BASE_URL, slug])

  const allTechnologies = useMemo(() => {
    if (service?.toolsWeUsed?.length) return service.toolsWeUsed
    if (!service?.projects?.length) return []
    const technologies = service.projects.flatMap((project) => project.technologiesUsed || [])
    return [...new Set(technologies.filter(Boolean).map((t) => t.trim()))]
  }, [service])

  return (
    <>
      <style>{`
        @keyframes floatA {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(20px,-25px) scale(1.07); }
        }
        @keyframes floatB {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-18px,22px) scale(1.05); }
        }
        @keyframes floatC {
          0%,100% { transform: translate(0,0); }
          50%      { transform: translate(12px,-14px); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position:-400px 0; }
          100% { background-position:400px 0; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes popIn {
          0%   { opacity:0; transform:scale(0.88); }
          100% { opacity:1; transform:scale(1); }
        }

        .fade-up-1 { animation: fadeUp .6s ease both .05s; }
        .fade-up-2 { animation: fadeUp .6s ease both .18s; }
        .fade-up-3 { animation: fadeUp .6s ease both .30s; }
        .fade-up-4 { animation: fadeUp .6s ease both .42s; }
        .fade-up-img { animation: fadeUp .75s ease both .22s; }

        .shimmer-badge {
          background: linear-gradient(90deg,rgba(103,232,249,0.18) 25%,rgba(103,232,249,0.40) 50%,rgba(103,232,249,0.18) 75%);
          background-size: 400px 100%;
          animation: shimmer 2.4s linear infinite;
        }

        .spin-ring { animation: spinSlow 22s linear infinite; }

        /* Stat mini cards */
        .stat-mini {
          transition: transform .24s ease, box-shadow .24s ease;
        }
        .stat-mini:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow: 0 12px 28px rgba(14,116,144,0.13);
        }

        /* Project cards */
        .project-card {
          transition: transform .28s ease, box-shadow .28s ease;
        }
        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 44px rgba(14,116,144,0.12);
        }
        .project-card:hover .proj-img {
          transform: scale(1.04);
        }
        .proj-img {
          transition: transform .4s ease;
        }

        /* Tech pill hover */
        .tech-pill {
          transition: transform .2s ease, background .2s ease, box-shadow .2s ease;
        }
        .tech-pill:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg,#ecfeff,#e0e7ff);
          box-shadow: 0 4px 14px rgba(6,182,212,0.15);
        }

        /* CTA button shine */
        .btn-shine {
          position: relative;
          overflow: hidden;
          transition: transform .22s ease, box-shadow .22s ease;
        }
        .btn-shine::after {
          content:'';
          position:absolute;
          top:0; left:-75%;
          width:50%; height:100%;
          background:linear-gradient(120deg,transparent,rgba(255,255,255,0.32),transparent);
          transform:skewX(-20deg);
          transition:left .45s ease;
        }
        .btn-shine:hover { transform: scale(1.04); }
        .btn-shine:hover::after { left:130%; }

        /* Demo/quote button */
        .action-btn {
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(6,182,212,0.22);
        }

        /* Pop-in for cards */
        .pop-in { animation: popIn .45s cubic-bezier(.34,1.56,.64,1) both; }
      `}</style>

      <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
        <Header
          isAuthenticated={isAuthenticated}
          authUser={authUser}
          onOpenAuth={onOpenAuth}
          onLogout={onLogout}
        />

        {/* ── Loading ── */}
        {loading ? (
          <main className="mx-auto max-w-7xl px-4 py-24 text-center md:px-8">
            <div className="flex justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-2.5 w-2.5 rounded-full bg-cyan-400"
                  style={{ animation: `floatC 0.9s ease-in-out ${i * 0.18}s infinite` }} />
              ))}
            </div>
            <p className="mt-4 text-slate-500 text-sm">Loading service...</p>
          </main>
        ) : null}

        {/* ── Error ── */}
        {error ? (
          <main className="mx-auto max-w-7xl px-4 py-16 text-center md:px-8">
            <p className="text-red-500">{error}</p>
            <Link to="/services"
              className="mt-5 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow"
              style={{ background: 'linear-gradient(135deg,#06b6d4,#818cf8)' }}>
              <ArrowRight size={14} className="mr-1.5" />
              Back to Services
            </Link>
          </main>
        ) : null}

        {!loading && !error && service ? (
          <main className="relative">

            {/* ══════════════════════════════════════════════════════
                HERO
            ══════════════════════════════════════════════════════ */}
            <section className="relative z-10 min-h-screen overflow-hidden bg-gradient-to-br from-white via-cyan-50 to-indigo-50 px-4 py-16 md:sticky md:top-0 md:px-8">
              <FloatingOrbs />
              <GridLines />
              <DotPattern className="right-10 top-20" />

              {/* Spinning ring accent */}
              <div className="pointer-events-none absolute -right-10 -top-10 hidden md:block"
                style={{ width: 320, height: 320, opacity: 0.13 }}>
                <svg className="spin-ring h-full w-full" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="160" cy="160" r="150" stroke="url(#sdRing1)" strokeWidth="1.5" strokeDasharray="12 8" />
                  <circle cx="160" cy="160" r="110" stroke="url(#sdRing1)" strokeWidth="1" strokeDasharray="7 12" />
                  <defs>
                    <linearGradient id="sdRing1" x1="0" y1="0" x2="320" y2="320" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#06b6d4" />
                      <stop offset="1" stopColor="#818cf8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-2">
                {/* Left */}
                <div>
                  <p className="fade-up-1 shimmer-badge inline-flex items-center rounded-full border border-cyan-300/40 bg-cyan-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-800">
                    <BadgeCheck size={13} className="mr-2 text-cyan-500" />
                    {service.name}
                  </p>

                  <h1 className="fade-up-2 mt-5 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-[2.75rem]">
                    <span className="text-transparent bg-clip-text"
                      style={{ backgroundImage: 'linear-gradient(135deg,#0e7490,#6366f1)' }}>
                      {service.name}
                    </span>{' '}
                    Services
                  </h1>

                  <p className="fade-up-3 mt-5 max-w-xl text-base leading-relaxed text-slate-500">
                    {service.information}
                  </p>

                  {/* Mini stat grid */}
                  <div className="fade-up-3 mt-8 grid max-w-lg grid-cols-2 gap-3 md:grid-cols-4">
                    {[
                      {
                        icon: Layers, value: `${service.projectsCount || service.projects?.length || 0}+`,
                        label: 'Projects', color: 'text-cyan-700', bg: 'bg-cyan-50', iconBg: 'bg-cyan-100',
                      },
                      {
                        icon: ChartNoAxesCombined, value: service.satisfaction || '99%',
                        label: 'Satisfaction', color: 'text-emerald-700', bg: 'bg-emerald-50', iconBg: 'bg-emerald-100',
                      },
                      {
                        icon: Handshake, value: service.support || '24/7',
                        label: 'Support', color: 'text-violet-700', bg: 'bg-violet-50', iconBg: 'bg-violet-100',
                      },
                      {
                        icon: Clock3, value: service.avgDelivery || '15 Days',
                        label: 'Avg Delivery', color: 'text-orange-600', bg: 'bg-orange-50', iconBg: 'bg-orange-100',
                      },
                    ].map(({  value, label, color, bg, iconBg }) => (
                      <article key={label}
                        className={`stat-mini rounded-xl border border-slate-100 ${bg} p-3 text-center shadow-sm`}>
                        <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${iconBg} ${color} mb-1`}>
                          <Icon size={14} />
                        </span>
                        <p className={`text-xl font-extrabold ${color}`}>{value}</p>
                        <p className="mt-0.5 text-[11px] text-slate-500">{label}</p>
                      </article>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="fade-up-4 mt-9 flex flex-wrap gap-4">
                    <a href="#service-projects"
                      className="btn-shine inline-flex items-center rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-lg"
                      style={{ background: 'linear-gradient(135deg,#06b6d4,#818cf8)' }}>
                      View Website Categories
                      <ArrowRight size={15} className="ml-2" />
                    </a>
                    <a href="mailto:info@meraakifoundersclub.com"
                      className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition-all hover:border-cyan-400 hover:bg-cyan-50 hover:scale-105">
                      <Handshake size={15} className="mr-2 text-cyan-600" />
                      Get Free Quote
                    </a>
                  </div>
                </div>

                {/* Right image */}
                <div className="fade-up-img relative">
                  <div className="absolute -inset-3 rounded-3xl blur-2xl"
                    style={{ background: 'linear-gradient(135deg,rgba(6,182,212,0.28),rgba(129,140,248,0.22))' }} />
                  {/* Floating badge */}
                  <div className="absolute -top-4 -right-4 z-20 flex items-center gap-1.5 rounded-2xl border border-white/60 bg-white/90 px-3 py-2 shadow-lg backdrop-blur">
                    <Star size={13} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-slate-800">Top Rated Service</span>
                  </div>
                  <img
                    src={service.image}
                    alt={service.name}
                    className="relative h-[260px] w-full rounded-3xl border border-white/60 object-cover shadow-2xl sm:h-[320px] md:h-[420px]"
                  />
                  {/* Bottom floating chip */}
                  <div className="absolute -bottom-4 left-4 z-20 flex items-center gap-2 rounded-xl border border-white/60 bg-white/90 px-3 py-2 shadow-lg backdrop-blur">
                    <Zap size={13} className="text-cyan-500" />
                    <span className="text-xs font-bold text-slate-700">Fast Delivery Guaranteed</span>
                  </div>
                </div>
              </div>

              <WaveDivider color="#f1f5f9" />
            </section>

            {/* ══════════════════════════════════════════════════════
                PROJECTS + TECHNOLOGIES
            ══════════════════════════════════════════════════════ */}
            <section id="service-projects"
              className="relative z-20 bg-slate-100 px-4 py-16 md:sticky md:top-0 md:min-h-screen md:px-8">
              <DotPattern className="right-0 top-0" />

              <div className="mx-auto w-full max-w-7xl">

                {/* Section header */}
                <div className="text-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">
                    <BadgeCheck size={12} />
                    Our Projects
                  </span>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">
                    Built For{' '}
                    <span className="text-transparent bg-clip-text"
                      style={{ backgroundImage: 'linear-gradient(135deg,#06b6d4,#6366f1)' }}>
                      {service.name}
                    </span>
                  </h2>
                  <div className="mx-auto mt-4 h-1 w-20 rounded-full"
                    style={{ background: 'linear-gradient(90deg,#06b6d4,#818cf8)' }} />
                </div>

                {/* Project cards */}
                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {(service.projects || []).map((project, index) => (
                    <article
                      key={`${project.name}-${index}`}
                      className="project-card pop-in overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                      style={{ animationDelay: `${index * 0.08}s` }}
                    >
                      {/* Image with overlay */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="proj-img h-full w-full object-cover"
                        />
                        <div className="absolute inset-0"
                          style={{ background: 'linear-gradient(180deg,transparent 50%,rgba(15,23,42,0.45) 100%)' }} />
                        {/* Price ribbon */}
                        <div className="absolute top-3 right-3 rounded-xl border border-white/40 bg-white/90 px-2.5 py-1 backdrop-blur">
                          <span className="text-xs font-extrabold text-cyan-700">Rs. {project.discountedPrice}</span>
                          {project.price !== project.discountedPrice && (
                            <span className="ml-1.5 text-[10px] text-slate-400 line-through">Rs. {project.price}</span>
                          )}
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-bold text-slate-900">{project.name}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-500">{project.description}</p>

                        {/* Tech pills */}
                        {(project.technologiesUsed || []).length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {(project.technologiesUsed || []).map((technology) => (
                              <span key={`${project.name}-${technology}`}
                                className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-0.5 text-[11px] font-medium text-cyan-700">
                                {technology}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Divider */}
                        <div className="mt-4 h-px w-full rounded-full"
                          style={{ background: 'linear-gradient(90deg,rgba(6,182,212,0.2),transparent)' }} />

                        {/* Action buttons */}
                        <div className="mt-4 flex flex-wrap gap-2.5">
                          <a href={project.demoLink} target="_blank" rel="noreferrer"
                            className="action-btn btn-shine inline-flex items-center rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow"
                            style={{ background: 'linear-gradient(135deg,#06b6d4,#6366f1)' }}>
                            <Monitor size={12} className="mr-1.5" />
                            View Demo
                            <ExternalLink size={10} className="ml-1 opacity-70" />
                          </a>
                          <a href={project.quoteLink} target="_blank" rel="noreferrer"
                            className="action-btn inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50">
                            <Handshake size={12} className="mr-1.5 text-cyan-600" />
                            Get Quote
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {!service.projects?.length ? (
                  <p className="mt-8 text-center text-slate-500">No projects added yet.</p>
                ) : null}

                {/* Technologies */}
                <div className="mt-20 text-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">
                    <Wrench size={12} />
                    Technologies We Use
                  </span>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">
                    Tools Powering{' '}
                    <span className="text-transparent bg-clip-text"
                      style={{ backgroundImage: 'linear-gradient(135deg,#06b6d4,#6366f1)' }}>
                      Your Growth
                    </span>
                  </h2>
                  <div className="mx-auto mt-4 h-1 w-20 rounded-full"
                    style={{ background: 'linear-gradient(90deg,#06b6d4,#818cf8)' }} />
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  {allTechnologies.map((technology, i) => (
                    <span key={technology}
                      className="tech-pill pop-in inline-flex cursor-default items-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm"
                      style={{ animationDelay: `${i * 0.05}s` }}>
                      <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100">
                        <Wrench size={11} className="text-cyan-600" />
                      </span>
                      {technology}
                    </span>
                  ))}
                </div>

                {!allTechnologies.length ? (
                  <p className="mt-8 text-center text-slate-500">No technologies listed yet.</p>
                ) : null}
              </div>
            </section>
          </main>
        ) : null}

        <Footer />
      </div>
    </>
  )
}

export default ServiceDetails