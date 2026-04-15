import { useEffect, useState } from 'react'
import AuthModal from './components/AuthModal'
import Home from './pages/Home'

const AUTH_STORAGE_KEY = 'mfc_auth_user'
const API_BASE_URL = import.meta.env.VITE_API_URL

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
const isValidPhone = (value) => /^[9876]\d{9}$/.test(value)
const isValidName = (value) => value.trim().length >= 3

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authUser, setAuthUser] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authTab, setAuthTab] = useState('signup')
  const [authError, setAuthError] = useState('')
  const [signupForm, setSignupForm] = useState({ name: '', email: '', phone: '' })
  const [loginForm, setLoginForm] = useState({ identifier: '' })

  useEffect(() => {
    const savedUser = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!savedUser) return
    const parsedUser = JSON.parse(savedUser)
    setAuthUser(parsedUser)
    setIsAuthenticated(true)
  }, [])

  const openAuthModal = () => {
    if (isAuthenticated) return
    setAuthError('')
    setShowAuthModal(true)
  }

  const closeAuthModal = () => {
    setAuthError('')
    setShowAuthModal(false)
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
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(createdUser))
      setAuthUser(createdUser)
      setIsAuthenticated(true)
      closeAuthModal()
      setSignupForm({ name: '', email: '', phone: '' })
    } catch {
      setAuthError('Cannot reach server. Please start backend on port 5000.')
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
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser))
      setAuthUser(loggedInUser)
      setIsAuthenticated(true)
      closeAuthModal()
      setLoginForm({ identifier: '' })
    } catch {
      setAuthError('Cannot reach server. Please start backend on port 5000.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setAuthUser(null)
    setIsAuthenticated(false)
  }

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800">
      <Home
        isAuthenticated={isAuthenticated}
        authUser={authUser}
        onOpenAuth={openAuthModal}
        onLogout={handleLogout}
        isBlurred={showAuthModal}
      />
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
