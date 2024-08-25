import { turso } from '@/utils/database'
import { NextRequest } from 'next/server'

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string; authId: string } }
) => {
  const { id, authId } = params

  const query = `DELETE FROM newlocations WHERE id = ? AND auth_id = ?`

  const args = [id, authId]

  try {
    const result = await turso.execute({ sql: query, args })
    return new Response(JSON.stringify(result), { status: 200 })
  } catch (error) {
    return new Response('Failed to delete location', { status: 500 })
  }
}

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string; authId: string } }
) => {
  const { id, authId } = params
  const { image, description, name, tagId } = await req.json()

  const args = []
  const setColumns = []

  if (image && image !== '') {
    setColumns.push('image = ?')
    args.push(image)
  }
  if (name && name !== '') {
    setColumns.push('name = ?')
    args.push(name)
  }
  if (description && description !== '') {
    setColumns.push('description = ?')
    args.push(description)
  }
  if (tagId && tagId !== 0) {
    setColumns.push('tag_id= ?')
    args.push(tagId)
  }

  if (setColumns.length === 0) {
    return new Response('No valid fields provided to update', { status: 400 })
  }

  const setQuery = setColumns.join(', ')

  const query = `
    UPDATE 
      newlocations
    SET
      ${setQuery}
    WHERE 
      id = ? AND auth_id = ?
  `

  args.push(id, authId)

  try {
    const result = await turso.execute({ sql: query, args })
    return new Response(JSON.stringify(result), { status: 200 })
  } catch (error) {
    return new Response('Failed to edit location', { status: 500 })
  }
}
// ChIJmcj9QppiGWAR36TzFsn8oaY
// 107958491462184596092
// SELECT
//   newlocations.id,
//   newlocations.image,
//   newlocations.name,
//   newlocations.address,
//   newlocations.rating,
//   newlocations.url,
//   users.image AS userImg,
//   users.username,
//   auth_id AS authId,
//   description,
//   tag,
//   tag_id AS id
// FROM
//   newlocations
//   JOIN tags ON tags.id = newlocations.tag_id
//   JOIN users ON users.id = newlocations.auth_id
// WHERE
//   newlocations.id = 'ChIJmcj9QppiGWAR36TzFsn8oaY'
//   AND auth_id = '107958491462184596092'
