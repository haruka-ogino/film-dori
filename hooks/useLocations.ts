import { saveLocation } from '@/api/locations'
import { LocationData } from '@/models/locations'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useSaveLocation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: LocationData) => saveLocation(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['googleLocations'] }),
  })
}
