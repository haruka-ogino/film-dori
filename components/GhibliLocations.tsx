import { useLocations } from '@/hooks/locations'

const GhibliLocations = () => {
  const { data: locations, isLoading, isError } = useLocations()

  if (isLoading) return <h1>Loading...</h1>

  if (isError) return <h1>You are experiencing an error...</h1>

  console.log(locations)

  return (
    <>
      <h1>Locations</h1>
    </>
  )
}

export default GhibliLocations
