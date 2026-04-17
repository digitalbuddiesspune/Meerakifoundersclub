import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Calculator,
  FileText,
  Receipt,
  Scale,
} from 'lucide-react'
import HomeServicesSection from '../../components/HomeServicesSection'

const coreServices = [
  { title: 'CA', icon: Calculator },
  { title: 'CS', icon: Scale },
  { title: 'Trademark', icon: BadgeCheck },
  { title: 'GST', icon: Receipt },
  { title: 'LLP', icon: Building2 },
  { title: 'Company Registration', icon: BriefcaseBusiness },
  { title: 'LLP Registration', icon: FileText },
]

function HomeServicesPage() {
  return <HomeServicesSection services={coreServices} />
}

export default HomeServicesPage
