import { Location } from '@/models/locations'
import { GoogleSearchRes } from '@/models/google-locations'

export async function getLocations(): Promise<Location[] | undefined> {
  try {
    const res = await fetch(`/api/locations`)

    if (!res.ok) {
      throw new Error(
        `Failed to fetch locations (${res.status}): ${res.statusText}`
      )
    }

    const locations = await res.json()
    return locations
  } catch (error) {
    console.error('Error fetching locations:', error)
    throw new Error('Failed to fetch locations. Please try again.')
  }
}

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
      cache: 'no-store',
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

export async function getGoogleLocation({ id }: { id: string }) {
  try {
    const res = await fetch(`/api/locations/search/${id}`)

    if (!res.ok) {
      throw new Error(
        `Failed to fetch location (${res.status}): ${res.statusText}`
      )
    }

    const location = await res.json()
    return location
  } catch (error) {
    console.error('Error fetching location:', error)
    throw new Error('Failed to fetch location. Please try again.')
  }
}
