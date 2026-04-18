const whyMeraakiPoints = [
  'By Founders, for Founders',
  'Focus on Tier II/III',
  '1st Marketplace for Startups',
  'Community',
  'Verified Ecosystem',
]

function WhyMeraakiFoundersClub() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <div className="rounded-3xl border border-[#F26527]/20 bg-[#FFF1EA] p-6 md:p-10">
          <h1 className="text-center text-2xl font-bold text-[#F26527] md:text-4xl">
            Why Meraaki Founders Club
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-slate-700 md:mt-5 md:text-lg">
            Built for startup founders who need a trusted, practical, and growth-first ecosystem.
          </p>

          <div className="mt-7 grid gap-3 md:mt-10 md:grid-cols-2 md:gap-4">
            {whyMeraakiPoints.map((point) => (
              <article
                key={point}
                className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-[#F26527]/15 md:text-base"
              >
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F26527] text-xs font-bold text-white">
                  ✓
                </span>
                <span>{point}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyMeraakiFoundersClub
