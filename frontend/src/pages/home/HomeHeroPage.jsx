import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'

const LOTTIE_URL =
  'https://cdn.prod.website-files.com/686c3195802b0228dca014a8/687059e9021f0c2322f49a77_hero-animation.json'

// ✅ Dynamic labels (easy to scale)
const labels = [
  'CA','CS','GST','LLP','INC','TDS','ROC','PAN',
  'ITR','TM','ISO'
]

// ✅ Better spacing
const duration = 30
const step = duration / labels.length

const heroBadgeReplacements = labels.map((label, i) => ({
  label,
  animation: `arcTravel ${duration}s linear infinite`,
  delay: -(i * step),
}))

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

        /* ✅ Increased arc spacing */
        @keyframes arcTravel {
          0%   { transform: translate3d(-80vw, 8px, 0) scale(1); }
          25%  { transform: translate3d(-40vw, 80px, 0) scale(1.01); }
          50%  { transform: translate3d(0vw, 120px, 0) scale(1.02); }
          75%  { transform: translate3d(40vw, 80px, 0) scale(1.01); }
          100% { transform: translate3d(80vw, 8px, 0) scale(1); }
        }
      `}</style>

      {!animationError && animationData && LottieComponent ? (
        <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden opacity-80">
          <LottieComponent
            animationData={animationData}
            loop
            className="-ml-[22%] -mt-[24%] w-[144%] min-w-[144%] md:-ml-[1%] md:mt-16 md:h-full md:w-[102%] md:min-w-[102%]"
            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
          />
        </div>
      ) : null}

      {animationError || !LottieComponent ? (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-100 to-white" />
      ) : null}

      {!animationError ? (
        <div className="pointer-events-none absolute inset-0 z-10 block">
          {heroBadgeReplacements.map((badge) => (
            <div key={badge.label} className="absolute left-1/2">
              <div
                style={{
                  animation: badge.animation,
                  animationDelay: `${badge.delay}s`,
                }}
              >
                <div className="flex h-12 min-w-12 w-fit items-center justify-center rounded-full bg-white/95 px-3.5 text-xs font-bold text-[#31393C] shadow-sm ring-1 ring-slate-200 md:h-20 md:min-w-20 md:px-5 md:text-base md:shadow-md">
                  <span>{badge.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="relative z-20 mx-auto flex min-h-[64vh] -mt-30 w-full max-w-7xl flex-col items-center justify-center px-4 text-center text-[#31393C] md:min-h-[58vh] md:px-8">
        <h1
          className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center text-center leading-tight"
          style={{ animation: 'heroTextSlideIn 0.9s ease-out forwards' }}
        >
          <span className="block text-3xl font-bold leading-tight md:text-6xl">
            Build Your Business with <span className="hidden md:inline"><br /></span> Founders-First platform.
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