import { useGoogleInfo } from '@/hooks/google-locations'

export default function SaveLocation({ id }: { id: string }) {
  const { data: googleInfo, isLoading, isError, error } = useGoogleInfo(id)

  if (isLoading) return <h1>Loading...</h1>

  if (isError) return <h1>You are experiencing an error...</h1>

  if (googleInfo) {
    const { rating, displayName, formattedAddress, url } = googleInfo

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
