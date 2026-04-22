import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  ChartNoAxesCombined,
  Clock3,
  ExternalLink,
  Handshake,
  Layers,
  Monitor,
  Sparkles,
  Star,
  Wrench,
} from 'lucide-react'

const TECHNOLOGY_ICON_MAP = {
  'next.js': 'nextdotjs',
  nextjs: 'nextdotjs',
  stripe: 'stripe',
  react: 'react',
  'node.js': 'nodedotjs',
  nodejs: 'nodedotjs',
  express: 'express',
  mongodb: 'mongodb',
  tailwind: 'tailwindcss',
  tailwindcss: 'tailwindcss',
  javascript: 'javascript',
  typescript: 'typescript',
  firebase: 'firebase',
  aws: 'amazonaws',
  shopify: 'shopify',
  wordpress: 'wordpress',
}

const getTechnologyIconUrl = (technology) => {
  const normalized = String(technology || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '')
  const iconSlug = TECHNOLOGY_ICON_MAP[normalized]
  if (!iconSlug) return null
  return `https://cdn.simpleicons.org/${iconSlug}/F26527`
}

const formatPrice = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))

function ServiceDetails() {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const API_BASE_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

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

  const features = useMemo(() => (Array.isArray(service?.features) ? service.features : []), [service])
  const projects = Array.isArray(service?.projects) ? service.projects : []

  const stats = [
    {
      icon: Layers,
      label: 'Projects',
      value: `${service?.projectsCount || projects.length || 0}+`,
      color: 'text-cyan-700',
      bg: 'bg-cyan-50',
      iconBg: 'bg-cyan-100',
    },
    {
      icon: ChartNoAxesCombined,
      label: 'Satisfaction',
      value: service?.satisfaction || '99%',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      iconBg: 'bg-emerald-100',
    },
    {
      icon: Handshake,
      label: 'Support',
      value: service?.support || '24/7',
      color: 'text-violet-700',
      bg: 'bg-violet-50',
      iconBg: 'bg-violet-100',
    },
    {
      icon: Clock3,
      label: 'Avg Delivery',
      value: service?.avgDelivery || 'Flexible',
      color: 'text-orange-700',
      bg: 'bg-orange-50',
      iconBg: 'bg-orange-100',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {loading ? (
        <main className="mx-auto max-w-7xl px-4 py-24 md:px-8">
          <div className="h-8 w-44 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-6 h-12 w-3/4 animate-pulse rounded-xl bg-slate-200" />
          <div className="mt-3 h-5 w-full animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-5 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-200" />
            ))}
          </div>
        </main>
      ) : null}

      {error ? (
        <main className="mx-auto max-w-7xl px-4 py-16 text-center md:px-8">
          <p className="text-red-500">{error}</p>
          <Link
            to="/services"
            className="mt-5 inline-flex items-center rounded-full bg-[#F26527] px-5 py-2.5 text-sm font-semibold text-white shadow"
          >
            <ArrowRight size={14} className="mr-1.5" />
            Back to Services
          </Link>
        </main>
      ) : null}

      {!loading && !error && service ? (
        <main>
          <section className="relative overflow-hidden border-b border-slate-200 bg-white">
            <div className="absolute -left-16 top-16 h-56 w-56 rounded-full bg-[#F26527]/10 blur-3xl" />
            <div className="absolute -right-16 top-1/3 h-56 w-56 rounded-full bg-cyan-100/70 blur-3xl" />

            <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.2fr,0.8fr] md:px-8 md:py-16">
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#F26527]/20 bg-[#FFF4EE] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#F26527]">
                  <BadgeCheck size={12} />
                  {service.category || 'Service'}
                </div>

                <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
                  {service.name}
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
                  {service.information}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {stats.map((stat) => {
                    const StatIcon = stat.icon
                    return (
                      <article
                        key={stat.label}
                        className={`rounded-2xl border border-slate-100 p-3 shadow-sm transition-transform duration-200 hover:-translate-y-1 ${stat.bg}`}
                      >
                        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${stat.iconBg} ${stat.color}`}>
                          <StatIcon size={15} />
                        </span>
                        <p className={`mt-2 text-lg font-extrabold ${stat.color}`}>{stat.value}</p>
                        <p className="text-xs text-slate-500">{stat.label}</p>
                      </article>
                    )
                  })}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="inline-flex items-center rounded-full bg-[#F26527] px-6 py-3 text-sm font-semibold text-white shadow transition hover:opacity-90"
                  >
                    Explore Projects
                    <ArrowRight size={14} className="ml-2" />
                  </a>
                  <a
                    href="mailto:info@meraakifoundersclub.com"
                    className="inline-flex items-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#F26527]/40 hover:text-[#F26527]"
                  >
                    Get Free Consultation
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#F26527]/15 to-amber-200/20 blur-xl" />
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                  <img src={service.image} alt={service.name} className="h-[260px] w-full object-cover md:h-[360px]" />
                  <div className="border-t border-slate-100 p-4">
                    <div className="flex items-end gap-2">
                      <p className="text-2xl font-extrabold text-[#F26527]">{formatPrice(service.discountedPrice)}</p>
                      {service.price !== service.discountedPrice ? (
                        <p className="pb-0.5 text-sm text-slate-400 line-through">{formatPrice(service.price)}</p>
                      ) : null}
                    </div>
                    <p className="mt-1 text-xs text-slate-500">Premium delivery with transparent pricing</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {features.length > 0 ? (
            <section className="border-b border-slate-200 bg-slate-50/70">
              <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
                <div className="mb-8 flex items-center gap-2 text-[#F26527]">
                  <Sparkles size={16} />
                  <h2 className="text-lg font-semibold uppercase tracking-[0.15em]">Key Features</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {features.map((feature, index) => (
                    <article
                      key={`${feature.featureName}-${index}`}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <h3 className="text-base font-semibold text-slate-900">{feature.featureName}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.featureDiscription}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <section id="projects" className="bg-white">
            <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
              <div className="mb-8 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Portfolio</p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">Projects Delivered</h2>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  <Star size={12} />
                  Premium quality
                </span>
              </div>

              {projects.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project, index) => (
                    <article
                      key={`${project.name}-${index}`}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <img src={project.image} alt={project.name} className="h-44 w-full object-cover" />
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
                        <p className="mt-2 text-sm text-slate-600">{project.description}</p>

                        <div className="mt-3 flex items-end gap-2">
                          <p className="text-lg font-extrabold text-[#F26527]">{formatPrice(project.discountedPrice)}</p>
                          {project.price !== project.discountedPrice ? (
                            <p className="text-xs text-slate-400 line-through">{formatPrice(project.price)}</p>
                          ) : null}
                        </div>

                        {(project.technologiesUsed || []).length > 0 ? (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {(project.technologiesUsed || []).map((technology) => (
                              <span
                                key={`${project.name}-${technology}`}
                                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700"
                              >
                                {getTechnologyIconUrl(technology) ? (
                                  <img
                                    src={getTechnologyIconUrl(technology)}
                                    alt={`${technology} icon`}
                                    className="h-3.5 w-3.5"
                                    loading="lazy"
                                  />
                                ) : (
                                  <Wrench size={10} className="text-[#F26527]" />
                                )}
                                {technology}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        <div className="mt-4 flex flex-wrap gap-2.5">
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800"
                          >
                            <Monitor size={12} className="mr-1.5" />
                            View Demo
                            <ExternalLink size={10} className="ml-1.5 opacity-80" />
                          </a>
                          <a
                            href={project.quoteLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:border-[#F26527]/40 hover:text-[#F26527]"
                          >
                            <Handshake size={12} className="mr-1.5" />
                            Get Quote
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No projects added yet.</p>
              )}
            </div>
          </section>

          <section className="border-t border-slate-200 bg-slate-50">
            <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
              <h2 className="text-xl font-bold text-slate-900 md:text-2xl">Technologies We Use</h2>
              {allTechnologies.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-3">
                  {allTechnologies.map((technology) => (
                    <span
                      key={technology}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                    >
                      <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-100">
                        {getTechnologyIconUrl(technology) ? (
                          <img
                            src={getTechnologyIconUrl(technology)}
                            alt={`${technology} icon`}
                            className="h-3.5 w-3.5"
                            loading="lazy"
                          />
                        ) : (
                          <Wrench size={11} className="text-[#F26527]" />
                        )}
                      </span>
                      {technology}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500">No technologies listed yet.</p>
              )}
            </div>
          </section>
        </main>
      ) : null}
    </div>
  )
}

export default ServiceDetails
