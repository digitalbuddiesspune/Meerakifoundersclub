import { useEffect, useState } from 'react'
import HomeOurClientsSection from '../../components/HomeOurClientsSection'

function HomeOurClientsPage() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const API_BASE_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/our-clients`)
        const data = await response.json()

        if (!response.ok) {
          setError(data.message || 'Failed to fetch clients.')
          setLoading(false)
          return
        }

        setClients(Array.isArray(data) ? data : [])
      } catch {
        setError('Cannot reach server.')
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [API_BASE_URL])

  return <HomeOurClientsSection clients={clients} loading={loading} error={error} />
}

export default HomeOurClientsPage
