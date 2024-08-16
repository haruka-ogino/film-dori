import { GoogleSearchRes } from '@/models/google-locations'

export default function SaveLocation({
  location,
}: {
  location: GoogleSearchRes | undefined
}) {
  if (location) {
    const { rating, displayName, formattedAddress, url } = location

    return (
      <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-60">
        <section className="search_result w-8/12">
          <div className="flex justify-between items-center">
            <h1>{displayName}</h1>
            <p>{rating} ⭐️</p>
          </div>

          <a href={url}>{formattedAddress}</a>
        </section>
      </div>
    )
  }
}
