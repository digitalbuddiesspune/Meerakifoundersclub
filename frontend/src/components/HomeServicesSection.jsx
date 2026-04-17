function HomeServicesSection({ services }) {
  return (
    <section id="services" className="border-y border-slate-200 bg-stone-100 py-14">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <h2 className="text-2xl font-bold text-slate-900">Our Core Services</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Everything a startup needs under one roof to build faster, raise smarter, and grow sustainably.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const ServiceIcon = service.icon
            return (
              <article
                key={service.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#F26527]/10 text-[#F26527]">
                  <ServiceIcon size={18} />
                </span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Tailored support for your current growth stage with practical implementation.
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HomeServicesSection
