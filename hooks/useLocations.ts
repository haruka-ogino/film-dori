import { getLocations, saveLocation } from '@/api/locations'
import { LocationData } from '@/models/locations'
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

export function useSaveLocation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: LocationData) => saveLocation(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['googleLocations'] }),
  })
}
