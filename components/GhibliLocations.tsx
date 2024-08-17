'use client'

import { useLocations } from '@/hooks/useLocations'
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
            <div className="flex flex-wrap justify-left align-center">
              <h2 className="text-4xl">{location.name}</h2>
              <p className="tag">{location.tag}</p>
            </div>
            <img
              src={location.image}
              className="self-center m-3"
              alt={`Location of ${location.name}`}
            />
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
