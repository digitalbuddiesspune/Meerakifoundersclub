const LOGO_URL =
'https://res.cloudinary.com/dd0imqx3p/image/upload/q_auto/f_auto/v1776157629/IMG_1857-removebg-preview_kerwe5.png'
function Header({ isAuthenticated, authUser, onOpenAuth, onLogout }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-500  text-white backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <a href="#home" className="flex items-center gap-3">
          <img
            src={LOGO_URL}
            alt="Meraaki Founders Club logo"
            className="h-12 w-auto max-w-[150px] rounded-lg object-contain"
          />
        
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <a href="#home" className="text-black transition hover:text-emerald-200">Home</a>
          <a href="#services" className="text-black transition hover:text-slate-700">Services</a>
          <a href="#process" className="text-black transition hover:text-slate-700">How It Works</a>
          <a href="#contact" className="text-black transition hover:text-slate-700">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenAuth}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/60 bg-slate-800 text-white transition hover:border-white"
            aria-label="User account"
          >
            {isAuthenticated && authUser?.name ? authUser.name[0].toUpperCase() : 'U'}
          </button>
          {isAuthenticated ? (
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
            >
              Logout
            </button>
          ) : (
            <a
              href="mailto:info@meraakifoundersclub.com"
              className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
            >
              Book a Call
            </a>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
