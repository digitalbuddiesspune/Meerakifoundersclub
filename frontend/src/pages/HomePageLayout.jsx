import HomeFoundersPage from './home/HomeFoundersPage'
import HomeHeroPage from './home/HomeHeroPage'
import HomeOurClientsPage from './home/HomeOurClientsPage'
import HomeProcessPage from './home/HomeProcessPage'
import HomeServicesPage from './home/HomeServicesPage'
import HomeStartPage from './home/HomeStartPage'
import WhyMeraakiFoundersClub from './home/WhyMeraakiFoundersClub'

function HomePageLayout() {
  return (
    <main id="home" className="w-full">
      <HomeHeroPage />
      <HomeServicesPage />
      <HomeStartPage />
      <HomeProcessPage />
      <HomeOurClientsPage />
      <HomeFoundersPage />
      <WhyMeraakiFoundersClub />
    </main>
  )
}

export default HomePageLayout
