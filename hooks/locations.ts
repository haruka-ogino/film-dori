import { getLocations } from '@/api/location'
import { useQuery } from '@tanstack/react-query'

export function useCollections() {
  const query = useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      return getLocations()
    },
  })

  return {
    ...query,
  }
}
