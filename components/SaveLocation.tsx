import { useSaveLocation } from '@/hooks/useLocations'
import { useTags } from '@/hooks/useTags'
import { GoogleSearchRes } from '@/models/google-locations'
import { Session } from 'next-auth'
import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  location: GoogleSearchRes | undefined
  open: Dispatch<SetStateAction<boolean>>
  session: Session | null
}

export default function SaveLocation({ location, open, session }: Props) {
  const authId = session?.user?.id || 'no authId'
  const id = location?.id || 'error getting location'
  const address = location?.formattedAddress || 'error getting location'
  const name = location?.displayName || 'error getting location'
  const url = location?.url || 'error getting location'
  const rating = location?.rating || 0

  const [newLocation, setNewLocation] = useState({
    id,
    image: '',
    description: '',
    tagId: 0,
    authId,
    address,
    name,
    url,
    rating,
  })

  console.log(location)

  const saveLocation = useSaveLocation()
  const { data: tags } = useTags()

  function saveNewLocation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setNewLocation((prev) => {
      console.log(prev)

      return { ...prev, id, authId }
    })

    saveLocation.mutate(newLocation)
    open(false)
  }

  if (location && tags) {
    const { rating, displayName, formattedAddress, url } = location
    console.log(tags)

    return (
      <div className="fixed w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-60">
        <section className="search_result w-8/12">
          <div className="flex justify-between items-center flex-wrap">
            <h1>{displayName}</h1>
            {location.rating && <p>{rating} ⭐️</p>}
          </div>
          <a href={url}>{formattedAddress}</a>
          <br />
          <br />
          <form onSubmit={saveNewLocation}>
            <section className="flex flex-wrap">
              <div className="mr-10">
                <label htmlFor="description">
                  Location Description{' '}
                  <span className="relative top-[-5px]">*</span>
                </label>
                <br />
                <textarea
                  name="description"
                  onChange={(e) => {
                    console.log(e)

                    setNewLocation({
                      ...newLocation,
                      description: e.target.value,
                    })
                  }}
                  placeholder="describe location"
                  className="m-3 ml-5 pl-2 h-36 min-w-[20em] rounded-md"
                  required
                />
              </div>
              <div>
                <p>
                  Select a tag <span className="relative top-[-5px]">*</span>
                </p>
                {tags.map((tag, i) => (
                  <div key={i}>
                    <input
                      type="radio"
                      id={`input-${tag.id}`}
                      name="tag_id"
                      value={tag.id}
                      checked={newLocation.tagId === tag.id}
                      onChange={(e) => {
                        const selectedTagId = parseInt(e.target.value, 10)
                        setNewLocation((prev) => ({
                          ...prev,
                          tagId: selectedTagId,
                        }))
                      }}
                      className="mr-2"
                    />
                    <label htmlFor={`input-${tag.id}`}>{tag.tag}</label>
                  </div>
                ))}
              </div>
            </section>
            <br />
            <label htmlFor="image-url">
              Image Link <span className="relative top-[-5px]">*</span>
            </label>
            <br />
            <input
              name="image-url"
              type="text"
              onChange={(e) => {
                console.log(e)

                setNewLocation({ ...newLocation, image: e.target.value })
              }}
              placeholder="image url"
              className="m-3 ml-5 pl-2 min-w-[32em] rounded-md"
              required
            />
            <div className="flex flex-wrap justify-center items-center">
              <button
                type="submit"
                className="button-submit w-[150px] mr-[50px]"
              >
                Save to my locations
              </button>
              <button
                className="button-submit button-cancel"
                onClick={() => open(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </div>
    )
  }
}
