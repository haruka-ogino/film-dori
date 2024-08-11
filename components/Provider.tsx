'use client'

import { SessionProvider, SessionProviderProps } from 'next-auth/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  session: SessionProviderProps['session']
}

const Provider = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default Provider
