import { Link } from 'react-router-dom'
import heroAboutImg from '../assets/hero-about.jpg'
import { Sparkles, Users, BriefcaseBusiness, Handshake, CalendarDays } from 'lucide-react'

const pillars = [
  {
    title: 'Our Mission',
    icon: '🎯',
    accent: '#F26527',
    points: [
      'Empower founders in Tier II, III, and IV cities',
      'Enable launch and growth with confidence',
      'Deliver trusted services, capital, and community',
      'Operate through a WhatsApp-first ecosystem',
    ],
  },
  {
    title: 'Our Vision',
    icon: '🌍',
    accent: '#FF8C42',
    points: [
      'Empower one million entrepreneurs',
      'Build, scale, and collaborate across borders',
      'Turn Tier II/III momentum into global movement',
      'Make startup opportunity more geographically equal',
    ],
  },
]

const problems = [
  'Startup ecosystem is metro-centric (Delhi, Bangalore, Mumbai)',
  'Tier II/III founders are shut out of networks and mentorship',
  'They often pay more and get lower-quality execution',
  'Geographic disadvantage creates economic disadvantage',
  'Talent exists everywhere, but opportunity does not',
]

const solutions = [
  'Built for Tier II/III cities, not copied from metro playbooks',
  'Personal vetting, not marketplace chaos',
  'Community support, not founder isolation',
  'Transparent pricing, not hidden markups',
  'Local accountability, not faceless corporations',
]

const values = [
  { text: 'Founder-First: Every decision asks, "Does this help the founder?"', icon: '✦' },
  { text: 'Transparency: No hidden fees, no surprises, no corporate BS.', icon: '✦' },
  { text: 'Community Over Competition: Rising tides lift all boats.', icon: '✦' },
  { text: "Tier II/III Matters: Smaller cities deserve equal support.", icon: '✦' },
 
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
  },
]

const style = `
  .about-root * { box-sizing: border-box; }
  .about-root { font-family: 'Montserrat', sans-serif; background: #FAFAF8; color: #0F0F0D; }
  .inner { max-width: 1280px; margin: 0 auto; position: relative; }
  .section { padding: 80px 0; }
  .section + .section { border-top: 1px solid #EBEBEA; }
  .sec-title { font-size: clamp(26px, 3.5vw, 40px); font-weight: 800; color: #0F0F0D; margin-top: 10px; }
  .cards-grid { display: grid; gap: 40px; grid-template-columns: repeat(auto-fit, minmax(280px, 340px)); justify-content: center; margin-top: 42px; }
  .card { background: #fff; border: 1px solid #EBEBEA; border-radius: 20px; padding: 26px; transition: .25s ease; }
  .card:hover { transform: translateY(-4px); box-shadow: 0 20px 55px rgba(0,0,0,0.08); }
  .card-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 14px; }
  .card-title { font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 700; margin-bottom: 12px; }
  .card-list { list-style: none; display: flex; flex-direction: column; gap: 8px; color: #666; font-size: 13.5px; line-height: 1.5; }
  .card-list li { display: flex; gap: 8px; }
  .card-list li::before { content: '•'; color: #F26527; font-weight: 700; }
  .split-grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); margin-top: 42px; }
  .split-card { border-radius: 20px; padding: 28px; border: 1px solid #EBEBEA; }
  .split-problem { background: linear-gradient(160deg, #FFF8F3 0%, #FFF1E8 100%); }
  .split-solution { background: linear-gradient(160deg, #F7FAFF 0%, #EDF5FF 100%); }
  .split-title { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 700; color: #F26527; margin-bottom: 14px; }
  .split-list { list-style: none; display: flex; flex-direction: column; gap: 9px; font-size: 14px; color: #374151; line-height: 1.5; }
  .split-list li::before { content: '→ '; color: #F26527; font-weight: 700; }
  .team-grid, .values-grid { display: grid; gap: 16px; margin-top: 30px; }
  .team-grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
  .team-card { background: #fff; border: 1px solid #EBEBEA; border-radius: 20px; padding: 24px; }
  .team-name { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 700; }
  .team-role { margin-top: 6px; font-size: 13px; color: #F26527; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; }
  .team-desc { margin-top: 14px; color: #666; font-size: 14px; line-height: 1.6; }
  .values-grid { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
  .value-item { display: flex; gap: 10px; background: #fff; border: 1px solid #EBEBEA; border-radius: 14px; padding: 14px; color: #444; font-size: 14px; }
  .value-dot { color: #F26527; font-weight: 700; }
  .cta-wrap { padding: 60px 24px 90px; }
  .cta-banner { max-width: 1280px; margin: 0 auto; position: relative; overflow: hidden; border-radius: 28px; background: #070D1A; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 25px 70px rgba(7,13,26,0.45); }
  .cta-orb-l, .cta-orb-r { position: absolute; width: 280px; height: 280px; border-radius: 50%; background: rgba(242,101,39,0.25); filter: blur(60px); }
  .cta-orb-l { left: -120px; bottom: -120px; } .cta-orb-r { right: -120px; top: -120px; }
  .cta-inner { position: relative; text-align: center; padding: 56px 24px; color: #fff; }
  .cta-badge { display: inline-flex; border: 1px solid rgba(242,101,39,0.35); background: rgba(242,101,39,0.12); color: #FF9C73; padding: 6px 14px; border-radius: 999px; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; }
  .cta-title { margin-top: 16px; font-family: 'Montserrat', sans-serif; font-size: clamp(30px, 4.5vw, 56px); font-weight: 800; line-height: 1.05; }
  .cta-title em { font-style: normal; background: linear-gradient(110deg, #F26527, #FFB382 60%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .cta-desc { margin: 16px auto 0; max-width: 650px; color: rgba(255,255,255,0.72); font-size: 15px; line-height: 1.6; }
  .cta-btns { margin-top: 26px; display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; }
  .btn-primary, .btn-secondary { border-radius: 999px; padding: 11px 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; text-decoration: none; transition: .2s ease; }
  .btn-primary { background: #F26527; color: #fff; } .btn-primary:hover { opacity: 0.9; }
  .btn-secondary { background: #fff; color: #0F0F0D; border: 1px solid rgba(255,255,255,0.2); } .btn-secondary:hover { background: #f3f4f6; }
`

function AboutUs() {
  return (
    <>
      <style>{style}</style>
      <main className="about-root">
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
                About Us
              </p>
              <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight text-white">
                Built By Founders,{' '}
                <span className="relative inline-block">
                  <span
                    className="relative z-10 bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(135deg,#F26527,#FFB382)' }}
                  >
                    For Founders
                  </span>
                  <span
                    className="absolute bottom-1 left-0 right-0 -z-10 h-2.5 rounded"
                    style={{ background: 'linear-gradient(90deg,rgba(242,101,39,0.25),rgba(255,179,130,0.25))' }}
                  />
                </span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-white/55 md:text-lg">
                We are fixing Tier II/III startup barriers by building practical systems, trusted execution, and founder-first support.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {[
                  { icon: Users,             val: '5000+', label: 'Startups Consulted' },
                  { icon: BriefcaseBusiness, val: '100+',  label: 'Active Members' },
                  { icon: Handshake,         val: '50+',   label: 'Trusted Partners' },
                  { icon: CalendarDays,      val: '100+',  label: 'Events Conducted Across India' },
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
            <div className="relative mt-8 md:mt-0">
              {/* Glow halo */}
              <div
                className="absolute -inset-3 rounded-3xl blur-2xl"
                style={{ background: 'linear-gradient(135deg,rgba(242,101,39,0.28),rgba(255,140,66,0.2))' }}
              />
              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 z-20 flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 shadow-xl backdrop-blur">
                <span className="text-sm">🎯</span>
                <span className="text-xs font-bold text-white">Founder-First, Always</span>
              </div>
              <img
                src={heroAboutImg}
                alt="Founders collaborating"
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

        <section className="section">
          <div className="inner px-6 md:px-0">
            <p className="sec-label">Our Foundation</p>
            <h2 className="sec-title">Mission And Vision</h2>
            <div className="cards-grid">
              {pillars.map((item) => (
                <article key={item.title} className="card">
                  <div className="card-icon" style={{ background: `color-mix(in srgb, ${item.accent} 10%, white)` }}>
                    {item.icon}
                  </div>
                  <h3 className="card-title">{item.title}</h3>
                  <ul className="card-list">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="inner px-6 md:px-0">
            <p className="sec-label">Why We Built This</p>
            <h2 className="sec-title">Problem To Solution</h2>
            <div className="split-grid">
              <article className="split-card split-problem">
                <h3 className="split-title">The Problem We Saw</h3>
                <ul className="split-list">
                  {problems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="split-card split-solution">
                <h3 className="split-title">Our Solution</h3>
                <ul className="split-list">
                  {solutions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="inner px-6 md:px-0">
            <p className="sec-label">People Behind Meraaki</p>
            <h2 className="sec-title">The Team</h2>
            <div className="team-grid">
              {teamMembers.map((member) => (
                <article key={member.name} className="team-card">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-desc">{member.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="inner px-6 md:px-0">
            <p className="sec-label">How We Operate</p>
            <h2 className="sec-title">Our Values</h2>
            <div className="values-grid">
              {values.map((value) => (
                <div key={value.text} className="value-item">
                  <span className="value-dot">{value.icon}</span>
                  {value.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-wrap">
          <div className="cta-banner">
            <div className="cta-orb-l" />
            <div className="cta-orb-r" />
            <div className="cta-inner">
              <div className="cta-badge">Ready To Join?</div>
              <h2 className="cta-title">
                Join The Founder Movement<br /><em>Today</em>
              </h2>
              <p className="cta-desc">
                Be part of something bigger. Build with Meraaki Founders Club and turn your vision into execution.
              </p>
              <div className="cta-btns">
                <Link to="/contact-us" className="btn-primary">Start Your Journey</Link>
                <Link to="/services" className="btn-secondary">Explore Services</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default AboutUs
