export interface GoogleSearchRes {
  displayName: { text: string; languageCode: string }
  formattedAddress: string
  id: string
}

export interface SingleGoogleRes extends GoogleSearchRes {
  rating: number
  url: string
}
