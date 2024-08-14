import { Location } from '@/models/locations'

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
    const res = await fetch('/api/locations/search', {
      method: 'POST',
      body: JSON.stringify(searchInput),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })

    if (!res.ok) {
      throw new Error(
        `Failed to fetch locations from google (${res.status}): ${res.statusText}`
      )
    }

    const locations = await res.json()
    return locations
  } catch (error) {
    console.error('Failed to fetch locations from google ', error)
    throw new Error('Failed to fetch locations from google. Please try again.')
  }
}
