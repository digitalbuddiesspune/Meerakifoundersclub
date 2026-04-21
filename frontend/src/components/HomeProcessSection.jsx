const PROCESS_STEPS = [
  {
    title: 'JOIN',
    description: 'Quick sign-up in 2 minutes using phone number.',
    userActions: [
      'Enter phone',
      'OTP verification',
      'Choose tier',
      'Payment',
      'Instant access',
    ],
  },
  {
    title: 'EXPLORE',
    description: 'Access community and browse available services at your pace.',
    userActions: [
      'Browse vendor directory',
      'Join WhatsApp groups',
      'View events',
      'Check mentor profiles',
    ],
  },
  {
    title: 'GET HELP',
    description: 'Post questions and get real answers from mentors.',
    userActions: [
      'Post to Q&A forum',
      'Browse vendors',
      'Message directly',
      'Check ratings',
    ],
  },
  {
    title: 'ORDER',
    description: 'Order service with complete transparency and protection.',
    userActions: [
      'Select service',
      'See total cost',
      'Pay via Razorpay',
      'Escrow holds funds',
    ],
  },
  {
    title: 'COMPLETE',
    description: 'Receive deliverables and payment releases to vendor.',
    userActions: [
      'WhatsApp updates',
      'Review work',
      'Approve',
      'Payment released',
      'Share win!',
    ],
  },
]

function HomeProcessSection() {
  return (
    <section id="process" className="w-full">
      {PROCESS_STEPS.map((step, index) => {
        const isDark = index % 2 !== 0
        const sectionClasses = isDark ? 'bg-[#131014]' : 'bg-white'
        const badgeClasses = isDark ? 'text-[#FF8B5A]' : 'text-[#F26527]'
        const titleClasses = isDark ? 'text-white' : 'text-slate-900'
        const descriptionClasses = isDark ? 'text-white/80' : 'text-slate-600'
        const actionsLabelClasses = isDark ? 'text-white/90' : 'text-slate-700'
        const actionChipClasses = isDark
          ? 'border-white/20 bg-white/10 text-white'
          : 'border-slate-200 bg-white text-slate-700'
        const cardClasses = isDark
          ? 'border-white/15 bg-white/[0.06]'
          : 'border-slate-200 bg-slate-50'

        return (
          <div
            key={step.title}
            className={`${sectionClasses} sticky top-0 flex min-h-screen items-center justify-center px-4 py-14 md:px-8`}
            style={{ zIndex: 10 + index }}
          >
            <div className="mx-auto w-full max-w-4xl text-center">
              <p className={`text-xs font-semibold uppercase tracking-[0.25em] md:text-sm ${badgeClasses}`}>
                How We Work
              </p>

              <article className={`mx-auto mt-5 max-w-3xl rounded-2xl border p-7 shadow-sm md:p-10 ${cardClasses}`}>
                <p className={`text-sm font-bold ${badgeClasses}`}>Step {index + 1}</p>
                <h2 className={`mt-3 text-3xl font-bold md:text-5xl ${titleClasses}`}>{step.title}</h2>
                <p className={`mx-auto mt-4 max-w-2xl text-sm leading-relaxed md:text-base ${descriptionClasses}`}>
                  {step.description}
                </p>

                <p className={`mt-6 text-xs font-semibold uppercase tracking-[0.2em] md:text-sm ${actionsLabelClasses}`}>
                  User Actions
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
                  {step.userActions.map((action) => (
                    <span
                      key={action}
                      className={`rounded-full border px-3 py-1 text-xs font-medium md:px-4 md:py-1.5 md:text-sm ${actionChipClasses}`}
                    >
                      {action}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default HomeProcessSection
