import { useState, useEffect } from 'react'
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from 'next-auth/react'
import {
  BuiltInProviderType,
  RedirectableProviderType,
} from 'next-auth/providers/index'
import { useQuery } from '@tanstack/react-query'

interface UseAuthResult {
  session: ReturnType<typeof useSession>['data']
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null
  isLoading: boolean
  isError: boolean
  signIn: (
    provider?: RedirectableProviderType,
    options?: { callbackUrl?: string }
  ) => Promise<void>
  signOut: (options?: {
    callbackUrl?: string
    redirect?: boolean
  }) => Promise<void>
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
