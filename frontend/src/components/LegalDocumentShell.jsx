function LegalDocumentShell({ title, eyebrow, children }) {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section className="min-h-[70vh] bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <p className="inline-flex rounded-full bg-[#F26527]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#F26527]">
          {eyebrow}
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{title}</h1>

        <p className="mt-4 text-sm text-slate-500">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-600">{children}</div>
      </div>
    </section>
  )
}

export default LegalDocumentShell
