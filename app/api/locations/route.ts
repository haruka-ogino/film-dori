import { turso } from '@/utils/database'

export const GET = async (req: Request) => {
  try {
    const all_locations = await turso.execute(`SELECT * FROM locations`)

    const locations = all_locations.rows

    // console.log(locations)

    const locations_data = await Promise.all(
      locations.map(async (location) => {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${location.id}&key=${process.env.GOOGLE_KEY}`
        )
        const data = await res.json()
        console.log(`data: ${data}`)

        return {
          ...location,
          rating: data.result.rating,
          name: data.result.name,
          address: data.result.formatted_address,
          url: data.result.url,
        }
      })
    )
    console.log(locations_data)

    return new Response(JSON.stringify(locations_data), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch locations', { status: 500 })
  }
}
