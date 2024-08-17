'use client'
import { useAuth } from '@/hooks/useProviders'
import { useUserLocations } from '@/hooks/useLocations'
import { useState } from 'react'

export default function MyLocations() {
  const { session } = useAuth()
  const authId = session?.user?.id || 'huh'
  const [tag, setTag] = useState(1)

  const { data: locations, isLoading, isError } = useUserLocations(authId, tag)

  if (isLoading) return <h1>Loading...</h1>

  if (isError) return <h1>You are experiencing an error...</h1>

  if (locations)
    return (
      <>
        {session?.user ? (
          <>
            <h1>My Locations!</h1>
            <p>~ This page is under construction ~</p>
            <p>~ Stay tuned for updates ~</p>
          </>
        ) : (
          <p>Login to start saving and sharing locations!.</p>
        )}
      </>
    )
}
