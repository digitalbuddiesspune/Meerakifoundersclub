import { Link } from 'react-router-dom'

const joinSteps = [
  {
    title: 'Step 1: Apply (10 Minutes)',
    points: [
      'Credentials and experience',
      'Services you offer',
      'Pricing for each service',
      '2-3 professional references',
    ],
  },
  {
    title: 'Step 2: Verification (3-5 Business Days)',
    points: [
      'Meraaki Founders Club reviews credentials',
      'References verified',
      'Experience confirmed',
      'Clarifying questions asked',
    ],
  },
  {
    title: 'Step 3: Go Live (Immediate)',
    points: [
      'Profile appears in vendor marketplace',
      'Founders can find and message you',
      'Your profile includes: name, credentials, services, pricing, availability',
    ],
  },
  {
    title: 'Step 4: Deliver & Grow (Ongoing)',
    points: [
      'Accept founder orders',
      'Deliver high-quality work on time',
      'Build ratings and reputation',
      'Increase bookings and income',
    ],
  },
]

const mustHave = [
  'Legitimate credentials in your field (CA, lawyer, certified marketer, etc.)',
  '2-3 professional references',
  'Commitment to quality and on-time delivery',
  'Ability to respond to founders within 24 hours',
  'Willingness to maintain 3.5+ rating',
]

const notAccepted = [
  'Middlemen or re-sellers',
  'Unqualified service providers',
  'Vendors with complaint history',
  'Anyone unwilling to provide references',
]

function Vendor() {
  return (
    <main className="w-full bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-gradient-to-b from-[#FFF4EE] to-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
          <p className="inline-flex rounded-full border border-[#F26527]/20 bg-[#F26527]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#F26527]">
            Vendors
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">Join Our Vendor Network</h1>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600 md:text-lg">
            Reach verified founders actively looking for your services. No middlemen. No commissions. Just direct,
            paying clients.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <h2 className="text-2xl font-bold md:text-3xl">Why Become a Meraaki Founders Club Vendor?</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              'Direct founder access: Reach 200+ Nagpur founders looking for your services.',
              'Keep more money: We take platform fee. Transparent split.',
              'Build reputation: Every completed job builds your rating. Higher ratings = more bookings.',
              'Zero marketing cost: Founders find you through Meraaki Founders Club. No ads or campaigns needed.',
              'Payment security: Professional process. Payments processed through Meraaki Founders Club. No chasing clients.',
              'Growing ecosystem: Build relationships with other vendors. Grow together.',
            ].map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <h2 className="text-2xl font-bold md:text-3xl">How To Join (4 Steps)</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {joinSteps.map((step) => (
              <article key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-[#F26527]">{step.title}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                  {step.points.map((point) => (
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
            <h2 className="text-xl font-semibold text-[#F26527] md:text-2xl">Vendor Requirements - Must Have</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
              {mustHave.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-[#FFF8F3] p-6">
            <h2 className="text-xl font-semibold text-[#F26527] md:text-2xl">Meraaki Founders Club Does Not Accept</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
              {notAccepted.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-7xl px-4 py-12 text-center md:px-8 md:py-16">
          <h2 className="text-2xl font-bold md:text-3xl">Ready to Reach Serious Founders?</h2>
          <p className="mt-3 text-sm text-slate-600 md:text-base">
            Apply today and join 80+ verified vendors already serving Meraaki Founders Club&apos;s growing founder community.
          </p>
          <Link
            to="/contact-us"
            className="mt-6 inline-flex items-center rounded-full bg-[#F26527] px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Apply as Vendor
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Vendor
