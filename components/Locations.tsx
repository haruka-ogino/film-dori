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
  authId?: string
}

export default function Locations({
  locations,
  title,
  setTag,
  key,
  setAuthId,
  tag,
  authId,
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

  // if (tag)

  return (
    <>
      <h1>{title}</h1>
      {title === 'My Locations' && tag !== 0 && (
        <div className="flex flex-center">
          <p className="tag">{locations[0].tag}</p>
          <button onClick={() => setTag(0)}>- remove filter -</button>
        </div>
      )}
      {setAuthId &&
        (tag !== 0 && authId !== 'x' ? (
          <div className="flex flex-center">
            <div className="flex flex-center">
              <p className="tag">{locations[0].tag}</p>
              <button onClick={() => setTag(0)}>x</button>
            </div>
            <div className="flex flex-col flex-center hover:underline hover:cursor-pointer hover:opacity-60">
              <button onClick={() => setAuthId('x')}>
                {locations[0].username} <span className="">x</span>
              </button>
            </div>
          </div>
        ) : tag === 0 && authId !== 'x' ? (
          <>
            {/* <div className="flex flex-center">
              <p className="tag">{locations[0].tag}</p>
              <button onClick={() => setTag(0)}>- remove filters -</button>
            </div> */}
            <div className="flex flex-center">
              {/* <p className="tag">{locations[0].username}</p> */}
              <button
                className="flex flex-col flex-center hover:underline hover:cursor-pointer hover:opacity-60"
                onClick={() => setAuthId('x')}
              >
                <p className="mr-2">
                  locations by
                  {/* <span className="tag">{locations[0].username}</span> */}{' '}
                  {locations[0].username} <span className="">x</span>
                </p>
                {/* <span className="hover:opacity-60">x</span> */}
              </button>
            </div>
          </>
        ) : (
          tag !== 0 &&
          authId === 'x' && (
            <div className="flex flex-center">
              <p className="tag">{locations[0].tag}</p>
              <button onClick={() => setTag(0)}>x</button>
            </div>
          )
        ))}
      {locations.map((location: Location, i: number) => (
        <section key={i} className="mt-10 mp-10 flex flex-col w-full">
          <div className="flex flex-wrap justify-left align-center">
            <h2 className="text-4xl">{location.name}</h2>
            <p
              className="tag m-[5px_20px]"
              onClick={() => handleTagClick(location.tagId)}
            >
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
        </section>
      ))}
    </>
  )
}
