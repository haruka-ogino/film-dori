import { useState, useEffect } from 'react'
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
}

export const useAuth = (): UseAuthResult => {
  const { data: session } = useSession()

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null)

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }

    setUpProviders()
  }, [])

  return { session, providers, signIn, signOut }
}
