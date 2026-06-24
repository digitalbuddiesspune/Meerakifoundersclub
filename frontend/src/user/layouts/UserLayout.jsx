import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom'

function UserLayout() {
  const parentContext = useOutletContext()
  const { isAuthenticated, authUser, onOpenAuth } = parentContext
  const navigate = useNavigate()
  const location = useLocation()
  const isServicesSection =
    location.pathname === '/user/services' || location.pathname.startsWith('/user/services/')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const hasActiveMembership = authUser?.status === 'active' && Boolean(authUser?.plan)

  const gateCard = (title, description, primaryLabel, primaryAction, secondaryHref = '/') => (
    <div className="min-h-screen bg-white px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={primaryAction}
            className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-white"
          >
            {primaryLabel}
          </button>
          <Link
            to={secondaryHref}
            className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )

  if (!isAuthenticated) {
    return gateCard(
      'Login required for dashboard',
      'Please login to access your member dashboard.',
      'Login / Signup',
      onOpenAuth,
    )
  }

  if (!hasActiveMembership) {
    return gateCard(
      'Active membership required',
      'Subscribe to a plan and complete payment to access your dashboard.',
      'Choose Plan',
      () => navigate('/memberships'),
    )
  }

  const navClassName = (isActive) =>
    `flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[13.5px] transition ${
      isActive
        ? 'bg-orange-50 font-semibold text-slate-900 ring-1 ring-orange-200'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`

  return (
    <div className="min-h-screen bg-white text-slate-900 lg:flex lg:h-screen lg:overflow-hidden">
      {isMobileMenuOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:h-screen lg:w-[240px] lg:shrink-0 lg:overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="border-b border-slate-200 px-6 pb-8 pt-7">
          <div className="mb-4 flex items-center justify-end lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ✕
            </button>
          </div>
          <p className="text-[20px] font-extrabold tracking-tight text-slate-900">
            Meraaki <span className="text-[#E8621A]">FC</span>
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">Founders Club</p>
        </div>

        <div className="flex-1 px-4 pb-2 pt-5">
          <p className="px-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400">Main</p>
          <div className="mt-2 space-y-1">
            <NavLink
              to="/user/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => navClassName(isActive)}
            >
              <span>🏠</span> Dashboard
            </NavLink>
            <NavLink
              to="/user/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className={() => navClassName(isServicesSection)}
            >
              <span>⚡</span> Services
            </NavLink>
            <NavLink
              to="/user/documents/upload"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => navClassName(isActive)}
            >
              <span>🗂️</span> My Documents
            </NavLink>
          </div>

          <p className="mt-[18px] px-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Account
          </p>
          <div className="mt-2 space-y-1">
            <button
              type="button"
              onClick={() => {
                navigate('/profile')
                setIsMobileMenuOpen(false)
              }}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[13.5px] text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              <span>⚙️</span> Settings
            </button>
            <button
              type="button"
              onClick={() => {
                navigate('/')
                setIsMobileMenuOpen(false)
              }}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[13.5px] text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              <span>↩</span> Back to Home
            </button>
          </div>
        </div>

        <div className="border-t border-slate-200 px-4 py-5">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#E8621A] to-[#c94f10] text-xs font-bold text-white">
              {(authUser?.name || 'RS').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{authUser?.name || 'Rahul Sharma'}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#E8621A]">
                {(authUser?.plan || 'Premium')} Member
              </p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-white p-4 sm:p-6 lg:h-screen lg:overflow-y-auto lg:p-8">
        <button
          type="button"
          aria-label="Open menu"
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-900 lg:hidden"
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
