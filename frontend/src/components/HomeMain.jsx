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
const MILLION_LOTTIE_URL =
  'https://cdn.prod.website-files.com/686c3195802b0228dca014a8/68705eaf39042c64b0a7d1d5_million.json'

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
  const [millionAnimationData, setMillionAnimationData] = useState(null)
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

  useEffect(() => {
    let isMounted = true

    const loadMillionAnimation = async () => {
      try {
        const response = await fetch(MILLION_LOTTIE_URL)
        if (!response.ok) throw new Error('Failed to load million animation')
        const data = await response.json()
        if (isMounted) setMillionAnimationData(data)
      } catch {
        if (isMounted) setMillionAnimationData(null)
      }
    }

    loadMillionAnimation()

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

      <section className="relative w-full overflow-hidden border-t border-slate-200 bg-white py-14 md:py-20">
        {millionAnimationData && LottieComponent ? (
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-20 z-0 h-[320px] opacity-55 md:top-0 md:h-[360px] md:opacity-45">
            <LottieComponent
              animationData={millionAnimationData}
              loop
              autoplay
              className="h-full w-full"
            />
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 select-none text-[28vw] font-extrabold leading-none tracking-tight text-slate-300/35 md:text-[18vw]"
          >
            foundrs.
          </div>
        )}

        <div className="relative z-10 mx-auto mt-20 w-full max-w-7xl px-4 text-center md:mt-40 md:px-8">
          <h2 className="mx-auto max-w-4xl text-[2.85rem] font-semibold leading-[1.02] tracking-tight text-slate-900 md:max-w-9xl md:text-[6rem]">
            Be one of the first{' '}
            <span className="block text-slate-400">foundrs.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-sm text-base leading-relaxed text-slate-600 md:mt-8 md:max-w-5xl md:text-4xl">
            We are building the startup system we wished existed. Want to be one of the first cohorts who get to use it? Join our newsletter to find out more.
          </p>

          <button
            type="button"
            className="mt-8 inline-flex items-center rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800"
          >
            Subscribe
          </button>

          <div className="mx-auto mt-10 w-full max-w-md overflow-hidden  bg-white md:relative md:left-1/2 md:mt-12 md:w-screen md:max-w-none md:-translate-x-1/2 md:rounded-none md:border-x-0">
            <video
              className="h-full w-full"
              src="https://res.cloudinary.com/dd0imqx3p/video/upload/q_auto/f_auto/v1776419568/686c3195802b0228dca014a8_687522c25faf9ca7aee11221_1-million-video-transcode_fqqdik.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomeMain
