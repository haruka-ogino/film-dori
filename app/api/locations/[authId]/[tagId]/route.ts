import { turso } from '@/utils/database'
import { NextRequest } from 'next/server'

export const POST = async (
  req: NextRequest,
  { params }: { params: { authId: string } }
) => {
  const { authId } = params
  const { id, image, description, name, address, tag_id } = await req.json()

  const query =
    'INSERT INTO newlocations (id, image, description, name, address, auth_id, tag_id) VALUES (?,?,?,?,?,?,?)'

  const args = [id, image, description, name, address, authId, tag_id]

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

  let query = `
    SELECT
      newlocations.id,
      newlocations.image,
      newlocations.name,
      users.image as userImg,
      users.username,
      auth_id as authId,
      description,
      tag,
      tag_id as tagId
    FROM 
      newlocations
    JOIN
      tags ON tags.id = newlocations.tag_id
    JOIN
      users ON users.id = newlocations.auth_id
  `

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
    const user_locations = await turso.execute({ sql: query, args })

    return new Response(JSON.stringify(user_locations.rows), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch locations', { status: 500 })
  }
}
