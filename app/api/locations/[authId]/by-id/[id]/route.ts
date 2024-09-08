import { turso } from '@/utils/database'
import { NextRequest } from 'next/server'

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string; authId: string } }
) => {
  const { id, authId } = params
  const { image, description, name, address, url, rating, tagId } =
    await req.json()

  const query =
    'INSERT INTO newlocations (id, image, description, name, address, url, rating, auth_id, tag_id) VALUES (?,?,?,?,?,?,?,?,?)'

  const args = [
    id,
    image,
    description,
    name,
    address,
    url,
    rating,
    authId,
    tagId,
  ]

  try {
    const result = await turso.execute({ sql: query, args })
    return new Response(JSON.stringify(result), { status: 201 })
  } catch (error) {
    return new Response('Failed to save location', { status: 500 })
  }
}

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

  const tag_id = Number(tagId)

  if (image !== '') {
    setColumns.push('image = ?')
    args.push(image)
  }
  if (name !== '') {
    setColumns.push('name = ?')
    args.push(name)
  }
  if (description !== '') {
    setColumns.push('description = ?')
    args.push(description)
  }
  if (tag_id !== 0) {
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
