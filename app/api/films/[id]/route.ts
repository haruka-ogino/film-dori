import { turso } from '@/utils/database'

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params

    const film = await turso.execute(`SELECT * FROM films WHERE id = ${id}`)

    return new Response(JSON.stringify(film.rows[0]), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch film', { status: 500 })
  }
}
