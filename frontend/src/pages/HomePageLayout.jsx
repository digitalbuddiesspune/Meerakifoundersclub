import HomeFoundersPage from './home/HomeFoundersPage'
import HomeHeroPage from './home/HomeHeroPage'
import HomeProcessPage from './home/HomeProcessPage'
import HomeStartPage from './home/HomeStartPage'
import WhyMeraakiFoundersClub from './home/WhyMeraakiFoundersClub'

function HomePageLayout() {
  return (
    <main id="home" className="w-full">
      <HomeHeroPage />
      {/* <HomeServicesPage /> */}
      <HomeStartPage />
      <HomeProcessPage />
      {/* <HomeOurClientsPage /> */}
      <HomeFoundersPage />
      <WhyMeraakiFoundersClub />
    </main>
  )
}

export default HomePageLayout
