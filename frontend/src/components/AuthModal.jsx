function AuthModal({
  visible,
  authTab,
  setAuthTab,
  authError,
  onClose,
  signupForm,
  setSignupForm,
  loginForm,
  setLoginForm,
  onSignup,
  onLogin,
  clearError,
}) {
  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/30 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {authTab === 'signup' ? 'Create Account' : 'Login'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-600 hover:bg-slate-100"
          >
            Close
          </button>
        </div>

        <div className="mb-4 flex rounded-xl bg-slate-100 p-1 text-sm font-medium">
          <button
            type="button"
            onClick={() => {
              setAuthTab('signup')
              clearError()
            }}
            className={`w-1/2 rounded-lg px-3 py-2 transition ${
              authTab === 'signup' ? 'bg-white text-slate-900 shadow' : 'text-slate-500'
            }`}
          >
            Signup
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthTab('login')
              clearError()
            }}
            className={`w-1/2 rounded-lg px-3 py-2 transition ${
              authTab === 'login' ? 'bg-white text-slate-900 shadow' : 'text-slate-500'
            }`}
          >
            Login
          </button>
        </div>

        {authError ? (
          <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {authError}
          </p>
        ) : null}

        {authTab === 'signup' ? (
          <form onSubmit={onSignup} className="space-y-3">
            <input
              type="text"
              value={signupForm.name}
              onChange={(event) => setSignupForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              required
            />
            <input
              type="email"
              value={signupForm.email}
              onChange={(event) => setSignupForm((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="Email"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              required
            />
            <input
              type="tel"
              value={signupForm.phone}
              onChange={(event) => setSignupForm((prev) => ({ ...prev, phone: event.target.value }))}
              placeholder="Phone Number"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Signup
            </button>
          </form>
        ) : (
          <form onSubmit={onLogin} className="space-y-3">
            <input
              type="text"
              value={loginForm.identifier}
              onChange={(event) => setLoginForm({ identifier: event.target.value })}
              placeholder="Email or Phone Number"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default AuthModal
