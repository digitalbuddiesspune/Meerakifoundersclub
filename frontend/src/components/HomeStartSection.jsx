function HomeStartSection({ items, loading, error }) {
  return (
    <section className="w-full">
      {loading ? (
        <div className="bg-[#131014] py-10 md:py-14">
          <p className="text-center text-sm text-white/70">Loading start section...</p>
        </div>
      ) : null}

      {error ? (
        <div className="bg-[#131014] py-10 md:py-14">
          <p className="text-center text-sm text-red-300">{error}</p>
        </div>
      ) : null}

      {!loading && !error ? (
        <div>
          {items.map((group, index) => {
            const isDark = index % 2 === 0

            const sectionClasses = isDark ? 'bg-[#131014]' : 'bg-white'
            const headingClasses = isDark
              ? 'border-white/30 text-white'
              : 'border-slate-300 text-slate-900'
            const cardClasses = isDark
              ? 'border-white/15 bg-white/[0.06] text-white'
              : 'border-slate-200 bg-slate-50 text-slate-900'
            const descriptionClasses = isDark ? 'text-white/75' : 'text-slate-600'

            return (
              <div key={group.category} className={`${sectionClasses} flex min-h-screen items-center py-10 md:py-14`}>
                <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
                  <div className="-mt-4 mb-8 flex justify-center md:-mt-6 md:mb-10">
                    <h3
                      className={`border-t px-10 pt-3 text-center text-xl font-semibold uppercase tracking-[0.45em] md:text-2xl ${headingClasses}`}
                    >
                      {group.category}
                    </h3>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((item) => (
                      <article key={item._id} className={`rounded-2xl border p-6 ${cardClasses}`}>
                        <h4 className="text-2xl font-semibold leading-tight">{item.name}</h4>
                        <p className={`mt-3 text-sm leading-relaxed ${descriptionClasses}`}>
                          {item.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : null}

      {!loading && !error && items.length === 0 ? (
        <div className="bg-[#131014] py-10 md:py-14">
          <p className="text-center text-sm text-white/70">No start items found.</p>
        </div>
      ) : null}
    </section>
  )
}

export default HomeStartSection
