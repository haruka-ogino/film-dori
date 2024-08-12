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
