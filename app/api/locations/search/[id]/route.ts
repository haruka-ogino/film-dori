export const revalidate = 0

import { NextRequest } from 'next/server'

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${process.env.GOOGLE_KEY}`
    )
    const data = await res.json()
    const location_data = {
      rating: data.result.rating,
      name: data.result.name,
      address: data.result.formatted_address,
      url: data.result.url,
    }
    return new Response(JSON.stringify(location_data), { status: 200 })
  } catch (error) {
    return new Response(`Failed to fetch location`, { status: 500 })
  }
}
