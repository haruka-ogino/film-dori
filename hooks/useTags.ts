import { useQuery } from '@tanstack/react-query'
import { getTags } from '@/api/tag'

export function useTags() {
  const query = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      return getTags()
    },
  })

  return {
    ...query,
  }
}
