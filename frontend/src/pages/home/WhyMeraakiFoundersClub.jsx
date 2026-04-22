const whyCards = [
  {
    text: "By founders, for founders",
    rotate: -8,
    icon: "◌",
    hoverGradient: "hover:from-[#FFEDE3] hover:to-[#FFD8C2]",
  },
  {
    text: "Focus on Tier II/III startups",
    rotate: -5,
    icon: "◔",
    hoverGradient: "hover:from-[#EAF8FF] hover:to-[#D5EEFF]",
  },
  {
    text: "1st marketplace for startups",
    rotate: -2,
    icon: "◎",
    hoverGradient: "hover:from-[#F2ECFF] hover:to-[#E2D4FF]",
  },
  {
    text: "Verified ecosystem",
    rotate: 3,
    icon: "◷",
    hoverGradient: "hover:from-[#E9FFEF] hover:to-[#CCF8DA]",
  },
  {
    text: "Strong founder community",
    rotate: 6,
    icon: "✓",
    hoverGradient: "hover:from-[#FFF6E5] hover:to-[#FFE9BF]",
  },
  {
    text: "Built for action, not admin",
    rotate: 8,
    icon: "✦",
    hoverGradient: "hover:from-[#FFEAF2] hover:to-[#FFD3E6]",
  },
]

export default function WhyMeraakiFoundersClub() {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-white py-16 md:h-screen md:py-8">
      <style>{`
        @keyframes cardsFloat {
          0% {
            transform: translateY(0) rotate(var(--rotate));
          }
          50% {
            transform: translateY(-8px) rotate(var(--rotate));
          }
          100% {
            transform: translateY(0) rotate(var(--rotate));
          }
        }
      `}</style>

      <div className="mb-10 px-4 text-center md:mb-14">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
          Why Meraaki Founders Club
        </p>
        <h2 className="mx-auto max-w-5xl text-4xl font-semibold leading-[1.02] tracking-tight text-[#26272f] md:text-7xl">
         One-Stop Solution Platform For Founders
        </h2>
      </div>

      <div className="mx-auto hidden w-full max-w-7xl grid-cols-3 gap-6 px-8 md:grid lg:grid-cols-6">
        {whyCards.map((card, i) => {
          return (
            <div
              key={card.text}
              className={`rounded-[22px] border border-[#2f323a]/25 bg-gradient-to-br from-[#f8f8f7] to-[#f8f8f7] p-5 text-[#2d2e35] transition-all duration-300 hover:scale-[1.015] ${card.hoverGradient}`}
              style={{
                "--rotate": `${card.rotate}deg`,
                transform: `rotate(${card.rotate}deg)`,
                animation: "cardsFloat 4.6s ease-in-out infinite",
                animationDelay: `${i * 0.35}s`,
              }}
            >
              <p className="mb-3 text-lg leading-none text-[#2f323a]">{card.icon}</p>
              <p className="text-[1.1rem] font-medium leading-[1.28] tracking-[-0.01em] text-[#2d2e35]">
                {card.text}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mx-auto w-full px-5 md:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {whyCards.map((card, i) => (
          <div
            key={`${card.text}-${i}`}
            className={`min-w-[82%] snap-center rounded-2xl border border-[#2f323a]/25 bg-gradient-to-br from-[#f8f8f7] to-[#f8f8f7] p-5 text-[#31393C] transition-colors duration-300 ${card.hoverGradient} sm:min-w-[60%]`}
          >
            <p className="mb-2 text-base leading-none text-[#2f323a]">{card.icon}</p>
            <p className="text-sm font-medium leading-relaxed text-[#2d2e35]">{card.text}</p>
          </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-slate-500">Swipe to view more</p>
      </div>
    </section>
  )
}