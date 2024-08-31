import { useAIDescription } from '@/hooks/useGoogle'
import { useUpdateLocation } from '@/hooks/useLocations'
import { useTags } from '@/hooks/useTags'
import { Location } from '@/models/locations'
import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  location: Location
  open: Dispatch<SetStateAction<boolean>>
}

export default function EditPopUp({ location, open }: Props) {
  const updateLocation = useUpdateLocation()
  const { data: tags } = useTags()

  const [editLocation, setEditLocation] = useState({
    image: location.image,
    description: location.description,
    tagId: location.tagId,
    name: location.name,
    id: location.id,
    address: location.address,
    rating: location.rating,
    url: location.url,
    authId: location.authId,
  })

  function sendUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    updateLocation.mutate(editLocation)
    open(false)
  }

  const getDescription = useAIDescription()

  function handleGetDescription(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    const userConfirmed = window.confirm(`
      Generating an AI response will replace your current description and permanently delete it upon saving changes.
      Are you sure you want to continue?
    `)

    if (userConfirmed) {
      getDescription.mutate(
        { locationInfo: location.name, address: location.address },
        {
          onSuccess: (data) => {
            setEditLocation((prev) => {
              return { ...prev, description: data }
            })
          },
        }
      )
    }
  }

  if (location && tags) {
    return (
      <div className="fixed w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-60 z-20">
        <section className="search_result z-30 md:w-8/12 w-11/12 text-left">
          <div className="overflow-y-auto grow my-[10px] mx-[5px] px-[15px]">
            <div className="flex justify-between items-center flex-wrap">
              <label htmlFor="name">
                Location name <span className="relative top-[-5px]">*</span>
              </label>
              <br />
              <input
                name="name"
                type="text"
                onChange={(e) => {
                  setEditLocation({ ...editLocation, name: e.target.value })
                }}
                value={editLocation.name}
                placeholder="image url"
                className="m-3 pl-2 w-[95%] rounded-md"
                required
              />
            </div>
            <form onSubmit={sendUpdate}>
              <section className="flex flex-col flex-wrap lg:flex-row">
                <div className="mr-10 flex-[2]">
                  <div className="flex justify-between flex-wrap">
                    <label htmlFor="description">
                      Location Description{' '}
                      <span className="relative top-[-5px]">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleGetDescription}
                      className="gradient px-3 pt-2 pb-1 whitespace-nowrap rounded-[20px] w-fit leading-[25px] text-[25px]"
                    >
                      use AI✨
                    </button>
                  </div>
                  <textarea
                    name="description"
                    onChange={(e) => {
                      setEditLocation({
                        ...editLocation,
                        description: e.target.value,
                      })
                    }}
                    placeholder="describe location"
                    value={editLocation.description}
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
                        checked={editLocation.tagId === tag.id}
                        onChange={(e) => {
                          const selectedTagId = parseInt(e.target.value, 10)
                          setEditLocation((prev) => ({
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
                  setEditLocation({ ...editLocation, image: e.target.value })
                }}
                value={editLocation.image}
                placeholder="image url"
                className="m-3 pl-2 w-[95%] rounded-md"
                required
              />
              <div className="flex flex-wrap justify-around items-center mr-[30px]">
                <button type="submit" className="button-submit w-[150px] mx-4">
                  Save changes
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
