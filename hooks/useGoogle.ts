import { searchGoogleLocation, getAIDescription } from '../api/google'
import { useMutation } from '@tanstack/react-query'

export function useSearchGoogle() {
  return useMutation({
    mutationFn: searchGoogleLocation,
  })
}

export function useAIDescription() {
  return useMutation({
    mutationFn: getAIDescription,
  })
}
