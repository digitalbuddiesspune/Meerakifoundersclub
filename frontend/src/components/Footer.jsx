import { Link } from 'react-router-dom'

const LOGO_URL =
  'https://res.cloudinary.com/dd0imqx3p/image/upload/q_auto/f_auto/v1776147066/IMG_1857_iz7m7a.png'

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-stone-100">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Link to="/" className="hidden items-center gap-3 md:flex">
              <img
                src={LOGO_URL}
                alt="Meraaki Founders Club logo"
                className="h-16 w-auto max-w-[220px] rounded-lg object-contain"
              />
            </Link>
            <p className="text-lg font-bold">Meraaki Founders Club</p>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Helping founders build, fund, market, and scale confidently.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link to="/" className="hover:text-slate-950">Home</Link></li>
            <li><Link to="/services" className="hover:text-slate-950">Services</Link></li>
            <li><Link to="/problems-solutions" className="hover:text-slate-950">Problems & Solutions</Link></li>
            <li><Link to="/contact-us" className="hover:text-slate-950">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Contact</h3>
          <p className="mt-3 text-sm text-slate-600">Email us for partnerships and startup support.</p>
          <a
            href="mailto:info@meraakifoundersclub.com"
            className="mt-3 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-600"
          >
            info@meraakifoundersclub.com
          </a>
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 text-xs text-slate-500 md:flex-row md:flex-wrap md:gap-x-6 md:gap-y-2">
          <span>© {new Date().getFullYear()} Meraaki Founders Club. All rights reserved.</span>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link to="/privacy-policy" className="hover:text-slate-800">
              Privacy Policy
            </Link>
            <span className="hidden text-slate-300 sm:inline" aria-hidden>
              |
            </span>
            <Link to="/terms-and-conditions" className="hover:text-slate-800">
              Terms &amp; Conditions
            </Link>
            <span className="hidden text-slate-300 sm:inline" aria-hidden>
              |
            </span>
            <Link to="/cookie-policy" className="hover:text-slate-800">
              Cookie Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
