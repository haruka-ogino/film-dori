export const revalidate = 0

import { turso } from '@/utils/database'

export const dynamic = 'force-dynamic'

export const GET = async (req: Request) => {
  try {
    const all_locations = await turso.execute(`SELECT * FROM locations`)

    const locations = all_locations.rows

    return new Response(JSON.stringify(locations), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new Response(
      // `Failed to fetch locations ${process.env.TURSO_AUTH_TOKEN}`,
      'Failed to fetch locations',
      { status: 500 }
    )
  }
}
