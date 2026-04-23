import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AuthModal from './components/AuthModal'
import Footer from './components/Footer'
import Header from './components/Header'

const AUTH_STORAGE_KEY = 'mfc_auth_user'
const API_BASE_URL = import.meta.env.VITE_API_URL
const LEGAL_PAGE_PATHS = new Set(['/privacy-policy', '/terms-and-conditions', '/cookie-policy'])

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
const isValidPhone = (value) => /^[9876]\d{9}$/.test(value)
const isValidName = (value) => value.trim().length >= 3
const NETWORK_ERROR_MESSAGE = 'Cannot reach server. Please start backend on port 5000.'

function App() {
  const { pathname } = useLocation()
  const isUserDashboardRoute = pathname.startsWith('/user/')
  const [authUser, setAuthUser] = useState(() => {
    const savedUser = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!savedUser) return null

    try {
      return JSON.parse(savedUser)
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      return null
    }
  })
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(authUser))
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [hideHeader, setHideHeader] = useState(false)
  const lastScrollYRef = useRef(0)
  const [authTab, setAuthTab] = useState('signup')
  const [authError, setAuthError] = useState('')
  const [signupForm, setSignupForm] = useState({ name: '', email: '', phone: '' })
  const [loginForm, setLoginForm] = useState({ identifier: '' })

  const openAuthModal = () => {
    if (isAuthenticated) return
    setAuthError('')
    setShowAuthModal(true)
  }

  const closeAuthModal = () => {
    setAuthError('')
    setShowAuthModal(false)
  }

  const persistAndLoginUser = (user) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    setAuthUser(user)
    setIsAuthenticated(true)
    closeAuthModal()
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    setAuthError('')

    const name = signupForm.name.trim()
    const email = signupForm.email.trim().toLowerCase()
    const phone = signupForm.phone.trim()

    if (!isValidName(name)) {
      setAuthError('Name must contain at least 3 letters.')
      return
    }
    if (!isValidEmail(email)) {
      setAuthError('Please enter a valid email address.')
      return
    }
    if (!isValidPhone(phone)) {
      setAuthError('Phone must start with 9, 8, 7, or 6 and contain 10 digits.')
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/create-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: name,
          email,
          phone,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        setAuthError(data.message || 'Failed to create user.')
        return
      }

      const createdUser = {
        _id: data.user?._id,
        name: data.user?.username || name,
        email: data.user?.email || email,
        phone: data.user?.phone || phone,
      }
      persistAndLoginUser(createdUser)
      setSignupForm({ name: '', email: '', phone: '' })
    } catch {
      setAuthError(NETWORK_ERROR_MESSAGE)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setAuthError('')

    const identifier = loginForm.identifier.trim().toLowerCase()
    if (!identifier) {
      setAuthError('Enter your email or phone number.')
      return
    }

    const isPhoneInput = /^\d+$/.test(identifier)
    if (isPhoneInput && !isValidPhone(identifier)) {
      setAuthError('Phone must start with 9, 8, 7, or 6 and contain 10 digits.')
      return
    }
    if (!isPhoneInput && !isValidEmail(identifier)) {
      setAuthError('Enter a valid email or phone number.')
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/login-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier }),
      })
      const data = await response.json()
      if (!response.ok) {
        setAuthError(data.message || 'Login failed.')
        return
      }

      const loggedInUser = {
        _id: data.user?._id,
        name: data.user?.username || '',
        email: data.user?.email || '',
        phone: data.user?.phone || '',
      }
      persistAndLoginUser(loggedInUser)
      setLoginForm({ identifier: '' })
    } catch {
      setAuthError(NETWORK_ERROR_MESSAGE)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setAuthUser(null)
    setIsAuthenticated(false)
  }

  const sharedAuthProps = {
    isAuthenticated,
    authUser,
    onOpenAuth: openAuthModal,
    onLogout: handleLogout,
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || 0
      const delta = currentScrollY - lastScrollYRef.current
      const SCROLL_THRESHOLD = 8

      // Keep header visible at the very top.
      if (currentScrollY <= 10) {
        setHideHeader(false)
        lastScrollYRef.current = currentScrollY
        return
      }

      if (delta > SCROLL_THRESHOLD) {
        // Scrolling down -> hide header immediately.
        setHideHeader((prev) => (prev ? prev : true))
      } else if (delta < -SCROLL_THRESHOLD) {
        // Scrolling up -> show header from anywhere.
        setHideHeader((prev) => (prev ? false : prev))
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!LEGAL_PAGE_PATHS.has(pathname)) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800">
      {!isUserDashboardRoute ? (
        <Header
          hidden={hideHeader}
          isAuthenticated={isAuthenticated}
          authUser={authUser}
          onOpenAuth={openAuthModal}
        />
      ) : null}

      <Outlet context={{ ...sharedAuthProps, isBlurred: showAuthModal }} />

      {!isUserDashboardRoute ? <Footer /> : null}

      <AuthModal
        visible={showAuthModal && !isAuthenticated}
        authTab={authTab}
        setAuthTab={setAuthTab}
        authError={authError}
        onClose={closeAuthModal}
        signupForm={signupForm}
        setSignupForm={setSignupForm}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        onSignup={handleSignup}
        onLogin={handleLogin}
        clearError={() => setAuthError('')}
      />
    </div>
  )
}

export default App
