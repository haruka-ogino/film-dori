import { turso } from '@/utils/database'
import { NextRequest } from 'next/server'

export const POST = async (
  req: NextRequest,
  { params }: { params: { authId: string } }
) => {
  const { authId } = params
  const { id, image, description, tag_id } = await req.json()

  const query =
    'INSERT INTO locations (id, image, description, authId, tag_id) VALUES (?,?,?,?,?)'

  const args = [id, image, description, authId, tag_id]

  try {
    const result = await turso.execute({ sql: query, args })
    return new Response(JSON.stringify(result), { status: 201 })
  } catch (error) {
    return new Response('Failed to save location', { status: 500 })
  }
}

export const GET = async (
  req: NextRequest,
  { params }: { params: { authId: string } }
) => {
  const { authId } = params

  const query = `SELECT locations.id, image, authId, description, tag FROM locations JOIN tags ON tags.id = locations.tag_id WHERE authId = ?`

  try {
    const user_locations = await turso.execute({ sql: query, args: [authId] })

    const locations_data = await Promise.all(
      user_locations.rows.map(async (location) => {
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
    return new Response('Failed to fetch locations', { status: 500 })
  }
}
