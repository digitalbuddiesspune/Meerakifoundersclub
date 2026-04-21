import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'

const MILLION_LOTTIE_URL =
  'https://cdn.prod.website-files.com/686c3195802b0228dca014a8/68705eaf39042c64b0a7d1d5_million.json'

const LottieComponent = typeof Lottie === 'function' ? Lottie : Lottie?.default

function HomeFoundersPage() {
  const [millionAnimationData, setMillionAnimationData] = useState(null)

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
        <h2 className="mx-auto max-w-4xl text-[2.85rem] font-semibold leading-[1.02] tracking-tight text-slate-900 md:max-w-7xl md:text-[6rem]">
          Be one of the first <span className="block text-slate-400">founders.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-sm text-base leading-relaxed text-slate-600 md:mt-8 md:max-w-5xl md:text-4xl">
          We are building the startup system we wished existed. Want to be one of the first cohorts who get to use it? Join our newsletter to find out more.
        </p>

       

        <button
          type="button"
          className="mt-8 hover:cursor-pointer hover:scale-105 hover:shadow-lg inline-flex items-center rounded-full bg-slate-900 px-8 py-3 text-sm md:text-base font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800"
        >
          Subscribe
        </button>

        <div className="mx-auto mt-10 w-full max-w-md overflow-hidden bg-white md:relative md:left-1/2 md:mt-12 md:w-screen md:max-w-none md:-translate-x-1/2">
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
  )
}

export default HomeFoundersPage
