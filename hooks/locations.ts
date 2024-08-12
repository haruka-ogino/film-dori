import { getLocations } from '@/api/location'
import { useQuery } from '@tanstack/react-query'

export function useLocations() {
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
