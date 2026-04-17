import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'

const LOTTIE_URL =
  'https://cdn.prod.website-files.com/686c3195802b0228dca014a8/687059e9021f0c2322f49a77_hero-animation.json'

const heroBadgeReplacements = [
  { label: 'CA', animation: 'arcTravel 32s linear infinite', delay: 0 },
  { label: 'CS', animation: 'arcTravel 32s linear infinite', delay: -8 },
  { label: 'GST', animation: 'arcTravel 32s linear infinite', delay: -16 },
  { label: 'LLP', animation: 'arcTravel 32s linear infinite', delay: -24 },
]

const LottieComponent = typeof Lottie === 'function' ? Lottie : Lottie?.default

function HomeHeroPage() {
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
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white">
      <style>{`
        @keyframes heroTextSlideIn {
          from { opacity: 0; transform: translateX(-52px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes arcTravel {
          0% { transform: translate3d(-72vw, 8px, 0) scale(1); }
          25% { transform: translate3d(-36vw, 66px, 0) scale(1.01); }
          50% { transform: translate3d(0vw, 104px, 0) scale(1.02); }
          75% { transform: translate3d(36vw, 66px, 0) scale(1.01); }
          100% { transform: translate3d(72vw, 8px, 0) scale(1); }
        }
      `}</style>

      {!animationError && animationData && LottieComponent ? (
        <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden opacity-80">
          <LottieComponent
            animationData={animationData}
            loop
            className="-ml-[1%] mt-16 w-[102%] min-w-[102%]"
            rendererSettings={{ preserveAspectRatio: 'xMinYMid slice' }}
          />
        </div>
      ) : null}

      {animationError || !LottieComponent ? (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-100 to-white" />
      ) : null}

      {!animationError ? (
        <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
          {heroBadgeReplacements.map((badge) => (
            <div key={badge.label} className="absolute left-1/2 top-[62%]">
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
          ))}
        </div>
      ) : null}

      <div className="relative z-20 mx-auto flex min-h-[58vh] w-full max-w-7xl flex-col items-center justify-center px-4 text-center text-[#31393C] md:px-8">
        <h1
          className="mx-auto max-w-6xl leading-tight"
          style={{ animation: 'heroTextSlideIn 0.9s ease-out forwards' }}
        >
          <span className="block text-3xl font-bold leading-tight md:text-6xl">
            Build Your Business with <br /> Founders-First platform.
          </span>
          <span className="mt-2 block text-2xl font-semibold md:text-3xl">
            Connect • Inspire • Achieve
          </span>
        </h1>

        <p
          className="mx-auto mt-4 max-w-2xl text-base text-slate-600"
          style={{ animation: 'heroTextSlideIn 1.2s ease-out forwards' }}
        >
          Discover, build and scale your ideas with a seamless digital experience.
        </p>

        <div
          className="mt-8 flex flex-wrap justify-center gap-4"
          style={{ animation: 'heroTextSlideIn 1.4s ease-out forwards' }}
        >
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
  )
}

export default HomeHeroPage
