import { useAIDescription } from '@/hooks/useGoogle'
import { useUpdateLocation } from '@/hooks/useLocations'
import { useTags } from '@/hooks/useTags'
import { Location } from '@/models/locations'
import { Dispatch, SetStateAction, useState } from 'react'
import ErrorMessage from './ErrorMessage'

interface Props {
  location: Location
  open: Dispatch<SetStateAction<boolean>>
}

export default function EditPopUp({ location, open }: Props) {
  const updateLocation = useUpdateLocation()
  const { data: tags } = useTags()
  const [displayImg, setDisplayImg] = useState(false)

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

    if (location.image !== editLocation.image && !displayImg) {
      window.alert('Please load and check the image before saving your changes')
    } else {
      updateLocation.mutate(editLocation)
      open(false)
    }
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

  if (!location || !tags) {
    return <ErrorMessage open={open} />
  }

  if (location && tags) {
    return (
      <div className="overflow-y-auto grow my-[10px] mx-[5px] px-[15px]">
        <form onSubmit={sendUpdate}>
          <div className="flex justify-between items-center flex-wrap">
            <label htmlFor="name">
              Location name <span className="relative top-[-5px]">*</span>
            </label>
            <br />
            <input
              name="name"
              id="name"
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
          <section className="flex flex-col flex-wrap lg:flex-row">
            <div className="mr-10 flex-[2]">
              <div className="flex justify-between flex-wrap">
                <label htmlFor="description">
                  Location Description{' '}
                  <span className="relative top-[-5px]">*</span>
                </label>
                <button
                  type="button"
                  className="gradient px-3 pt-0.5 whitespace-nowrap rounded-full w-fit"
                  onClick={handleGetDescription}
                >
                  use AI✨
                </button>
              </div>
              <textarea
                id="description"
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
          {!displayImg ? (
            <>
              <label htmlFor="image-url">
                Image Link <span className="relative top-[-5px]">*</span>
              </label>
              <br />
              <section className="flex justify-between">
                <input
                  name="image-url"
                  id="image-url"
                  type="text"
                  onChange={(e) => {
                    setEditLocation({ ...editLocation, image: e.target.value })
                  }}
                  value={editLocation.image}
                  placeholder="image url"
                  className="m-3 pl-2 w-[95%] rounded-md"
                  required
                />
                <button
                  className="button-submit w-[150px] mx-4"
                  onClick={() => setDisplayImg(true)}
                >
                  Load image
                </button>
              </section>
            </>
          ) : (
            <section className="text-center relative pb-2">
              <img src={editLocation.image} alt={editLocation.name} />
              <button
                className="button-submit w-[150px] mx-4 my-2 absolute top-0 right-0 flex justify-around items-center"
                onClick={() => setDisplayImg(false)}
              >
                <span className="pt-1">↩️</span> Go back
              </button>
            </section>
          )}
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
    )
  }
}
