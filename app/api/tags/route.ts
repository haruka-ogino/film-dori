import { turso } from '@/utils/database'

export const GET = async (req: Request) => {
  try {
    const all_tags = await turso.execute(`SELECT * FROM tags`)
    return new Response(JSON.stringify(all_tags.rows), { status: 200 })
  } catch (error) {
    return new Response(`Failed to fetch locations`, { status: 500 })
  }
}
