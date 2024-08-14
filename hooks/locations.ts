import { getLocations, searchGoogleLocation } from '@/api/location'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

export function useSearchGoogle() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: searchGoogleLocation,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['googleLocations'] }),
  })
}
