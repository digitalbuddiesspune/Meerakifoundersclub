import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from '../App'
import AboutUs from '../pages/AboutUs'
import Community from '../pages/Community'
import ContactUs from '../pages/ContactUs'
import CookiePolicy from '../pages/CookiePolicy'
import Checkout from '../pages/Checkout'
import Home from '../pages/Home'
import Memberships from '../pages/Memberships'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import ProblemsSolutions from '../pages/ProblemsSolutions'
import Profile from '../pages/Profile'
import RefundPolicy from '../pages/RefundPolicy'
import ServiceDetails from '../pages/ServiceDetails'
import Services from '../pages/Services'
import TermsAndConditions from '../pages/TermsAndConditions'
import UserLayout from '../user/layouts/UserLayout'
import UserDashboardPage from '../user/pages/UserDashboardPage'
import UserUploadDocumentsPage from '../user/pages/UserUploadDocumentsPage'
import UserServicesPage from '../user/pages/UserServicesPage'
import Vendor from '../pages/Vendor'
import WhyMeraakiFoundersClub from '../pages/home/WhyMeraakiFoundersClub'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="community" element={<Community />} />
      <Route path="partners" element={<Vendor />} />
      <Route path="memberships" element={<Memberships />} />
      <Route path="services" element={<Services />} />
      <Route path="services/:slug" element={<ServiceDetails />} />
      <Route path="challenges-solutions" element={<ProblemsSolutions />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="cookie-policy" element={<CookiePolicy />} />
      <Route path="refund-policy" element={<RefundPolicy />} />
      <Route path="profile" element={<Profile />} />
      <Route path="user" element={<UserLayout />}>
        <Route path="dashboard" element={<UserDashboardPage />} />
        <Route path="services" element={<UserServicesPage />} />
        <Route path="documents/upload" element={<UserUploadDocumentsPage />} />
      </Route>
      <Route path="why-meraaki-founders-club" element={<WhyMeraakiFoundersClub />} />
    </Route>,
  ),
)

export default router