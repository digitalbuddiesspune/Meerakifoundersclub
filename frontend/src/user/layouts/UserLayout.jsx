import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate, useOutletContext } from 'react-router-dom'

function UserLayout() {
  const parentContext = useOutletContext()
  const { isAuthenticated, authUser, onOpenAuth } = parentContext
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const hasActiveMembership = authUser?.status === 'active' && Boolean(authUser?.plan)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B1D3A] px-4 py-10 text-[#F5F7FA]">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-7 text-center">
          <h1 className="text-2xl font-bold">Login required for dashboard</h1>
          <p className="mt-2 text-sm text-white/70">Please login to access your member dashboard.</p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAuth}
              className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Login / Signup
            </button>
            <Link
              to="/"
              className="rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-sm font-semibold text-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!hasActiveMembership) {
    return (
      <div className="min-h-screen bg-[#0B1D3A] px-4 py-10 text-[#F5F7FA]">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-7 text-center">
          <h1 className="text-2xl font-bold">Active membership required</h1>
          <p className="mt-2 text-sm text-white/70">
            Subscribe to a plan and complete payment to access your dashboard.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/memberships')}
              className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Choose Plan
            </button>
            <Link
              to="/"
              className="rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-sm font-semibold text-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const navClassName = ({ isActive }) =>
    `flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[13.5px] transition ${
      isActive ? 'bg-[#E8621A]/12 font-semibold text-white' : 'text-white/70 hover:bg-white/5'
    }`

  return (
    <div className="min-h-screen bg-[#0B1D3A] text-[#F5F7FA] lg:flex lg:h-screen lg:overflow-hidden">
      {isMobileMenuOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-[#0B1D3A]/95 backdrop-blur-lg transition-transform duration-300 lg:static lg:h-screen lg:w-[240px] lg:shrink-0 lg:overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="border-b border-white/10 px-6 pb-8 pt-7">
          <div className="mb-4 flex items-center justify-end lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/80"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ✕
            </button>
          </div>
          <p className="text-[20px] font-extrabold tracking-tight">
            Meraaki <span className="text-[#E8621A]">FC</span>
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/50">Founders Club</p>
        </div>

        <div className="flex-1 px-4 pb-2 pt-5">
          <p className="px-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/45">Main</p>
          <div className="mt-2 space-y-1">
            <NavLink
              to="/user/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className={navClassName}
            >
              <span>🏠</span> Dashboard
            </NavLink>
            <NavLink
              to="/user/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className={navClassName}
            >
              <span>⚡</span> Services
             
            </NavLink>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[13.5px] text-white/70 hover:bg-white/5"
            >
              <span>🗂️</span> My Documents
            </button>
          </div>

          <p className="mt-[18px] px-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/45">
            Account
          </p>
          <div className="mt-2 space-y-1">
            <button
              type="button"
              onClick={() => {
                navigate('/profile')
                setIsMobileMenuOpen(false)
              }}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[13.5px] text-white/70 hover:bg-white/5"
            >
              <span>⚙️</span> Settings
            </button>
            <button
              type="button"
              onClick={() => {
                navigate('/')
                setIsMobileMenuOpen(false)
              }}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[13.5px] text-white/70 hover:bg-white/5"
            >
              <span>↩</span> Back to Home
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-5">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#E8621A] to-[#c94f10] text-xs font-bold">
              {(authUser?.name || 'RS').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold">{authUser?.name || 'Rahul Sharma'}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#F0B429]">
                {(authUser?.plan || 'Premium')} Member
              </p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:h-screen lg:overflow-y-auto lg:p-8">
        <button
          type="button"
          aria-label="Open menu"
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg lg:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          ☰
        </button>
        <Outlet context={parentContext} />
      </main>
    </div>
  )
}

export default UserLayout
