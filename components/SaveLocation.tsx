'use client'
import { useSaveLocation } from '@/hooks/useLocations'
import { useTags } from '@/hooks/useTags'
import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import { LocationData } from '@/models/locations'

interface Props {
  open: Dispatch<SetStateAction<boolean>>
  newLocation: LocationData
  setNewLocation: Dispatch<SetStateAction<LocationData>>
  getDescription: (locationName: string, address: string) => void
}

export default function SaveLocation({
  open,
  newLocation,
  setNewLocation,
  getDescription,
}: Props) {
  const router = useRouter()

  const saveLocation = useSaveLocation()

  const { data: tags } = useTags()

  function saveNewLocation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    saveLocation.mutate(newLocation)
    open(false)
    router.push('/my-locations', { scroll: false })
  }

  if (location && tags) {
    const { rating, name, address, url } = newLocation

    return (
      <div className="fixed w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-60 z-20">
        <section className="search_result z-30 md:w-8/12 w-11/12 text-left">
          <div className="overflow-y-auto grow my-[10px] mx-[5px] px-[15px]">
            <div className="flex justify-between items-center flex-wrap">
              <h1>{name}</h1>
              {rating !== 0 && <p>{rating} ⭐️</p>}
            </div>
            <a href={url}>{address}</a>
            <br />
            <br />
            <form onSubmit={saveNewLocation}>
              <section className="flex flex-col flex-wrap lg:flex-row">
                <div className="mr-10 flex-[2]">
                  <div className="flex justify-between flex-wrap">
                    <label htmlFor="description">
                      Location Description{' '}
                      <span className="relative top-[-5px]">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => getDescription(name, address)}
                      className="gradient px-3 pt-2 pb-1 whitespace-nowrap rounded-[20px] w-fit leading-[25px] text-[25px]"
                    >
                      use AI✨
                    </button>
                  </div>
                  <textarea
                    name="description"
                    onChange={(e) => {
                      setNewLocation({
                        ...newLocation,
                        description: e.target.value,
                      })
                    }}
                    placeholder="describe location"
                    value={newLocation.description}
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
