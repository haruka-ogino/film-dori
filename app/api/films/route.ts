import { turso } from '@/utils/database'

export const GET = async (req: Request) => {
  try {
    const films = await turso.execute('SELECT * FROM films')

    return new Response(JSON.stringify(films.rows), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch films', { status: 500 })
  }
}
