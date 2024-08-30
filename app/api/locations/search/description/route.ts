import { GoogleGenerativeAI } from '@google/generative-ai'

export const GET = async (req: Request) => {
  try {
    // api checks
    const googleKey = process.env.GOOGLE_AI_KEY

    if (!googleKey) {
      throw new Error('Google API key is missing')
    }

    const genAI = new GoogleGenerativeAI(googleKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = 'Write a story about a magic backpack.'

    const result = await model.generateContent(prompt)
    console.log(result.response.text())
  } catch (error) {
    return new Response(`Failed to fetch response ${error}`, {
      status: 500,
    })
  }
}
