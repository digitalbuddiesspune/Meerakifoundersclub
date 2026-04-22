import { useState } from 'react'
import {
  Building2,
  HandCoins,
  MapPin,
  ShieldAlert,
  Users,
} from 'lucide-react'

const questionCards = [
  {
    question: 'Why should city decide startup success?',
    context:
      'Founders outside metros get less access to trusted services, networks, and growth support.',
    answer:
      'We built a Tier II/III-first platform with verified experts and digital delivery so quality support reaches founders everywhere.',
  },
  {
    question: 'How do founders get investor access without metro circles?',
    context:
      'Many strong startups still struggle to reach investors and raise confidently.',
    answer:
      'Our capital access support covers pitch prep, investor intros, and fundraising workflows to open the right doors faster.',
  },
  {
    question: 'Can I trust the service quality?',
    context:
      'Founders often spend money on fragmented, unverified vendors and get poor execution.',
    answer:
      'We provide vetted services across legal, marketing, branding, product, and compliance so execution is reliable and accountable.',
  },
  {
    question: 'Why does geography still create economic disadvantage?',
    context:
      'Even when talent and ambition are strong, many founders are excluded from the right opportunities because of location.',
    answer:
      'Our digital-first model removes location barriers by giving founders in every city access to premium startup services and execution support.',
  },
  {
    question: 'What if I need continuous founder guidance?',
    context:
      'Building alone leads to slower decisions and repeated mistakes.',
    answer:
      'You get founder community access through groups, Q&A, meetups, and AMAs to learn from real operators continuously.',
  },
]

function ProblemsSolutions() {
  const [flippedCards, setFlippedCards] = useState({})

  const toggleCard = (index) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <main>
        <section className="bg-white px-4 py-10 md:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <p className="inline-flex rounded-lg bg-[#0f2247]/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#0f2247]">
              Questions & Answers
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-[#0f2247] md:text-3xl">
              From Founder Challenges to Clear Solutions
            </h1>
            <p className="mt-2 max-w-3xl text-base text-slate-600">
              Flip each question card to see exactly how we solve that challenge for founders.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {questionCards.map(({ question, context, answer }, index) => {
                const isFlipped = Boolean(flippedCards[index])
                return (
                  <div key={question} className="[perspective:1200px]">
                    <button
                      type="button"
                      onClick={() => toggleCard(index)}
                      className="w-full text-left"
                    >
                      <div
                        className={`relative min-h-[170px] w-full rounded-xl transition-transform duration-700 [transform-style:preserve-3d] ${
                          isFlipped ? '[transform:rotateY(180deg)]' : ''
                        }`}
                      >
                        <article className="absolute inset-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm [backface-visibility:hidden] md:p-6">
                          <p className="text-xs font-medium uppercase tracking-wide text-[#F26527]">
                            QUESTION
                          </p>
                          <h3 className="mt-2 text-lg font-semibold text-[#0f2247]">{question}</h3>
                          <p className="mt-2 text-sm text-slate-600">{context}</p>
                          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
                            Tap to flip
                          </p>
                        </article>

                        <article className="absolute inset-0 rounded-xl border border-[#F26527]/30 bg-[#0f2247] p-3 text-white shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] md:p-6">
                          <p className="text-xs font-medium uppercase tracking-wide text-[#F26527]">
                            Solution
                          </p>
                          <h3 className="mt-2 text-lg font-semibold">How We Solve This</h3>
                          <p className="mt-2 text-sm text-slate-100">{answer}</p>
                          <div className="mt-4 inline-flex items-center rounded-lg bg-white/10 px-2.5 py-1 text-xs font-medium text-[#F26527]">
                            Meraaki Founders Club
                          </div>
                        </article>
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}

export default ProblemsSolutions
