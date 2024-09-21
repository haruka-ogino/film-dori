import { GoogleSearchRes } from '../models/google'

export async function searchGoogleLocation({
  searchInput,
}: {
  searchInput: string
}) {
  try {
    const search = JSON.stringify({ search: searchInput })

    const res = await fetch('/api/locations/search', {
      method: 'POST',
      body: search,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(
        `Failed to fetch locations from google (${res.status}): ${res.statusText}`
      )
    }

    const locations = await res.json()

    return locations as GoogleSearchRes[]
  } catch (error) {
    console.error('Failed to fetch locations from google ', error)
    throw new Error('Failed to fetch locations from google. Please try again.')
  }
}

export async function getAIDescription({
  locationInfo,
  address,
}: {
  locationInfo: string
  address: string
}) {
  try {
    const info = JSON.stringify({ locationInfo, address })

    const res = await fetch('/api/locations/search/description', {
      method: 'POST',
      body: info,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(
        `Failed to fetch response from google AI (${res.status}): ${res.statusText}`
      )
    }

    const response = await res.json()

    return response
  } catch (error) {
    console.error('Failed to fetch locations from google ', error)
    throw new Error('Failed to fetch locations from google. Please try again.')
  }
}
