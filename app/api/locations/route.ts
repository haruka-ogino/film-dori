export const revalidate = 0

import { turso } from '@/utils/database'

export const GET = async (req: Request) => {
  try {
    const query = `SELECT locations.id, image, authId, description, tag FROM locations JOIN tags ON tags.id=locations.tag_id`

    const all_locations = await turso.execute(query)

    const locations = all_locations.rows

    const locations_data = await Promise.all(
      locations.map(async (location) => {
        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${location.id}&key=${process.env.GOOGLE_KEY}`
          )
          const data = await res.json()

          return {
            ...location,
            rating: data.result.rating,
            name: data.result.name,
            address: data.result.formatted_address,
            url: data.result.url,
          }
        } catch (apiError) {
          console.error(
            `Error fetching details for location ${location.id}:`,
            apiError
          )
          return {
            ...location,
            rating: null,
            name: 'Unknown',
            address: 'Unknown',
            url: '',
          }
        }
      })
    )

    return new Response(JSON.stringify(locations_data), { status: 200 })
  } catch (error) {
    return new Response(`Failed to fetch locations`, { status: 500 })
  }
}
