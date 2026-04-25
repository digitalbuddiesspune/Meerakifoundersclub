import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
    <section className="min-h-[70vh] bg-white">
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
  )
}

export default ContactUs
