'use client'
import { useAuth } from '@/hooks/useProviders'
import { useLocations } from '@/hooks/useLocations'
import { useState } from 'react'
import Locations from '@/components/Locations'

export default function MyLocations() {
  const { session } = useAuth()
  const authId = session?.user?.id || ''
  const [tag, setTag] = useState(0)
  const title = 'My Locations'

  const { data: locations, isLoading, isError } = useLocations(authId, tag)

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
            tag={tag}
            authId={authId}
          />
        ) : (
          <p>Login to start saving and sharing locations!.</p>
        )}
      </>
    )
}
