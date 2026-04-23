const PROCESS_STEPS = [
  {
    title: 'JOIN',
    description: 'Quick sign-up in 2 minutes using phone number.',
    userActions: [
      'Enter phone',
      'OTP verification',
      'Choose Plans',
      'Payment',
      'Instant access',
    ],
  },
  {
    title: 'EXPLORE',
    description: 'Access community and browse available services at your pace.',
    userActions: [
      'Check Events',
      'Check Partners & Mentors',
      'Join Whatsapp Groups',
      
    ],
  },
  
  {
    title: 'PAYMENT',
    description: 'Pay for the service you have selected.',
    userActions: [
      'Select service',
      'Pay via Razorpay',
      
    ],
  },
  {
    title: 'COMPLETE',
    description: 'Services delivered and payment releases to partner.',
    userActions: [
      'WhatsApp updates',
      'Review work',
      'Approve',
      'Payment released',
      'Share win!',
    ],
  },
]

const PROCESS_STEP_GROUPS = [PROCESS_STEPS.slice(0, 2), PROCESS_STEPS.slice(2, 5)]

function HomeProcessSection() {
  return (
    <section id="process" className="w-full">
      {PROCESS_STEP_GROUPS.map((stepGroup, groupIndex) => {
        const isDark = groupIndex % 2 !== 0
        const gridClasses =
          stepGroup.length === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'
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
            key={`group-${groupIndex}`}
            className={`${sectionClasses} sticky top-0 flex min-h-screen items-center justify-center px-4 py-14 md:px-8`}
            style={{ zIndex: 10 + groupIndex }}
          >
            <div className="mx-auto w-full max-w-6xl text-center">
              <p className={`text-xs font-semibold uppercase tracking-[0.25em] md:text-sm ${badgeClasses}`}>
                How We Work
              </p>

              <div className={`mt-5 grid gap-5 md:gap-6 ${gridClasses}`}>
                {stepGroup.map((step, stepIndex) => {
                  const absoluteStepNumber = groupIndex * 2 + stepIndex + 1
                  return (
                    <article key={step.title} className={`rounded-2xl border p-3 shadow-sm md:p-6 ${cardClasses}`}>
                      <p className={`text-xs font-bold md:text-sm ${badgeClasses}`}>Step {absoluteStepNumber}</p>
                      <h2 className={`mt-3 text-xl font-bold md:text-4xl ${titleClasses}`}>{step.title}</h2>
                      <p className={`mx-auto mt-4 max-w-2xl text-sm leading-relaxed md:text-base ${descriptionClasses}`}>
                        {step.description}
                      </p>

                      <p className={`mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] md:mt-6 md:text-sm md:tracking-[0.2em] ${actionsLabelClasses}`}>
                        User Actions
                      </p>
                      <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 md:mt-3 md:gap-2.5">
                        {step.userActions.slice(0, 4).map((action) => (
                          <span
                            key={action}
                            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium md:px-4 md:py-1.5 md:text-xs ${actionChipClasses}`}
                          >
                            {action}
                          </span>
                        ))}
                      </div>
                    </article>
                  )
                })}
                </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default HomeProcessSection
