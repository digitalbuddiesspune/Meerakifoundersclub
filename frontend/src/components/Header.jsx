import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LOGO_URL =
'https://res.cloudinary.com/dd0imqx3p/image/upload/q_auto/f_auto/v1776157629/IMG_1857-removebg-preview_kerwe5.png'

const toSlug = (value) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

function Header({ hidden = false, isAuthenticated, authUser, onOpenAuth }) {
  const [services, setServices] = useState([])
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const servicesMenuRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const navigate = useNavigate()
  const API_BASE_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services`)
        if (!response.ok) return
        const data = await response.json()
        setServices(Array.isArray(data) ? data : [])
      } catch {
        setServices([])
      }
    }

    fetchServices()
  }, [API_BASE_URL])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target)) {
        setIsServicesOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMobileMenuOpen])

  const goToServicesPage = () => {
    navigate('/services')
    setIsServicesOpen(false)
    setIsMobileMenuOpen(false)
    setIsMobileServicesOpen(false)
  }

  const goToServiceDetails = (serviceName) => {
    navigate(`/services/${toSlug(serviceName)}`)
    setIsServicesOpen(false)
    setIsMobileMenuOpen(false)
    setIsMobileServicesOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsMobileServicesOpen(false)
  }
  const handleAccountClick = () => {
    if (isAuthenticated) {
      navigate('/profile')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      closeMobileMenu()
      return
    }
    onOpenAuth()
  }

  return (
    <header
      className={`sticky top-0 z-[100] bg-white md:backdrop-blur transition-transform duration-300 ease-out ${
        hidden && !isMobileMenuOpen ? '-translate-y-full pointer-events-none' : ''
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-2.5 md:px-0 md:py-3">
        <div className="flex w-full items-center justify-between md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-xl text-slate-800"
            aria-label="Open menu"
          >
            ☰
          </button>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2" onClick={closeMobileMenu}>
            <img
              src={LOGO_URL}
              alt="Meraaki Founders Club logo"
              className="h-12 w-auto max-w-[190px] object-contain sm:h-14"
            />
          </Link>

          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleAccountClick}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/60 bg-slate-800 text-white"
              aria-label="User account"
            >
              {authUser?.name ? authUser.name[0].toUpperCase() : 'U'}
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-800"
            >
              Login
            </button>
          )}
        </div>

        <Link to="/" className="hidden shrink-0 items-center gap-3 md:flex">
          <img
            src={LOGO_URL}
            alt="Meraaki Founders Club logo"
            className="h-14 w-auto max-w-[240px] object-contain lg:h-16"
          />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 text-sm font-medium md:flex">
          <Link to="/" className="text-black transition hover:text-[#F26527]">Home</Link>
          <Link to="/about-us" className="text-black transition hover:text-[#F26527]">About Us</Link>
          <Link to="/community" className="text-black transition hover:text-[#F26527]">Community</Link>
          <Link to="/partners" className="text-black transition hover:text-[#F26527]">Partners</Link>
          <div
            ref={servicesMenuRef}
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              type="button"
              onClick={goToServicesPage}
              className="text-black transition hover:text-[#F26527]"
            >
              Services
            </button>
            {isServicesOpen ? (
              <div className="absolute left-0 top-full w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                {services.length > 0 ? (
                  services.map((service) => (
                    <button
                      key={service._id}
                      type="button"
                      onClick={() => goToServiceDetails(service.name)}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                      {service.name}
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-2 text-sm text-slate-500">No services found</p>
                )}
              </div>
            ) : null}
          </div>
          <Link to="/challenges-solutions" className="text-black transition hover:text-[#F26527]">
            Challenges & Solutions
          </Link>
          <a href="#process" className="text-black transition hover:text-[#F26527]">How It Works</a>
          <Link to="/contact-us" className="text-black transition hover:text-[#F26527]">Contact</Link>
        </nav>

        <div className="hidden shrink-0 items-center gap-2.5 md:flex">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleAccountClick}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/60 bg-slate-800 text-white transition hover:border-white"
              aria-label="User account"
            >
              {authUser?.name ? authUser.name[0].toUpperCase() : 'U'}
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-[#F26527] hover:text-[#F26527]"
            >
              Login
            </button>
          )}
          {!isAuthenticated ? (
            <a
              href="mailto:info@meraakifoundersclub.com"
              className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
            >
              Become a Partner
            </a>
          ) : null}
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-[220] md:hidden">
          <button
            type="button"
            onClick={closeMobileMenu}
            className="absolute inset-0 h-full w-full bg-black/25"
            aria-label="Close menu backdrop"
          />
          <div
            ref={mobileMenuRef}
            className="absolute left-0 top-0 h-full w-[84%] max-w-[320px] overflow-y-auto border-r border-slate-200 bg-white px-4 py-3 shadow-xl"
          >
            <div className="mb-2">
              <button
                type="button"
                onClick={closeMobileMenu}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-base font-semibold text-slate-700"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            <Link to="/about-us" onClick={closeMobileMenu} className="rounded-lg px-3 py-2 transition hover:bg-slate-100">
              About Us
            </Link>
            <Link to="/community" onClick={closeMobileMenu} className="rounded-lg px-3 py-2 transition hover:bg-slate-100">
              Community
            </Link>
            <Link to="/partners" onClick={closeMobileMenu} className="rounded-lg px-3 py-2 transition hover:bg-slate-100">
              Partners
            </Link>
            <div className="rounded-lg">
              <button
                type="button"
                onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition hover:bg-slate-100"
              >
                <span>Services</span>
                <span className="inline-flex h-5 w-5 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`h-3.5 w-3.5 text-slate-700 transition-transform duration-200 ${
                      isMobileServicesOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    aria-hidden="true"
                  >
                    <path
                      d="M3.5 7l6.5 6 6.5-6"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              {isMobileServicesOpen ? (
                <div className="ml-3 mt-1 flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={goToServicesPage}
                    className="rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    All Services
                  </button>
                  {services.length > 0 ? (
                    services.map((service) => (
                      <button
                        key={service._id}
                        type="button"
                        onClick={() => goToServiceDetails(service.name)}
                        className="rounded-lg px-3 py-2 text-left text-xs text-slate-600 transition hover:bg-slate-100"
                      >
                        {service.name}
                      </button>
                    ))
                  ) : (
                    <p className="px-3 py-2 text-xs text-slate-500">No services found</p>
                  )}
                </div>
              ) : null}
            </div>
            <Link
              to="/challenges-solutions"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-2 transition hover:bg-slate-100"
            >
              Challenges & Solutions
            </Link>
            <a href="#process" onClick={closeMobileMenu} className="rounded-lg px-3 py-2 transition hover:bg-slate-100">
              How It Works
            </a>
            <Link
              to="/contact-us"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-2 transition hover:bg-slate-100"
            >
              Contact
            </Link>
            {!isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu()
                  onOpenAuth()
                }}
                className="rounded-lg px-3 py-2 text-left transition hover:bg-slate-100"
              >
                Login
              </button>
            ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Header
