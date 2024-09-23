import { useQuery } from '@tanstack/react-query'
import { getTags } from '@/api/tag'

export function useTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      return getTags()
    },
  })
}
