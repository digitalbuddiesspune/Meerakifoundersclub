const PROCESS_STEPS = [
  'Discovery Call',
  'Growth Blueprint',
  'Execution Sprint',
  'Scale & Support',
]

function HomeProcessSection() {
  return (
    <section id="process" className="mt-10 mx-auto w-full max-w-7xl px-4 py-14 md:px-8">
      <h2 className="text-2xl font-bold text-slate-900">How We Work</h2>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {PROCESS_STEPS.map((step, index) => (
          <article key={step} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold text-[#F26527]">Step {index + 1}</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{step}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HomeProcessSection
