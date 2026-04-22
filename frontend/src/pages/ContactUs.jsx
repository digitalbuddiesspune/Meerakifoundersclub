import { useEffect, useState } from 'react'
import ContactForm from '../components/ContactForm'

function ContactUs() {
  const [showSections, setShowSections] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSections(true)
    }, 80)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="min-h-[70vh] bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
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
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
