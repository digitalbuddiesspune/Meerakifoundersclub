import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from '../App'
import ContactUs from '../pages/ContactUs'
import Home from '../pages/Home'
import ProblemsSolutions from '../pages/ProblemsSolutions'
import Profile from '../pages/Profile'
import ServiceDetails from '../pages/ServiceDetails'
import Services from '../pages/Services'
import WhyMeraakiFoundersClub from '../pages/WhyMeraakiFoundersClub'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="services" element={<Services />} />
      <Route path="services/:slug" element={<ServiceDetails />} />
      <Route path="problems-solutions" element={<ProblemsSolutions />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="profile" element={<Profile />} />
      <Route path="why-meraaki-founders-club" element={<WhyMeraakiFoundersClub />} />
    </Route>,
  ),
)

export default router