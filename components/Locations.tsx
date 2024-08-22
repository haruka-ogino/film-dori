import { Location } from '@/models/locations'
import { useQueryClient } from '@tanstack/react-query'
import { Dispatch, RefObject, SetStateAction, useRef } from 'react'
import MediaTag from './MediaTag'
import UserTag from './UserTag'
import Link from 'next/link'

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

  function handleTagClick(id: number) {
    setTag(id)
    queryClient.invalidateQueries({ queryKey: [key, id] })
    scroll()
  }

  function handleNameClick(id: string) {
    if (setAuthId) {
      setAuthId(id)
      queryClient.invalidateQueries({ queryKey: [key, id, 'locations'] })
      scroll()
    }
  }

  function scroll() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <h1>{title}</h1>
      {title === 'My Locations' && locations.length === 0 && (
        <Link href="post-location">
          <p>Start sharing locations!</p>
        </Link>
      )}
      {title === 'My Locations' && tag !== 0 && (
        <MediaTag tag={locations[0].tag} setTag={setTag} />
      )}
      {setAuthId &&
        (tag !== 0 && authId !== 'x' ? (
          <div className="flex flex-center items-end">
            <MediaTag tag={locations[0].tag} setTag={setTag} />
            <UserTag username={locations[0].username} setId={setAuthId} />
          </div>
        ) : tag === 0 && authId !== 'x' ? (
          <div className="flex flex-center items-end">
            <UserTag username={locations[0].username} setId={setAuthId} />
          </div>
        ) : (
          tag !== 0 &&
          authId === 'x' && <MediaTag tag={locations[0].tag} setTag={setTag} />
        ))}
      {locations.map((location: Location, i: number) => (
        <section key={i} className="mt-10 mp-10 flex flex-col w-full">
          <div className="flex flex-wrap justify-left align-center">
            <h2 className="text-4xl">{location.name}</h2>
            <p
              className="tag m-[5px_20px] cursor-pointer hover:opacity-70"
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
