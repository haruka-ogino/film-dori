'use client'
import { useAuth } from '@/hooks/useProviders'
import { useLocations } from '@/hooks/useLocations'
import { useState } from 'react'
import Locations from '@/components/Locations'
import Link from 'next/link'

export default function MyLocations() {
  const { session, signIn } = useAuth()
  const authId = session?.user?.id || ''
  const [tag, setTag] = useState(0)
  const title = 'My Locations'

  const { data: locations, isLoading } = useLocations(authId, tag)

  if (isLoading) return <h1>Loading...</h1>

  return (
    <>
      {locations && session?.user ? (
        <Locations
          locations={locations}
          title={title}
          setTag={setTag}
          tag={tag}
          authId={authId}
        />
      ) : !locations && session?.user ? (
        <Link href="post-location">
          <h1>Start sharing locations!</h1>
        </Link>
      ) : (
        <h1>
          {' '}
          <a
            onClick={(e) => {
              e.preventDefault()
              signIn()
            }}
            className="underline hover:cursor-pointer"
          >
            Sign in
          </a>{' '}
          to start sharing locations!
        </h1>
      )}
    </>
  )
}
