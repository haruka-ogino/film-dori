import { getLocations, getUserLocations, saveLocation } from '@/api/locations'
import { LocationData } from '@/models/locations'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useLocations() {
  const query = useQuery({
    queryKey: ['locations'],
    queryFn: getLocations,
  })

  return {
    ...query,
  }
}

export function useSaveLocation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: LocationData) => saveLocation(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['googleLocations'] }),
  })
}

export function useUserLocations(authId: string, tag_id: number) {
  const query = useQuery({
    queryFn: async () => getUserLocations(authId, tag_id),
    queryKey: ['my-locations', authId],
  })
}
