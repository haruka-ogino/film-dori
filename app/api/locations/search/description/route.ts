import { GoogleGenerativeAI } from '@google/generative-ai'

export const POST = async (req: Request) => {
  try {
    // receive data
    const { locationInfo: location_info } = await req.json()

    // api checks
    const googleKey = process.env.GOOGLE_AI_KEY

    if (!googleKey) {
      throw new Error('Google API key is missing')
    }

    const genAI = new GoogleGenerativeAI(googleKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // use line below to add some configurations - see docs
    // const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash', varName })

    const prompt = `Write a brief (circa three sentences) about the location: ${location_info}`

    const result = await model.generateContent(prompt)

    return new Response(JSON.stringify(result.response.text()), { status: 200 })
  } catch (error) {
    return new Response(`Failed to fetch response ${error}`, {
      status: 500,
    })
  }
}
