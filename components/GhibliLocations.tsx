'use client'

import { useLocations } from '@/hooks/locations'

const GhibliLocations = () => {
  const { data: locations, isLoading, isError } = useLocations()

  if (isLoading) return <h1>Loading...</h1>

  if (isError) return <h1>You are experiencing an error...</h1>

  if (locations) {
    return (
      <>
        <h1>Locations</h1>
        {locations.map((location, i: number) => (
          <section key={i}>
            <h1>{location.name}</h1>
            <img src={location.image} />

            <p>{location.description}</p>
            <p>{location.rating}</p>
            <p>
              <a href={location.url}>{location.address}</a>
            </p>
          </section>
        ))}
      </>
    )
  }
}

export default GhibliLocations
