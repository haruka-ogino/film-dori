'use client'
import { useAuth } from '@/hooks/useProviders'

export default function MyLocations() {
  const { session } = useAuth()

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
