const whyCards = [
  { text: "By founders, for founders", left: "-8%", top: "58%", rotate: -13, icon: "◌" },
  { text: "Focus on Tier II/III startups", left: "14%", top: "67%", rotate: -8, icon: "◔" },
  { text: "1st marketplace for startups", left: "35%", top: "62%", rotate: -2, icon: "◎" },
  { text: "Verified ecosystem", left: "56%", top: "64%", rotate: 4, icon: "◷" },
  { text: "Strong founder community", left: "77%", top: "58%", rotate: 10, icon: "✓" },
  { text: "Built for action, not admin", left: "98%", top: "52%", rotate: 14, icon: "✦" },
];

export default function WhyMeraakiFoundersClub() {
  return (
    <section className="relative overflow-hidden bg-[#ededeb] py-16 md:py-24">
      <style>{`
        @keyframes cardsFloat {
          0% {
            transform: translate(-50%, -50%) rotate(var(--rotate));
          }
          50% {
            transform: translate(-50%, calc(-50% - 10px)) rotate(var(--rotate));
          }
          100% {
            transform: translate(-50%, -50%) rotate(var(--rotate));
          }
        }
      `}</style>

      <div className="mb-10 px-4 text-center md:mb-14">
        <h2 className="mx-auto max-w-5xl text-4xl font-semibold leading-[1.02] tracking-tight text-[#26272f] md:text-7xl">
          Founders makes business admin effortless.
        </h2>
      </div>

      <div className="relative mx-auto hidden h-[330px] w-full max-w-[1180px] md:block">
        {whyCards.map((card, i) => {
          return (
            <div
              key={card.text}
              className="absolute w-[220px] rounded-[22px] border border-[#2f323a]/35 bg-[#f2f2f1] p-5 text-[#2d2e35] transition-transform duration-300 hover:scale-[1.015]"
              style={{
                left: card.left,
                top: card.top,
                "--rotate": `${card.rotate}deg`,
                transform: `translate(-50%, -50%) rotate(${card.rotate}deg)`,
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

      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 px-5 sm:grid-cols-2 md:hidden">
        {whyCards.slice(1, 6).map((card, i) => (
          <div
            key={`${card.text}-${i}`}
            className="rounded-2xl border border-[#2f323a]/25 bg-[#f4f4f3] p-5 text-[#31393C]"
          >
            <p className="mb-2 text-base leading-none text-[#2f323a]">{card.icon}</p>
            <p className="text-sm font-medium leading-relaxed text-[#2d2e35]">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}