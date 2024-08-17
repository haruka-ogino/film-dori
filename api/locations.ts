// locations from DB

import { LocationData } from '@/models/locations'
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

export async function saveLocation(data: LocationData) {
  try {
    const { authId, id, image, description, tag_id } = data
    const res = await fetch(`/api/locations/${authId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        image,
        description,
        tag_id,
      }),
    })

    if (!res.ok) {
      throw new Error(
        `Failed to add location (${res.status}): ${res.statusText}`
      )
    }

    const location = await res.json()
    console.log(location)

    return location
  } catch (error) {
    console.error('Error adding location:', error)
    throw new Error('Failed to add location. Please try again.')
  }
}

export async function getUserLocations(authId: string, tag_id: number) {
  try {
    console.log(tag_id)

    const res = await fetch(`/location/${authId}`)
    // const res = await fetch(`/location/${authId}/${tag_id}`)

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
