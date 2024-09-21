import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'

interface UseAuthResult {
  session: ReturnType<typeof useSession>['data']
  providers: Record<string, ClientSafeProvider> | null
  signIn: (
    providerId?: string,
    options?: { callbackUrl?: string }
  ) => Promise<any>
  signOut: (options?: { callbackUrl?: string }) => Promise<void>

  isLoading: boolean
  isError: boolean
}

export const useAuth = (): UseAuthResult => {
  const { data: session } = useSession()

  const {
    data: providers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['providers'],
    queryFn: async () => {
      return getProviders()
    },
  })

  return {
    session,
    providers: providers || null,
    signIn,
    signOut,
    isLoading,
    isError,
  }
}
