import { useState } from 'react'

function HomeOurClientsSection({ clients, loading, error }) {
  const [isPaused, setIsPaused] = useState(false)
  const marqueeItems = [...clients, ...clients, ...clients];

  return (
    <section className="flex min-h-screen w-full items-center overflow-hidden bg-[#131014] py-12 md:py-16">
      <style>{`
        @keyframes clientsMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>

      <div className="w-full">
        <div className="mx-auto -mt-10 mb-14 w-full max-w-7xl px-4 md:-mt-20 md:mb-20 md:px-8">
          <h2 className="text-5xl tracking-tight text-white md:text-7xl">Our Clients:</h2>
        </div>

        {loading ? <p className="px-4 text-sm text-white/70 md:px-8">Loading clients...</p> : null}
        {error ? <p className="px-4 text-sm text-red-300 md:px-8">{error}</p> : null}

        {!loading && !error && clients.length > 0 ? (
          <div
            className="relative mt-4 w-full overflow-hidden md:mt-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex w-max items-center gap-20 md:gap-28"
              style={{
                animation: 'clientsMarquee 12s linear infinite',
                animationPlayState: isPaused ? 'paused' : 'running',
                willChange: 'transform',
              }}
            >
              {marqueeItems.map((client, index) => (
                <div
                  key={`${client._id}-${index}`}
                  className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white p-3 md:h-24 md:w-24"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-full max-w-full rounded-full object-contain opacity-95"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {!loading && !error && clients.length === 0 ? (
          <p className="px-4 text-sm text-white/70 md:px-8">No client logos found.</p>
        ) : null}
      </div>
    </section>
  )
}

export default HomeOurClientsSection
