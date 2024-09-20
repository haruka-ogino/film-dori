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

  if (!locations && session?.user) {
    return <h1>You are experiencing an error</h1>
  }

  if (locations?.length === 0 && session?.user) {
    return (
      <Link href="post-location">
        <h1>Start sharing locations!</h1>
      </Link>
    )
  }

  if (locations && session?.user) {
    return (
      <Locations
        locations={locations}
        title={title}
        setTag={setTag}
        tag={tag}
        authId={authId}
      />
    )
  }

  return (
    <h1>
      {' '}
      <a
        onClick={(e) => {
          e.preventDefault()
          signIn()
        }}
        className="underline cursor-pointer"
      >
        Sign in
      </a>{' '}
      to start sharing locations!
    </h1>
  )
}
