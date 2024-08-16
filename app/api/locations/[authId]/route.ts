import { turso } from '@/utils/database'
import { NextRequest } from 'next/server'

export const POST = async (
  req: NextRequest,
  { params }: { params: { authId: string } }
) => {
  const { authId } = params
  const { id, image, description } = await req.json()

  const query =
    'INSERT INTO locations (id, image, description, authId) VALUES (?,?,?,?)'

  const args = [id, image, description, authId]

  try {
    const result = await turso.execute({ sql: query, args })
    return new Response(JSON.stringify(result), { status: 201 })
  } catch (error) {
    return new Response('Failed to save location', { status: 500 })
  }
}
