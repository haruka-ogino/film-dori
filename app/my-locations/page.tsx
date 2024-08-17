'use client'
import { useAuth } from '@/hooks/useProviders'
import { useUserLocations } from '@/hooks/useLocations'
import { useState } from 'react'
import Locations from '@/components/Locations'

export default function MyLocations() {
  const { session } = useAuth()
  const authId = session?.user?.id || ''
  const [tag, setTag] = useState(0)
  const title = 'My Locations'
  const key = 'my-locations'

  const { data: locations, isLoading, isError } = useUserLocations(authId, tag)

  if (isLoading) return <h1>Loading...</h1>

  if (isError) return <h1>You are experiencing an error...</h1>

  if (locations)
    return (
      <>
        {session?.user ? (
          <Locations
            locations={locations}
            title={title}
            setTag={setTag}
            key={key}
            authId={authId}
            tag={tag}
          />
        ) : (
          <p>Login to start saving and sharing locations!.</p>
        )}
      </>
    )
}
