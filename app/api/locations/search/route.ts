export const POST = async (req: Request) => {
  try {
    const apiKey = process.env.GOOGLE_KEY

    if (!apiKey) {
      throw new Error('Google API key is missing')
    }

    const { search } = await req.json()

    const res = await fetch(
      `https://places.googleapis.com/v1/places:searchText`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask':
            'places.id,places.displayName,places.formattedAddress,places.rating,places.googleMapsUri',
        },
        body: JSON.stringify({ textQuery: search }),
      }
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`)
    }

    const data = await res.json()

    const locations_data = data.places.map((location: any) => {
      return {
        id: location.id,
        formattedAddress: location.formattedAddress,
        rating: location.rating,
        displayName: location.displayName.text,
        url: location.googleMapsUri,
      }
    })

    return new Response(JSON.stringify(locations_data), { status: 200 })
  } catch (error) {
    return new Response(`Failed to fetch search results ${error}`, {
      status: 500,
    })
  }
}
