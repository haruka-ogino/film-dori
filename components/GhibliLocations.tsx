'use client'

import { useLocations } from '@/hooks/locations'
import { Location } from '@/models/locations'

const GhibliLocations = () => {
  const { data: locations, isLoading, isError } = useLocations()

  if (isLoading) return <h1>Loading...</h1>

  if (isError) return <h1>You are experiencing an error...</h1>

  if (locations) {
    return (
      <>
        <h1>Some Ghibli Locations</h1>
        {locations.map((location: Location, i: number) => (
          <section key={i}>
            <h2>{location.name}</h2>
            <img src={location.image} />

            <p>{location.description}</p>
            <p>Google rating: {location.rating} ⭐️</p>
            <p>Address:</p>
            <p>
              <a href={location.url}>{location.address} 📍</a>
            </p>
          </section>
        ))}
      </>
    )
  }
}

export default GhibliLocations
