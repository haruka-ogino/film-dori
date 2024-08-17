import { Location } from '@/models/locations'
import { useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'

interface Params {
  locations: Location[]
  title: string
  setTag: Dispatch<SetStateAction<number>>
}

export default function Locations({ locations, title, setTag }: Params) {
  const queryClient = useQueryClient()

  function handleClick(id: number) {
    setTag(id)
    queryClient.invalidateQueries({ queryKey: ['my-locations', id] })
  }

  return (
    <>
      <h1>{title}</h1>
      {locations.map((location: Location, i: number) => (
        <section key={i} className="mt-10 mp-10 flex flex-col w-full">
          <div className="flex flex-wrap justify-left align-center">
            <h2 className="text-4xl">{location.name}</h2>
            <p className="tag" onClick={() => handleClick(location.tag_id)}>
              {location.tag}
            </p>
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
