import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import heroHomeImg from '../../assets/hero-home.jpg'
import {
  ArrowRight,
  Handshake,
  Sparkles,
  Users,
  Building2,
  UserRound,
  ThumbsUp,
  Zap,
} from 'lucide-react'

/* ─── Stats ─────────────────────────────────────────────────────── */
const stats = [
  { value: '2000+', label: 'Founders Trust Us',    icon: Users },
  { value: '500+',  label: 'Companies Registered', icon: Building2 },
  { value: '50+',   label: 'Expert Professionals', icon: UserRound },
  { value: '98%',   label: 'Client Satisfaction',  icon: ThumbsUp },
]

const marqueeChips = [
  { label: 'Company Registration', emoji: '🏢' },
  { label: 'GST & Compliance',     emoji: '📋' },
  { label: 'Brand Identity',       emoji: '🎨' },
  { label: 'Legal Support',        emoji: '⚖️' },
  { label: 'Fundraising',          emoji: '💰' },
  { label: 'Digital Marketing',    emoji: '📱' },
  { label: 'HR & Payroll',         emoji: '👥' },
  { label: 'Accounting',           emoji: '📊' },
  { label: 'IP & Trademarks',      emoji: '™️' },
  { label: 'Mentorship',           emoji: '🧭' },
]

function useCountUp(target, duration = 1600, start = false) {
  const numericTarget = parseInt(String(target).replace(/\D/g, ''), 10) || 0
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start || !numericTarget) return
    let startTime = null
    let frameId = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(eased * numericTarget))
      if (p < 1) frameId = requestAnimationFrame(step)
      else setCount(numericTarget)
    }
    frameId = requestAnimationFrame(step)
    return () => { if (frameId) cancelAnimationFrame(frameId) }
  }, [start, duration, numericTarget])

  return count
}

function StatBadge({ value, label, icon, animate }) {
  const suffix = value.replace(/[0-9]/g, '')
  const count = useCountUp(value, 1600, animate)
  const Icon = icon
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-[#F26527]">
        <Icon size={13} />
      </span>
      {animate ? `${count}${suffix}` : '0'} {label}
    </div>
  )
}

/* ─── Main component ────────────────────────────────────────────── */
function HomeHeroPage() {
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
      { threshold: 0.3 },
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes floatImg {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        .marquee-track { animation: marquee 28s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        .hero-badge { animation: fadeSlideUp .6s ease both; animation-delay: .05s; }
        .hero-h1    { animation: fadeSlideUp .7s ease both; animation-delay: .18s; }
        .hero-p     { animation: fadeSlideUp .7s ease both; animation-delay: .30s; }
        .hero-btns  { animation: fadeSlideUp .7s ease both; animation-delay: .42s; }
        .hero-stats { animation: fadeSlideUp .8s ease both; animation-delay: .54s; }
        .hero-img   { animation: fadeSlideUp .8s ease both; animation-delay: .22s; }
        .btn-shine  { position: relative; overflow: hidden; }
        .btn-shine::after {
          content: '';
          position: absolute;
          top: 0; left: -75%;
          width: 50%; height: 100%;
          background: linear-gradient(120deg,transparent,rgba(255,255,255,0.35),transparent);
          transform: skewX(-20deg);
          transition: left .45s ease;
        }
        .btn-shine:hover::after { left: 130%; }
        .img-float { animation: floatImg 6s ease-in-out infinite; }
      `}</style>

      <section className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-white px-4 pb-20 pt-14 md:px-8">

        {/* Subtle orange grid pattern */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(242,101,39,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(242,101,39,0.04) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        {/* Soft orbs */}
        <div
          className="pointer-events-none absolute -top-36 right-[4%] h-[540px] w-[540px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(242,101,39,0.1) 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,140,66,0.07) 0%, transparent 70%)' }}
        />

        {/* Spinning ring (top-right) */}
        <div className="pointer-events-none absolute right-0 top-0 hidden md:block"
          style={{ width: 340, height: 340, opacity: 0.12 }}>
          <svg style={{ animation: 'spin 18s linear infinite', display: 'block', width: '100%', height: '100%' }}
            viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="170" cy="170" r="160" stroke="url(#homeRing)" strokeWidth="1.5" strokeDasharray="14 8" />
            <circle cx="170" cy="170" r="120" stroke="url(#homeRing)" strokeWidth="1" strokeDasharray="8 12" />
            <defs>
              <linearGradient id="homeRing" x1="0" y1="0" x2="340" y2="340" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F26527" /><stop offset="1" stopColor="#FFB382" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Two-column layout */}
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 md:gap-12 md:grid-cols-2">

          {/* Left: copy */}
          <div>
            <p className="hero-badge mb-5 inline-flex items-center rounded-full border border-orange-300/50 bg-orange-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F26527]">
              <Sparkles size={13} className="mr-2" />
              India&apos;s First Marketplace For Founders
            </p>

            <h1 className="hero-h1 text-[clamp(2rem,4.5vw,3.6rem)] font-extrabold leading-[1.08] tracking-tight text-slate-900">
              Build Your Business With India&apos;s{' '}
              <span className="relative inline-block">
                <span
                  className="relative z-10 text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg,#F26527,#ffab70)' }}
                >
                  First Marketplace
                </span>
                <span
                  className="absolute bottom-1 left-0 right-0 -z-10 h-2.5 rounded"
                  style={{ background: 'linear-gradient(90deg,rgba(242,101,39,0.15),rgba(255,171,112,0.15))' }}
                />
              </span>{' '}
              For Founders
            </h1>

            <p className="hero-p mt-5 max-w-lg text-base leading-relaxed text-slate-500 md:text-lg">
              From company registration to compliance, branding and growth — everything
              founders need, all in one place.
            </p>

            <div ref={statsRef} className="hero-stats mt-7 flex flex-wrap gap-x-6 gap-y-3">
              {stats.map((s) => (
                <StatBadge key={s.label} value={s.value} label={s.label} icon={s.icon} animate={statsVisible} />
              ))}
            </div>

            <div className="hero-btns mt-8 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="btn-shine inline-flex items-center rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-orange-300/40"
                style={{ background: 'linear-gradient(135deg,#F26527,#FF8C42)' }}
              >
                Start Your Business
                <ArrowRight size={15} className="ml-2" />
              </Link>
              <Link
                to="/contact-us"
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-orange-300 hover:bg-orange-50 hover:scale-105"
              >
                <Handshake size={15} className="mr-2 text-[#F26527]" />
                Book Consultation
              </Link>
            </div>
          </div>

          {/* Right: hero image */}
          <div className="hero-img relative mt-8 md:mt-0">
            {/* Glow halo */}
            <div
              className="absolute -inset-3 rounded-3xl blur-2xl"
              style={{ background: 'linear-gradient(135deg,rgba(242,101,39,0.22),rgba(255,140,66,0.15))' }}
            />
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 z-20 flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 shadow-xl">
              <Zap size={14} className="text-[#F26527]" />
              <span className="text-xs font-bold text-slate-800">Trusted by 2000+ Founders</span>
            </div>
            <img
              src={heroHomeImg}
              alt="Founders building their business"
              className="img-float relative h-[320px] w-full rounded-3xl border border-slate-100 object-cover shadow-2xl md:h-[440px]"
            />
          </div>

        </div>

        {/* ── Marquee strip ── */}
        <div className="relative z-10 mt-14 w-full">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Trusted by founders across India
          </p>
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
            <div className="marquee-track flex w-max gap-4">
              {[...marqueeChips, ...marqueeChips].map((item, i) => (
                <div
                  key={i}
                  className="flex shrink-0 items-center gap-2.5 rounded-full border border-slate-100 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:border-orange-200 hover:bg-orange-50 hover:text-[#F26527]"
                >
                  <span className="text-base leading-none">{item.emoji}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default HomeHeroPage
