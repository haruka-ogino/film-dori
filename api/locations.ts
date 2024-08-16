// locations from DB

import { LocationData } from '@/models/locations'

export async function saveLocation(data: LocationData) {
  console.log(data)

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
