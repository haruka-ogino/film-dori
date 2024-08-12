'use client'

import { useLocations } from '@/hooks/locations'

const GhibliLocations = () => {
  const { data: locations, isLoading, isError } = useLocations()

  if (isLoading) return <h1>Loading...</h1>

  if (isError) return <h1>You are experiencing an error...</h1>

  console.log(locations)

  if (locations) {
    return (
      <>
        <h1>Locations</h1>
        {locations.map((location: { image: string | undefined }, i: number) => (
          <section key={i}>
            <img src={location.image} />
          </section>
        ))}
      </>
    )
  }
}

export default GhibliLocations
