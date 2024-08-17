export interface Location {
  id: string
  image: string
  description: string

  rating: number
  name: string
  address: string
  url: string
  tag: string
  tag_id: number
}

export interface LocationData {
  id: string
  image: string
  description: string

  authId: string
  tag_id: number
}
