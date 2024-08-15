import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
  SignInOptions,
  SignInAuthorizationParams,
  SignOutResponse,
  SignOutParams,
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
  signIn: <P extends RedirectableProviderType | undefined = undefined>(
    provider?:
      | LiteralUnion<
          P extends RedirectableProviderType
            ? BuiltInProviderType | P
            : BuiltInProviderType
        >
      | undefined,
    options?: SignInOptions | undefined,
    authorizationParams?: SignInAuthorizationParams | undefined
  ) => Promise<any>
  signOut: <R extends boolean = true>(
    options?: SignOutParams<R> | undefined
  ) => Promise<R extends true ? undefined : SignOutResponse>
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
