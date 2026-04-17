import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'
import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Calculator,
  FileText,
  Receipt,
  Scale,
} from 'lucide-react'

const LOTTIE_URL =
  'https://cdn.prod.website-files.com/686c3195802b0228dca014a8/687059e9021f0c2322f49a77_hero-animation.json'

const LottieComponent = typeof Lottie === 'function' ? Lottie : Lottie?.default

const coreServices = [
  { title: 'CA', icon: Calculator },
  { title: 'CS', icon: Scale },
  { title: 'Trademark', icon: BadgeCheck },
  { title: 'GST', icon: Receipt },
  { title: 'LLP', icon: Building2 },
  { title: 'Company Registration', icon: BriefcaseBusiness },
  { title: 'LLP Registration', icon: FileText },
]

const heroBadgeReplacements = [
  { label: 'CA', animation: 'arcTravel 32s linear infinite', delay: 0 },
  { label: 'CS', animation: 'arcTravel 32s linear infinite', delay: -8 },
  { label: 'GST', animation: 'arcTravel 32s linear infinite', delay: -16 },
  { label: 'LLP', animation: 'arcTravel 32s linear infinite', delay: -24 },
]

function HomeMain() {
  const [animationData, setAnimationData] = useState(null)
  const [animationError, setAnimationError] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadAnimation = async () => {
      try {
        const response = await fetch(LOTTIE_URL)
        if (!response.ok) throw new Error('Failed to load animation')
        const data = await response.json()
        if (isMounted) setAnimationData(data)
      } catch {
        if (isMounted) setAnimationError(true)
      }
    }

    loadAnimation()

    return () => {
      isMounted = false
    }
  }, [])

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
        /* Bottom curve circumference travel */
        @keyframes arcTravel {
          0% { transform: translate3d(-72vw, 8px, 0) scale(1); }
          25% { transform: translate3d(-36vw, 66px, 0) scale(1.01); }
          50% { transform: translate3d(0vw, 104px, 0) scale(1.02); }
          75% { transform: translate3d(36vw, 66px, 0) scale(1.01); }
          100% { transform: translate3d(72vw, 8px, 0) scale(1); }
        }
      `}</style>
      <section
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white"
      >
        {!animationError && animationData && LottieComponent ? (
          <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden opacity-80">
            <LottieComponent
              animationData={animationData}
              loop
              className="-ml-[1%] h-full w-[102%] min-w-[102%]"
              rendererSettings={{ preserveAspectRatio: 'xMinYMid slice' }}
            />
          </div>
        ) : null}
        {animationError || !LottieComponent ? (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-100 to-white" />
        ) : null}

        {!animationError ? (
          <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
            {heroBadgeReplacements.map((badge) => {
              return (
                <div key={badge.label} className="absolute left-1/2 top-[56%]">
                  <div
                    style={{
                      animation: badge.animation,
                      animationDelay: `${badge.delay}s`,
                    }}
                  >
                    <div className="flex h-16 min-w-16 w-fit items-center justify-center rounded-full bg-white/95 px-4 text-sm font-bold text-[#31393C] shadow-md ring-1 ring-slate-200">
                      <span>{badge.label}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : null}

        <div className="relative z-20 mx-auto w-full max-w-7xl px-4 text-center text-[#31393C] md:px-8">
          <h1
            className="mx-auto max-w-5xl leading-tight"
            style={{ animation: 'heroTextSlideIn 0.9s ease-out forwards' }}
          >
            <span className="block -mt-2 text-3xl font-extrabold md:text-5xl">
              Build Your Business with Founders-First platform.
            </span>
            <span className="mt-2 block whitespace-nowrap text-xl font-semibold md:text-3xl">
              Connect • Inspire • Achieve
            </span>
          </h1>
          <p
            className="mx-auto mt-4 max-w-2xl text-base text-slate-600"
            style={{ animation: 'heroTextSlideIn 1.2s ease-out forwards' }}
          >
            Discover, build and scale your ideas with a seamless digital experience.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/services"
              className="bg-[#F26527] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
            >
              Get Started
            </Link>
            <a
              href="#services"
              className="border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="border-y border-slate-200 bg-stone-100 py-14">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <h2 className="text-2xl font-bold">Our Core Services</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Everything a startup needs under one roof to build faster, raise smarter, and grow sustainably.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((service) => {
              const ServiceIcon = service.icon
              return (
                <article
                  key={service.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#F26527]/10 text-[#F26527]">
                    <ServiceIcon size={18} />
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Tailored support for your current growth stage with practical implementation.
                  </p>
                </article>
              )
            })}
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
