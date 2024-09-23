import { searchGoogleLocation, getAIDescription } from '../api/google'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useSearchGoogle() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: searchGoogleLocation,
  })
}

export function useAIDescription() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: getAIDescription,
  })
}
