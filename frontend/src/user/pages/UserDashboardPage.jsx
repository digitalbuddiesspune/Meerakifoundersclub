import { useOutletContext } from 'react-router-dom'

const servicesAvailed = [
  { icon: '📋', name: 'Company Registration', date: '14 Feb 2026', status: 'done' },
  { icon: '📊', name: 'Pitch Deck Review', date: '02 Mar 2026', status: 'done' },
  { icon: '⚖️', name: 'Legal Consultation', date: '10 Apr 2026', status: 'progress' },
  { icon: '💰', name: 'Funding Strategy Session', date: '18 Apr 2026', status: 'done' },
  { icon: '🎯', name: 'GTM Planning Workshop', date: '23 Apr 2026', status: 'progress' },
]

const events = [
  { day: '28', mon: 'APR', name: 'Founders Meetup - Nagpur', type: 'In-Person - Networking', action: 'RSVP' },
  { day: '05', mon: 'MAY', name: 'Fundraising Masterclass', type: 'Online - Workshop', action: 'Join' },
  { day: '12', mon: 'MAY', name: 'Demo Day - Tier II Startups', type: 'Hybrid - Pitch Event', action: 'Apply' },
]

function UserDashboardPage() {
  const { authUser } = useOutletContext()

  return (
    <>
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-xs text-white/50">Thursday, 24 April 2026 · Nagpur, Maharashtra</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="h-10 w-10 rounded-xl border border-white/10 bg-white/5">
            🔍
          </button>
          <button type="button" className="relative h-10 w-10 rounded-xl border border-white/10 bg-white/5">
            🔔<span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#E8621A]" />
          </button>
          <button type="button" className="h-10 w-10 rounded-xl border border-white/10 bg-white/5">
            📤
          </button>
        </div>
      </div>

      <section className="mb-5 flex flex-wrap items-center gap-4 rounded-2xl border border-[#F0B429]/20 bg-gradient-to-r from-[#1a1200] to-[#261900] p-4">
        <div className="text-2xl">⚡</div>
        <div className="flex-1">
          <p className="text-sm font-bold text-[#F0B429]">Unlock Premium Features</p>
          <p className="text-xs text-white/55">Pitch Room, 1:1 mentor booking, priority support and more.</p>
        </div>
        <button type="button" className="rounded-xl bg-[#F0B429] px-4 py-2 text-xs font-extrabold text-[#1a0f00]">
          Upgrade Now →
        </button>
      </section>

      <section className="mb-5 grid gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-[#1a3260] to-[#0B1D3A] p-6 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm text-white/60">👋 Welcome back,</p>
          <h2 className="mt-1 text-4xl font-extrabold tracking-tight">
            {(authUser?.name || 'Rahul')} <span className="text-[#E8621A]">{(authUser?.name || 'Sharma').split(' ')[1] || ''}</span>
          </h2>
          <span className="mt-2 inline-flex rounded-full border border-[#F0B429]/30 bg-[#F0B429]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#F0B429]">
            ★ {authUser?.plan || 'Premium'}
          </span>
          <div className="mt-4 flex flex-wrap gap-6 text-xs text-white/60">
            <p>
              <span className="block text-sm font-bold text-white">Apr 2025</span>Member Since
            </p>
            <p>
              <span className="block text-sm font-bold text-white">12 months</span>Active Streak
            </p>
            <p>
              <span className="block text-sm font-bold text-white">#47</span>Rank in MFC
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div
            className="relative flex h-28 w-28 items-center justify-center rounded-full"
            style={{ background: 'conic-gradient(#E8621A 0deg, #E8621A 270deg, rgba(255,255,255,0.08) 270deg)' }}
          >
            <div className="flex h-[86px] w-[86px] flex-col items-center justify-center rounded-full bg-[#112347]">
              <p className="text-3xl font-extrabold leading-none text-[#E8621A]">782</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-white/50">MFC Score</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-2xl">⚡</p>
          <p className="mt-3 text-3xl font-extrabold">7</p>
          <p className="text-xs text-white/60">Services Availed</p>
          <span className="mt-2 inline-flex rounded-md bg-green-500/10 px-2 py-1 text-[11px] text-green-400">
            ↑ 2 this month
          </span>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-2xl">📄</p>
          <p className="mt-3 text-3xl font-extrabold">14</p>
          <p className="text-xs text-white/60">Documents Stored</p>
          <span className="mt-2 inline-flex rounded-md bg-blue-400/10 px-2 py-1 text-[11px] text-blue-300">
            3 new uploads
          </span>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-2xl">🔗</p>
          <p className="mt-3 text-3xl font-extrabold">5</p>
          <p className="text-xs text-white/60">Founders Referred</p>
          <span className="mt-2 inline-flex rounded-md bg-green-500/10 px-2 py-1 text-[11px] text-green-400">
            ↑ ₹2,490 earned
          </span>
        </article>
      </section>

      <section className="mb-5 flex items-center gap-4 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4">
        <p className="text-3xl">🚀</p>
        <div>
          <p className="text-sm font-bold text-blue-300">My Pitch Room</p>
          <p className="text-xs text-white/55">Store your startup deck, share with investors & mentors.</p>
        </div>
        <button
          type="button"
          className="ml-auto rounded-lg border border-blue-300/30 bg-blue-400/15 px-4 py-2 text-xs font-bold text-blue-300"
        >
          Open →
        </button>
      </section>

      <section className="mb-5 grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold">⚡ Services Availed</h3>
            <button type="button" className="text-xs font-semibold text-[#E8621A]">
              View All
            </button>
          </div>
          {servicesAvailed.map((item) => (
            <div key={item.name} className="flex items-center gap-3 border-b border-white/10 py-3 last:border-b-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8621A]/10">{item.icon}</div>
              <div>
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-white/50">{item.date}</p>
              </div>
              <span
                className={`ml-auto rounded-full px-3 py-1 text-[10px] font-bold uppercase ${
                  item.status === 'done' ? 'bg-green-500/10 text-green-400' : 'bg-[#E8621A]/15 text-[#E8621A]'
                }`}
              >
                {item.status === 'done' ? 'Done' : 'In Progress'}
              </span>
            </div>
          ))}
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold">📅 Upcoming Events</h3>
            <button type="button" className="text-xs font-semibold text-[#E8621A]">
              All Events
            </button>
          </div>
          {events.map((event) => (
            <div key={event.name} className="flex items-start gap-3 border-b border-white/10 py-3 last:border-b-0">
              <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg border border-[#E8621A]/25 bg-[#E8621A]/10">
                <p className="text-lg font-extrabold leading-none text-[#E8621A]">{event.day}</p>
                <p className="text-[9px] uppercase tracking-wider text-white/60">{event.mon}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">{event.name}</p>
                <p className="text-xs text-white/50">{event.type}</p>
              </div>
              <button
                type="button"
                className="ml-auto mt-1 rounded-lg border border-[#E8621A]/25 px-3 py-1 text-[10px] font-bold text-[#E8621A]"
              >
                {event.action}
              </button>
            </div>
          ))}
        </article>
      </section>
    </>
  )
}

export default UserDashboardPage
