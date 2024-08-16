// locations from DB

interface Params {
  authId: string
  id: string
  image: string
  description: string
}
export async function addLocation({ authId, id, image, description }: Params) {
  try {
    const res = await fetch(`/api/locations/${authId}`, {
      method: 'POST',
      body: JSON.stringify({
        id,
        image,
        description,
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
