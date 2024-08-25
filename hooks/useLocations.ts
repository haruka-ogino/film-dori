import { deleteLocation, getLocations, saveLocation } from '@/api/locations'
import { LocationData } from '@/models/locations'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useSaveLocation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: LocationData) => saveLocation(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['locations'] }),
  })
}

export function useLocations(authId: string, tagId: number) {
  const query = useQuery({
    queryFn: async () => getLocations(authId, tagId),
    queryKey: ['my-locations', authId, tagId, 'locations'],
  })
  return {
    ...query,
  }
}

export function useDeleteLocation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: { authId: string; id: string }) => deleteLocation(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['googleLocations'] }),
  })
}
