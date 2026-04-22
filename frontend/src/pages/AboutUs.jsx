import { Link } from 'react-router-dom'

const values = [
  'Founder-First: Every decision asks, "Does this help the founder?"',
  'Transparency: No hidden fees, no surprises, no corporate BS.',
  'Community Over Competition: Rising tides lift all boats.',
  "Tier II/III Matters: We're proving smaller cities deserve equal support.",
  'Action Over Talk: We build, we deliver, we execute.',
]

const teamMembers = [
  {
    name: 'Deesha Shroff',
    role: 'CEO & Founder',
    description:
      'With over 15 years of experience in startup compliance and legal structuring, Deesha has guided hundreds of entrepreneurs through the essentials of launching and scaling their businesses. Her focus is building practical support systems for founders outside metro cities, ensuring Meraaki Founders Club remains founder-first, transparent, and truly accessible.',
  },
  {
    name: 'Chahul Balpande',
    role: 'CMO & Co-Founder',
    description:
      'Chahul brings deep expertise in scaling brands in Tier II/III markets, having helped a QSR chain grow to 60+ locations across India. He is passionate about grassroots entrepreneurship and leads Meraaki Founders Club go-to-market, community-building, and brand strategy, always staying connected to the needs of local founders.',
  }
 
]

function AboutUs() {
  return (
    <main className="w-full bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-gradient-to-b from-[#FFF4EE] to-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
          <p className="inline-flex rounded-full border border-[#F26527]/25 bg-[#F26527]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#F26527]">
            About Us
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
            About Meraaki Founders Club
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
            Built by founders. For founders. Fixing Tier II/III startup barriers.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-12 md:grid-cols-2 md:px-8 md:py-16">
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">Our Mission</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              Empower founders in India&apos;s Tier II, III, and IV cities to launch and grow with confidence,
              giving them seamless access to trusted services, capital, and community through a WhatsApp-first ecosystem.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">Our Vision</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              Empower one million entrepreneurs to build, scale, and collaborate across borders, turning India&apos;s
              Tier II/III startup energy into a globally connected entrepreneurial movement.
            </p>
          </article>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <h2 className="text-2xl font-bold md:text-3xl">Why We Built Meraaki Founders Club</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-[#FFF8F3] p-6">
              <h3 className="text-lg font-semibold text-[#F26527] md:text-xl">The Problem We Saw</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 md:text-base">
                <li>Startup ecosystem is metro-centric (Delhi, Bangalore, Mumbai).</li>
                <li>Tier II/III founders are shut out of networks, mentorship, and quality services.</li>
                <li>They pay double and get half the quality.</li>
                <li>Geographic disadvantage creates economic disadvantage.</li>
                <li>Talent and ambition exist everywhere, but opportunity does not.</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-[#F7FAFF] p-6">
              <h3 className="text-lg font-semibold text-[#F26527] md:text-xl">Our Solution</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 md:text-base">
                <li>Build a platform designed for Tier II/III cities, not adapted from metros.</li>
                <li>Personal vetting, not marketplace chaos.</li>
                <li>Community support, not isolation.</li>
                <li>Transparent pricing, not hidden markups.</li>
                <li>Local accountability, not faceless corporations.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <h2 className="text-2xl font-bold md:text-3xl">The Team</h2>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Operations, technology, vendor relations, community, support—all focused on founder success.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {teamMembers.map((member) => (
              <article key={member.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-[#F26527]">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <h2 className="text-2xl font-bold md:text-3xl">Our Values</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {values.map((value) => (
              <div key={value} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {value}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 text-center md:px-8 md:py-16">
          <h2 className="text-2xl font-bold md:text-3xl">Join the Founder Movement</h2>
          <p className="mt-3 text-sm text-slate-600 md:text-base">
            Be part of something bigger. Build with Meraaki Founders Club.
          </p>
          <Link
            to="/contact-us"
            className="mt-6 inline-flex items-center rounded-full bg-[#F26527] px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Start Your Journey
          </Link>
        </div>
      </section>
    </main>
  )
}

export default AboutUs
