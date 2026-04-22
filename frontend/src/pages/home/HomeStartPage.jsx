import { useEffect, useMemo, useState } from 'react'
import HomeStartSection from '../../components/HomeStartSection'

function HomeStartPage() {
  const [startItems, setStartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const API_BASE_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchStartItems = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services`)
        const data = await response.json()

        if (!response.ok) {
          setError(data.message || 'Failed to fetch services.')
          setLoading(false)
          return
        }

        setStartItems(Array.isArray(data) ? data : [])
      } catch {
        setError('Cannot reach server.')
      } finally {
        setLoading(false)
      }
    }

    fetchStartItems()
  }, [API_BASE_URL])

  const groupedStartItems = useMemo(() => {
    const grouped = startItems.reduce((acc, item) => {
      const category = String(item.category || '').trim()
      if (!category) return acc
      if (!acc[category]) acc[category] = []
      acc[category].push({
        ...item,
        description: String(item.description || item.information || '').trim(),
      })
      return acc
    }, {})

    return Object.entries(grouped)
      .sort(([categoryA], [categoryB]) => {
        const aIsStart = categoryA.toLowerCase() === 'start'
        const bIsStart = categoryB.toLowerCase() === 'start'

        if (aIsStart && !bIsStart) return -1
        if (!aIsStart && bIsStart) return 1
        return categoryA.localeCompare(categoryB)
      })
      .map(([category, items]) => ({
        category,
        items: items.sort((a, b) => Number(a.order || 0) - Number(b.order || 0)),
      }))
  }, [startItems])

  return <HomeStartSection items={groupedStartItems} loading={loading} error={error} />
}

export default HomeStartPage
