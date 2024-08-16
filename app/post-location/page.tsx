'use client'
import SaveLocation from '@/components/SaveLocation'
import { useSearchGoogle } from '@/hooks/useGoogleLocations'
import { useAuth } from '@/hooks/useProviders'
import { GoogleSearchRes } from '@/models/google-locations'
import { useState } from 'react'

export default function Post() {
  const { session } = useAuth()

  const [inputState, setInputState] = useState('')
  const [locations, setLocations] = useState<GoogleSearchRes[]>([])
  const [showRes, setShowRes] = useState<boolean>(false)
  const [locationProp, setLocationProp] = useState<GoogleSearchRes>()
  const [saveLocation, setSaveLocation] = useState(false)

  const search = useSearchGoogle()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value
    setInputState(input)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    search.mutate(
      { searchInput: inputState },
      {
        onSuccess: (data) => {
          setLocations(data)
          setShowRes(true)
        },
      }
    )
    setInputState('')
  }

  function handleClick(i: number) {
    setLocationProp(locations[i])
    setSaveLocation(true)
  }

  return (
    <>
      <h1>Share a location!</h1>
      {/* <p>~ This page is under construction ~</p> */}
      {/* <p>~ Stay tuned for updates ~</p> */}
      {/* <p>Login to share locations and save your favourite locations.</p> */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-around flex-wrap max-w-96 m-5"
      >
        <input
          name="googleLocation"
          type="text"
          value={inputState}
          onChange={handleChange}
          placeholder="search location"
          className="m-3 pl-2 min-w-7/12  rounded-md"
        />
        <button type="submit" className="button-submit">
          Search
        </button>
      </form>
      {showRes && (
        <>
          <h1>Search results:</h1>
          <ul className="flex flex-col items-center w-full">
            {locations.map((location, i) => (
              <li key={i} className="li-style search_result w-full">
                <div className="flex justify-between items-center">
                  <div>
                    <h2>{location.displayName}</h2>
                    <p>{location.formattedAddress}</p>
                  </div>
                  {session?.user ? (
                    <button
                      className="button-submit w-72"
                      onClick={() => handleClick(i)}
                    >
                      Save Location
                    </button>
                  ) : (
                    <p>Sign in to save location</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {saveLocation && (
        <SaveLocation
          location={locationProp}
          open={setSaveLocation}
          session={session}
        />
      )}
    </>
  )
}
