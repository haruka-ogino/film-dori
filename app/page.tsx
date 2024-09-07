'use client'
import { useLocations } from '@/hooks/useLocations'
import { useState } from 'react'
import Locations from '@/components/Locations'
import { useAuth } from '@/hooks/useProviders'

export default function Home() {
  const [tag, setTag] = useState(0)
  const [authId, setAuthId] = useState('x')
  const { session, signIn } = useAuth()
  const currentAuthId = session?.user?.id || null
  const title = 'Discover Locations'

  const { data: locations, isLoading, isError } = useLocations(authId, tag)

  if (isLoading) return <h1>Loading...</h1>

  if (isError) return <h1>You are experiencing an error...</h1>

  if (locations)
    return (
      <>
        {!currentAuthId && (
          <>
            <h1>Welcome to Film Dori 🗺️</h1>
            <p>
              The place to share and discover the locations that inspired your
              favourite films and shows 🎬 📺
              <br />
              <a
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
                className="underline hover:cursor-pointer"
              >
                Sign in
              </a>{' '}
              to start sharing your favourite locations!
            </p>
            <br />
          </>
        )}
        <Locations
          locations={locations}
          title={title}
          setAuthId={setAuthId}
          setTag={setTag}
          tag={tag}
          authId={authId}
        />
      </>
    )
}
