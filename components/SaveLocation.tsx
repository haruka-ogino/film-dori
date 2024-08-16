import { useSaveLocation } from '@/hooks/useLocations'
import { GoogleSearchRes } from '@/models/google-locations'
import { Session } from 'next-auth'
import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  location: GoogleSearchRes | undefined
  open: Dispatch<SetStateAction<boolean>>
  session: Session | null
}

export default function SaveLocation({ location, open, session }: Props) {
  const [newLocation, setNewLocation] = useState({
    id: '',
    image: '',
    description: '',
    authId: '',
  })

  const saveLocation = useSaveLocation()

  function saveNewLocation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (location && session && session.user) {
      const authId = session.user.id || ''
      setNewLocation((prev) => {
        return { ...prev, id: location.id, authId }
      })
    }

    saveLocation.mutate(newLocation)
  }

  if (location) {
    const { rating, displayName, formattedAddress, url } = location

    return (
      <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-60">
        <section className="search_result w-8/12">
          <div className="flex justify-between items-center">
            <h1>{displayName}</h1>
            <p>{rating} ⭐️</p>
          </div>
          <a href={url}>{formattedAddress}</a>
          <br />
          <br />
          <form onSubmit={saveNewLocation}>
            <label htmlFor="description">
              Location Description{' '}
              <span className="relative top-[-5px]">*</span>
            </label>
            <br />
            <textarea
              name="description"
              onChange={(e) =>
                setNewLocation({ ...newLocation, description: e.target.value })
              }
              placeholder="describe location"
              className="m-3 ml-10 pl-2 h-20 min-w-[25em] rounded-md"
              required
            />
            <br />
            <label htmlFor="image-url">
              Image Link <span className="relative top-[-5px]">*</span>
            </label>
            <br />
            <input
              name="image-url"
              type="text"
              onChange={(e) =>
                setNewLocation({ ...newLocation, image: e.target.value })
              }
              placeholder="image url"
              className="m-3 ml-10 pl-2 min-w-[25em] rounded-md"
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
