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
      // displayName: { text: string; languageCode: string }
      // formattedAddress: string
      // id: string
      id,
      rating: data.result.rating,
      displayName: data.result.name,
      formattedAddress: data.result.formatted_address,
      url: data.result.url,
    }
    return new Response(JSON.stringify(location_data), { status: 200 })
  } catch (error) {
    return new Response(`Failed to fetch location`, { status: 500 })
  }
}
