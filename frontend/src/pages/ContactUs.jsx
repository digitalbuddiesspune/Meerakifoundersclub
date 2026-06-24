import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import heroContactImg from '../assets/hero-contact.jpg'
import ContactForm from '../components/ContactForm'

function ContactUs() {
  const [showSections, setShowSections] = useState(false)
  const [services, setServices] = useState([])
  const API_BASE_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSections(true)
    }, 80)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services`)
        if (!response.ok) {
          setServices([])
          return
        }
        const data = await response.json()
        setServices(Array.isArray(data) ? data : [])
      } catch {
        setServices([])
      }
    }

    fetchServices()
  }, [API_BASE_URL])

  return (
    <>
      {/* ── Dark hero banner ── */}
      <section className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-[#070D1A] px-4 pb-24 pt-14 text-white md:px-8">
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
          className="pointer-events-none absolute -top-32 right-[6%] h-[460px] w-[460px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(242,101,39,0.2) 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-20 h-[360px] w-[360px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,140,66,0.12) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-2">
          {/* Left: text */}
          <div>
            <p className="mb-5 inline-flex items-center rounded-full border border-[#F26527]/40 bg-[#F26527]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#FF9C73]">
              ✦ &nbsp; Contact Us
            </p>
            <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight">
              Let&apos;s Build Something{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg,#F26527,#FFB382)' }}
              >
                Great Together
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/55 md:text-lg">
              Share your requirement and get a founder-friendly execution plan from our team. No commitments, just clarity.
            </p>

            {/* Quick contact pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:info@meraakifoundersclub.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-5 py-2.5 text-sm font-medium text-white/80 transition hover:border-[#F26527]/40 hover:bg-[#F26527]/10 hover:text-[#FF9C73]"
              >
                📧 info@meraakifoundersclub.com
              </a>
              <a
                href="tel:+919970570102"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-5 py-2.5 text-sm font-medium text-white/80 transition hover:border-[#F26527]/40 hover:bg-[#F26527]/10 hover:text-[#FF9C73]"
              >
                📞 +91 99705 70102
              </a>
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
              <span className="text-sm">⚡</span>
              <span className="text-xs font-bold text-white">Quick 24h Response</span>
            </div>
            <img
              src={heroContactImg}
              alt="Startup team at work"
              className="relative h-[300px] w-full rounded-3xl border border-white/20 object-cover shadow-2xl md:h-[400px]"
            />
          </div>
        </div>

        {/* Wave divider */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
            <path d="M0,28 C360,56 1080,0 1440,28 L1440,56 L0,56 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── Contact content ── */}
      <section className="min-h-[60vh] bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-0 md:py-14">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div
            className={`transition-all duration-700 ease-out ${
              showSections ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            }`}
          >
            <p className="inline-flex rounded-full bg-[#F26527]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#F26527]">
              Contact Us
            </p>

            <h2 className="text-xl font-bold text-slate-900 md:text-3xl">
              Let&apos;s Build Together
            </h2>
            <p className="mt-3 text-base text-slate-600 md:text-lg">
              Built by founders, for Founders.
            </p>

            <div className="mt-10 grid gap-5 md:max-w-3xl md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email</p>
                <a
                  href="mailto:info@meraakifoundersclub.com"
                  className="mt-2 block text-medium font-semibold text-slate-900 hover:text-[#F26527]"
                >
                  info@meraakifoundersclub.com
                </a>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Phone</p>
                <a
                  href="tel:+919970570102"
                  className="mt-2 block text-medium font-semibold text-slate-900 hover:text-[#F26527]"
                >
                  +91 99705 70102
                </a>
              </article>
            </div>

            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-slate-600">
              Reach out for startup strategy, funding readiness, legal and compliance support, or to
              discuss how Meraaki Founders Club can help your business scale faster.
            </p>
          </div>

          <div
            className={`transition-all duration-700 ease-out ${
              showSections ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
          >
            <ContactForm services={services} />
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#070D1A] p-6 text-white shadow-[0_25px_70px_rgba(7,13,26,0.45)] md:p-10">
            <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#F26527]/30 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-[#F26527]/30 blur-3xl" />
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full border border-[#F26527]/35 bg-[#F26527]/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF9C73] md:text-xs">
                Ready to Start?
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
                Let&apos;s Build Something{' '}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(110deg, #F26527, #FFB382)' }}>
                  Extraordinary
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
                Share your requirement and get a clear, founder-friendly execution plan from our team.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="mailto:info@meraakifoundersclub.com"
                  className="inline-flex items-center rounded-full bg-[#F26527] px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-90 md:px-6 md:text-sm"
                >
                  Get Free Consultation
                </a>
                <Link
                  to="/services"
                  className="inline-flex items-center rounded-full border border-white/20 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-800 transition hover:bg-slate-100 md:px-6 md:text-sm"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default ContactUs
