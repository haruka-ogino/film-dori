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
  { params }: { params: { authId: string; tagId: number } }
) => {
  const { authId, tagId } = params

  let query = 'SELECT * FROM newlocations'
  //   let query = `
  //   SELECT
  //     newlocations.id, newlocations.image, users.image as userImg, users.username, authId, description, tag, tag_id as tagId
  //   FROM
  //     newlocations
  //     JOIN tags ON tags.id = newlocations.tag_id
  //     JOIN users ON users.id = newlocations.authId
  // `

  const args = []

  const tag_id = Number(tagId)

  if (authId !== 'x' && tag_id !== 0) {
    console.log('all inputs in')

    query += ` WHERE auth_id = ? AND tag_id = ?`
    args.push(authId)
    args.push(tag_id.toString())
  } else if (authId !== 'x') {
    console.log('only authId specified')
    query += ` WHERE auth_id = ?`
    args.push(authId)
  } else if (tag_id !== 0) {
    console.log('only tag specified')
    query += ` WHERE tag_id = ?`
    args.push(tag_id.toString())
  }

  try {
    // const user_locations = await turso.execute({ sql: query, args })
    const user_locations = await turso.execute(query)

    // const locations_data = await Promise.all(
    //   user_locations.rows.map(async (location) => {
    //     try {
    //       const res = await fetch(
    //         `https://maps.googleapis.com/maps/api/place/details/json?place_id=${location.id}&key=${process.env.GOOGLE_KEY}`
    //       )
    //       const data = await res.json()

    //       return {
    //         ...location,
    //         rating: data.result.rating,
    //         name: data.result.name,
    //         address: data.result.formatted_address,
    //         url: data.result.url,
    //       }
    //     } catch (apiError) {
    //       console.error(
    //         `Error fetching details for location ${location.id}:`,
    //         apiError
    //       )
    //       return {
    //         ...location,
    //         rating: null,
    //         name: 'Unknown',
    //         address: 'Unknown',
    //         url: '',
    //       }
    //     }
    //   })
    // )

    return new Response(JSON.stringify(user_locations.rows), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch locations', { status: 500 })
  }
}
