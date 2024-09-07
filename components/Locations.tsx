import { Location } from '@/models/locations'
import { useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import MediaTag from './MediaTag'
import UserTag from './UserTag'
import LocationCard from './LocationCard'

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

  function handleTagClick(id: number) {
    setTag(id)
    queryClient.invalidateQueries({
      queryKey: ['locations', 'my-locations', authId, tag],
    })
    scroll()
  }

  function handleNameClick(id: string) {
    if (setAuthId) {
      setAuthId(id)
      queryClient.invalidateQueries({
        queryKey: ['locations', 'my-locations', authId, tag],
      })
      scroll()
    }
  }

  function scroll() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <h1 className="text-5xl">{title}</h1>

      <div className="flex justify-center items-end flex-wrap">
        {tag !== 0 && <MediaTag tag={locations[0].tag} setTag={setTag} />}
        {setAuthId && authId !== 'x' && (
          <UserTag username={locations[0].username} setId={setAuthId} />
        )}
      </div>

      {locations.map((location: Location, i: number) => (
        <section key={i} className="mt-10 flex flex-col w-full">
          <LocationCard
            location={location}
            title={title}
            handleTagClick={handleTagClick}
            handleNameClick={handleNameClick}
            authId={authId}
          />
        </section>
      ))}
    </>
  )
}
