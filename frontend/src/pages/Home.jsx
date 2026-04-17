import { useOutletContext } from 'react-router-dom'
import HomePageLayout from './HomePageLayout'

function Home() {
  const { isBlurred } = useOutletContext()
  return (
    <div className={isBlurred ? 'pointer-events-none select-none blur-sm' : ''}>
      <HomePageLayout />
    </div>
  )
}

export default Home
