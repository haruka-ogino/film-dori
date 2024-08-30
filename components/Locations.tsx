import { Location } from '@/models/locations'
import { useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import MediaTag from './MediaTag'
import UserTag from './UserTag'
import Link from 'next/link'
import LocationCard from './LocationCard'
import { useAuth } from '@/hooks/useProviders'

interface Params {
  locations: Location[]
  title: string
  setTag: Dispatch<SetStateAction<number>>
  tag: number
  setAuthId?: Dispatch<SetStateAction<string>>
  authId: string
}

export default function Locations({
  locations,
  title,
  setTag,
  setAuthId,
  tag,
  authId,
}: Params) {
  const queryClient = useQueryClient()
  const { session } = useAuth()
  const currentAuthId = session?.user?.id || null

  function handleTagClick(id: number) {
    setTag(id)
    queryClient.invalidateQueries({ queryKey: ['locations', 'my-locations'] })
    scroll()
  }

  function handleNameClick(id: string) {
    if (setAuthId) {
      setAuthId(id)
      queryClient.invalidateQueries({ queryKey: ['locations', 'my-locations'] })
      scroll()
    }
  }

  function scroll() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {title === 'Discover Locations' && !currentAuthId && (
        <>
          <h1>Welcome to Film Dori 🗺️</h1>
          <p>
            The place to share and discover the locations that inspired your
            favourite films and shows 🎬 📺
            <br />
            Sign in to start sharing your favourite locations!
          </p>
          <br />
        </>
      )}
      <h1 className="text-5xl">{title}</h1>

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
          <div className="flex justify-center items-end flex-wrap">
            <MediaTag tag={locations[0].tag} setTag={setTag} />
            <UserTag username={locations[0].username} setId={setAuthId} />
          </div>
        ) : tag === 0 && authId !== 'x' ? (
          <div className="flex justify-center items-end flex-wrap">
            <UserTag username={locations[0].username} setId={setAuthId} />
          </div>
        ) : (
          tag !== 0 &&
          authId === 'x' && <MediaTag tag={locations[0].tag} setTag={setTag} />
        ))}
      {locations.map((location: Location, i: number) => (
        <section key={i} className="mt-10 flex flex-col w-full">
          <LocationCard
            location={location}
            title={title}
            handleTagClick={handleTagClick}
            handleNameClick={handleNameClick}
            i={i}
            authId={authId}
          />
        </section>
      ))}
    </>
  )
}
