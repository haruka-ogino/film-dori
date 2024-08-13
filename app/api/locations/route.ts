export const revalidate = 0

import { turso } from '@/utils/database'

// export const revalidate = 0
// export const dynamic = 'force-dynamic'
export const GET = async (req: Request) => {
  try {
    const all_locations = await turso.execute(`SELECT * FROM locations`)

    const locations = all_locations.rows

    const locations_data = await Promise.all(
      locations.map(async (location) => {
        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${location.id}&key=${process.env.GOOGLE_KEY}`
          )
          const data = await res.json()
          const response = {
            ...location,
            rating: data.result.rating,
            name: data.result.name,
            address: data.result.formatted_address,
            url: data.result.url,
          }
          console.log(response)
          return { response }
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
          //   return {
          //     ...location,
          //     rating: data.result.rating,
          //     name: data.result.name,
          //     address: data.result.formatted_address,
          //     url: data.result.url,
          //   }
        }
      })
    )

    return new Response(JSON.stringify(locations_data), { status: 200 })
  } catch (error) {
    return new Response(
      // `Failed to fetch locations ${process.env.TURSO_AUTH_TOKEN}`,
      'Failed to fetch locations',
      { status: 500 }
    )
  }
}
