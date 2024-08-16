import { GoogleSearchRes } from '@/models/google-locations'
import { Session } from 'next-auth'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  location: GoogleSearchRes | undefined
  open: Dispatch<SetStateAction<boolean>>
  session: Session | null
}

export default function SaveLocation({ location, open, session }: Props) {
  console.log(session?.user?.id)

  function saveLocation() {
    return 'yay'
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
          <div className="flex justify-around items-center">
            <button className="button-submit w-[150px]" onClick={saveLocation}>
              Save to my locations
            </button>
            <button
              className="button-submit button-cancel"
              onClick={() => open(false)}
            >
              Cancel
            </button>
          </div>
        </section>
      </div>
    )
  }
}
