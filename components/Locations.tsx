import { Location } from '@/models/locations'
import { useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'

interface Params {
  locations: Location[]
  title: string
  setTag: Dispatch<SetStateAction<number>>
  key: string
  tag: number
  setAuthId?: Dispatch<SetStateAction<string>>
}

export default function Locations({
  locations,
  title,
  setTag,
  key,
  setAuthId,
  tag,
}: Params) {
  const queryClient = useQueryClient()
  console.log(locations)

  function handleTagClick(id: number) {
    setTag(id)
    queryClient.invalidateQueries({ queryKey: [key, id] })
  }

  function handleNameClick(id: string) {
    if (setAuthId) {
      setAuthId(id)
      queryClient.invalidateQueries({ queryKey: [key, id, 'locations'] })
    }
  }

  return (
    <>
      <h1>{title}</h1>
      {tag === 0 && !setAuthId ? (
        <p>discover locations</p>
      ) : setAuthId ? (
        <>
          <div className="flex flex-center">
            <p className="tag">{locations[0].tag}</p>
            <button onClick={() => setTag(0)}>- remove filters -</button>
          </div>
          <div className="flex flex-center">
            <p className="tag">{locations[0].username}</p>
            <button onClick={() => setAuthId('x')}>- remove filters -</button>
          </div>
        </>
      ) : (
        <div className="flex flex-center">
          <p className="tag">{locations[0].tag}</p>
          <button onClick={() => setTag(0)}>- remove filter -</button>
        </div>
      )}
      {locations.map((location: Location, i: number) => (
        <section key={i} className="mt-10 mp-10 flex flex-col w-full">
          <div className="flex flex-wrap justify-left align-center">
            <h2 className="text-4xl">{location.name}</h2>
            <p className="tag" onClick={() => handleTagClick(location.tagId)}>
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
          {/* <div className="flex">
            <img src={location.userImg} alt="user-icon" /> */}
          {title !== 'My Locations' ? (
            <p
              className="self-center hover:underline hover:cursor-pointer"
              onClick={() => handleNameClick(location.authId)}
            >
              By {location.username}
            </p>
          ) : (
            <p className="self-center">By {location.username}</p>
          )}
          {/* </div> */}
        </section>
      ))}
    </>
  )
}
