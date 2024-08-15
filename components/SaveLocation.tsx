import { GoogleSearchRes } from '@/models/google-locations'

export default function SaveLocation({
  location,
}: {
  location: GoogleSearchRes | undefined
}) {
  if (location) {
    const { rating, displayName, formattedAddress, url } = location

    return (
      <section className="search_result">
        <div className="flex justify-between items-center">
          <h1>{displayName}</h1>
          <p>{rating} ⭐️</p>
        </div>

        <a href={url}>{formattedAddress}</a>
      </section>
    )
  }
}
