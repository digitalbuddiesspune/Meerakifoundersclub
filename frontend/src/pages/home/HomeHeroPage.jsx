import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'
import orbitAnimation from '../../assets/orbit-arcs.json'

const LottieComponent = typeof Lottie === 'function' ? Lottie : Lottie?.default

const stats = [
  { value: '2000+', label: 'Founders' },
  { value: '4', label: 'Membership Plans' },
  { value: '50+', label: 'Mentors' },
  { value: '10+', label: 'Partners' },
]

function useCountUp(target, duration = 1800, start = false) {
  const numericTarget = parseInt(String(target).replace(/\D/g, ''), 10) || 0
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    if (!numericTarget) return

    let startTime = null
    let frameId = null

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * numericTarget))
      if (progress < 1) frameId = requestAnimationFrame(step)
      else setCount(numericTarget)
    }

    frameId = requestAnimationFrame(step)
    return () => {
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [start, duration, numericTarget])

  return count
}

function StatCard({ value, label, delay, animate }) {
  const suffix = value.replace(/[0-9]/g, '')
  const count = useCountUp(value, 1600, animate)
  return (
    <div
      className="stat-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="stat-number">
        {animate ? `${count}${suffix}` : '0'}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

function HomeHeroPage() {
  const orbitLottieRef = useRef(null)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    orbitLottieRef.current?.setSpeed(0.6)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="home-hero"
      className="hero-section"
    >
      <style>{`
        .hero-section {
          position: relative;
          isolation: isolate;
          display: flex;
          min-height: 100svh;
          width: 100%;
          max-width: 100%;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #040d1a;
          text-align: center;
          font-family: 'Montserrat', sans-serif;
        }

        /* ── noise grain overlay ── */
        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 200px;
          pointer-events: none;
          z-index: 1;
          opacity: 0.6;
        }

        /* ── radial glow ── */
        .hero-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 55% at 50% 45%, rgba(242,101,39,0.13) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(62,150,244,0.07) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── horizontal rule accent ── */
        .hero-rule {
          width: 52px;
          height: 2px;
          background: linear-gradient(90deg, #F26527, #ff9a5c);
          border-radius: 2px;
          margin: 0 auto 20px;
        }

        /* ── eyebrow ── */
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #F26527;
          padding: 5px 14px;
          border: 1px solid rgba(242,101,39,0.35);
          border-radius: 999px;
          backdrop-filter: blur(8px);
          background: rgba(242,101,39,0.07);
          margin-bottom: 22px;
          animation: fadeUp 0.7s ease-out forwards;
          opacity: 0;
        }

        .hero-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #F26527;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        /* ── main headline ── */
        .hero-headline {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 4.7vw, 4rem);
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #f0f4ff;
          margin-bottom: 14px;
          animation: fadeUp 0.8s 0.15s ease-out forwards;
          opacity: 0;
        }

        .hero-headline .accent {
          background: linear-gradient(110deg, #F26527 20%, #ffab70 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── sub ── */
        .hero-sub {
          font-size: clamp(0.9rem, 2vw, 1.15rem);
          font-weight: 300;
          color: rgba(200,215,255,0.65);
          letter-spacing: 0.06em;
          margin-bottom: 24px;
          animation: fadeUp 0.8s 0.28s ease-out forwards;
          opacity: 0;
        }

        /* ── CTAs ── */
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          justify-content: center;
          animation: fadeUp 0.8s 0.4s ease-out forwards;
          opacity: 0;
          margin-bottom: 28px;
        }

        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 20px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #F26527 0%, #d94e12 100%);
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 4px 24px rgba(242,101,39,0.35), 0 1px 0 rgba(255,255,255,0.15) inset;
          transition: transform 0.2s, box-shadow 0.2s;
          letter-spacing: 0.01em;
        }

        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(242,101,39,0.5), 0 1px 0 rgba(255,255,255,0.15) inset;
        }

        .cta-primary svg { flex-shrink: 0; }

        .cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 18px;
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(200,215,255,0.8);
          border: 1px solid rgba(200,215,255,0.18);
          border-radius: 12px;
          text-decoration: none;
          backdrop-filter: blur(8px);
          background: rgba(255,255,255,0.04);
          transition: background 0.2s, color 0.2s, transform 0.2s;
          letter-spacing: 0.01em;
        }

        .cta-secondary:hover {
          background: rgba(255,255,255,0.09);
          color: #fff;
          transform: translateY(-2px);
        }

        /* ── stats row ── */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
          background: rgba(255,255,255,0.07);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          animation: fadeUp 0.9s 0.55s ease-out forwards;
          opacity: 0;
        }

        @media (max-width: 600px) {
          .stats-row {
            grid-template-columns: repeat(2, 1fr);
            max-width: 340px;
          }
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 22px 12px;
          background: rgba(10,18,40,0.7);
          transition: background 0.25s;
          gap: 4px;
        }

        .stat-card:hover {
          background: rgba(242,101,39,0.07);
        }

        .stat-number {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: clamp(1.4rem, 3vw, 2rem);
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.7rem;
          font-weight: 400;
          color: rgba(180,200,255,0.5);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* ── animations ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── divider line above stats ── */
        .stats-divider {
          width: 1px;
          height: 32px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent);
          margin: 0 auto 16px;
        }
      `}</style>

      {/* glows */}
      <div className="hero-glow" />

      {/* lottie + orbit labels */}
      <div className="pointer-events-none absolute inset-0 z-0 -translate-y-4 overflow-hidden md:-translate-y-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[360px] w-[360px] opacity-40 md:h-[760px] md:w-[760px]">
            {LottieComponent ? (
              <LottieComponent
                lottieRef={orbitLottieRef}
                animationData={orbitAnimation}
                loop
                className="h-full w-full"
              />
            ) : (
              <div className="h-full w-full rounded-full border border-[#3E96F4]/20" />
            )}
          </div>
        </div>

      </div>

      {/* ── content ── */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-20"
        style={{ paddingTop: 'clamp(20px,3.5vh,52px)', paddingBottom: 'clamp(28px,6vh,72px)' }}
      >
        {/* eyebrow */}
        <span className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          Founders-First Platform
        </span>

        {/* rule */}
        <div className="hero-rule" />

        {/* headline */}
        <h1 className="hero-headline">
          Build Your Business With India's<br />
          <span className="accent">First Marketplace For Founders</span>
        </h1>

        {/* sub */}
        <p className="hero-sub">Connect · Inspire · Achieve</p>

        {/* CTAs */}
        <div className="hero-ctas">
          <Link to="/services" className="cta-primary">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Get Started
          </Link>
          <a href="#services" className="cta-secondary">
            Learn More
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 2v9M2 6.5l4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* divider */}
        <div className="stats-divider" />

        {/* stats */}
        <div className="stats-row" ref={statsRef}>
          {stats.map((s, i) => (
            <StatCard
              key={s.label}
              value={s.value}
              label={s.label}
              delay={i * 80}
              animate={statsVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeHeroPage