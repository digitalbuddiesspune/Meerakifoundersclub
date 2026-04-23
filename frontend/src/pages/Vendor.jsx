import { Link } from 'react-router-dom'

const partnerBenefits = [
  {
    title: 'Direct Founder Access',
    icon: '🎯',
    accent: '#F26527',
    points: [
      'Reach 200+ Nagpur founders actively seeking support',
      'Connect with serious and verified clients',
      'Get discovered faster by startup operators',
      'Build long-term founder relationships',
    ],
  },
  {
    title: 'Keep More Earnings',
    icon: '💰',
    accent: '#FF8C42',
    points: [
      'Transparent platform fee model',
      'No confusing commission structures',
      'Fair split with predictable payouts',
      'Higher margin versus ad-led acquisition',
    ],
  },
  {
    title: 'Build Trusted Reputation',
    icon: '⭐',
    accent: '#E8521F',
    points: [
      'Every completed order improves visibility',
      'Ratings directly improve booking potential',
      'Social proof compounds over time',
      'Stand out through quality delivery',
    ],
  },
  {
    title: 'Zero Marketing Overhead',
    icon: '🚀',
    accent: '#F26527',
    points: [
      'No ad spend required to get discovered',
      'Founders find you through the platform',
      'Save effort on outbound campaigns',
      'Focus on delivery, not lead chasing',
    ],
  },
  {
    title: 'Payment Security',
    icon: '🔒',
    accent: '#FF6B35',
    points: [
      'Professional payment flow',
      'No chasing clients for dues',
      'Structured engagement confidence',
      'Clear transaction visibility',
    ],
  },
  {
    title: 'Growing Ecosystem',
    icon: '🌐',
    accent: '#FF8C42',
    points: [
      'Collaborate with other trusted partners',
      'Create referral opportunities',
      'Expand through ecosystem trust',
      'Grow together, sustainably',
    ],
  },
  {
    title: 'Pan India Visibility',
    icon: '📍',
    accent: '#F26527',
    points: [
      'Showcase your brand across  our platform, events, and founders network reaching entrepreneurs across India ',
     
     
    ],
  },
  {
    title: 'Partnership',
    icon: '🤝',
    accent: '#FF6B35',
    points: [
      'We believe in win-win partnerships where both founders and partners grow together',
   
      
    ],
  },
]

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
      'Profile appears in partner marketplace',
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
  'Partners with complaint history',
  'Anyone unwilling to provide references',
]

const style = `
  .partners-root * { box-sizing: border-box; }
  .partners-root { font-family: 'Montserrat', sans-serif; background: #FAFAF8; color: #0F0F0D; }
  .hero { position: relative; overflow: hidden; background: #0F0F0D; padding: 100px 0 80px; }
  .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(242,101,39,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(242,101,39,0.08) 1px, transparent 1px); background-size: 60px 60px; }
  .hero-orb-1 { position: absolute; top: -80px; right: 10%; width: 460px; height: 460px; border-radius: 50%; background: radial-gradient(circle, rgba(242,101,39,0.25) 0%, transparent 70%); }
  .hero-orb-2 { position: absolute; bottom: -60px; left: -80px; width: 340px; height: 340px; border-radius: 50%; background: radial-gradient(circle, rgba(255,140,66,0.12) 0%, transparent 70%); }
  .hero-inner, .inner { max-width: 1280px; margin: 0 auto; position: relative; }
  .hero-pill, .sec-label { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #F26527; }
  .hero-pill { display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(242,101,39,0.4); background: rgba(242,101,39,0.1); padding: 6px 14px; border-radius: 999px; color: #FF9C73; }
  .hero-pill::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #F26527; }
  .hero-title, .sec-title { font-family: 'Montserrat', sans-serif; letter-spacing: -0.02em; line-height: 1.05; }
  .hero-title { margin-top: 20px; font-size: clamp(38px, 6vw, 74px); font-weight: 800; color: #fff; }
  .hero-title em { font-style: normal; background: linear-gradient(110deg, #F26527, #FFB382 60%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .hero-sub { margin-top: 18px; font-size: 16px; line-height: 1.65; color: rgba(255,255,255,0.58); max-width: 720px; }
  .hero-stats { display: flex; gap: 40px; margin-top: 40px; flex-wrap: wrap; }
  .hero-stat-val { font-family: 'Montserrat', sans-serif; font-size: 34px; font-weight: 800; color: #fff; }
  .hero-stat-val span { color: #F26527; }
  .hero-stat-label { font-size: 12px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.12em; margin-top: 2px; }
  .section { padding: 80px 0; }
  .section + .section { border-top: 1px solid #EBEBEA; }
  .sec-title { font-size: clamp(26px, 3.5vw, 40px); font-weight: 800; color: #0F0F0D; margin-top: 10px; }
  .cards-grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); margin-top: 42px; }
  .card { background: #fff; border: 1px solid #EBEBEA; border-radius: 20px; padding: 26px; transition: .25s ease; }
  .card:hover { transform: translateY(-4px); box-shadow: 0 20px 55px rgba(0,0,0,0.08); }
  .card-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 14px; }
  .card-title { font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 700; margin-bottom: 12px; }
  .card-list { list-style: none; display: flex; flex-direction: column; gap: 8px; color: #666; font-size: 13.5px; line-height: 1.5; }
  .card-list li { display: flex; gap: 8px; }
  .card-list li::before { content: '•'; color: #F26527; font-weight: 700; }
  .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 14px; margin-top: 42px; }
  .step-card { background: #fff; border: 1px solid #EBEBEA; border-radius: 18px; padding: 22px; }
  .step-title { font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 700; color: #F26527; margin-bottom: 10px; }
  .step-list { list-style: none; display: flex; flex-direction: column; gap: 8px; color: #666; font-size: 13px; line-height: 1.5; }
  .step-list li::before { content: '→ '; color: #F26527; font-weight: 700; }
  .split-grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); margin-top: 42px; }
  .split-card { border-radius: 20px; padding: 28px; border: 1px solid #EBEBEA; }
  .split-good { background: linear-gradient(160deg, #F7FAFF 0%, #EDF5FF 100%); }
  .split-bad { background: linear-gradient(160deg, #FFF8F3 0%, #FFF1E8 100%); }
  .split-title { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 700; color: #F26527; margin-bottom: 14px; }
  .split-list { list-style: none; display: flex; flex-direction: column; gap: 9px; font-size: 14px; color: #374151; line-height: 1.5; }
  .split-list li::before { content: '✓ '; color: #F26527; font-weight: 700; }
  .split-bad .split-list li::before { content: '✕ '; }
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

function Vendor() {
  return (
    <>
      <style>{style}</style>
      <main className="partners-root">
        <section className="hero">
          <div className="hero-grid" />
          <div className="hero-orb-1" />
          <div className="hero-orb-2" />
          <div className="hero-inner px-6 md:px-0">
            <div className="hero-pill">Partners</div>
            <h1 className="hero-title">
              Join Our Partner Network<br /><em>And Grow Faster</em>
            </h1>
            <p className="hero-sub">
              Reach verified founders actively looking for your services. No middlemen. No commissions. Just direct, paying clients.
            </p>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-val">10<span>+</span></div>
                <div className="hero-stat-label">Active  Partners</div>
              </div>
              <div>
                <div className="hero-stat-val">20<span>+</span></div>
                <div className="hero-stat-label">Services</div>
              </div>
              <div>
                <div className="hero-stat-val">10<span>+</span></div>
                <div className="hero-stat-label">Active Mentors</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="inner px-6 md:px-0">
            <p className="sec-label">Why Partner</p>
            <h2 className="sec-title">Built For Sustainable Growth</h2>
            <div className="cards-grid">
              {partnerBenefits.map((item) => (
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
            <p className="sec-label">How To Join</p>
            <h2 className="sec-title">Simple 4-Step Onboarding</h2>
            <div className="steps-grid">
              {joinSteps.map((step) => (
                <article key={step.title} className="step-card">
                  <h3 className="step-title">{step.title}</h3>
                  <ul className="step-list">
                    {step.points.map((point) => (
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
            <p className="sec-label">Requirements</p>
            <h2 className="sec-title">Who Can Join</h2>
            <div className="split-grid">
              <article className="split-card split-good">
                <h3 className="split-title">Must Have</h3>
                <ul className="split-list">
                  {mustHave.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="split-card split-bad">
                <h3 className="split-title">We Do Not Accept</h3>
                <ul className="split-list">
                  {notAccepted.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="cta-wrap">
          <div className="cta-banner">
            <div className="cta-orb-l" />
            <div className="cta-orb-r" />
            <div className="cta-inner">
              <div className="cta-badge">Ready To Partner?</div>
              <h2 className="cta-title">
                Reach Serious Founders<br /><em>With Confidence</em>
              </h2>
              <p className="cta-desc">
                Apply today and join 80+ verified partners already serving Meraaki Founders Club&apos;s growing founder community.
              </p>
              <div className="cta-btns">
                <Link to="/contact-us" className="btn-primary">Apply As Partner</Link>
                <Link to="/services" className="btn-secondary">View Opportunities</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Vendor
