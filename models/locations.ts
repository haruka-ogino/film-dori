export interface Location {
  id: string
  image: string
  description: string

  rating: number
  name: string
  address: string
  url: string
}

export interface GoogleSearchRes {
  displayName: { text: string; languageCode: string }
  formattedAddress: string
  id: string
}
