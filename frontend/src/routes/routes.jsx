import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from '../App'
import ContactUs from '../pages/ContactUs'
import CookiePolicy from '../pages/CookiePolicy'
import Home from '../pages/Home'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import ProblemsSolutions from '../pages/ProblemsSolutions'
import Profile from '../pages/Profile'
import RefundPolicy from '../pages/RefundPolicy'
import ServiceDetails from '../pages/ServiceDetails'
import Services from '../pages/Services'
import TermsAndConditions from '../pages/TermsAndConditions'
import WhyMeraakiFoundersClub from '../pages/home/WhyMeraakiFoundersClub'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="services" element={<Services />} />
      <Route path="services/:slug" element={<ServiceDetails />} />
      <Route path="problems-solutions" element={<ProblemsSolutions />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="cookie-policy" element={<CookiePolicy />} />
      <Route path="refund-policy" element={<RefundPolicy />} />
      <Route path="profile" element={<Profile />} />
      <Route path="why-meraaki-founders-club" element={<WhyMeraakiFoundersClub />} />
    </Route>,
  ),
)

export default router