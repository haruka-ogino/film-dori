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

  const saveLocation = useSaveLocation()
  const { data: tags } = useTags()

  function saveNewLocation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setNewLocation((prev) => {
      return { ...prev, id, authId }
    })

    saveLocation.mutate(newLocation)
    open(false)
  }

  if (location && tags) {
    const { rating, displayName, formattedAddress, url } = location

    return (
      <div className="fixed w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-60 z-20">
        <section className="search_result z-30 md:w-8/12 w-11/12 text-left">
          <div className="overflow-y-auto grow my-[10px] mx-[5px] px-[15px]">
            <div className="flex justify-between items-center flex-wrap">
              <h1>{displayName}</h1>
              {location.rating && <p>{rating} ⭐️</p>}
            </div>
            <a href={url}>{formattedAddress}</a>
            <br />
            <br />
            <form onSubmit={saveNewLocation}>
              <section className="flex flex-col flex-wrap lg:flex-row">
                <div className="mr-10 flex-[2]">
                  <label htmlFor="description">
                    Location Description{' '}
                    <span className="relative top-[-5px]">*</span>
                  </label>
                  <br />
                  <textarea
                    name="description"
                    onChange={(e) => {
                      setNewLocation({
                        ...newLocation,
                        description: e.target.value,
                      })
                    }}
                    placeholder="describe location"
                    // className="rounded-md"
                    className="m-3 pl-2 w-full h-[75%] rounded-md"
                    required
                  />
                </div>
                <div className="flex-[1] mb-5">
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
                        className="m-3"
                      />
                      <label htmlFor={`input-${tag.id}`}>{tag.tag}</label>
                    </div>
                  ))}
                </div>
              </section>
              {/* <br /> */}
              <label htmlFor="image-url">
                Image Link <span className="relative top-[-5px]">*</span>
              </label>
              <br />
              <input
                name="image-url"
                type="text"
                onChange={(e) => {
                  setNewLocation({ ...newLocation, image: e.target.value })
                }}
                placeholder="image url"
                className="m-3 pl-2 w-[95%] rounded-md"
                required
              />
              <div className="flex flex-wrap justify-around items-center mr-[30px]">
                <button type="submit" className="button-submit w-[150px] mx-4">
                  Save to my locations
                </button>
                <button
                  className="button-submit button-cancel my-2 mx-4"
                  onClick={() => open(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    )
  }
}
