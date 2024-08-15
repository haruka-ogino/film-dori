'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers/index'

const NavBar = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false)

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

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="sm:flex justify-around items-center hidden overflow-x-hidden py-2 my-2 border-y-2 border-blue-900">
        <Link href="/goals" className="mx-2">
          Future goals for app
        </Link>
        <Link href="/post-location" className="mx-2">
          Add Location
        </Link>
        <Link href="/my-locations" className="mx-2">
          My Locations
        </Link>
        {session?.user ? (
          <div className="flex gap-3 md:gap-5 mx-2">
            <button type="button" className="log-btn" onClick={() => signOut()}>
              Sign Out
            </button>

            <Image
              src={session?.user.image ?? ''}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
            />
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="log-btn"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id)
                  }}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </nav>
    </>
  )
}

export default NavBar
