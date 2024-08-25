'use client'
import { useLocations } from '@/hooks/useLocations'
import { useState } from 'react'
import Locations from '@/components/Locations'

export default function Home() {
  const [tag, setTag] = useState(0)
  const [authId, setAuthId] = useState('x')
  const title = 'Discover Locations'

  const { data: locations, isLoading, isError } = useLocations(authId, tag)

  if (isLoading) return <h1>Loading...</h1>

  if (isError) return <h1>You are experiencing an error...</h1>

  if (locations)
    return (
      <>
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
