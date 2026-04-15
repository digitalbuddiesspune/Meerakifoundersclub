import Footer from '../components/Footer'
import Header from '../components/Header'
import HomeMain from '../components/HomeMain'

function Home({ isAuthenticated, authUser, onOpenAuth, onLogout, isBlurred }) {
  return (
    <div className={isBlurred ? 'pointer-events-none select-none blur-sm' : ''}>
      <Header
        isAuthenticated={isAuthenticated}
        authUser={authUser}
        onOpenAuth={onOpenAuth}
        onLogout={onLogout}
      />
      <HomeMain />
      <Footer />
    </div>
  )
}

export default Home
