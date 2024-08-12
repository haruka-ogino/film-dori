export const GET = async (
  req: Request,
  { params }: { params: { search: string } }
) => {
  try {
    const apiKey = process.env.GOOGLE_KEY

    if (!apiKey) {
      throw new Error('Google API key is missing')
    }

    const res = await fetch(
      `https://places.googleapis.com/v1/places:searchText`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask':
            'places.id,places.displayName,places.formattedAddress',
        },
        body: JSON.stringify({ textQuery: params.search }),
      }
    )
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`)
    }

    const data = await res.json()
    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch search results', { status: 500 })
  }
}
