'use client'

import { useLocations } from '@/hooks/google-locations'
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
          <section key={i} className="mt-10 mp-10 flex flex-col w-full">
            <h2 className="text-4xl">{location.name}</h2>
            <p>{location.tag}</p>
            <img src={location.image} className="self-center m-3" />
            <p>{location.description}</p>
            <p>Google rating: {location.rating} ⭐️</p>
            <p>Address:</p>
            <p>
              <a href={location.url}>📍 {location.address}</a>
            </p>
          </section>
        ))}
      </>
    )
  }
}

export default GhibliLocations
