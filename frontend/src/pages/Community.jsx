const communityBenefits = [
  {
    title: 'Live Q&A Forum',
    points: [
      'Ask any business question',
      'Mentors respond within 24 hours',
      'Peer founders share experiences',
      'Build knowledge over time',
    ],
  },
  {
    title: 'WhatsApp Groups',
    points: [
      'City-specific founder chats',
      'Real-time support and advice',
      'Event announcements',
      'Celebrate wins together',
    ],
  },
  {
    title: 'Monthly Meetups',
    points: [
      'In-person founder hangouts',
      '2-3 mentors sharing practical wisdom',
      'Networking and connections',
      'Casual, no-pressure environment',
    ],
  },
  {
    title: 'Monthly Ask-Me-Anything (AMA)',
    points: [
      'Live sessions with successful founders',
      'Topics: fundraising, hiring, marketing, scaling, compliance',
      'Recorded for later viewing',
      'Q&A opportunity for all members',
    ],
  },
  {
    title: 'Events & Workshops',
    points: [
      'Skill-building sessions (compliance, marketing, HR, etc.)',
      'Online and in-person options',
      'Upcoming: December meetups, January funding workshop',
    ],
  },
  {
    title: 'Vendor Recommendations',
    points: [
      'Ask community for service recommendations',
      'Mentors introduce trusted vendors',
      'Leverage peer experience',
      'Avoid bad services',
    ],
  },
]

const values = [
  'Honest advice over flattery',
  'Action over endless talk',
  'Help-first mindset',
  'Respect for all founders',
  'Zero judgment',
]

const notAllowed = [
  'Spam or self-promotion',
  'Harassment or disrespect',
  'Asking for free work',
  'Vendor pitches (use vendor marketplace)',
  'Off-topic discussions',
]

const events = [
  {
    name: 'Meetup 1: "Building Your First Team"',
    date: 'Saturday, Dec 21, 2025, 05:00 PM',
    details: ['Topics: Overcome Founders Challenges', 'Location: Meraaki Founders Club Hub, Nagpur'],
    cta: 'RSVP',
  },
  {
    name: 'Meetup 2: "Compliance Without the Chaos"',
    date: 'Wednesday, Dec 10, 2025, 5:30 PM',
    details: ['Topics: GST, tax, registration, compliance timelines', 'Location: Meraaki Founders Club Hub, Nagpur'],
    cta: 'RSVP',
  },
  {
    name: 'AMA: "From Zero to Registered Business"',
    date: 'Thursday, Dec 12, 2025, 7:00 PM',
    details: ['Host: Nagpur founder (compliance expert)', 'Duration: 90 min live + Q&A'],
    cta: 'Register',
  },
]

function Community() {
  return (
    <main className="w-full bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-gradient-to-b from-[#FFF4EE] to-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
          <p className="inline-flex rounded-full border border-[#F26527]/20 bg-[#F26527]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#F26527]">
            Community
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">The Meraaki Founders Club Community</h1>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600 md:text-lg">
            500+ founders, mentors, and service providers building together. Real support. Real connections. Real growth.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <h2 className="text-2xl font-bold md:text-3xl">What You Get In Community</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {communityBenefits.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-12 md:grid-cols-2 md:px-8 md:py-16">
          <article className="rounded-2xl border border-slate-200 bg-[#F7FAFF] p-6">
            <h2 className="text-xl font-semibold text-[#F26527] md:text-2xl">Community Guidelines</h2>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-slate-600">We Value</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
              {values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-[#FFF8F3] p-6">
            <h2 className="text-xl font-semibold text-[#F26527] md:text-2xl">We Don&apos;t Allow</h2>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate-700">
              {notAllowed.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <h2 className="text-2xl font-bold md:text-3xl">How To Join</h2>
          <ol className="mt-6 space-y-3 text-sm text-slate-700 md:text-base">
            <li>1. Sign up for Meraaki Founders Club membership</li>
            <li>2. Get WhatsApp group invite via email</li>
            <li>3. Introduce yourself to the community</li>
            <li>4. Start asking, sharing, connecting</li>
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <h2 className="text-2xl font-bold md:text-3xl">Upcoming Events</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article key={event.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{event.name}</h3>
                <p className="mt-2 text-sm font-medium text-[#F26527]">{event.date}</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {event.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-5 inline-flex rounded-full bg-[#F26527] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-90"
                >
                  {event.cta}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Community
