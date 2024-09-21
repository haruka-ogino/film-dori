import { LocationData } from '@/models/locations'
import { Location } from '@/models/locations'

export async function saveLocation(data: LocationData) {
  try {
    const res = await fetch(`/api/locations/${data.authId}/by-id/${data.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    })

    if (!res.ok) {
      throw new Error(
        `Failed to add location (${res.status}): ${res.statusText}`
      )
    }

    const location = await res.json()

    return location
  } catch (error) {
    console.error('Error adding location:', error)
    throw new Error('Failed to add location. Please try again.')
  }
}

export async function getLocations(
  authId: string,
  tagId: number
): Promise<Location[] | undefined> {
  try {
    const res = await fetch(`/api/locations/${authId}/${tagId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

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

export async function deleteLocation({
  id,
  authId,
}: {
  id: string
  authId: string
}) {
  try {
    const res = await fetch(`/api/locations/${authId}/by-id/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(
        `Failed to delete locations (${res.status}): ${res.statusText}`
      )
    }

    const deleted = await res.json()

    return deleted
  } catch (error) {
    console.error('Error deleting locations:', error)
    throw new Error('Failed to delete locations. Please try again.')
  }
}

export async function updateLocation(data: LocationData) {
  try {
    const res = await fetch(`/api/locations/${data.authId}/by-id/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    })

    if (!res.ok) {
      throw new Error(
        `Failed to update location (${res.status}): ${res.statusText}`
      )
    }

    const updated = await res.json()

    return updated
  } catch (error) {
    console.error('Error updating location:', error)
    throw new Error('Failed to update location. Please try again.')
  }
}
