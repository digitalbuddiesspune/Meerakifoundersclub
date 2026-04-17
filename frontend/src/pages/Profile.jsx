import { Link, useNavigate, useOutletContext } from 'react-router-dom'

function Profile() {
  const { isAuthenticated, authUser, onOpenAuth, onLogout } = useOutletContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <main className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8">
        {isAuthenticated ? (
          <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">My Profile</h1>
            <p className="mt-2 text-sm text-slate-500">Your account details are shown below.</p>

            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Name</p>
                <p className="mt-1 text-base font-medium text-slate-900">{authUser?.name || '-'}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
                <p className="mt-1 text-base font-medium text-slate-900">{authUser?.email || '-'}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
                <p className="mt-1 text-base font-medium text-slate-900">{authUser?.phone || '-'}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Logout
              </button>
              <Link
                to="/"
                className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Back to Home
              </Link>
            </div>
          </section>
        ) : (
          <section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm md:p-8">
            <h1 className="text-2xl font-bold text-slate-900">Please login to view your profile</h1>
            <p className="mt-2 text-sm text-slate-500">
              You need to be signed in before accessing profile details.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAuth}
                className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Login / Signup
              </button>
              <Link
                to="/"
                className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Back to Home
              </Link>
            </div>
          </section>
        )}
      </main>

    </div>
  )
}

export default Profile
