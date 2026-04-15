function HomeMain() {
  return (
    <main id="home">
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-8">
        <div>
          <p className="mb-3 inline-block rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
            Startup Growth Partner
          </p>
          <h1 className="text-4xl font-black leading-tight md:text-5xl">
            End-to-End Startup Solutions for Founders
          </h1>
          <p className="mt-5 max-w-xl text-slate-600">
            We help startups from zero to scale with strategy, investor readiness,
            funding support, branding, product development, and growth marketing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:info@meraakifoundersclub.com"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Start Your Journey
            </a>
            <a
              href="#services"
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            >
              Explore Services
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <h2 className="text-xl font-bold">What We Cover</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            <li>Investor pitch deck + fundraising strategy</li>
            <li>Product roadmap + MVP development guidance</li>
            <li>Brand positioning + go-to-market planning</li>
            <li>Marketing execution + growth systems</li>
            <li>Mentorship + founder decision support</li>
          </ul>
        </div>
      </section>

      <section id="services" className="border-y border-slate-200 bg-stone-100 py-14">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
          <h2 className="text-3xl font-bold">Our Core Services</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Everything a startup needs under one roof to build faster, raise smarter, and grow sustainably.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              'Startup Strategy & Validation',
              'Investor Funding Readiness',
              'Branding & Positioning',
              'MVP / Product Development',
              'Performance Marketing',
              'Sales & Scale Systems',
            ].map((service) => (
              <article
                key={service}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="text-lg font-semibold">{service}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Tailored support for your current growth stage with practical implementation.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-8">
        <h2 className="text-3xl font-bold">How We Work</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            'Discovery Call',
            'Growth Blueprint',
            'Execution Sprint',
            'Scale & Support',
          ].map((step, index) => (
            <div key={step} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold text-emerald-300">Step {index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold">{step}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomeMain
