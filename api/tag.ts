import { Tag } from '@/models/tags'

export async function getTags(): Promise<Tag[] | undefined> {
  try {
    const res = await fetch(`/api/tags`)

    if (!res.ok) {
      throw new Error(`Failed to fetch tags (${res.status}): ${res.statusText}`)
    }

    const tags = await res.json()
    return tags
  } catch (error) {
    console.error('Error fetching tags:', error)
    throw new Error('Failed to fetch tags. Please try again.')
  }
}
