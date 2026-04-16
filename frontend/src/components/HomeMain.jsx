import { useEffect, useRef, useState } from 'react'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80'

function HomeMain() {
  const heroRef = useRef(null)
  const [scrollOffset, setScrollOffset] = useState(0)
  const [hoverOffset, setHoverOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current
      if (!hero) return

      const rect = hero.getBoundingClientRect()
      const windowHeight = window.innerHeight || 1
      const progress = Math.max(-1, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)))

      setScrollOffset((progress - 0.5) * 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseMove = (event) => {
    const hero = heroRef.current
    if (!hero) return

    const rect = hero.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 16
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12
    setHoverOffset({ x, y })
  }

  const resetHover = () => setHoverOffset({ x: 0, y: 0 })

  return (
    <main id="home">
      <style>{`
        @keyframes heroTextSlideIn {
          from {
            opacity: 0;
            transform: translateX(-52px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
      <section
        ref={heroRef}
        className="relative flex h-[78vh] w-full items-center justify-center overflow-hidden md:h-[82vh]"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetHover}
      >
        <img
          src={HERO_IMAGE}
          alt="Corporate building"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${hoverOffset.x}px, ${hoverOffset.y + scrollOffset}px, 0) scale(1.08)`,
          }}
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 px-4 text-center text-white md:px-8">
          <h1
            className="mx-auto max-w-4xl text-3xl font-bold leading-tight md:text-5xl"
            style={{ animation: 'heroTextSlideIn 0.9s ease-out forwards' }}
          >
            End-to-End Startup Solutions for Founders
          </h1>
          <p
            className="mx-auto mt-5 max-w-2xl text-sm text-slate-200 md:text-base"
            style={{ animation: 'heroTextSlideIn 1.2s ease-out forwards' }}
          >
            We help startups from zero to scale with strategy, investor readiness, funding support, branding,
            product development, and growth marketing.
          </p>
        </div>
      </section>

      <section id="services" className="border-y border-slate-200 bg-stone-100 py-14">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <h2 className="text-2xl font-bold">Our Core Services</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Everything a startup needs under one roof to build faster, raise smarter, and grow sustainably.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              'Startup Strategy & Validation',
              'Investor Funding Readiness',
              'Branding & Positioning',
              'MVP / Product Development',
              'Performance Marketing',
              'Sales & Scale Systems',
            ].map((service) => (
              <article
                key={service}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="text-lg font-semibold">{service}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Tailored support for your current growth stage with practical implementation.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8">
        <h2 className="text-2xl font-bold">How We Work</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            'Discovery Call',
            'Growth Blueprint',
            'Execution Sprint',
            'Scale & Support',
          ].map((step, index) => (
            <div key={step} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold text-emerald-300">Step {index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold">{step}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomeMain
