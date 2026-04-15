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

function Header({ isAuthenticated, authUser, onOpenAuth, onLogout }) {
  const [services, setServices] = useState([])
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const goToServicesPage = () => {
    navigate('/services')
    setIsServicesOpen(false)
    setIsMobileMenuOpen(false)
  }

  const goToServiceDetails = (serviceName) => {
    navigate(`/services/${toSlug(serviceName)}`)
    setIsServicesOpen(false)
    setIsMobileMenuOpen(false)
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-500  text-white backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-8">
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
              className="h-10 w-auto max-w-[120px] rounded-lg object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={onOpenAuth}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/60 bg-slate-800 text-white"
            aria-label="User account"
          >
            {isAuthenticated && authUser?.name ? authUser.name[0].toUpperCase() : 'U'}
          </button>
        </div>

        <Link to="/" className="hidden items-center gap-3 md:flex">
          <img
            src={LOGO_URL}
            alt="Meraaki Founders Club logo"
            className="h-12 w-auto max-w-[150px] rounded-lg object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link to="/" className="text-black transition hover:text-emerald-200">Home</Link>
          <div
            ref={servicesMenuRef}
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              type="button"
              onClick={goToServicesPage}
              className="text-black transition hover:text-slate-700"
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
          <a href="#process" className="text-black transition hover:text-slate-700">How It Works</a>
          <a href="#contact" className="text-black transition hover:text-slate-700">Contact</a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
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

      {isMobileMenuOpen ? (
        <div ref={mobileMenuRef} className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            <Link to="/" onClick={closeMobileMenu} className="rounded-lg px-3 py-2 transition hover:bg-slate-100">
              About
            </Link>
            <button
              type="button"
              onClick={goToServicesPage}
              className="rounded-lg px-3 py-2 text-left transition hover:bg-slate-100"
            >
              Services
            </button>
            {services.length > 0 ? (
              <div className="ml-3 flex flex-col gap-1">
                {services.map((service) => (
                  <button
                    key={service._id}
                    type="button"
                    onClick={() => goToServiceDetails(service.name)}
                    className="rounded-lg px-3 py-2 text-left text-xs text-slate-600 transition hover:bg-slate-100"
                  >
                    {service.name}
                  </button>
                ))}
              </div>
            ) : null}
            <a
              href="mailto:info@meraakifoundersclub.com"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-2 transition hover:bg-slate-100"
            >
              Contact
            </a>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  onLogout()
                  closeMobileMenu()
                }}
                className="rounded-lg px-3 py-2 text-left transition hover:bg-slate-100"
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Header
