export interface GoogleSearchRes {
  displayName: string
  formattedAddress: string
  id: string
}

export interface SingleGoogleRes extends GoogleSearchRes {
  rating: number
  url: string
}
