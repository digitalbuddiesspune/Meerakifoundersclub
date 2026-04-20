import HomeFoundersPage from './home/HomeFoundersPage'
import HomeHeroPage from './home/HomeHeroPage'
import HomeProcessPage from './home/HomeProcessPage'
import HomeServicesPage from './home/HomeServicesPage'
import HomeStartPage from './home/HomeStartPage'

function HomePageLayout() {
  return (
    <main id="home" className="w-full">
      <HomeHeroPage />
      <HomeServicesPage />
      <HomeStartPage />
      <HomeProcessPage />
      <HomeFoundersPage />
    </main>
  )
}

export default HomePageLayout
