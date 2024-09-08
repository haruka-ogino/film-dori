import { turso } from '@/utils/database'
import { NextRequest } from 'next/server'

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
      newlocations.address,
      newlocations.rating,
      newlocations.url,
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
    query += ` WHERE auth_id = ? AND tag_id = ?`
    args.push(authId)
    args.push(tag_id.toString())
  } else if (authId !== 'x') {
    query += ` WHERE auth_id = ?`
    args.push(authId)
  } else if (tag_id !== 0) {
    query += ` WHERE tag_id = ?`
    args.push(tag_id.toString())
  } else {
    query += ` ORDER BY RANDOM() LIMIT 10`
  }

  try {
    const user_locations = await turso.execute({ sql: query, args })

    return new Response(JSON.stringify(user_locations.rows), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch locations', { status: 500 })
  }
}
