'use client'
import { useAuth } from '@/hooks/useProviders'
import { useLocations } from '@/hooks/useLocations'
import { useState } from 'react'
import Locations from '@/components/Locations'

export default function Home() {
  const [tag, setTag] = useState(0)
  const [authId, setAuthId] = useState('x')
  const title = 'Discover Locations'
  const key = 'locations'

  const { data: locations, isLoading, isError } = useLocations(authId, tag)

  if (isLoading) return <h1>Loading...</h1>

  if (isError) return <h1>You are experiencing an error...</h1>

  if (locations)
    return (
      <>
        {/* <h1>Welcome!</h1> */}
        {/* <p>
        A place where you can see films, characters, dishes and more from the
        Ghibli Studio films.
      </p>
      <p>
        Test your Ghibli knowledge with the quiz, or tease your brain with a
        jigsaw puzzle.
      </p> */}
        {/* <p>
          The place where you can share locations that inspired your favourite
          films and tv shows!
        </p> */}
        {/* <GhibliLocations /> */}
        <Locations
          locations={locations}
          title={title}
          setAuthId={setAuthId}
          setTag={setTag}
          key={key}
          tag={tag}
          authId={authId}
        />
      </>
    )
}
