import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'
import orbitAnimation from '../../assets/orbit-arcs.json'

// ✅ Dynamic labels (easy to scale)
const labels = [
  'CA','CS','GST','LLP','INC','TDS','ROC','PAN',
  'ITR','TM','ISO'
]

const ORBIT_DURATION_SECONDS = 18
const ORBIT_RADIUS_DESKTOP = 320
const ORBIT_RADIUS_MOBILE = 170
const LottieComponent = typeof Lottie === 'function' ? Lottie : Lottie?.default

function HomeHeroPage() {
  const angleStep = 360 / labels.length
  const orbitLottieRef = useRef(null)

  useEffect(() => {
    orbitLottieRef.current?.setSpeed(0.6)
  }, [])

  return (
    <section className="relative isolate flex min-h-screen w-full max-w-full content-center items-center justify-center overflow-x-hidden overflow-y-hidden bg-white text-center">
      <style>{`
        @keyframes heroTextSlideIn {
          from { opacity: 0; transform: translateX(-52px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes orbitSpin {
          from {
            transform: rotate(var(--orbit-start-angle)) translateX(var(--orbit-radius)) rotate(calc(-1 * var(--orbit-start-angle)));
          }
          to {
            transform: rotate(calc(var(--orbit-start-angle) + 360deg)) translateX(var(--orbit-radius)) rotate(calc(-1 * (var(--orbit-start-angle) + 360deg)));
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 z-0 -translate-y-4 overflow-x-hidden overflow-y-hidden md:-translate-y-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[360px] w-[360px] opacity-60 md:h-[760px] md:w-[760px]">
            {LottieComponent ? (
              <LottieComponent
                lottieRef={orbitLottieRef}
                animationData={orbitAnimation}
                loop
                className="h-full w-full"
              />
            ) : (
              <div className="h-full w-full rounded-full border border-[#3E96F4]/30" />
            )}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center md:hidden">
          <div className="relative h-0 w-0">
            {labels.map((label, index) => (
              <div
                key={`${label}-mobile`}
                className="absolute left-0 top-0"
                style={{
                  '--orbit-start-angle': `${index * angleStep}deg`,
                  '--orbit-radius': `${ORBIT_RADIUS_MOBILE}px`,
                  animation: `orbitSpin ${ORBIT_DURATION_SECONDS}s linear infinite`,
                }}
              >
                <div className="flex h-9 min-w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 px-3 text-[11px] font-bold text-[#31393C] shadow-sm ring-1 ring-slate-200 md:hidden">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 hidden items-center justify-center md:flex">
          <div className="relative h-0 w-0">
            {labels.map((label, index) => (
              <div
                key={`${label}-desktop`}
                className="absolute left-0 top-0"
                style={{
                  '--orbit-start-angle': `${index * angleStep}deg`,
                  '--orbit-radius': `${ORBIT_RADIUS_DESKTOP}px`,
                  animation: `orbitSpin ${ORBIT_DURATION_SECONDS}s linear infinite`,
                }}
              >
                <div className="flex h-12 min-w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 px-3.5 text-xs font-bold text-[#31393C] shadow-sm ring-1 ring-slate-200">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-7xl -translate-y-4 flex-col content-center items-center justify-center px-4 text-center text-[#31393C] md:-translate-y-6 md:px-8">
        <h1
          className="flex w-full max-w-4xl flex-col content-center items-center justify-center text-center leading-tight"
          style={{ animation: 'heroTextSlideIn 0.9s ease-out forwards' }}
        >
          <span className="block text-xl font-bold leading-tight md:text-5xl">
            Build Your Business with 
           <p className="pb-2">
           Founders-First platform.
           </p> 
          </span>
          <span className="block text-base md:text-3xl pb-2">
            Connect • Inspire • Achieve
          </span>
        </h1>

       
        <div
          className="flex flex-wrap content-center items-center justify-center gap-4"
          style={{ animation: 'heroTextSlideIn 1.4s ease-out forwards' }}
        >
          <Link
            to="/services"
            className="bg-[#F26527] px-3 py-1.5 md:px-6 md:py-3 rounded-xl text-xs md:text-sm font-semibold text-white shadow-md transition hover:opacity-90"
          >
            Get Started
          </Link>

          <a
            href="#services"
            className="border border-slate-300 md:px-6 md:py-3 px-3 py-1.5 text-xs md:text-sm font-semibold text-slate-700 transition hover:bg-slate-100 rounded-xl "
          >
            Learn More
          </a>
        </div>

      </div>
    </section>
  )
}

export default HomeHeroPage