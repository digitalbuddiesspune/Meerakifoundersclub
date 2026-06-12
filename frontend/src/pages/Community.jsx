import { Link } from 'react-router-dom'
import { Sparkles, Users, Clock, CalendarDays } from 'lucide-react'

const communityBenefits = [
  {
    title: 'Live Q&A Forum',
    icon: '💬',
    accent: '#FF6B35',
    points: [
      'Ask any business question',
      'Mentors respond within 24 hours',
      'Peer founders share experiences',
      'Build knowledge over time',
    ],
  },
  {
    title: 'WhatsApp Groups',
    icon: '📱',
    accent: '#F26527',
    points: [
      'City-specific founder chats',
      'Real-time support and advice',
      'Event announcements',
      'Celebrate wins together',
    ],
  },
  {
    title: 'Monthly Meetups',
    icon: '🤝',
    accent: '#E8521F',
    points: [
      'In-person founder hangouts',
      '2-3 mentors sharing practical wisdom',
      'Networking and connections',
      'Casual, no-pressure environment',
    ],
  },
  {
    title: 'Monthly AMAs',
    icon: '🎙️',
    accent: '#FF8C42',
    points: [
      'Live sessions with successful founders',
      'Topics: fundraising, hiring, marketing',
      'Recorded for later viewing',
      'Q&A opportunity for all members',
    ],
  },
  {
    title: 'Events & Workshops',
    icon: '⚡',
    accent: '#F26527',
    points: [
      'Skill-building sessions',
      'Online and in-person options',
      'Compliance, marketing, HR & more',
    ],
  },
  {
    title: 'Partner Network',
    icon: '🌐',
    accent: '#FF6B35',
    points: [
      'Trusted service recommendations',
      'Mentor-vetted partners',
      'Leverage peer experience',
      'Avoid bad services',
    ],
  },
]

const values = [
  { text: 'Honest advice over flattery', icon: '✦' },
  { text: 'Action over endless talk', icon: '✦' },
  { text: 'Help-first mindset', icon: '✦' },
  { text: 'Respect for all founders', icon: '✦' },
  { text: 'Zero judgment', icon: '✦' },
]

const notAllowed = [
  'Spam or self-promotion',
  'Harassment or disrespect',
  'Asking for free work',
  'Partner pitches',
  'Off-topic discussions',
]

const events = [
  {
    name: 'Building Your First Team',
    date: 'Sat, Dec 21 · 5:00 PM',
    tag: 'Meetup',
    tagColor: '#F26527',
    details: ['Overcome Founders Challenges', 'Meraaki Hub, Nagpur'],
    cta: 'RSVP Now',
  },
  {
    name: 'Compliance Without the Chaos',
    date: 'Wed, Dec 10 · 5:30 PM',
    tag: 'Workshop',
    tagColor: '#E8521F',
    details: ['GST, tax, registration, timelines', 'Meraaki Hub, Nagpur'],
    cta: 'RSVP Now',
  },
  {
    name: 'From Zero to Registered Business',
    date: 'Thu, Dec 12 · 7:00 PM',
    tag: 'AMA',
    tagColor: '#FF8C42',
    details: ['Nagpur founder (compliance expert)', '90 min live + Q&A'],
    cta: 'Register',
  },
]

const steps = [
  { num: '01', title: 'Sign Up', desc: 'Get Meraaki Founders Club membership' },
  { num: '02', title: 'Get Invited', desc: 'WhatsApp group invite via email' },
  { num: '03', title: 'Introduce', desc: 'Say hello to the community' },
  { num: '04', title: 'Connect', desc: 'Ask, share, and grow together' },
]

const style = `
  .com-root * { box-sizing: border-box; }
  .com-root { font-family: 'Montserrat', sans-serif; background: #FAFAF8; color: #0F0F0D; }

  /* hero handled inline */

  /* ── Section wrapper ── */
  .section { padding: 80px 0; }
  .section + .section { border-top: 1px solid #EBEBEA; }
  .inner { max-width: 1280px; margin: 0 auto; }

  /* ── Section label ── */
  .sec-label {
    font-family: 'Montserrat', sans-serif; font-size: 11px;
    font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
    color: #F26527; margin-bottom: 12px;
  }
  .sec-title {
    font-family: 'Montserrat', sans-serif; font-size: clamp(26px, 3.5vw, 40px);
    font-weight: 800; letter-spacing: -0.02em; color: #0F0F0D; line-height: 1.1;
  }

  /* ── Benefit cards ── */
  .benefits-grid {
    display: grid; gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    margin-top: 48px;
  }
  .benefit-card {
    background: #fff;
    border: 1px solid #EBEBEA;
    border-radius: 20px;
    padding: 28px;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    position: relative; overflow: hidden;
  }
  .benefit-card::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
    background: var(--accent);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s ease;
  }
  .benefit-card:hover::before { transform: scaleX(1); }
  .benefit-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.08);
    border-color: transparent;
  }
  .benefit-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; margin-bottom: 16px;
    background: color-mix(in srgb, var(--accent) 10%, white);
  }
  .benefit-title {
    font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 700;
    color: #0F0F0D; margin-bottom: 14px;
  }
  .benefit-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .benefit-list li {
    font-size: 13.5px; color: #666; line-height: 1.5;
    display: flex; align-items: flex-start; gap: 8px;
  }
  .benefit-list li::before {
    content: '—'; color: var(--accent); font-weight: 700;
    flex-shrink: 0; margin-top: 1px;
  }

  /* ── Guidelines ── */
  .guide-grid {
    display: grid; gap: 16px; grid-template-columns: 1fr 1fr; margin-top: 40px;
  }
  @media (max-width: 640px) { .guide-grid { grid-template-columns: 1fr; } }
  .guide-card {
    border-radius: 24px; padding: 36px;
    position: relative; overflow: hidden;
  }
  .guide-card-values {
    background: #0F0F0D; color: #fff;
  }
  .guide-card-notallowed {
    background: #FFF4EE;
    border: 1px solid rgba(242,101,39,0.15);
  }
  .guide-card-title {
    font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 800;
    margin-bottom: 24px;
  }
  .guide-card-values .guide-card-title { color: #fff; }
  .guide-card-notallowed .guide-card-title { color: #0F0F0D; }
  .value-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07);
    font-size: 14px; color: rgba(255,255,255,0.8);
  }
  .value-item:last-child { border-bottom: none; }
  .value-dot {
    width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
    background: rgba(242,101,39,0.15);
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; color: #F26527;
  }
  .notallowed-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 0; border-bottom: 1px solid rgba(242,101,39,0.1);
    font-size: 14px; color: #444;
  }
  .notallowed-item:last-child { border-bottom: none; }
  .no-icon {
    width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0;
    background: rgba(242,101,39,0.12);
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; color: #F26527;
  }

  /* ── Steps ── */
  .steps-row {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 2px; margin-top: 48px;
    background: #EBEBEA; border-radius: 20px; overflow: hidden;
  }
  @media (max-width: 768px) {
    .steps-row { grid-template-columns: repeat(2, 1fr); }
  }
  .step-card {
    background: #fff; padding: 32px 24px;
    position: relative; transition: background 0.2s;
  }
  .step-card:hover { background: #FFF4EE; }
  .step-num {
    font-family: 'Montserrat', sans-serif; font-size: 11px;
    font-weight: 700; letter-spacing: 0.15em; color: #F26527;
    margin-bottom: 16px; text-transform: uppercase;
  }
  .step-title {
    font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 800;
    color: #0F0F0D; margin-bottom: 8px;
  }
  .step-desc { font-size: 13.5px; color: #888; line-height: 1.5; }

  /* ── Events ── */
  .events-grid {
    display: grid; gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    margin-top: 48px;
  }
  .event-card {
    background: #fff; border: 1px solid #EBEBEA; border-radius: 20px;
    padding: 28px; display: flex; flex-direction: column;
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .event-card:hover {
    box-shadow: 0 24px 64px rgba(0,0,0,0.09);
    transform: translateY(-3px);
  }
  .event-tag {
    display: inline-flex; align-items: center;
    padding: 4px 12px; border-radius: 100px;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase;
    background: color-mix(in srgb, var(--tag-color) 12%, white);
    color: var(--tag-color);
    width: fit-content; margin-bottom: 14px;
    font-family: 'Montserrat', sans-serif;
  }
  .event-name {
    font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 800;
    color: #0F0F0D; line-height: 1.25; margin-bottom: 8px;
  }
  .event-date {
    font-size: 12.5px; font-weight: 600; color: #F26527;
    margin-bottom: 16px; letter-spacing: 0.03em;
  }
  .event-details { list-style: none; display: flex; flex-direction: column; gap: 6px; flex: 1; }
  .event-details li { font-size: 13px; color: #777; display: flex; align-items: center; gap: 7px; }
  .event-details li::before { content: '·'; color: #F26527; font-size: 18px; line-height: 0; }
  .event-cta {
    margin-top: 24px; display: inline-flex; align-items: center; gap: 8px;
    background: #0F0F0D; color: #fff; border: none; cursor: pointer;
    padding: 11px 22px; border-radius: 100px;
    font-size: 11.5px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    font-family: 'Montserrat', sans-serif; width: fit-content;
    transition: background 0.2s, transform 0.15s;
  }
  .event-cta:hover { background: #F26527; transform: scale(1.02); }
  .event-cta::after { content: '→'; font-size: 14px; transition: transform 0.2s; }
  .event-cta:hover::after { transform: translateX(3px); }

  /* ── CTA Banner ── */
  .cta-wrap { padding: 24px; }
  .cta-banner {
    background: #0F0F0D; border-radius: 28px;
    padding: 72px 40px; text-align: center;
    position: relative; overflow: hidden;
  }
  .cta-orb-l {
    position: absolute; bottom: -80px; left: -60px;
    width: 380px; height: 380px; border-radius: 50%;
    background: radial-gradient(circle, rgba(242,101,39,0.22) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-orb-r {
    position: absolute; top: -80px; right: -60px;
    width: 380px; height: 380px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,140,66,0.16) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-inner { position: relative; max-width: 680px; margin: 0 auto; }
  .cta-badge {
    display: inline-flex; align-items: center; gap: 7px;
    border: 1px solid rgba(242,101,39,0.3); background: rgba(242,101,39,0.08);
    padding: 6px 16px; border-radius: 100px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.18em;
    text-transform: uppercase; color: #FF9C73;
    font-family: 'Montserrat', sans-serif; margin-bottom: 22px;
  }
  .cta-title {
    font-family: 'Montserrat', sans-serif; font-size: clamp(28px, 4.5vw, 52px);
    font-weight: 800; color: #fff; line-height: 1.1;
    letter-spacing: -0.02em; margin-bottom: 16px;
  }
  .cta-title em {
    font-style: normal;
    background: linear-gradient(110deg, #F26527, #FFB382);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .cta-desc {
    font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.7;
    margin-bottom: 36px; font-weight: 300;
  }
  .cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: #F26527; color: #fff; text-decoration: none;
    padding: 14px 28px; border-radius: 100px;
    font-size: 12px; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; font-family: 'Montserrat', sans-serif;
    transition: opacity 0.2s, transform 0.15s;
  }
  .btn-primary:hover { opacity: 0.88; transform: scale(1.02); }
  .btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.07); color: #fff; text-decoration: none;
    border: 1px solid rgba(255,255,255,0.12);
    padding: 14px 28px; border-radius: 100px;
    font-size: 12px; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; font-family: 'Montserrat', sans-serif;
    transition: background 0.2s;
  }
  .btn-secondary:hover { background: rgba(255,255,255,0.12); }
`

function Community() {
  return (
    <>
      <style>{style}</style>
      <main className="com-root">

        {/* ── HERO ── */}
        <section className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-[#070D1A] px-4 pb-24 pt-14 md:px-8">
          {/* Grid pattern */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(242,101,39,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(242,101,39,0.06) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />
          {/* Orbs */}
          <div
            className="pointer-events-none absolute -top-32 right-[6%] h-[460px] w-[460px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(242,101,39,0.2) 0%, transparent 70%)' }}
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-20 h-[360px] w-[360px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,140,66,0.12) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
            {/* Left: text */}
            <div className="flex flex-col items-start text-left">
              <p className="mb-5 inline-flex items-center rounded-full border border-[#F26527]/40 bg-[#F26527]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF9C73]">
                <Sparkles size={13} className="mr-2" />
                Community
              </p>
              <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight text-white">
                Where Founders{' '}
                <span className="relative inline-block">
                  <span
                    className="relative z-10 bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(135deg,#F26527,#FFB382)' }}
                  >
                    Build Together
                  </span>
                  <span
                    className="absolute bottom-1 left-0 right-0 -z-10 h-2.5 rounded"
                    style={{ background: 'linear-gradient(90deg,rgba(242,101,39,0.25),rgba(255,179,130,0.25))' }}
                  />
                </span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-white/55 md:text-lg">
                500+ founders, mentors, and partners in one tight-knit ecosystem. Real support. Real connections. Real growth.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {[
                  { icon: Users,        val: '500+', label: 'Active Members' },
                  { icon: Clock,        val: '24h',  label: 'Mentor Response' },
                  { icon: CalendarDays, val: '12+',  label: 'Events Per Year' },
                // eslint-disable-next-line no-unused-vars
              ].map(({ icon: StatIcon, val, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm font-medium text-white/65">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F26527]/20 text-[#F26527]">
                      <StatIcon size={13} />
                    </span>
                    <span>{val} {label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: hero image */}
            <div className="relative hidden md:block">
              {/* Glow halo */}
              <div
                className="absolute -inset-3 rounded-3xl blur-2xl"
                style={{ background: 'linear-gradient(135deg,rgba(242,101,39,0.28),rgba(255,140,66,0.2))' }}
              />
              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 z-20 flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 shadow-xl backdrop-blur">
                <span className="text-sm">🤝</span>
                <span className="text-xs font-bold text-white">500+ Active Founders</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
                alt="Founder community networking"
                className="relative h-[320px] w-full rounded-3xl border border-white/20 object-cover shadow-2xl md:h-[440px]"
              />
            </div>
          </div>

          {/* Wave divider to light content below */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
            <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
              <path d="M0,28 C360,56 1080,0 1440,28 L1440,56 L0,56 Z" fill="#FAFAF8" />
            </svg>
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section className="section">
          <div className="inner px-6 md:px-0">
            <p className="sec-label">What You Get</p>
            <h2 className="sec-title">Everything In Your Corner</h2>
            <div className="benefits-grid">
              {communityBenefits.map((item) => (
                <article
                  key={item.title}
                  className="benefit-card"
                  style={{ '--accent': item.accent }}
                >
                  <div className="benefit-icon">{item.icon}</div>
                  <h3 className="benefit-title">{item.title}</h3>
                  <ul className="benefit-list">
                    {item.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── GUIDELINES ── */}
        <section className="section">
          <div className="inner px-6 md:px-0">
            <p className="sec-label">Community Standards</p>
            <h2 className="sec-title">How We Show Up</h2>
            <div className="guide-grid">
              <div className="guide-card guide-card-values">
                <h3 className="guide-card-title">Our Values</h3>
                {values.map((v) => (
                  <div key={v.text} className="value-item">
                    <span className="value-dot">{v.icon}</span>
                    {v.text}
                  </div>
                ))}
              </div>
              <div className="guide-card guide-card-notallowed">
                <h3 className="guide-card-title" style={{ color: '#0F0F0D' }}>We Don't Allow</h3>
                {notAllowed.map((item) => (
                  <div key={item} className="notallowed-item">
                    <span className="no-icon">✕</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW TO JOIN ── */}
        <section className="section">
          <div className="inner px-6 md:px-0">
            <p className="sec-label">Getting Started</p>
            <h2 className="sec-title">Four Steps In</h2>
            <div className="steps-row">
              {steps.map((s) => (
                <div key={s.num} className="step-card">
                  <div className="step-num">{s.num}</div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EVENTS ── */}
        <section className="section">
          <div className="inner px-6 md:px-0">
            <p className="sec-label">What's Coming</p>
            <h2 className="sec-title">Upcoming Events</h2>
            <div className="events-grid">
              {events.map((event) => (
                <article key={event.name} className="event-card">
                  <span className="event-tag" style={{ '--tag-color': event.tagColor }}>
                    {event.tag}
                  </span>
                  <h3 className="event-name">{event.name}</h3>
                  <p className="event-date">📅 {event.date}</p>
                  <ul className="event-details">
                    {event.details.map((d) => <li key={d}>{d}</li>)}
                  </ul>
                  <button type="button" className="event-cta">{event.cta}</button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="cta-wrap">
          <div className="cta-banner">
            <div className="cta-orb-l" />
            <div className="cta-orb-r" />
            <div className="cta-inner">
              <div className="cta-badge">Ready to Join?</div>
              <h2 className="cta-title">
                Build Faster With The<br /><em>Founder Community</em>
              </h2>
              <p className="cta-desc">
                Join conversations, attend events, and connect with mentors and founders who are building like you.
              </p>
              <div className="cta-btns">
                <Link to="/contact-us" className="btn-primary">Join Community</Link>
                <Link to="/services" className="btn-secondary">Explore Services</Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}

export default Community