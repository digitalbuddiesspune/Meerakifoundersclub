import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'

const LOGO_URL =
  'https://res.cloudinary.com/dd0imqx3p/image/upload/q_auto/f_auto/v1776157629/IMG_1857-removebg-preview_kerwe5.png'

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-800">
      <div className="mx-auto  max-w-7xl px-4 py-12 md:px-8 md:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 justify-between">
          <div>
            <Link to="/" className="inline-flex items-center">
              <img
                src={LOGO_URL}
                alt="Meraaki Founders Club logo"
                className="h-16 w-auto max-w-[220px] object-contain"
              />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
              Built by founders, for founders. We help startups launch faster, build stronger
              brands, and scale with confidence.
            </p>

            <a
              href="mailto:info@meraakifoundersclub.com"
              className="mt-5 flex items-start gap-2.5 text-sm text-orange-400 transition hover:text-orange-300"
            >
              <Mail size={16} />
              <span>info@meraakifoundersclub.com</span>
            </a>
            <a
              href="tel:+919970570102"
              className="mt-2 flex items-start gap-2.5 text-sm text-orange-400 transition hover:text-orange-500"
            >
              <Phone size={16} />
              <span>+91 99705 70102</span>
            </a>
          </div>

          <div>
            <h3 className="relative pl-3 text-lg font-semibold text-slate-900">
              <span className="absolute left-0 top-1 h-5 w-1 rounded bg-cyan-400" />
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li><Link to="/" className="transition hover:text-cyan-600">Home</Link></li>
              <li><Link to="/about-us" className="transition hover:text-cyan-600">About Us</Link></li>
              <li><Link to="/community" className="transition hover:text-cyan-600">Community</Link></li>
              <li><Link to="/vendors" className="transition hover:text-cyan-600">Vendors</Link></li>
              <li><Link to="/services" className="transition hover:text-cyan-600">Services</Link></li>
              <li><Link to="/problems-solutions" className="transition hover:text-cyan-600">Problems &amp; Solutions</Link></li>
              <li><Link to="/contact-us" className="transition hover:text-cyan-600">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="relative pl-3 text-lg font-semibold text-slate-900">
              <span className="absolute left-0 top-1 h-5 w-1 rounded bg-emerald-400" />
              Legal Pages
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li><Link to="/privacy-policy" className="transition hover:text-emerald-600">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="transition hover:text-emerald-600">Terms &amp; Conditions</Link></li>
              <li><Link to="/cookie-policy" className="transition hover:text-emerald-600">Cookie Policy</Link></li>
              <li><Link to="/refund-policy" className="transition hover:text-emerald-600">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-sm text-slate-600">Follow us</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-slate-50 text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 1.8A4 4 0 0 0 3.8 7.8v8.4a4 4 0 0 0 4 4h8.4a4 4 0 0 0 4-4V7.8a4 4 0 0 0-4-4H7.8Zm8.8 1.5a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1ZM12 7a5 5 0 1 1-5 5 5 5 0 0 1 5-5Zm0 1.8A3.2 3.2 0 1 0 15.2 12 3.2 3.2 0 0 0 12 8.8Z" />
              </svg>
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-slate-50 text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V5c-.8-.1-1.6-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3V11H8v3h2.1v8h3.4z" />
              </svg>
            </a>
            <a
              href="https://wa.me/919970570102"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-slate-50 text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.8L7 20.5A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.8.7.8-2.7-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.3-.7-1.5-.8s-.4-.1-.6.1-.7.8-.9 1-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.8c-.1-.2 0-.3.1-.5l.4-.5a2 2 0 0 0 .3-.5.5.5 0 0 0 0-.5c-.1-.1-.6-1.5-.9-2s-.5-.4-.7-.4h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.8 6.4 6.4 0 0 0 1.3 3.4 14.3 14.3 0 0 0 5.4 4.7 18.7 18.7 0 0 0 1.8.7 4.3 4.3 0 0 0 2 .1 3.2 3.2 0 0 0 2.1-1.5 2.7 2.7 0 0 0 .2-1.5c-.1-.1-.3-.2-.5-.3Z" />
              </svg>
            </a>
            <a
              href="mailto:info@meraakifoundersclub.com"
              aria-label="Email"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-slate-50 text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-4 md:px-8">
        <div className="mx-auto flex  max-w-7xl flex-col items-center justify-between gap-3 text-xs text-slate-500 md:flex-row">
          <span>© {new Date().getFullYear()} Meraaki Founders Club. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>Startup India Certified</span>
            <span className="text-slate-300">|</span>
            <span>IEC Certified</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link to="/privacy-policy" className="hover:text-slate-800">
              Privacy Policy
            </Link>
            <span className="text-slate-300" aria-hidden>
              |
            </span>
            <Link to="/terms-and-conditions" className="hover:text-slate-800">
              Terms &amp; Conditions
            </Link>
            <span className="text-slate-300" aria-hidden>
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
