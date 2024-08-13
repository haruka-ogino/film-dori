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
  const { data: session } = useSession()

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }

    setUpProviders()
  }, [])

  return (
    <nav className="flex justify-between items-center overflow-x-hidden pb-2 my-2 border-b-2 border-blue-900">
      {/* <h2>item 1</h2>
      <h2>item 2</h2>
      <h2>item 3</h2>
      <h2>item 4</h2>
      <h2>item 5</h2> */}
      {/* Desktop Navigation */}
      <div className="sm:flex justify-around hidden">
        <Link href="/goals" className="mr-2">
          Future goals for app
        </Link>
        <Link href="/post-location" className="mr-2">
          Add Location
        </Link>
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <button type="button" onClick={() => signOut()}>
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
      </div>
    </nav>
  )
}

export default NavBar
