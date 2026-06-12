import { Link } from 'react-router-dom'

const toSlug = (value) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

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
              <div
                key={group.category}
                className={`${sectionClasses} relative flex items-start py-10 md:sticky md:top-0 md:z-10 min-h-screen md:items-center md:justify-center md:py-14`}
              >
                <div className="mx-auto w-full max-w-7xl px-4 md:px-0">
                  <div className="mb-8 flex justify-center md:mb-10">
                    <h3
                      className={`border-t px-10 pt-3 text-center text-xl font-semibold uppercase tracking-[0.45em] md:text-2xl ${headingClasses}`}
                    >
                      {group.category} 
                    </h3>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((item) => (
                      <Link
                        key={item._id}
                        to={`/services/${toSlug(item.name)}`}
                        className={`block rounded-2xl border p-3 transition-transform duration-200 hover:-translate-y-1 md:p-6 ${cardClasses}`}
                      >
                        <article>
                          <h4 className="text-base font-semibold leading-tight md:text-2xl">{item.name}</h4>
                          <p className={`mt-3 text-xs md:text-sm leading-relaxed ${descriptionClasses}`}>
                            {item.description}
                          </p>
                        </article>
                      </Link>
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
